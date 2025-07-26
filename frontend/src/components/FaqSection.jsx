import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';

const faqs = [
  {
    question: "What types of properties do you list?",
    answer: "We offer residential, commercial, and luxury properties, including apartments, villas, offices, and retail spaces."
  },
  {
    question: "How can I schedule a property viewing?",
    answer: "Contact us via phone or website to book an appointment, and our agents will arrange a convenient time for you."
  },
  {
    question: "What financing options are available?",
    answer: "We assist with bank loans, mortgage plans, and flexible payment schemes to suit your budget."
  },
  {
    question: "Are there any hidden fees when buying a property?",
    answer: "All costs are transparent—our team provides a full breakdown of taxes, registration, and service charges upfront."
  },
  {
    question: "Do you offer rental property management services?",
    answer: "Yes, we handle tenant screening, maintenance, and rent collection for hassle-free landlord experiences."
  }
];

const FaqSection = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col md={6} className="mb-4">
          <small className="text-muted">FAQ</small>
          <h2>Frequently Asked Questions</h2>
          <img src="/faq-img.jpeg" alt="FAQ" className="img-fluid rounded shadow-sm mt-2 w-50 h-75" />
        </Col>
        <Col md={6} className='mt-4'>
          <Accordion defaultActiveKey="0" flush>
            {faqs.map((faq, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={idx}>
                <Accordion.Header>{faq.question}</Accordion.Header>
                <Accordion.Body>
                  {faq.answer}
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