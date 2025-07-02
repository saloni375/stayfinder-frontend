import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

export default function BookingCard({ booking }) {
  const navigate = useNavigate();
  const { title, image, price, rating, dates } = booking;

  return (
    <div className="card stay-card m-2 shadow" style={{ width: '200px' }}>
      <img src={image || '/placeholder.jpg'} alt={title} className="card-img-top" />
      <div className="card-body p-2">
        <h6>{title}</h6>
        <p className="mb-1">₹{price}/night</p>
        <p className="mb-2"><FaStar className="text-warning" /> {rating}</p>
        <p className="mb-2"><small>{dates.checkIn} – {dates.checkOut}</small></p>
        <button className="btn btn-sm btn-purple w-100" onClick={() => navigate(`/booking/${booking._id}`)}>View Booking</button>
      </div>
    </div>
  );
}
