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

// If the backend says our token is invalid or expired (401), log out
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRoute = error.config?.url?.startsWith('/auth/');
    const hadToken = localStorage.getItem('token');

    if (error.response?.status === 401 && !isAuthRoute && hadToken) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      alert('Your session has expired. Please sign in again.');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

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



export const cancelBooking = (bookingId) =>
  API.delete(`/bookings/${bookingId}`).then(res => res.data);

// The backend now gets the user from the JWT token, so we don't send userId
export const uploadPhoto = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${process.env.REACT_APP_API_URL}/upload/profile-photo`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Upload failed');

  return data;
};

export const removePhoto = () =>
  API.delete('/upload/profile-photo').then(res => res.data);