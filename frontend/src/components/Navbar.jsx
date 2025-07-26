import React, { useContext } from 'react';
import { Navbar as BsNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { admin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <BsNavbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <BsNavbar.Brand as={Link} to="/">
        <h2 style={{marginLeft: "20px"}}>Real Estate</h2>
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/properties">Properties</Nav.Link>
            {!admin ? (
              <Nav.Link as={Link} to="/admin/login">Admin Login</Nav.Link>
            ) : (
              <NavDropdown title="Admin" id="admin-nav-dropdown">
                <NavDropdown.Item as={Link} to="/admin/dashboard">Dashboard</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;