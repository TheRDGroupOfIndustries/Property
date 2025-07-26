import React, { useState, useEffect } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) {
        setIsCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <Button 
          variant="primary" 
          onClick={toggleSidebar}
          className="sidebar-toggle-btn position-fixed d-lg-none"
          style={{
            zIndex: 1050,
            top: '10px',
            left: '10px',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            padding: '0',
            // margin : '50px 0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <i className={`bi ${isCollapsed ? 'bi-list' : 'bi-x'}`} style={{ fontSize: '1.5rem' }}></i>
        </Button>
      )}

      {/* Sidebar */}
      <Nav 
        className={`flex-column admin-sidebar vh-100 p-3 ${isCollapsed && isMobile ? 'collapsed' : ''}`}
        style={{ 
          width: isCollapsed && isMobile ? '0' : isMobile ? '250px' : '220px',
          position: 'fixed',
          transition: 'all 0.3s ease',
          overflow: 'hidden'
        }}
      >
        <Nav.Item className="mb-4">
          
          <div className="admin-logo fw-bold fs-4">
            {(!isCollapsed || !isMobile) && 'Admin Panel'}
          </div>
        </Nav.Item>

        <Nav.Item className="mb-2">
          <Nav.Link 
            as={Link} 
            to="/admin/dashboard" 
            className={`sidebar-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
            onClick={() => isMobile && setIsCollapsed(false)}
          >
            <i className="bi bi-speedometer2 me-2"></i>
            {(!isCollapsed || !isMobile) && 'Dashboard'}
          </Nav.Link>
        </Nav.Item>
        
        <Nav.Item className="mb-2">
          <Nav.Link 
            as={Link} 
            to="/admin/add-property" 
            className={`sidebar-link ${location.pathname === '/admin/add-property' ? 'active' : ''}`}
            onClick={() => isMobile && setIsCollapsed(false)}
          >
            <i className="bi bi-house-add me-2"></i>
            {(!isCollapsed || !isMobile) && 'Add Property'}
          </Nav.Link>
        </Nav.Item>
        
        <Nav.Item className="mb-2">
          <Nav.Link 
            as={Link} 
            to="/admin/inquiries" 
            className={`sidebar-link ${location.pathname === '/admin/inquiries' ? 'active' : ''}`}
            onClick={() => isMobile && setIsCollapsed(false)}
          >
            <i className="bi bi-question-circle me-2"></i>
            {(!isCollapsed || !isMobile) && 'Inquiry Information'}
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Overlay for mobile */}
      {isMobile && isCollapsed && (
        <div 
          className="sidebar-overlay"
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1040,
            transition: 'all 0.3s ease'
          }}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;