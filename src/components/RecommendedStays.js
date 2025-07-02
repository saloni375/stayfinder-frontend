import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RecommendedStays = ({ roomsToDisplay, toggleFavorite }) => {
  const navigate = useNavigate();

  const chunkedRooms = [];
  for (let i = 0; i < roomsToDisplay.length; i += 3) {
    chunkedRooms.push(roomsToDisplay.slice(i, i + 3));
  }

  return (
    <section className="container-fluid my-4 pt-1 recommended-section">
      <h2 className="text-center fw-bold pb-4 text-white">Recommended Stays</h2>

      <div className="d-none d-md-flex row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-3 justify-content-center">
        {roomsToDisplay.map((room) => (
          <div className="col" key={room._id}>
            <StayCard room={room} toggleFavorite={toggleFavorite} navigate={navigate} />
          </div>
        ))}
      </div>

      <div className="d-md-none">
        {chunkedRooms.map((row, rowIndex) => (
          <div key={rowIndex} className="d-flex overflow-auto px-2 mb-3 gap-3">
            {row.map((room) => (
              <div key={room._id} style={{ flex: '0 0 80%' }}>
                <StayCard room={room} toggleFavorite={toggleFavorite} navigate={navigate} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

const StayCard = ({ room, toggleFavorite, navigate }) => (
  <div
    className="card h-100 shadow stay-card"
    style={{
      background: 'rgba(128, 0, 128, 0.1)',
      border: '1px solid #d8b4f8',
      color: 'white',
      borderRadius: '15px',
      position: 'relative',
      minHeight: '100%', 
    }}
  >
    <div
      className="position-absolute top-0 end-0 p-2"
      onClick={() => toggleFavorite(room._id)}
      style={{ cursor: 'pointer', zIndex: 2 }}
    >
      {room.isFavorited ? (
        <FaHeart style={{ color: 'purple', fontSize: '22px' }} />
      ) : (
        <FaRegHeart style={{ color: 'white', fontSize: '22px' }} />
      )}
    </div>

    <img
      src={room.image || 'https://via.placeholder.com/300'}
      alt={room.title || 'No Title'}
      className="card-img-top"
      style={{ objectFit: 'cover', height: '160px' }}
    />

    <div className="card-body d-flex flex-column justify-content-between p-2">
      <div>
        <h5 className="card-title" style={{ fontSize: '15px', color: 'white', fontWeight: '600' }}>
          {room.title ? room.title.substring(0, 30) + '...' : 'No Title'}
        </h5>
        <p className="card-text" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
          {room.description ? room.description.substring(0, 60) + '...' : 'No Description'}
        </p>
      </div>

      <div>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span style={{ fontSize: '13px' }}>₹ {room.price || 'N/A'} / night</span>
          <span style={{ fontSize: '13px' }}>⭐ {room.rating || 'No Rating'}</span>
        </div>

        <button
          onClick={() => navigate(`/book/stay/${room._id}`)}
          className="btn w-100 rounded-pill mt-3 mb-1"
          style={{
            backgroundColor: '#4B0082',
            color: 'white',
            fontWeight: '500',
            padding: '6px 0',
            fontSize: '14px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#5e0dad';
            e.target.style.transform = 'scale(1.03)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#4B0082';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  </div>
);

export default RecommendedStays;
