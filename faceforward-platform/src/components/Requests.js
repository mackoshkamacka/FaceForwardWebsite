import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth } from '../firebase';
import { FaSync } from 'react-icons/fa'; // Import refresh icon

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false); // Changed initial state to false
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0); // Add refresh counter

  // Helper function to safely format dates
  const formatDate = (date) => {
    if (!date) return 'Not specified';
    
    try {
      if (date.toDate) return date.toDate().toLocaleDateString();
      if (date instanceof Date) return date.toLocaleDateString();
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) return parsedDate.toLocaleDateString();
      return 'Invalid date';
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  // Fetch all requests for the current patient
  const fetchRequests = async () => {
    if (!auth.currentUser) {
      console.log("No current user");
      return;
    }
    
    setLoading(true);
    try {
      const q = query(
        collection(db, 'requests'),
        where('userId', '==', auth.currentUser.uid)
      );
      const snapshot = await getDocs(q);
      
      const requestsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return { 
          id: doc.id, 
          ...data,
          requestedDate: data.requestedDate?.toDate?.() || data.requestedDate,
          createdAt: data.createdAt?.toDate?.() || data.createdAt
        };
      }).sort((a, b) => {
        const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
        const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
        return dateB - dateA;
      });
      
      setRequests(requestsData);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch requests on component mount and when refreshCount changes
  useEffect(() => {
    fetchRequests();
  }, [refreshCount]);

  // Manual refresh function
  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1); // Increment to trigger useEffect
  };

  // Filter requests based on completion status
  const filteredRequests = showCompleted 
    ? requests 
    : requests.filter(request => request.status !== 'completed');

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'approved': return 'green';
      case 'completed': return 'blue';
      case 'rejected': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Your Requested Services</h2>
        <button 
          onClick={handleRefresh}
          disabled={loading}
          style={{
            backgroundColor: '#f0f0f0',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FaSync className={loading ? 'spin' : ''} />
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input 
            type="checkbox" 
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
          Show completed requests
        </label>
      </div>
      
      {loading && filteredRequests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>Loading your requests...</div>
      ) : filteredRequests.length === 0 ? (
        <p>No service requests found.</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {filteredRequests.map(request => (
            <div 
              key={request.id} 
              onClick={() => setSelectedRequest(request)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                ':hover': {
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ margin: '0 0 10px 0' }}>{request.serviceName}</h3>
                <span style={{
                  backgroundColor: getStatusColor(request.status),
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  textTransform: 'capitalize'
                }}>
                  {request.status}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>
                    <strong>Requested:</strong> {formatDate(request.requestedDate)}
                  </p>
                </div>
                <div>
                  <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>
                    <strong>Submitted:</strong> {formatDate(request.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '8px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ marginTop: 0 }}>{selectedRequest.serviceName}</h2>
            
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <span style={{
                backgroundColor: getStatusColor(selectedRequest.status),
                color: 'white',
                padding: '6px 12px',
                borderRadius: '16px',
                fontWeight: 'bold'
              }}>
                {selectedRequest.status}
              </span>
              
              <button 
                onClick={() => setSelectedRequest(null)}
                style={{
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '10px' }}>Request Details</h3>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px'
              }}>
                <div>
                  <p><strong>Requested Date:</strong></p>
                  <p>{formatDate(selectedRequest.requestedDate)}</p>
                </div>
                <div>
                  <p><strong>Submitted On:</strong></p>
                  <p>{formatDate(selectedRequest.createdAt)}</p>
                </div>
                <div>
                  <p><strong>Artist ID:</strong></p>
                  <p>{selectedRequest.artistId}</p>
                </div>
                <div>
                  <p><strong>Service ID:</strong></p>
                  <p>{selectedRequest.serviceId}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 style={{ marginBottom: '10px' }}>Notes</h3>
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '15px',
                borderRadius: '4px'
              }}>
                {selectedRequest.notes || 'No additional notes provided'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}