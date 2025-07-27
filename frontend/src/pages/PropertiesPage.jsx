import React, { useEffect, useState } from 'react';
import { Spinner, Form } from 'react-bootstrap';
import { getProperties } from '../services/propertyService';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    location: ''
  });

  useEffect(() => {
    const fetchAllProperties = async () => {
      setLoading(true);
      try {
        const allProps = await getProperties();
        setProperties(allProps);
        setFilteredProperties(allProps);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProperties();
  }, []);

  useEffect(() => {
    const filtered = properties.filter(property => {
      return (
        (filters.type === '' || property.propertyType.toLowerCase().includes(filters.type.toLowerCase())) &&
        (filters.location === '' || 
          property.location.city.toLowerCase().includes(filters.location.toLowerCase()) || 
          property.location.country.toLowerCase().includes(filters.location.toLowerCase())) &&
        (filters.minPrice === '' || property.price >= Number(filters.minPrice)) &&
        (filters.maxPrice === '' || property.price <= Number(filters.maxPrice))
      );
    });
    setFilteredProperties(filtered);
  }, [filters, properties]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return (
    <div className="loading-spinner">
      <Spinner animation="border" />
    </div>
  );
  

  return (
   <div>
     <div className="properties-container">
      <div className="properties-header">
        <h2 className="properties-title">Properties</h2>
            <div className="filter-section">
  <div className="filter-group">
    <Form.Select 
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="filter-control"
          >
            <option value="">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="commercial">Commercial</option>
             <option value="studio">Studio</option>
            <option value="ther">Other</option>
          </Form.Select>
    <label className="filter-label">Property Type</label>
  </div>

  <div className="filter-group">
    <Form.Control
      type="number"
      name="minPrice"
      placeholder=" "
      value={filters.minPrice}
      onChange={handleFilterChange}
      className="filter-control"
    />
    <label className="filter-label">Min Price (₹)</label>
  </div>

  <div className="filter-group">
    <Form.Control
      type="number"
      name="maxPrice"
      placeholder=" "
      value={filters.maxPrice}
      onChange={handleFilterChange}
      className="filter-control"
    />
    <label className="filter-label">Max Price (₹)</label>
  </div>

  <div className="filter-group">
    <Form.Control
      type="text"
      name="location"
      placeholder=" "
      value={filters.location}
      onChange={handleFilterChange}
      className="filter-control"
    />
    <label className="filter-label">Location</label>
  </div>
</div>

      </div>

      <div className="properties-grid">
        {filteredProperties.length > 0 ? (
          filteredProperties.map(property => (
            <div key={property._id} className="property-card">
              <img 
                src={property.images?.[0] || 'https://via.placeholder.com/300x200'} 
                alt={property.title} 
                className="property-image"
              />
              <div className="property-details">
                <div className='property-type'>{property.propertyType} </div>
                <h3 className="property-title text-capitalize">{property.title}</h3>
                <h4 className="property-location">
                  {property.location.city}, {property.location.country}
                </h4>
                <p className="property-price">
                  ₹{property.price.toLocaleString()}
                  {property.propertyType.toLowerCase().includes('rent') && '/mo'}
                </p>
                <Link 
                  to={`/api/properties/${property._id}`} 
                  className="property-btn"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="no-properties">
            <p>No properties match your filters.</p>
          </div>
        )}
      </div>
      <br />
    
    </div>
    <Footer/>
   </div>
  );
};

export default PropertiesPage;