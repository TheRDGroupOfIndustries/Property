import api from './api.jsx';

export const getProperties = async () => {
  const response = await api.get('/properties');
  return response.data;
};

export const getPropertyById = async (id) => {
  // console.log('aaa',id)
  const response = await api.get(`/properties/${id}`);
  return response.data;
};

export const addProperty = async (property, token) => {
  const response = await api.post('/properties', property, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProperty = async (id, property, token) => {
  const response = await api.put(`/properties/${id}`, property, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};