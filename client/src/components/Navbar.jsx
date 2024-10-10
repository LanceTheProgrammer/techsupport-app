import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tech Support</h1>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
          <li><Link to="/services" className="hover:text-blue-200">Services</Link></li>
          <li><Link to="/booking" className="hover:text-blue-200">Book Now</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;