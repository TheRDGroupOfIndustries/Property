import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spinner, Alert } from 'react-bootstrap';
import { getPropertyById } from '../services/propertyService';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaHome, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import Footer from '../components/Footer'

function PropertyDetailPage() {
  const { id } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredContactMethod: 'Email',
  });

  const fetchProperty = async (id) => {
    try {
      setLoading(true);
      const response = await getPropertyById(id);
      setProperty(response);
    } catch (error) {
      console.error('Error fetching property:', error);
      setErrorMsg('Failed to load property. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setMsg('');
    setErrorMsg('');
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg('');
    setErrorMsg('');

    if (!property?._id) {
      setErrorMsg('Property data not available.');
      return;
    }

    if (!form.name || !form.email || !form.message) {
      setErrorMsg('Please fill all required fields');
      setSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrorMsg('Please enter a valid email address');
      setSubmitting(false);
      return;
    }

    try {
      const inquiryData = {
        propertyId: id,
        fullName: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        preferredContactMethod: form.preferredContactMethod
      };

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/inquiries`, inquiryData);
      
      if (response.status === 201) {
        setMsg('Your inquiry has been submitted successfully!');
        setForm({
          name: '',
          email: '',
          phone: '',
          message: '',
          preferredContactMethod: 'Email'
        });
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setErrorMsg(error.response?.data?.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) return (
    <div className="text-center my-5">
      <Spinner animation="border" />
    </div>
  );

  if (!property) return (
    <div className="text-center my-5">
      <Alert variant="danger">{errorMsg || 'Property not found'}</Alert>
    </div>
  );

  return (
    <div>
      <div className="container property-detail-container">
        <div className="property-header-section">
          <h1 className="property-title text-capitalize">{property.title || 'Untitled Property'}</h1>
          <div className="property-location">
            <i><FaMapMarkerAlt /></i>
            {property.location?.address && `${property.location.address}, `}
            {property.location?.city && `${property.location.city}, `}
            {property.location?.country || 'Location not specified'}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div className="property-image-container">
              <img
                src={property.images?.length > 0 ? property.images[0] : '/default-image.jpg'}
                alt={property.title || 'Property'}
                className="main-image"
              />
              
              {property.images?.length > 1 && (
                <div className="thumbnail-container">
                  {property.images.slice(1).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${property.title} - ${index + 1}`}
                      className="thumbnail"
                      onClick={() => window.open(img, '_blank')}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="property-details-section">
              <div className="price-highlight">
                {typeof property.price === 'number' ? 
                  `₹${property.price.toLocaleString()}${property.propertyType?.toLowerCase().includes('rent') ? '/month' : ''}` : 
                  'Price not available'}
              </div>

              <div className="detail-item">
                <span className="detail-label">Property Type</span>
                <span className="detail-value">{property.propertyType || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Bedrooms</span>
                <span className="detail-value">
                  <i><FaBed /></i> {property.bedrooms || 'N/A'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Bathrooms</span>
                <span className="detail-value">
                  <i><FaBath /></i> {property.bathrooms || 'N/A'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Square Footage</span>
                <span className="detail-value">
                  <i><FaRulerCombined /></i> {property.squareFootage || 'N/A'} sq ft
                </span>
              </div>
            </div>

            <div className="property-description">
              <h4>Description</h4>
              <p>{property.description || 'No description available.'}</p>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div className="amenities-section">
                <h4>Amenities</h4>
                <div className="amenities-grid">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <i><FaHome /></i>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          
          </div>

          <div className="col-lg-4">
            <div className="inquiry-form-container">
              <h4 className="inquiry-form-title">Contact Agent</h4>
              {msg && <Alert variant="success">{msg}</Alert>}
              {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
              
              <form onSubmit={handleInquirySubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <i><FaUser /></i> Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <i><FaEnvelope /></i> Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <i><FaPhone /></i> Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="(123) 456-7890"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    required
                    className="form-control"
                    placeholder="I'm interested in this property..."
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PropertyDetailPage;