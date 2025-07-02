import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const createBooking = (bookingData) =>
  API.post('/bookings', bookingData).then(res => res.data);
export const updateUser = (userId, data) => API.patch(`/users/${userId}`, data).then(res => res.data);

export const fetchBookings = (userId) =>
  API.get(`/bookings?userId=${userId}`).then(res => res.data);

export const uploadPhoto = async (file, userId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId); 

  const response = await fetch('/api/upload/profile-photo', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Upload failed');

  return data.user; 
};


