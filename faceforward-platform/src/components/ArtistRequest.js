import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { auth } from '../firebase';

export default function ArtistRequests() {
  const [allRequests, setAllRequests] = useState([]); // Store all requests
  const [visibleRequests, setVisibleRequests] = useState([]); // Requests to display
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false); // Toggle for showing completed

  // Fetch all requests for the current artist
  useEffect(() => {
    const fetchRequests = async () => {
      if (!auth.currentUser) {
        console.log("No current user");
        return;
      }
      
      try {
        const q = query(
          collection(db, 'requests'),
          where('artistId', '==', auth.currentUser.uid)
        );
        const snapshot = await getDocs(q);
        
        const requestsData = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          requestedDate: doc.data().requestedDate?.toDate?.() || doc.data().requestedDate,
          createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
        })).sort((a, b) => b.createdAt - a.createdAt);
        
        setAllRequests(requestsData);
        filterVisibleRequests(requestsData, showCompleted);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Filter requests based on completion status
  const filterVisibleRequests = (requests, showCompleted) => {
    setVisibleRequests(
      showCompleted 
        ? requests 
        : requests.filter(request => request.status !== 'completed')
    );
  };

  // Toggle showing completed requests
  const toggleShowCompleted = () => {
    const newValue = !showCompleted;
    setShowCompleted(newValue);
    filterVisibleRequests(allRequests, newValue);
  };

  const updateStatus = async (newStatus) => {
    if (!selectedRequest) return;
    
    try {
      await updateDoc(doc(db, 'requests', selectedRequest.id), {
        status: newStatus,
        updatedAt: new Date()
      });
      
      // Update both allRequests and visibleRequests
      const updatedRequests = allRequests.map(req => 
        req.id === selectedRequest.id ? { ...req, status: newStatus } : req
      );
      
      setAllRequests(updatedRequests);
      filterVisibleRequests(updatedRequests, showCompleted);
      
      alert(`Status updated to ${newStatus}!`);
      setSelectedRequest(null);
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Failed to update status');
    }
  };

  if (loading) {
    return <div>Loading requests...</div>;
  }

  return (
    <div style={{ position: 'relative' }}>
      <h2>Your Service Requests</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>
          <input 
            type="checkbox" 
            checked={showCompleted}
            onChange={toggleShowCompleted}
          />
          Show completed requests
        </label>
      </div>
      
      {visibleRequests.length === 0 ? (
        <p>No requests found for your services.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {visibleRequests.map(request => (
            <div 
              key={request.id} 
              onClick={() => setSelectedRequest(request)}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <div>
                <h3>Request #{request.id.slice(0, 6)}</h3>
                <p>Service: {request.serviceName || request.serviceId}</p>
                <p>From: {request.patientName || 'Unknown User'}</p>
                <p>Status: {request.status}</p>
                <p>Requested Date: {request.requestedDate?.toLocaleDateString?.() || request.requestedDate}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for request details */}
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
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3>Request Details</h3>
            <div style={{ marginBottom: '1rem' }}>
              <p><strong>Client Name:</strong> {selectedRequest.patientName || 'Not available'}</p>
              <p><strong>Email:</strong> {selectedRequest.patientEmail || 'Not available'}</p>
              <p><strong>Service Requested:</strong> {selectedRequest.serviceName || selectedRequest.serviceId}</p>
              <p><strong>Status:</strong> {selectedRequest.status}</p>
              <p><strong>Requested Date:</strong> {selectedRequest.requestedDate?.toLocaleDateString?.() || selectedRequest.requestedDate}</p>
              <p><strong>Created:</strong> {selectedRequest.createdAt?.toLocaleDateString?.() || selectedRequest.createdAt}</p>
              <p><strong>Notes:</strong></p>
              <p>{selectedRequest.notes || 'No additional notes'}</p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <h4>Update Status:</h4>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => updateStatus('approved')}
                  disabled={selectedRequest.status === 'approved'}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: selectedRequest.status === 'approved' ? '#ccc' : '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Approve
                </button>
                <button 
                  onClick={() => updateStatus('completed')}
                  disabled={selectedRequest.status === 'completed'}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: selectedRequest.status === 'completed' ? '#ccc' : '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Complete
                </button>
                <button 
                  onClick={() => updateStatus('rejected')}
                  disabled={selectedRequest.status === 'rejected'}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: selectedRequest.status === 'rejected' ? '#ccc' : '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Reject
                </button>
                <button 
                  onClick={() => updateStatus('pending')}
                  disabled={selectedRequest.status === 'pending'}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: selectedRequest.status === 'pending' ? '#ccc' : '#FF9800',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Set Pending
                </button>
              </div>
            </div>

            <div>
              <button 
                onClick={() => setSelectedRequest(null)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#666',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}