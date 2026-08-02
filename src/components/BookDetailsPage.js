import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  FaMapMarkerAlt, FaClock, FaStar, FaWifi, FaCar,
  FaUtensils, FaBath, FaHome, FaCalendarCheck, FaUserFriends
} from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { createBooking } from '../utils/api';
import { useAuth } from '../context/useAuth';

const BookDetailsPage = () => {
  const { type, id } = useParams();
  const { user } = useAuth();

  const [card, setCard] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    document.title = 'StayFinder | Stays-Booking';
    const fetchCard = async () => {
      try {
        const endpoint =
          type === 'stay'
            ? `${process.env.REACT_APP_API_URL}/properties/${id}`
            : `${process.env.REACT_APP_API_URL}/experiences/${id}`;
        const res = await axios.get(endpoint);
        setCard(res.data);
      } catch (err) {
        console.error('Error fetching details:', err);
      }
    };
    fetchCard();
  }, [type, id]);

  const handleConfirmBooking = async () => {
    if (!user) {
      alert('Please login to book.');
      return;
    }

    const bookingData = {
      userId: user.id,
      propertyId: card._id,
      type,
      checkIn: new Date(),
      checkOut: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      guests: 1,
    };

    try {
      await createBooking(bookingData);
      alert('🎉 Booking confirmed!');
      setIsBooked(true);
      setShowBooking(false);
    } catch (err) {
      console.error('Booking failed:', err);
      alert('❌ Booking failed');
    }
  };

  if (!card) {
    return <div className="text-center text-light pt-5 mt-5">Loading details...</div>;
  }

  return (
    <div style={{ backgroundColor: '#0B0C2A', color: 'white', minHeight: '100vh' }}>
      <div
        className="w-100"
        style={{
          height: '70vh',
          overflow: 'hidden',
          marginTop: '0px',
          borderBottomLeftRadius: '30px',
          borderBottomRightRadius: '30px',
        }}
      >
        <img
          src={card.image || 'https://via.placeholder.com/1200x600'}
          alt={card.title}
          className="w-100 h-100"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      <div className="container px-3 px-md-5 py-5">
        <div className="d-md-flex justify-content-between align-items-center">
          <h2 className="fw-bold">{card.title}</h2>
          <h4 className="text-warning mt-2 mt-md-0">
            ₹{card.price}{' '}
            <small className="text-white">{type === 'stay' ? '/ night' : '/ person'}</small>
          </h4>
        </div>

        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '15px' }}>
          {card.description || 'No description available.'}
        </p>

        <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <ul className="list-unstyled">
              <li className="mb-2">
                <FaMapMarkerAlt className="me-2 text-info" />
                <strong>Location:</strong> {card.location}
              </li>
              {type === 'experience' && (
                <li className="mb-2">
                  <FaClock className="me-2 text-primary" />
                  <strong>Duration:</strong> {card.duration}
                </li>
              )}
              <li className="mb-2">
                <FaStar className="me-2 text-success" />
                <strong>Rating:</strong> {card.rating || 'N/A'}
              </li>
              <li className="mb-2">
                <MdCancel className="me-2 text-danger" />
                <strong>Free Cancellation:</strong> Yes
              </li>
            </ul>
          </div>

          <div className="col-md-6 text-md-end">
            {!isBooked ? (
              !showBooking ? (
                <button
                  className="btn px-4 py-2 rounded-pill"
                  style={{ backgroundColor: '#4B0082', color: 'white', fontWeight: 'bold' }}
                  onClick={() => setShowBooking(true)}
                >
                  Proceed to Book
                </button>
              ) : (
                <div className="mt-4 p-4 bg-dark rounded shadow-lg text-start">
                  <h5>
                    <FaCalendarCheck className="me-2" />
                    Booking Details
                  </h5>
                  <p>Total Price: ₹{card.price}</p>
                  <p>Guests: 1 (adjustable later)</p>
                  <p>Payment Mode: Credit/Debit Card, UPI</p>
                  <button
                    className="btn btn-success mt-2 rounded-pill"
                    onClick={handleConfirmBooking}
                  >
                    Confirm & Pay
                  </button>
                </div>
              )
            ) : (
              <button
                className="btn btn-outline-danger rounded-pill mt-2"
                onClick={() => {
                  setIsBooked(false);
                  alert('Your booking has been canceled.');
                }}
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>

        <hr className="text-secondary mt-5" />
        <h5 className="mb-3">Included Amenities</h5>
        <div className="row text-light">
          <div className="col-6 col-md-4 mb-2"><FaWifi className="me-2" /> Free Wi-Fi</div>
          <div className="col-6 col-md-4 mb-2"><FaCar className="me-2" /> Parking</div>
          <div className="col-6 col-md-4 mb-2"><FaUtensils className="me-2" /> Food Included</div>
          <div className="col-6 col-md-4 mb-2"><FaBath className="me-2" /> Clean Washrooms</div>
          <div className="col-6 col-md-4 mb-2"><FaHome className="me-2" /> Comfortable Stay</div>
          <div className="col-6 col-md-4 mb-2"><FaUserFriends className="me-2" /> Group Friendly</div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
