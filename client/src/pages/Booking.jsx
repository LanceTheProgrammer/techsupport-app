import { useState } from 'react';
import axios from 'axios';

function Booking() {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/bookings', formData);
      alert('Booking submitted successfully!');
      setFormData({
        customerName: '',
        email: '',
        phone: '',
        service: '',
        preferredDate: '',
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error submitting booking. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Book a Service</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.customerName}
            onChange={(e) => setFormData({...formData, customerName: e.target.value})}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            className="w-full p-2 border rounded"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
}

export default Booking;