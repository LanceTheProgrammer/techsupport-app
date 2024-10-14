import { useState, useEffect } from 'react';
import axios from 'axios';

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/bookings');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`/api/bookings/${id}`, { status });
      setAppointments(appointments.map(appointment => (
        appointment._id === id ? { ...appointment, status } : appointment
      )));
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Manage Appointments</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2">Customer Name</th>
            <th className="py-2">Service</th>
            <th className="py-2">Date</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment._id}>
              <td className="py-2">{appointment.customerName}</td>
              <td className="py-2">{appointment.service.name}</td>
              <td className="py-2">{new Date(appointment.preferredDate).toLocaleDateString()}</td>
              <td className="py-2">{appointment.status}</td>
              <td className="py-2">
                <button onClick={() => handleStatusChange(appointment._id, 'confirmed')} className="text-blue-500">Confirm</button>
                <button onClick={() => handleStatusChange(appointment._id, 'completed')} className="text-green-500 ml-2">Complete</button>
                <button onClick={() => handleStatusChange(appointment._id, 'cancelled')} className="text-red-500 ml-2">Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;