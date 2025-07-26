import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getProperties } from '../services/propertyService';

const AdminDashboard = () => {
  const { token, admin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [metrics, setMetrics] = useState({ totalListings: 0, totalInquiries: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch all properties and metrics
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const allProps = await getProperties();
      setProperties(allProps);
    } catch (err) {
      console.error('Failed to fetch properties', err);
    }
    setLoading(false);
  };

  const fetchMetrics = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await api.get('/admin/metrics', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMetrics(res.data);
    } catch (err) {
      console.error('Failed to fetch metrics', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchProperties();
    fetchMetrics();
  }, [admin, token, navigate]);

  // Delete property handler
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await api.delete(`/properties/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProperties(properties.filter(p => p._id !== id));
        alert('Property deleted successfully');
      } catch (err) {
        console.error(err);
        alert('Failed to delete property');
      }
    }
  };

  if (!admin) return null;

  return (
   <div className="admin-dashboard-container">
      <AdminSidebar />
      <div className="admin-main-content">
        <Container>
          <h2 className="dashboard-header">Admin Dashboard</h2>
          
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              <Row className="metrics-container">
                <Col md={6} className="mb-3">
                  <Card className="metric-card primary">
                    <Card.Body>
                      <Card.Title className="metric-card-title">Total Listings</Card.Title>
                      <Card.Text className="metric-card-value">
                        {metrics.totalListings}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} className="mb-3">
                  <Card className="metric-card success">
                    <Card.Body>
                      <Card.Title className="metric-card-title">Total Inquiries</Card.Title>
                      <Card.Text className="metric-card-value">
                        {metrics.totalInquiries}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <div className="table-responsive">
                <table className="properties-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>City</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(properties) && properties.length > 0 ? (
                      properties.map((property) => (
                        <tr key={property._id}>
                          <td>{property.title}</td>
                          <td>{property.location.city}</td>
                          <td>₹{property.price.toLocaleString()}</td>
                          <td>
                            <button
                              onClick={() => navigate(`/admin/add-property/${property._id}`)}
                              className="action-btn edit-btn w-25"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(property._id)}
                              className="action-btn delete-btn w-25"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="no-properties">
                          No properties found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

export default AdminDashboard;