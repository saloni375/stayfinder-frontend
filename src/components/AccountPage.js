import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { fetchBookings, uploadPhoto } from '../utils/api';
import { FaHeart, FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
     document.title = 'StayFinder | Acoount';
    if (user) {
      fetchBookings().then(setBookings).catch(console.error);
      setPhotoUrl(user?.photoUrl || ''); 
    }
  }, [user]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const response = await uploadPhoto(file);
        if (response?.photoUrl) {
          setPhotoUrl(response.photoUrl);
          alert("✅ Photo uploaded successfully!");
        } else {
          alert("❌ Upload succeeded, but no photo URL returned.");
        }
      } catch (err) {
        console.error(err);
        alert("❌ Upload failed");
      }
    }
  };

  if (!user) {
    return (
      <div className="container  text-center text-danger">
        Please sign in to view your profile.
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#26264b',
        minHeight: '100vh',
        paddingTop: '10px',
        paddingBottom: '40px',
        color: '#4B0082',
      }}
    >
      <motion.div
        className="container px-3"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="card mx-auto shadow-lg border-0 px-4 py-5"
          style={{
            maxWidth: '500px',
            borderRadius: '20px',
            background: '#f9f7ff',
            color: '#4B0082',
          }}
        >
          {/* Avatar */}
          <div className="text-center mb-4">
            <label htmlFor="upload-photo" style={{ cursor: 'pointer' }}>
              {photoUrl ? (
                <img
                  src={photoUrl}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-avatar.png';
                  }}
                  alt="avatar"
                  className="rounded-circle border border-dark"
                  style={{
                    width: '110px',
                    height: '110px',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <img
                  src="/default-avatar.png"
                  alt="avatar"
                  className="rounded-circle border border-dark"
                  style={{
                    width: '110px',
                    height: '110px',
                    objectFit: 'cover',
                  }}
                />
              )}
            </label>
            <input
              type="file"
              id="upload-photo"
              style={{ display: 'none' }}
              onChange={handleUpload}
            />
            <p className="text-muted mt-2" style={{ fontSize: '13px' }}>
              Click avatar to upload
            </p>
          </div>

          <h4 className="text-center fw-bold mb-1">{user.name}</h4>
          <p className="text-center mb-4" style={{ color: '#6c757d' }}>
            {user.email}
          </p>

          <div className="list-group mb-4">
            <button
              onClick={() => navigate('/favorites')}
              className="list-group-item list-group-item-action border-0"
              style={{ backgroundColor: '#ddd4f5', color: '#4B0082' }}
            >
              <FaHeart className="me-2 text-danger" /> Your Favorites
            </button>
            <button
              onClick={() => navigate('/help')}
              className="list-group-item list-group-item-action border-0"
              style={{ backgroundColor: '#ddd4f5', color: '#4B0082' }}
            >
              <FaQuestionCircle className="me-2 text-info" /> Help & Support
            </button>
            <button
              onClick={logout}
              className="list-group-item list-group-item-action border-0"
              style={{ backgroundColor: '#f8d7da', color: '#721c24' }}
            >
              <FaSignOutAlt className="me-2" /> Logout
            </button>
          </div>

          <div className="mt-4">
            <h5 className="fw-bold mb-3">Your Bookings</h5>
            {bookings.length > 0 ? (
              bookings.map((b, i) => (
                <div
                  key={i}
                  className="p-3 mb-3 shadow-sm"
                  style={{
                    backgroundColor: '#fff',
                    borderLeft: '5px solid #4B0082',
                    borderRadius: '10px',
                    color: '#333',
                  }}
                >
                  <h6 className="fw-bold">
                    {b.type === 'stay' ? '🏨 Stay' : '🎟️ Experience'}
                  </h6>
                  <p className="mb-1">
                    <strong>Location:</strong> {b.location}
                  </p>
                  <p className="mb-1">
                    <strong>Date:</strong>{' '}
                    {new Date(b.date).toLocaleDateString()}
                  </p>
                  <p className="mb-0 text-success fw-bold">✅ Booked</p>
                </div>
              ))
            ) : (
              <p className="text-muted">No bookings found yet.</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccountPage;
