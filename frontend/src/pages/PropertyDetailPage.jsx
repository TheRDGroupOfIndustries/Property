import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api';

function PropertyDetailPage() {
  const { id } = useParams();
  const [submitting, setSubmitting] = useState(false); //new
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

  

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/properties/${id}`);
      if (!response.status !== 200) {
        throw new Error('Failed to fetch property');
      }
      setProperty(response);
    } catch (error) {
      console.error('Error fetching property:', error);
      setErrorMsg('Failed to load property. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {

    fetchProperty();
  }, [id]);

  

//   React.useEffect(() => {
//   const fetchProperties = async () => {
//   try {
//     const {response} = await get(`http://localhost:5000/api/properties/${id}`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json(); 
//     setProperty(data);
//   } catch (error) {
//     console.error('Failed to fetch properties:', error);
//   }
// };

//   fetchProperties();
// }, [id]);

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

    const inquiryData = {
      propertyId: property._id,
      fullName: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      preferredContactMethod: form.preferredContactMethod,
    };

    // Validate required fields
  //   if (
  //     !inquiryData.propertyId ||
  //     !inquiryData.fullName ||
  //     !inquiryData.email ||
  //     !inquiryData.message ||
  //     !['Email', 'Phone'].includes(inquiryData.preferredContactMethod)
  //   ) {
  //     setErrorMsg('Please fill all required fields correctly.');
  //     return;
  //   }

  //   try {
  //     const res = await axios.post('/api/inquiries', inquiryData);
  //     if (res.status === 201) {
  //       setMsg('Inquiry submitted successfully.');
  //       setForm({
  //         name: '',
  //         email: '',
  //         phone: '',
  //         message: '',
  //         preferredContactMethod: 'Email',
  //       });
  //     } else {
  //       setErrorMsg(res.data?.message || 'Failed to submit inquiry.');
  //     }
  //   } catch (err) {
  //     console.error('Submit inquiry error:', err);
  //     setErrorMsg(err.response?.data?.message || 'Error submitting inquiry.');
  //   }
  // };

  try {
      const inquiryData = {
        propertyId: id,
        fullName: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        preferredContactMethod: form.preferredContactMethod
      };

      const response = await axios.post('/api/inquiries', inquiryData);

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
  
  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!property) return <p className="text-center mt-5">{errorMsg || 'Property not found'}</p>;

  return (
    <section className="container py-5">
      <div className="row g-5">
        <div className="col-md-8">
          <img
            src={property.images?.length > 0 ? property.images[0] : '/default-image.jpg'}
            alt={property.title || 'Property'}
            className="img-fluid rounded mb-4"
          />
          <h2>{property.title || 'Untitled Property'}</h2>
          <p>{property.description || 'No description available.'}</p>
          <p>
            <strong>Location:</strong>{' '}
            {property.location?.address || 'N/A'},{' '}
            {property.location?.city || 'N/A'},{' '}
            {property.location?.country || 'N/A'}
          </p>
          <p>
            <strong>Price:</strong>{' '}
            {typeof property.price === 'number' ? `$${property.price.toLocaleString()}` : 'N/A'}
          </p>
          <ul
            style={{ listStyleType: 'none', paddingLeft: 0, color: '#333', fontSize: '1rem' }}
          >
            <li>
              <strong>Type:</strong> {property.propertyType || 'N/A'}
            </li>
            <li>
              <strong>Square Footage:</strong> {property.squareFootage || 'N/A'} sq ft
            </li>
            <li>
              <strong>Bedrooms:</strong> {property.bedrooms || 'N/A'}
            </li>
            <li>
              <strong>Bathrooms:</strong> {property.bathrooms || 'N/A'}
            </li>
          </ul>
          <button
            onClick={() => alert(`Request to rent ${property.title || 'this property'}`)}
            className="btn btn-success mt-3"
          >
            Rent
          </button>
        </div>
        <div className="col-md-4">
          <h4>Send Inquiry</h4>
          {msg && <div className="alert alert-success">{msg}</div>}
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          <form onSubmit={handleInquirySubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name *
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
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email *
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
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="Optional"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="preferredContactMethod" className="form-label">
                Preferred Contact Method *
              </label>
              <select
                id="preferredContactMethod"
                name="preferredContactMethod"
                value={form.preferredContactMethod}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                required
                className="form-control"
                placeholder="Your message or inquiry"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
      
    </section>

  );
}

export default PropertyDetailPage;