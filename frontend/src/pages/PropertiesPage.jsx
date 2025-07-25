import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { getProperties } from '../services/propertyService';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProperties = async () => {
      setLoading(true);
      try {
        const allProps = await getProperties();
        setProperties(allProps);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProperties();
  }, []);

//   React.useEffect(() => {
//   const fetchProperties = async () => {
//   try {
//     const response = await fetch('http://localhost:5000/api/properties');
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json(); // Error here if not JSON
//     setProperties(data);
//   } catch (error) {
//     console.error('Failed to fetch properties:', error);
//   }
// };

//   fetchProperties();
// }, []);
 
  if (loading) return (
    <div className="text-center my-5">
      <Spinner animation="border" />
    </div>
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Properties</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {Array.isArray (properties) && properties.length > 0 ? (
           properties.map(property => (
          <div 
            key={property._id} 
            style={{ border: '1px solid #ddd', borderRadius: '8px', width: '300px', overflow: 'hidden' }}
          >
            <img 
              src={property.images?.[0] || 'https://via.placeholder.com/300x200'} 
              alt={property.title} 
              style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
            />
            <div style={{ padding: '10px' }}>
              <h3>{property.title}</h3>
              <p>{property.location.city}, {property.location.country}</p>
              <p style={{ fontWeight: 'bold' }}>${property.price.toLocaleString()}</p>
              <Link to={`/api/properties/${property._id}`}>
                <button style={{ cursor: 'pointer', padding: '8px 12px', marginTop: 10 }}>View Details</button>
              </Link>
            </div>
          </div>
        ))
      ) : (
      <p>No properties available.</p>
    )}
      </div>
    </div>
  );
};

export default PropertiesPage;