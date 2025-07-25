import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PropertyCard from './PropertyCard';
import { getProperties } from '../services/propertyService';
import { useNavigate } from 'react-router-dom';

const PropertySection = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      const allProperties = await getProperties();
      setProperties(allProperties.slice(0, 6));
    };
    fetchProperties();
  }, []);

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <small className="text-muted">Explore Listings</small>
        <h2>Exclusive properties</h2>
      </div>
      <Row xs={1} sm={2} md={3} className="g-4">
        {properties.map(p => (
          <Col key={p._id}>
            <PropertyCard property={p} />
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Button variant="dark" onClick={() => navigate('/properties')}>
          View All Properties
        </Button>
      </div>
    </Container>
  );
};

export default PropertySection;