import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaMapMarkerAlt, FaClock, FaStar, FaWifi, FaCar,
  FaUtensils, FaBath, FaHome, FaCalendarCheck, FaUserFriends, FaCheckCircle
} from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { createBooking } from '../utils/api';
import { useAuth } from '../context/useAuth';

// Turn a Date into 'YYYY-MM-DD' (the format <input type="date"> uses), in local time
const toInputDate = (date) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};
const addDays = (dateStr, days) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return toInputDate(d);
};
const ONE_DAY = 24 * 60 * 60 * 1000;

// Icons for common amenities. Any other amenity gets a check-mark icon.
const AMENITY_ICONS = {
  'Free Wi-Fi': FaWifi,
  'Parking': FaCar,
  'Food Included': FaUtensils,
  'Clean Washrooms': FaBath,
  'Comfortable Stay': FaHome,
  'Group Friendly': FaUserFriends,
};

const BookDetailsPage = () => {
  const { type, id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [card, setCard] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);


  // Booking form: the user chooses dates and guests
  const today = toInputDate(new Date());
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(addDays(today, 1));
  const [guests, setGuests] = useState(1);
  const [bookingError, setBookingError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isStay = type === 'stay';
  const nights = Math.round((new Date(checkOut) - new Date(checkIn)) / ONE_DAY);
  const datesValid = !isStay || nights >= 1;
  const totalPrice = card ? (isStay ? card.price * Math.max(nights, 0) : card.price * guests) : 0;

  const handleCheckInChange = (value) => {
    setCheckIn(value);
    setBookingError('');
    // Keep check-out at least one day after check-in
    if (new Date(checkOut) <= new Date(value)) {
      setCheckOut(addDays(value, 1));
    }
  };

  useEffect(() => {
    document.title = type === 'stay' ? 'StayFinder | Book a Stay' : 'StayFinder | Book an Experience';
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
    if (!datesValid) {
      setBookingError('Check-out must be after check-in.');
      return;
    }

    const bookingData = {
      propertyId: card._id,
      type,
      checkIn,
      // An experience happens on one day, so it ends the next day
      checkOut: isStay ? checkOut : addDays(checkIn, 1),
      guests,
    };

    setSubmitting(true);
    setBookingError('');
    try {
      await createBooking(bookingData);
      alert('🎉 Booking confirmed!');
      setIsBooked(true);
      setShowBooking(false);
    } catch (err) {
      // Show the real reason from the backend, e.g. "already booked for the selected dates"
      setBookingError(err.response?.data?.error || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
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

                  <div className="row g-2 mt-2">
                    <div className={isStay ? 'col-6' : 'col-12'}>
                      <label className="form-label small">{isStay ? 'Check-in' : 'Date'}</label>
                      <input
                        type="date"
                        className="form-control"
                        value={checkIn}
                        min={today}
                        onChange={(e) => handleCheckInChange(e.target.value)}
                      />
                    </div>
                    {isStay && (
                      <div className="col-6">
                        <label className="form-label small">Check-out</label>
                        <input
                          type="date"
                          className="form-control"
                          value={checkOut}
                          min={addDays(checkIn, 1)}
                          onChange={(e) => { setCheckOut(e.target.value); setBookingError(''); }}
                        />
                      </div>
                    )}
                    <div className="col-6">
                      <label className="form-label small">Guests</label>
                      <select
                        className="form-select"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <p className="mt-3 mb-1">
                    {isStay
                      ? `₹${card.price} × ${Math.max(nights, 0)} night${nights === 1 ? '' : 's'}`
                      : `₹${card.price} × ${guests} guest${guests === 1 ? '' : 's'}`}
                  </p>
                  <p className="fw-bold">Total Price: ₹{totalPrice}</p>

                  {bookingError && (
                    <div className="alert alert-danger py-2">{bookingError}</div>
                  )}

                  <button
                    className="btn btn-success mt-2 rounded-pill"
                    onClick={handleConfirmBooking}
                    disabled={submitting || !datesValid}
                  >
                    {submitting ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </div>
              )
            ) : (
              <button
                className="btn btn-outline-light rounded-pill mt-2"
                onClick={() => navigate('/account')}
              >
                View My Bookings
              </button>
            )}
          </div>
        </div>

        {/* Show amenities only for stays that have them in the database */}
        {isStay && card.amenities?.length > 0 && (
          <>
            <hr className="text-secondary mt-5" />
            <h5 className="mb-3">Included Amenities</h5>
            <div className="row text-light">
              {card.amenities.map((amenity) => {
                const Icon = AMENITY_ICONS[amenity] || FaCheckCircle;
                return (
                  <div key={amenity} className="col-6 col-md-4 mb-2">
                    <Icon className="me-2" /> {amenity}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetailsPage;
