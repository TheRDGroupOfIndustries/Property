import React, { useState } from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';

const faqs = [
  "Can I try CapitalCrest before using to a plan?",
  "How does the real-time inventory tracking work?",
  "How does the real-time inventory tracking work?",
  "How does the real-time inventory tracking work?",
  "How does the real-time inventory tracking work?"
];

const FaqSection = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col md={6} className="mb-4">
          <small className="text-muted">FAQ</small>
          <h2>Frequently Asked Question</h2>
          <img src="/faq-img.jpeg" alt="FAQ" className="img-fluid rounded shadow-sm mt-2 w-50 h-75" />
        </Col>
        <Col md={6}>
          <Accordion defaultActiveKey="0" flush>
            {faqs.map((q, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={idx}>
                <Accordion.Header>{q}</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                </Accordion.Body>
                 
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>

  );
};

export default FaqSection;