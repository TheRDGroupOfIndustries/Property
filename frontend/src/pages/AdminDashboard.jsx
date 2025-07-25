import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getProperties } from '../services/propertyService';


const AdminDashboard = () => {
  const { token, admin } = useContext(AuthContext);
  const navigate = useNavigate();
const [properties, setProperties] = useState([]);
  const [metrics, setMetrics] = useState({ totalListings: 0, totalInquiries: 0 });
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`/api/properties/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }).then((res)=>console.log(res))
        // setProperties(properties.filter(p => p._id !== id));
      } catch (err) {
        alert('Failed to delete property');
      }
    }
  };

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }

    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const res = await api.get('/admin/metrics', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMetrics(res.data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [admin, token, navigate]);

  if (!admin) return null;

  return (
    <div style={{ display: 'flex'  }}>
      <AdminSidebar />
      <div style={{ display: 'flex' , flexWrap:'wrap' , marginLeft: '280px', paddingTop: '1rem' }}>
      <Container style={{paddingTop: '1rem'  }}>
        <h2 className="mb-4">Dashboard</h2>
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <Row>
            <Col md={6}>
              <Card border="primary" className="mb-3">
                <Card.Body>
                  <Card.Title>Total Listings</Card.Title>
                  <Card.Text style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                    {metrics.totalListings}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card border="success" className="mb-3">
                <Card.Body>
                  <Card.Title>Total Inquiries</Card.Title>
                  <Card.Text style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                    {metrics.totalInquiries}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

       <table style={{ width: '100%', borderCollapse: 'collapse'  }}>
        <thead style={{ backgroundColor: '#f3f3f3' }}>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Title</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>City</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Price</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(properties) ? (
        properties.map((property) => (
            <tr key={property._id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{property.title}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{property.location.city}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>${property.price.toLocaleString()}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button 
                  onClick={() => navigate(`/properties/edit/${property._id}`)} 
                  style={{ marginRight: 10, padding: '5px 10px', cursor: 'pointer' }}
                >
                  Edit
                </button>
                
                <button 
                  onClick={() => handleDelete(property._id)} 
                  style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#e74c3c', color: '#fff', border: 'none' }}
                >
                  Delete
                </button>
              </td>
            </tr>
         ))
        ) : (
  <tr>
    <td colSpan={4} style={{ padding: '10px', textAlign: 'center' }}>
      No properties found
    </td>
  </tr>
        )}

          {properties.length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: '10px', textAlign: 'center' }}>No properties found</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AdminDashboard;