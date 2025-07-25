import React, { useContext, useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { 
  Container, 
  Table, 
  Spinner, 
  Alert, 
  Button,
  Modal
} from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { getInquiries, deleteInquiry } from '../services/inquiryService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrash, FaEye } from 'react-icons/fa';

const InquiryInfoPage = () => {
  const { token, admin } = useContext(AuthContext);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentInquiry, setCurrentInquiry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchInquiries();
  }, [token, admin, navigate]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await getInquiries(token);
      setInquiries(data);
      setError('');
    } catch (err) {
      setError('Failed to load inquiries');
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteInquiry(id, token);
      setInquiries(inquiries.filter(inq => inq._id !== id));
      toast.success('Inquiry deleted successfully');
    } catch (err) {
      console.error('Error deleting inquiry:', err);
      toast.error('Failed to delete inquiry');
    } finally {
      setDeletingId(null);
    }
  };

  const handleViewDetails = (inquiry) => {
    setCurrentInquiry(inquiry);
    setShowModal(true);
  };

  if (!admin) return null;

  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <Container style={{ marginLeft: '220px', paddingTop: '3rem' }}>
        <h2 className="mb-4">User Inquiries</h2>
        
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Property</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Preferred Contact</th>
                <th>Sent At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">
                    No inquiries found
                  </td>
                </tr>
              ) : (
                inquiries.map((inq, idx) => (
                  <tr key={inq._id}>
                    <td>{idx + 1}</td>
                    <td>{inq.property?.title || 'N/A'}</td>
                    <td>{inq.fullName}</td>
                    <td>{inq.email}</td>
                    <td>{inq.phone || '-'}</td>
                    <td>{inq.message}</td>
                    <td>{inq.preferredContactMethod}</td>
                    <td>{new Date(inq.createdAt).toLocaleString()}</td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleViewDetails(inq)}
                      >
                        <FaEye />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(inq._id)}
                        disabled={deletingId === inq._id}
                      >
                        {deletingId === inq._id ? (
                          <Spinner as="span" animation="border" size="sm" />
                        ) : (
                          <FaTrash />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}

        {/* Inquiry Details Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Inquiry Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentInquiry && (
              <div>
                <div className="mb-3">
                  <h5>Property Information</h5>
                  <p><strong>Title:</strong> {currentInquiry.property?.title || 'N/A'}</p>
                  <p><strong>Location:</strong> {currentInquiry.property?.location?.address || 'N/A'}, {currentInquiry.property?.location?.city || 'N/A'}</p>
                </div>
                <div className="mb-3">
                  <h5>Contact Information</h5>
                  <p><strong>Name:</strong> {currentInquiry.fullName}</p>
                  <p><strong>Email:</strong> {currentInquiry.email}</p>
                  <p><strong>Phone:</strong> {currentInquiry.phone || '-'}</p>
                  <p><strong>Preferred Contact:</strong> {currentInquiry.preferredContactMethod}</p>
                </div>
                <div className="mb-3">
                  <h5>Message</h5>
                  <div className="p-3 bg-light rounded">
                    {currentInquiry.message}
                  </div>
                </div>
                <div>
                  <p><strong>Submitted:</strong> {new Date(currentInquiry.createdAt).toLocaleString()}</p>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default InquiryInfoPage;