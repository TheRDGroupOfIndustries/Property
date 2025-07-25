import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        {/* Main heading */}
        <div className="text-center mb-5">
          <img src="footer.jpg" alt="" className='img-fluid w-100 h-25' style={{position:'relative'}}/>
          {/* <h2 className="display-5 fw-bold">Together Let's Reimagine the Real Estate Industry.</h2> */}
          {/* <h3 className="mt-4 mb-4">Contact Us</h3> */}
          {/* <div className="border-top border-light w-25 mx-auto pt-3"></div> */}
        </div>

        <Row className="g-4" style={{position:''}}>
          {/* EstateVibe description column */}
          <Col md={4}>
            <h4 className="mb-4 fw-bold"><em>EstateVibe</em></h4>
            <p className="mb-4">
              At Visionary Estates, we provide top-tier real estate services to meet all your property needs. 
              Whether you're buying or selling.
            </p>
            <div className="social-icons d-flex gap-3">
              <a href="#!" className="text-white fs-4"><FaInstagram /></a>
              <a href="#!" className="text-white fs-4"><FaFacebook /></a>
              <a href="#!" className="text-white fs-4"><FaTwitter /></a>
              <a href="#!" className="text-white fs-4"><FaLinkedin /></a>
            </div>
          </Col>

          {/* Company links column */}
          <Col md={2}>
            <h6 className="mb-3 fw-bold">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li className="mb-2"><a href="#!" className="text-white text-decoration-none">Services</a></li>
              <li className="mb-2"><a href="#!" className="text-white text-decoration-none">About Us</a></li>
              <li className="mb-2"><a href="#!" className="text-white text-decoration-none">Contacts</a></li>
            </ul>
          </Col>

          {/* Services links column */}
          <Col md={3}>
            <h6 className="mb-3 fw-bold">Service</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#!" className="text-white text-decoration-none">Residential leasing</a></li>
              <li className="mb-2"><a href="#!" className="text-white text-decoration-none">Commercial leasing</a></li>
              <li className="mb-2"><a href="#!" className="text-white text-decoration-none">Property management</a></li>
              <li className="mb-2"><a href="#!" className="text-white text-decoration-none">Tenant representation</a></li>
            </ul>
          </Col>

          {/* Address/Info links column */}
          <Col md={3}>
            <h6 className="mb-3 fw-bold">Address</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#!" className="text-white text-decoration-none">FAQ</a></li>
              <li className="mb-2"><a href="#!" className="text-white text-decoration-none">Privacy Policy</a></li>
              <li className="mb-2"><a href="#!" className="text-white text-decoration-none">Terms & Conditions</a></li>
            </ul>
          </Col>
        </Row>

        {/* Copyright section */}
        <div className="border-top border-light mt-5 pt-3">
          <p className="text-center mb-0">
            © Copyright 2024. All Rights Reserved by 2024 SomiT®
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;