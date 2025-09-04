import { useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function CreateNewService() {
  const [service, setService] = useState({
    title: '',
    description: '',
    price: '',
    type: 'makeup', // Default service type
  });
  const [submitted, setSubmitted] = useState(false);

  const serviceTypes = [
    { value: 'makeup', label: 'Makeup' },
    { value: 'face-painting', label: 'Face Painting' },
    { value: 'manicure', label: 'Manicure' },
    { value: 'hair-styling', label: 'Hair Styling' },
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation - prevent empty services
    if (!service.title.trim() || !service.description.trim() || !service.price) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      await addDoc(collection(db, 'services'), {
        ...service,
        artistId: auth.currentUser.uid,
        createdAt: Timestamp.now(),
        price: Number(service.price),  // Ensure price is a number
        status: 'active'
      });
      setSubmitted(true);
      // Reset form
      setService({
        title: '',
        description: '',
        price: '',
        type: 'makeup',
      });
    } catch (error) {
      console.error("Error adding service: ", error);
      alert("Failed to create service. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="success-message">
        <p>Service created successfully!</p>
        <button onClick={() => setSubmitted(false)}>Add Another Service</button>
      </div>
    );
  }

  return (
    <div className="create-new-service">
      <h2>Create New Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Service Title*</label>
          <input
            type="text"
            value={service.title}
            onChange={(e) => setService({...service, title: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Description*</label>
          <textarea
            value={service.description}
            onChange={(e) => setService({...service, description: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Price CAD ($)*</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={service.price}
            onChange={(e) => setService({...service, price: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Service Type*</label>
          <select
            value={service.type}
            onChange={(e) => setService({...service, type: e.target.value})}
          >
            {serviceTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create Service</button>
      </form>
    </div>
  );
}