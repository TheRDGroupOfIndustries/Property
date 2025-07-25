import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const {
    _id,
    title,
    price,
    images,
    propertyType,
    bedrooms,
    bathrooms,
    squareFootage,
    location,
  } = property;

  const priceDisplay = propertyType.toLowerCase().includes('rent') ? (
    `$${price}/mo`
  ) : (
    `$${price.toLocaleString()}`
  );

  return (
    <Card className="h-100 shadow-sm">
      <Link to={`/property/${_id}`}>
        <Card.Img
          variant="top"
          src={images[0] || 'https://via.placeholder.com/400x200?text=No+Image'}
          alt={title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </Link>
      <Card.Body>
        <Badge bg="secondary" className="mb-2">{propertyType}</Badge>
        <Card.Title style={{ fontWeight: '600' }}>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-primary">{priceDisplay}</Card.Subtitle>
        <div style={{ fontSize: '0.85rem', color: '#555' }}>
          <span>{squareFootage ? `${squareFootage} sq. ft.` : 'N/A'}</span> &nbsp;|&nbsp;
          <span>{bedrooms ? bedrooms : 0} Bed</span> &nbsp;|&nbsp;
          <span>{bathrooms ? bathrooms : 0} Bath</span>
        </div>
        <div style={{ fontSize: '0.8rem', marginTop: '5px', color: '#888' }}>
          {location?.city}, {location?.country}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;