import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [clients, setClients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState('clients');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const clientsResponse = await axios.get('/api/admin/clients');
      setClients(clientsResponse.data);
      
      const appointmentsResponse = await axios.get('/api/admin/appointments');
      setAppointments(appointmentsResponse.data);
      
      const servicesResponse = await axios.get('/api/admin/services');
      setServices(servicesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderClients = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Clients</h2>
      <ul>
        {clients.map(client => (
          <li key={client._id} className="mb-2">
            {client.name} - {client.email}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderAppointments = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment._id} className="mb-2">
            {appointment.client.name} - {appointment.service.name} - {new Date(appointment.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderServices = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Services</h2>
      <ul>
        {services.map(service => (
          <li key={service._id} className="mb-2">
            {service.name} - ${service.price}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="flex mb-4">
        <button
          className={`mr-2 px-4 py-2 ${activeTab === 'clients' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('clients')}
        >
          Clients
        </button>
        <button
          className={`mr-2 px-4 py-2 ${activeTab === 'appointments' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'services' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('services')}
        >
          Services
        </button>
      </div>
      {activeTab === 'clients' && renderClients()}
      {activeTab === 'appointments' && renderAppointments()}
      {activeTab === 'services' && renderServices()}
    </div>
  );
};

export default AdminPanel;