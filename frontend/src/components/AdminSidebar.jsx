import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';


const AdminSidebar = () => {
  const location = useLocation();

  return (
     <Nav className="flex-column admin-sidebar vh-100 p-3" style={{ width: '220px', position: 'fixed' }}>
      <Nav.Item className="mb-4">
        <div className="admin-logo fw-bold fs-4 text-black">Admin Panel</div>
      </Nav.Item>

      <Nav.Item className="mb-2">
        <Nav.Link 
          as={Link} 
          to="/admin/dashboard" 
          className={`sidebar-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
        >
          <i className="bi bi-speedometer2 me-2"></i>
          Dashboard
        </Nav.Link>
      </Nav.Item>
      
      <Nav.Item className="mb-2">
        <Nav.Link 
          as={Link} 
          to="/admin/add-property" 
          className={`sidebar-link ${location.pathname === '/admin/add-property' ? 'active' : ''}`}
        >
          <i className="bi bi-house-add me-2"></i>
          Add Property
        </Nav.Link>
      </Nav.Item>
      
      <Nav.Item className="mb-2">
        <Nav.Link 
          as={Link} 
          to="/admin/inquiries" 
          className={`sidebar-link ${location.pathname === '/admin/inquiries' ? 'active' : ''}`}
        >
          <i className="bi bi-question-circle me-2"></i>
          Inquiry Information
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default AdminSidebar;