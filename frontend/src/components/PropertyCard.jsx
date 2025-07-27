import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaBed, 
  FaBath, 
  FaRulerCombined, 
  FaMapMarkerAlt,
  FaHome,
  FaBuilding,
  FaCity,
  FaHotel
} from 'react-icons/fa';

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

  const isRent = propertyType.toLowerCase().includes('rent');
  const priceDisplay = isRent ? `₹${price}/mo` : `₹${price.toLocaleString()}`;

    // Get icon based on property type
  const getPropertyIcon = () => {
    switch(propertyType.toLowerCase()) {
      case 'apartment':
        return <FaBuilding className="me-1" />;
      case 'villa':
        return <FaHome className="me-1" />;
      case 'commercial':
        return <FaCity className="me-1" />;
      case 'studio':
        return <FaHotel className="me-1" />;
      default:
        return <FaHome className="me-1" />;
    }  };
  
  return (
    <Card className="property-card h-100 shadow-hover">
      <Link to={`/property/${_id}`} className="property-image-link">
        <Card.Img
          variant="top"
          src={images[0] || 'https://via.placeholder.com/400x200?text=No+Image'}
          alt={title}
          className="property-card-img"
        />
        {/* <div className="property-image-overlay">
          <span className="view-details-text">View Details</span>
        </div> */}
      </Link>
      <Card.Body className="property-card-body">
        <Badge 
          className="property-badge"
        >
          {getPropertyIcon()}
          {propertyType}
        </Badge>
        <Card.Title className="property-title text-capitalize">{title}</Card.Title>
        <Card.Subtitle className={`property-price ${isRent ? 'rent' : 'sale'}`}>
          {priceDisplay}
        </Card.Subtitle>
        <div className="property-details">
          <span className="detail-item">
            <FaRulerCombined className="detail-icon" />
            {squareFootage ? `${squareFootage} sq.ft` : 'N/A'}
          </span>
          <span className="detail-item">
            <FaBed className="detail-icon" />
            {bedrooms || 0} Bed
          </span>
          <span className="detail-item">
            <FaBath className="detail-icon" />
            {bathrooms || 0} Bath
          </span>
        </div>
        <div className="property-location">
          <FaMapMarkerAlt className="location-icon" />
          {location?.city}, {location?.country}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;