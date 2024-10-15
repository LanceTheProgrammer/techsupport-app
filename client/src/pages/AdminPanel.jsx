import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [clients, setClients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState('clients');
  const [newClient, setNewClient] = useState({ name: '', email: '' });
  const [newService, setNewService] = useState({ name: '', price: '' });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const clientsResponse = await fetch('/api/admin/clients');
      const clientsData = await clientsResponse.json();
      setClients(clientsData);
      
      const appointmentsResponse = await fetch('/api/admin/appointments');
      const appointmentsData = await appointmentsResponse.json();
      setAppointments(appointmentsData);
      
      const servicesResponse = await fetch('/api/admin/services');
      const servicesData = await servicesResponse.json();
      setServices(servicesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addClient = async () => {
    if (!newClient.name || !newClient.email) {
      setError('Name and email are required.');
      return;
    }
    try {
      const response = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient),
      });
      const data = await response.json();
      setClients([...clients, data]);
      setNewClient({ name: '', email: '' });
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  const addService = async () => {
    if (!newService.name || !newService.price || isNaN(newService.price)) {
      setError('Valid service name and price are required.');
      return;
    }
    try {
      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      });
      const data = await response.json();
      setServices([...services, data]);
      setNewService({ name: '', price: '' });
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const renderClients = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Clients</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul>
        {clients.map(client => (
          <li key={client._id} className="mb-2">
            {client.name} - {client.email}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Add New Client</h3>
        <input
          type="text"
          placeholder="Name"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newClient.email}
          onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={addClient} className="bg-blue-500 text-white px-4 py-2 rounded">Add Client</button>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul>
        {appointments.map(appointment => (
          <li key={appointment._id} className="mb-2">
            {appointment.client.name} - {appointment.service.name} - {new Date(appointment.date).toLocaleString()}
            <button onClick={() => setSelectedAppointment(appointment)} className="ml-2 text-blue-500">View Details</button>
          </li>
        ))}
      </ul>
      {selectedAppointment && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="text-xl font-bold mb-2">Appointment Details</h3>
          <p><strong>Client:</strong> {selectedAppointment.client.name}</p>
          <p><strong>Service:</strong> {selectedAppointment.service.name}</p>
          <p><strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleString()}</p>
          <p><strong>Duration:</strong> {selectedAppointment.duration} minutes</p>
          <p><strong>Status:</strong> {selectedAppointment.status}</p>
          <button onClick={() => setSelectedAppointment(null)} className="mt-2 bg-gray-300 px-4 py-2 rounded">Close</button>
        </div>
      )}
    </div>
  );

  const renderServices = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Services</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul>
        {services.map(service => (
          <li key={service._id} className="mb-2">
            {service.name} - ${service.price}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Add New Service</h3>
        <input
          type="text"
          placeholder="Service Name"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={addService} className="bg-blue-500 text-white px-4 py-2 rounded">Add Service</button>
      </div>
    </div>
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="flex mb-4">
        <button onClick={() => setActiveTab('clients')} className={`mr-4 ${activeTab === 'clients' ? 'font-bold' : ''}`}>Clients</button>
        <button onClick={() => setActiveTab('appointments')} className={`mr-4 ${activeTab === 'appointments' ? 'font-bold' : ''}`}>Appointments</button>
        <button onClick={() => setActiveTab('services')} className={`mr-4 ${activeTab === 'services' ? 'font-bold' : ''}`}>Services</button>
      </div>
      {activeTab === 'clients' && renderClients()}
      {activeTab === 'appointments' && renderAppointments()}
      {activeTab === 'services' && renderServices()}
    </div>
  );
};

export default AdminPanel;
