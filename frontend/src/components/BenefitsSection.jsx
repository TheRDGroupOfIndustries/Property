import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const benefits = [
  {
    icon: 'bi bi-arrow-repeat', title: 'Fitness Centers',
    desc: 'We begin by conducting thorough market for to research to identify high-potential areas. This includes analyzing market trends.',
  },
  {
    icon: 'bi bi-egg-fried', title: 'Modern Gourmet Kitchens',
    desc: 'We begin by conducting thorough market for to research to identify high-potential areas. This includes analyzing market trends.',
  },
  {
    icon: 'bi bi-emoji-smile', title: 'Luxurious Spa Facilities',
    desc: 'We begin by conducting thorough market for to research to identify high-potential areas. This includes analyzing market trends.',
  },
  {
    icon: 'bi bi-people', title: 'Community Social Spaces',
    desc: 'We begin by conducting thorough market for to research to identify high-potential areas. This includes analyzing market trends.',
  },
  {
    icon: 'bi bi-wifi', title: 'Home Automation',
    desc: 'We begin by conducting thorough market for to research to identify high-potential areas. This includes analyzing market trends.',
  },
  {
    icon: 'bi bi-house-door', title: 'Convenient Parking',
    desc: 'We begin by conducting thorough market for to research to identify high-potential areas. This includes analyzing market trends.',
  }
];

const BenefitsSection = () => {
  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <small className="text-uppercase text-muted">PROCESS WE FOLLOW</small>
        <h2 className="fw-bold">Benefits Of Our Offerings</h2>
      </div>
      <Row xs={1} sm={2} md={3} className="g-4">
        {benefits.map((b, idx) => (
          <Col key={idx}>
            <Card className="border-0 text-center h-100 p-3">
              <div className="mb-3 text-primary" style={{fontSize: '2rem'}}>
                <i className={b.icon}></i>
              </div>
              <Card.Title>{b.title}</Card.Title>
              <Card.Text style={{fontSize: '0.9rem', color: '#555'}}>
                {b.desc}
              </Card.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BenefitsSection;