import { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FaSync } from 'react-icons/fa';
import './styling/PatientRequests.css'; 

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  const formatDate = (date) => {
    if (!date) return 'Not specified';
    try {
      if (date.toDate) return date.toDate().toLocaleDateString();
      if (date instanceof Date) return date.toLocaleDateString();
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime()) ? parsedDate.toLocaleDateString() : 'Invalid date';
    } catch {
      return 'Invalid date';
    }
  };

  const fetchRequests = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      const q = query(collection(db, 'requests'), where('userId', '==', auth.currentUser.uid));
      const snapshot = await getDocs(q);
      const requestsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return { 
          id: doc.id, 
          ...data,
          requestedDate: data.requestedDate?.toDate?.() || data.requestedDate,
          createdAt: data.createdAt?.toDate?.() || data.createdAt
        };
      }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRequests(requestsData);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, [refreshCount]);
  const handleRefresh = () => setRefreshCount(prev => prev + 1);

  const filteredRequests = showCompleted ? requests : requests.filter(r => r.status !== 'completed');

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'approved': return 'status-approved';
      case 'completed': return 'status-completed';
      case 'rejected': return 'status-rejected';
      default: return 'status-default';
    }
  };

  return (
    <div className="requests-container">
      <div className="requests-header">
        <h2>Your Requested Services</h2>
        <button onClick={handleRefresh} disabled={loading} className="refresh-button">
          <FaSync className={loading ? 'spin' : ''} />
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <label className="filter-checkbox">
        <input 
          type="checkbox" 
          checked={showCompleted}
          onChange={() => setShowCompleted(!showCompleted)}
        />
        Show completed requests
      </label>

      {loading && filteredRequests.length === 0 ? (
        <div>Loading your requests...</div>
      ) : filteredRequests.length === 0 ? (
        <p>No service requests found.</p>
      ) : (
        <div className="request-list">
          {filteredRequests.map(request => (
            <div key={request.id} className="request-card" onClick={() => setSelectedRequest(request)}>
              <div className="request-card-header">
                <h3>{request.serviceName}</h3>
                <span className={`request-status ${getStatusClass(request.status)}`}>
                  {request.status}
                </span>
              </div>
              <div className="request-dates">
                <p><strong>Requested:</strong> {formatDate(request.requestedDate)}</p>
                <p><strong>Submitted:</strong> {formatDate(request.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedRequest && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedRequest.serviceName}</h2>
            <div className="modal-header">
              <span className={`modal-status ${getStatusClass(selectedRequest.status)}`}>
                {selectedRequest.status}
              </span>
              <button onClick={() => setSelectedRequest(null)} className="close-button">
                Close
              </button>
            </div>
            <div>
              <h3>Request Details</h3>
              <div className="request-dates">
                <p><strong>Requested Date:</strong> {formatDate(selectedRequest.requestedDate)}</p>
                <p><strong>Submitted On:</strong> {formatDate(selectedRequest.createdAt)}</p>
                <p><strong>Artist ID:</strong> {selectedRequest.artistId}</p>
                <p><strong>Service ID:</strong> {selectedRequest.serviceId}</p>
              </div>
            </div>
            <div>
              <h3>Notes</h3>
              <div className="notes-box">{selectedRequest.notes || 'No additional notes provided'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
