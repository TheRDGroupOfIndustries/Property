import React, { useContext, useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import AdminSidebar from '../components/AdminSidebar';
import { AuthContext } from '../context/AuthContext';
import { addProperty } from '../services/propertyService';
import { useNavigate } from 'react-router-dom';

const AddPropertyPage = () => {
  const { token, admin } = useContext(AuthContext);
  const navigate = useNavigate();

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

  if (!admin) {
    navigate('/admin/login');
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

    // Process images input: split by comma into array URLs
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
      await addProperty(dataToSend, token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <Container style={{ marginLeft: '220px', paddingTop: '3rem', maxWidth: '700px' }}>
        <h2 className="mb-4">Add New Property</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title *</Form.Label>
            <Form.Control name="title" value={formData.title} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description *</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required />
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Address *</Form.Label>
                <Form.Control name="address" value={formData.location.address} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>City *</Form.Label>
                <Form.Control name="city" value={formData.location.city} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Country *</Form.Label>
                <Form.Control name="country" value={formData.location.country} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Price *</Form.Label>
            <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Property Type *</Form.Label>
            <Form.Select name="propertyType" value={formData.propertyType} onChange={handleChange} required>
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
                <Form.Label>Square Footage</Form.Label>
                <Form.Control type="number" name="squareFootage" value={formData.squareFootage} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Bedrooms</Form.Label>
                <Form.Control type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Bathrooms</Form.Label>
                <Form.Control type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Images URLs (comma separated)</Form.Label>
            <Form.Control placeholder="https://image1.jpg, https://image2.jpg" name="images" value={formData.images} onChange={handleChange} />
          </Form.Group>

          <Button type="submit" variant="dark" disabled={loading}>
            {loading ? <Spinner size="sm" animation="border" /> : 'Add Property'}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddPropertyPage;