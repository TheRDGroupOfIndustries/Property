import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import AdminSidebar from '../components/AdminSidebar';
import { AuthContext } from '../context/AuthContext';
import { addProperty, updateProperty, getPropertyById } from '../services/propertyService'; // add getPropertyById service
import { useNavigate, useParams } from 'react-router-dom';

const AddEditPropertyPage = () => {
  const { token, admin } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams(); // property id for editing

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: { address: '', city: '', country: '' },
    price: '',
    propertyType: 'Apartment',
    squareFootage: '',
    bedrooms: '',
    bathrooms: '',
    images: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingProperty, setLoadingProperty] = useState(false);

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    if (id) {
      // Fetch property data to prefill for editing
      setLoadingProperty(true);
      getPropertyById(id)
        .then((property) => {
          setFormData({
            title: property.title || '',
            description: property.description || '',
            location: {
              address: property.location?.address || '',
              city: property.location?.city || '',
              country: property.location?.country || '',
            },
            price: property.price?.toString() || '',
            propertyType: property.propertyType || 'Apartment',
            squareFootage: property.squareFootage?.toString() || '',
            bedrooms: property.bedrooms?.toString() || '',
            bathrooms: property.bathrooms?.toString() || '',
            images: (property.images && property.images.join(', ')) || '',
          });
        })
        .catch((err) => {
          console.error('Failed to load property', err);
          alert('Failed to load property data');
          navigate('/admin/dashboard');
        })
        .finally(() => setLoadingProperty(false));
    }
  }, [id, admin, navigate]);

  if (!admin) {
    return null;
  }

  const handleChange = e => {
    const { name, value } = e.target;
    if (['address', 'city', 'country'].includes(name)) {
      setFormData(prev => ({ ...prev, location: { ...prev.location, [name]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let imagesArr = [];
    if (formData.images.trim()) {
      imagesArr = formData.images.split(',').map(s => s.trim());
    }

    const dataToSend = {
      ...formData,
      price: Number(formData.price),
      squareFootage: formData.squareFootage ? Number(formData.squareFootage) : null,
      bedrooms: formData.bedrooms ? Number(formData.bedrooms) : null,
      bathrooms: formData.bathrooms ? Number(formData.bathrooms) : null,
      images: imagesArr,
    };

    try {
      if (id) {
        // Update case
        await updateProperty(id, dataToSend, token);
        alert('Property updated successfully');
      } else {
        // Add case
        await addProperty(dataToSend, token);
        alert('Property added successfully');
      }
      navigate('/admin/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save property';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (loadingProperty) {
    return (
      <div style={{ display: 'flex' }}>
        <AdminSidebar />
        <Container style={{ marginLeft: '220px', paddingTop: '3rem', maxWidth: '700px' }}>
          <Spinner animation="border" />
        </Container>
      </div>
    );
  }

  return (
     <div className="property-form-container">
      <AdminSidebar />
      <Container className="property-form-main">
        <h2 className="property-form-header">
          {id ? 'Edit Property' : 'Add New Property'}
        </h2>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit} className="property-form-card">
          <Form.Group className="mb-3">
            <Form.Label className="form-label required-field">Title</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="form-label required-field">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label required-field">Address</Form.Label>
                <Form.Control
                  name="address"
                  value={formData.location.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label required-field">City</Form.Label>
                <Form.Control
                  name="city"
                  value={formData.location.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label required-field">Country</Form.Label>
                <Form.Control
                  name="country"
                  value={formData.location.country}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="form-label required-field">Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="form-label required-field">Property Type</Form.Label>
            <Form.Select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
            >
              <option>Apartment</option>
              <option>Villa</option>
              <option>Commercial</option>
              <option>Studio</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Square Footage</Form.Label>
                <Form.Control
                  type="number"
                  name="squareFootage"
                  value={formData.squareFootage}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Bedrooms</Form.Label>
                <Form.Control
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Bathrooms</Form.Label>
                <Form.Control
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="form-label">Images URLs</Form.Label>
            <Form.Control
              placeholder="https://image1.jpg, https://image2.jpg"
              name="images"
              value={formData.images}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              Enter comma-separated image URLs
            </Form.Text>
          </Form.Group>

          <Button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  className="me-2"
                />
                {id ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              id ? 'Update Property' : 'Add Property'
            )}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddEditPropertyPage;