import api from './api';

export const getInquiries = async (token) => {
  const response = await api.get('/inquiries', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const postInquiries = async (token) => {
  const response = await api.post('/inquiries', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};



export const deleteInquiry = async (id, token) => {
  try {
    const response = await api.delete(`/inquiries/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete inquiry');
  }
};