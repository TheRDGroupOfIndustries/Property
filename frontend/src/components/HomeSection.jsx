import React from 'react';
import { Container, Button } from 'react-bootstrap';
// import './HomeSection.css';

const HomeSection = () => {
  return (
    <div>
        <center>
        <div 
      className="home-section d-flex align-items-center" 
      style={{
       backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/home.webp')`,

      backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '600px',
        width : '85%',
        color: '#fff',
        borderRadius: '20px',
        marginTop: '30px'
      }}
    >
      <Container className="text-center">
        <h1 className="display-4 fw-bold">Extraordinary living begins here.</h1>
        <p className="lead">Finding unique, modern, affordable apartments to dream homes in the perfect location.</p>
      </Container>
    </div>
        </center>
    </div>
  );
};

export default HomeSection;