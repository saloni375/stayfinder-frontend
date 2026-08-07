import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// Attach the JWT token (if present) to every outgoing request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) =>
  API.post('/auth/register', data).then(res => res.data);

export const loginUser = (data) =>
  API.post('/auth/login', data).then(res => res.data);

export const loginWithGoogle = (credential) =>
  API.post('/auth/google', { credential }).then(res => res.data);

export const createBooking = (bookingData) =>
  API.post('/bookings', bookingData).then(res => res.data);
export const updateUser = (userId, data) => API.patch(`/users/${userId}`, data).then(res => res.data);

export const fetchBookings = () =>
  API.get('/bookings').then(res => res.data);

export const uploadPhoto = async (file, userId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId);

 const response = await fetch(`${process.env.REACT_APP_API_URL}/upload/profile-photo`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Upload failed');

  return data;
};

export const removePhoto = (userId) =>
  API.delete(`/upload/profile-photo/${userId}`).then(res => res.data);