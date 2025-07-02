import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaRupeeSign, FaHeart, FaClock } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('stay');
  const [expandedCardId, setExpandedCardId] = useState(null);

  useEffect(() => {
     document.title = 'StayFinder | Favorites';
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    const cleaned = stored.filter(item => typeof item === 'object' && item._id && item.title && item.type);
    localStorage.setItem('favorites', JSON.stringify(cleaned));
    setFavorites(cleaned);
  }, []);

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const toggleFavorite = (card) => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    const exists = stored.find(f => f._id === card._id && f.type === card.type);

    let updatedFavorites;
    if (exists) {
      updatedFavorites = stored.filter(f => !(f._id === card._id && f.type === card.type));
    } else {
      updatedFavorites = [...stored, { ...card, description: card.description || 'No description available.' }];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const filteredFavorites = favorites.filter(fav => fav.type === activeTab);

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#0B0C2A', minHeight: '100vh', color: 'white' }}>
      <h2 className="text-center mb-4">Your Favorites</h2>

      <div className="text-center mb-4">
        <button className={`btn mx-2 ${activeTab === 'stay' ? 'btn-light text-dark' : 'btn-outline-light'}`} onClick={() => setActiveTab('stay')}>
          🏨 Stays
        </button>
        <button className={`btn mx-2 ${activeTab === 'experience' ? 'btn-light text-dark' : 'btn-outline-light'}`} onClick={() => setActiveTab('experience')}>
          🌄 Experiences
        </button>
      </div>

      {filteredFavorites.length === 0 ? (
        <p className="text-center">No favorites in this category.</p>
      ) : (
        <>
          <div className="d-block d-md-none">
            {chunkArray(filteredFavorites, 3).map((row, rowIndex) => (
              <div key={rowIndex} className="scroll-row d-flex mb-4 px-2" style={{ overflowX: 'auto', gap: '12px', scrollSnapType: 'x mandatory' }}>
                {row.map(card => (
                  <Card card={card} toggleFavorite={toggleFavorite} expandedCardId={expandedCardId} setExpandedCardId={setExpandedCardId} key={card._id} />
                ))}
              </div>
            ))}
          </div>

          <div className="d-none d-md-flex flex-wrap justify-content-center gap-3">
            {filteredFavorites.map(card => (
              <Card card={card} toggleFavorite={toggleFavorite} expandedCardId={expandedCardId} setExpandedCardId={setExpandedCardId} key={card._id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Card = ({ card, toggleFavorite, expandedCardId, setExpandedCardId }) => {
  return (
    <div
      className="card shadow stay-card"
      style={{
        border: '1px solid #d8b4f8',
        borderRadius: '15px',
        color: 'white',
        width: '220px',
        minWidth: '220px',
        background: 'rgba(128, 0, 128, 0.1)',
        scrollSnapAlign: 'start',
        transition: 'transform 0.3s ease',
        flex: '0 0 auto',
        position: 'relative',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {card.type === 'experience' && card.isNew && (
        <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">New</span>
      )}

      <div className="position-absolute top-0 end-0 p-2" style={{ cursor: 'pointer', zIndex: 2 }} onClick={() => toggleFavorite(card)}>
        <FaHeart style={{ color: 'purple' }} />
      </div>

      <div style={{ width: '100%', height: '140px', overflow: 'hidden' }}>
        <img src={card.image || 'https://via.placeholder.com/300'} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' ,borderRadius:'16px'}} />
      </div>
      
      <div
        className="card-body p-2 d-flex flex-column justify-content-between"
        style={{
          minHeight: card.type === 'experience' ? '200px' : 'auto',
        }}
      >
        <div>
          <h5 className="card-title mb-1" style={{ fontSize: '14px' }}>{card.title}</h5>
         {card.type === 'stay' && card.description && (
         <p className="card-text mb-2" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)' }}>
           {expandedCardId === card._id ? card.description : `${card.description.slice(0, 80)}...`}
           {card.description.length > 80 && (
             <span
               onClick={() => setExpandedCardId(prev => (prev === card._id ? null : card._id))}
               style={{ color: '#d8b4f8', cursor: 'pointer', marginLeft: '5px' }}
             >
               {expandedCardId === card._id ? 'Show less' : 'Read more'}
             </span>
           )}
         </p>
       )}
       
          <p className="card-text small mb-1"><FaMapMarkerAlt className="me-1" /> {card.location}</p>
          <p className="card-text mb-1" style={{ fontSize: '13px' }}>
          <FaRupeeSign className="me-1" />
            {card.price} {card.type === 'stay' ? '/ night' : '/ person'}
          </p>
          <p className="card-text mb-2" style={{ fontSize: '13px', color: 'white' }}>
            ⭐ {card.rating}
          </p>


          {card.type === 'experience' && (
            <>
              <p className="card-text small mb-1"><FaClock /> {card.duration || '2 hours'}</p>
              <p className="card-text small mb-1"><MdCancel /> Free Cancellation</p>
            </>
          )}
        </div>

        <Link to={`/book/${card.type}/${card._id}`} className="btn w-100 rounded-pill mt-2 text-center" style={{ backgroundColor: '#4B0082', color: 'white', height: '35px', fontSize: '14px', textDecoration: 'none', border: '#4B0082' }}>
          {card.type === 'stay' ? 'Book Now' : 'Book Now'}
        </Link>
      </div>
    </div>
  );
};

export default FavoritesPage;
