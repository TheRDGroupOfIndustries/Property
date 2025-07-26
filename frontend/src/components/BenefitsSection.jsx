import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const benefits = [
  {
    icon: 'bi bi-arrow-repeat', title: 'Fitness Centers',
    desc: 'Stay fit with state-of-the-art gyms & wellness zones. Premium equipment, yoga studios & personalized training sessions.',
  },
  {
    icon: 'bi bi-egg-fried', title: 'Modern Gourmet Kitchens',
    desc: 'Sleek, high-end kitchens for culinary enthusiasts.Smart appliances, spacious islands & elegant finishes.',
  },
  {
    icon: 'bi bi-emoji-smile', title: 'Luxurious Spa Facilities',
    desc: 'Rejuvenate in serene spa retreats with premium treatments. Steam rooms, saunas & relaxation lounges for ultimate comfort.',
  },
  {
    icon: 'bi bi-people', title: 'Community Social Spaces',
    desc: 'Vibrant hubs for networking & leisure activities. Co-working lounges, game rooms & event-ready spaces.',
  },
  {
    icon: 'bi bi-wifi', title: 'Home Automation',
    desc: 'Smart living with cutting-edge automated controls.Voice commands, security systems & energy-efficient tech',
  },
  {
    icon: 'bi bi-house-door', title: 'Convenient Parking',
    desc: 'Secure, hassle-free parking with ample space. EV charging stations & valet services for added ease.',
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