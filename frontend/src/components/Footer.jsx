import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="footer py-5">
      <Container>
      

        <Row className='g-4'>
          {/* EstateVibe description column */}
          <Col lg={4} md={6}>
            <h4 className="footer-heading"><em> Real Estate</em></h4>
            <p className="mb-4 ">
              At Visionary Estates, we provide top-tier real estate services to meet all your property needs. 
              Whether you're buying or selling.
            </p>
            <div className="social-icons">
              <a href="#!" className="social-icon text-white"><FaInstagram /></a>
              <a href="#!" className="social-icon text-white"><FaFacebook /></a>
              <a href="#!" className="social-icon text-white"><FaTwitter /></a>
              <a href="#!" className="social-icon text-white"><FaLinkedin /></a>
            </div>
          </Col>

          {/* Company links column */}
          <Col lg={2} md={6}>
            <h6 className="footer-heading">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/" className="footer-link">Home</a></li>
              <li className="mb-2"><a href="#!" className="footer-link">Services</a></li>
              <li className="mb-2"><a href="#!" className="footer-link">About Us</a></li>
              <li className="mb-2"><a href="#!" className="footer-link">Contacts</a></li>
            </ul>
          </Col>

          {/* Services links column */}
          <Col lg={3} md={6}>
            <h6 className="footer-heading">Service</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#!" className="footer-link">Residential leasing</a></li>
              <li className="mb-2"><a href="#!" className="footer-link">Commercial leasing</a></li>
              <li className="mb-2"><a href="#!" className="footer-link">Property management</a></li>
              <li className="mb-2"><a href="#!" className="footer-link">Tenant representation</a></li>
            </ul>
          </Col>

          {/* Address/Info links column */}
          <Col lg={3} md={6}>
            <h6 className="footer-heading">Information</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#!" className="footer-link">FAQ</a></li>
              <li className="mb-2"><a href="#!" className="footer-link">Privacy Policy</a></li>
              <li className="mb-2"><a href="#!" className="footer-link">Terms & Conditions</a></li>
            </ul>
          </Col>
        </Row>

        {/* Copyright section */}
        <div className="border-top border-secondary mt-5 pt-4">
          <p className="copyright text-center mb-0">
            © Copyright 2025. All Rights Reserved by <span className="text-primary">Hetvi®</span>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;