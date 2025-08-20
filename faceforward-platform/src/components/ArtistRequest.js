import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { auth } from '../firebase';
import './styling/ArtistRequests.css'; 

export default function ArtistRequests() {
  const [allRequests, setAllRequests] = useState([]);           //holds all the requests from firestore 
  const [visibleRequests, setVisibleRequests] = useState([]);   //subset of visible requests that should be show (filtered by status)
  const [loading, setLoading] = useState(true);                 //sees if the requests are still loading 
  const [selectedRequest, setSelectedRequest] = useState(null); //the request currently opened in the modal 
  const [showCompleted, setShowCompleted] = useState(false);    //bool that toggles completed visibility 

  useEffect(() => {
    const fetchRequests = async () => {
      if (!auth.currentUser) return; //if the user is not logged in, do not fetch anything
      try {
        const q = query(
          collection(db, 'requests'),
          where('artistId', '==', auth.currentUser.uid)
        ); //looks in requests collection in firestore, then filters by artistId
        //builds the query object 

        const snapshot = await getDocs(q); //snapshot gets all documents that match the query 

        //converts snapshot docs into usable objects 
        const requestsData = snapshot.docs.map(doc => ({
          id: doc.id,  
          ...doc.data(),
          requestedDate: doc.data().requestedDate?.toDate?.() || doc.data().requestedDate, //converts firestore
          createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt              //stamps into JS dates 
        })).sort((a, b) => b.createdAt - a.createdAt); //then sort by date 

        setAllRequests(requestsData); //update the state 
        filterVisibleRequests(requestsData, showCompleted); //filter the state for visable requests
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests(); //this keeps top level pure (no side effects when rendering) - this only happens once at the right moment: 
  }, []);

  //this decides whether requests if the request is completed 
  const filterVisibleRequests = (requests, showCompleted) => {
    setVisibleRequests(
      showCompleted ? requests : requests.filter(request => request.status !== 'completed')
    );
  };

  //updates the state of show copmleted (inverses) then reruns filterVisibleRequests
  const toggleShowCompleted = () => {
    const newValue = !showCompleted;
    setShowCompleted(newValue);
    filterVisibleRequests(allRequests, newValue);
  };

  //updates a request's status in Firestore 
  const updateStatus = async (newStatus) => {
    if (!selectedRequest) return; //if nothing is selected, exit 
    try {
      //updates the doc in Firestore  
      await updateDoc(doc(db, 'requests', selectedRequest.id), {
        status: newStatus,
        updatedAt: new Date()
      });

      //updates the local state so UI doesn't lag behind 
      const updatedRequests = allRequests.map(req =>
        req.id === selectedRequest.id ? { ...req, status: newStatus } : req
      );

      //refreshes filtered requests, 
      setAllRequests(updatedRequests);
      filterVisibleRequests(updatedRequests, showCompleted);

      alert(`Status updated to ${newStatus}!`); 
      setSelectedRequest(null); //closes modal 
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Failed to update status');
    }
  };

  if (loading) return <div>Loading requests...</div>; //loading message 

  return (
    <div className="artist-requests">
      <h2>Your Service Requests</h2>

      <div className="filter">
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
        <div className="requests-grid">
          {visibleRequests.map(request => (
            <div
              key={request.id}
              onClick={() => setSelectedRequest(request)}
              className="request-card"
            >
              <h3>Request #{request.id.slice(0, 6)}</h3>
              <p>Service: {request.serviceName || request.serviceId}</p>
              <p>From: {request.name || 'Unknown User'}</p>
              <p>Status: {request.status}</p>
              <p>Requested Date: {request.requestedDate?.toLocaleDateString?.() || request.requestedDate}</p>
            </div>
          ))}
        </div>
      )}

      {selectedRequest && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Request Details</h3>
            <div className="request-details">
              <p><strong>Name:</strong> {selectedRequest.name || 'Not available'}</p>
              <p><strong>Email:</strong> {selectedRequest.email || 'Not available'}</p>
              <p><strong>Number of Patients: </strong> {selectedRequest.numberOfPatients}</p>
              <p><strong>Service Requested:</strong> {selectedRequest.serviceName || selectedRequest.serviceId}</p>
              <p><strong>Status:</strong> {selectedRequest.status}</p>
              <p><strong>Requested Date:</strong> {selectedRequest.requestedDate?.toLocaleDateString?.() || selectedRequest.requestedDate}</p>
              <p><strong>Created:</strong> {selectedRequest.createdAt?.toLocaleDateString?.() || selectedRequest.createdAt}</p>
              <p><strong>Notes:</strong></p>
              <p>{selectedRequest.notes || 'No additional notes'}</p>
            </div>

            <div className="status-buttons">
              <button
                onClick={() => updateStatus('approved')}
                disabled={selectedRequest.status === 'approved'}
                className={`btn ${selectedRequest.status === 'approved' ? 'btn-disabled' : 'btn-approve'}`}
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus('completed')}
                disabled={selectedRequest.status === 'completed'}
                className={`btn ${selectedRequest.status === 'completed' ? 'btn-disabled' : 'btn-complete'}`}
              >
                Complete
              </button>
              <button
                onClick={() => updateStatus('rejected')}
                disabled={selectedRequest.status === 'rejected'}
                className={`btn ${selectedRequest.status === 'rejected' ? 'btn-disabled' : 'btn-reject'}`}
              >
                Reject
              </button>
              <button
                onClick={() => updateStatus('pending')}
                disabled={selectedRequest.status === 'pending'}
                className={`btn ${selectedRequest.status === 'pending' ? 'btn-disabled' : 'btn-pending'}`}
              >
                Set Pending
              </button>
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedRequest(null)} className="btn btn-close">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
