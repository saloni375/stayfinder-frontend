import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaMapMarkerAlt, FaRupeeSign, FaClock, FaHeart, FaRegHeart,
  FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaTwitter
} from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFavorites, toggleFavorite } from '../utils/favorites';
import { useNavigate } from 'react-router-dom';

const ExperiencesPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [rating, setRating] = useState(0);
  const [type, setType] = useState('');
  const [sort, setSort] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
     document.title = 'StayFinder | Experiences';
    axios.get(`${process.env.REACT_APP_API_URL}/experiences`)
      .then(res => setExperiences(res.data))
      .catch(err => console.error(err));

    const favs = getFavorites();
    setFavorites(favs.map(f => `${f._id}-${f.type}`));
  }, []);

  const handleFavorite = (exp) => {
    const updated = toggleFavorite({ ...exp, type: 'experience' });
    setFavorites(updated.map(f => `${f._id}-${f.type}`));
  };

  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const filtered = experiences.filter(exp =>
    exp.title.toLowerCase().includes(search.toLowerCase()) &&
    (location ? exp.location.toLowerCase() === location.toLowerCase() : true) &&
    exp.price >= priceRange[0] && exp.price <= priceRange[1] &&
    exp.rating >= rating &&
    (type ? exp.type.toLowerCase() === type.toLowerCase() : true)
  ).sort((a, b) => {
    if (sort === 'priceLow') return a.price - b.price;
    if (sort === 'priceHigh') return b.price - a.price;
    if (sort === 'ratingHigh') return b.rating - a.rating;
    return 0;
  });

  const renderExperienceCard = (exp) => (
    <div className="card shadow"
      style={{
        background: 'rgba(75, 0, 130, 0.3)',
        borderRadius: '15px',
        width: '220px',
        color: 'white',
        overflow: 'hidden',
        position: 'relative',
        transition: 'transform 0.3s ease',
        scrollSnapAlign: 'start',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div className="position-absolute top-0 end-0 p-2" onClick={() => handleFavorite(exp)} style={{ cursor: 'pointer' }}>
        {favorites.includes(`${exp._id}-experience`)
          ? <FaHeart style={{ color: 'purple' }} />
          : <FaRegHeart style={{ color: 'white' }} />}
      </div>

      <img src={exp.image || 'https://via.placeholder.com/150'} alt={exp.title}
        className="card-img-top" style={{ height: '150px', objectFit: 'cover' }} />

      <div className="card-body p-2">
        <h5 className="card-title" style={{ fontSize: '14px', fontWeight: '600' }}>{exp.title}</h5>
        <p className="card-text small mb-1"><FaMapMarkerAlt /> {exp.location}</p>
        <p className="card-text small mb-1"><FaRupeeSign /> {exp.price} / person</p>
        <p className="card-text small mb-1">⭐ {exp.rating}</p>
        <p className="card-text small mb-1"><FaClock /> {exp.duration || '2 hours'}</p>
        <p className="card-text small mb-1"><MdCancel /> Free Cancellation</p>

        <button
          onClick={() => navigate(`/book/experience/${exp._id}`)}
          className="btn btn-light btn-sm rounded-pill mt-2 w-100"
          style={{ backgroundColor: '#4B0082', color: 'white' }}
        >
          Book Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="container-fluid pt-4" style={{ backgroundColor: '#0B0C2A', minHeight: '100vh', color: 'white' }}>
      <h2 className="text-center mb-4">Explore Experiences</h2>

      <div className="row g-3 mb-4 justify-content-center">
        <div className="col-6 col-md-2">
          <input className="form-control rounded-pill" placeholder="Search..." onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="col-6 col-md-2">
          <select className="form-select rounded-pill" onChange={e => setLocation(e.target.value)}>
            <option value="">All Locations</option>
            <option>Goa</option>
            <option>Delhi</option>
            <option>Jaipur</option>
          </select>
        </div>
        <div className="col-6 col-md-2">
          <input type="range" className="form-range" min="0" max="10000" onChange={e => setPriceRange([0, parseInt(e.target.value)])} />
          <small>Max Price: ₹{priceRange[1]}</small>
        </div>
        <div className="col-6 col-md-2">
          <select className="form-select rounded-pill" onChange={e => setRating(parseFloat(e.target.value))}>
            <option value="0">All Ratings</option>
            <option value="3">3+ Stars</option>
            <option value="4">4+ Stars</option>
          </select>
        </div>
        <div className="col-6 col-md-2">
          <select className="form-select rounded-pill" onChange={e => setType(e.target.value)}>
            <option value="">All Types</option>
          </select>
        </div>
        <div className="col-6 col-md-2">
          <select className="form-select rounded-pill" onChange={e => setSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="priceLow">Price ↑</option>
            <option value="priceHigh">Price ↓</option>
            <option value="ratingHigh">Rating ↓</option>
          </select>
        </div>
      </div>

      <div className="d-block d-md-none">
        {chunkArray(filtered, 3).map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              padding: '10px',
              gap: '14px',
              scrollSnapType: 'x mandatory',
            }}
          >
            {row.map(exp => (
              <div key={exp._id} style={{ flex: '0 0 auto', scrollSnapAlign: 'start' }}>
                {renderExperienceCard(exp)}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="d-none d-md-flex flex-wrap justify-content-center gap-4 pt-2">
        {filtered.map(exp => renderExperienceCard(exp))}
      </div>

      {filtered.length === 0 && <p className="text-center mt-4">❌ No experiences found.</p>}

      <footer style={{ backgroundColor: '#2c2f48', color: 'white', padding: '30px 0', marginTop: '50px' }}>
        <div className="container">
          <div className="row text-center text-md-start">
            <div className="col-12 col-md-4 mb-4">
              <h5 className="fw-bold mb-3">StayFinder</h5>
              <p><FaMapMarkerAlt className="me-2" /> Jaipur, Rajasthan, India</p>
              <p><FaPhoneAlt className="me-2" /> +91 98765 43210</p>
              <p><FaEnvelope className="me-2" /> support@stayfinder.com</p>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <h5 className="fw-bold mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="/" className="text-decoration-none text-light">Home</a></li>
                <li><a href="/stays" className="text-decoration-none text-light">Stays</a></li>
                <li><a href="/experiences" className="text-decoration-none text-light">Experiences</a></li>
                <li><a href="/help" className="text-decoration-none text-light">Help</a></li>
              </ul>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <h5 className="fw-bold mb-3">Follow Us</h5>
              <div className="d-flex justify-content-center justify-content-md-start">
                <a href="/" className="text-light me-3 fs-4"><FaFacebook /></a>
                <a href="/" className="text-light me-3 fs-4"><FaInstagram /></a>
                <a href="/" className="text-light me-3 fs-4"><FaTwitter /></a>
              </div>
            </div>
          </div>
          <div className="text-center pt-3 border-top mt-3" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
            <p className="mb-0">&copy; 2025 StayFinder. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExperiencesPage;
