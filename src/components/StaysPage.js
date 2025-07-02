import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope,
  FaFacebook, FaInstagram, FaTwitter,
  FaHeart, FaRegHeart, FaRupeeSign
} from 'react-icons/fa';

const StaysPage = () => {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [rating, setRating] = useState(0);
  const [type, setType] = useState('');
  const [sort, setSort] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const query = location.state?.query || '';

  useEffect(() => {
    document.title = 'StayFinder | Stays';
    axios.get(`${process.env.REACT_APP_API_URL}/properties`)
      .then(res => {
        const allStays = res.data;
        setProperties(allStays);

        const initialSearch = query || '';
        setSearch(initialSearch);

        let filteredList = [...allStays];
        if (initialSearch) {
          filteredList = filteredList.filter(p =>
            p.title.toLowerCase().includes(initialSearch.toLowerCase()) ||
            p.location.toLowerCase().includes(initialSearch.toLowerCase())
          );
        }
        setFiltered(filteredList);
      });
  }, [query]);

  useEffect(() => {
     
    if (!properties.length) return;

    let result = [...properties];

    if (search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (locationFilter) {
      result = result.filter(p => p.location.toLowerCase() === locationFilter.toLowerCase());
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    result = result.filter(p => p.rating >= rating);
    if (type) {
      result = result.filter(p => p.type.toLowerCase() === type.toLowerCase());
    }
    if (sort === 'priceLow') result.sort((a, b) => a.price - b.price);
    if (sort === 'priceHigh') result.sort((a, b) => b.price - a.price);
    if (sort === 'ratingHigh') result.sort((a, b) => b.rating - a.rating);

    setFiltered(result);

    const storedFavs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavs.map(f => `${f._id}-${f.type}`));
  }, [search, locationFilter, priceRange, rating, type, sort, properties]);

  const toggleFavorite = (card) => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    const exists = stored.find(f => f._id === card._id && f.type === 'stay');
    let updatedFavorites;

    if (exists) {
      updatedFavorites = stored.filter(f => !(f._id === card._id && f.type === 'stay'));
    } else {
      updatedFavorites = [...stored, {
        _id: card._id,
        title: card.title,
        image: card.image,
        location: card.location,
        price: card.price,
        rating: card.rating,
        type: 'stay'
      }];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites.map(f => `${f._id}-${f.type}`));
  };

  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const StayCard = ({ room }) => (
  <div
    className="card shadow stay-card"
    style={{
      
      border: '1px solid #d8b4f8',
      borderRadius: '15px',
      color: 'white',
      width: '100%',
      position: 'relative',
      minWidth: '180px',
      maxWidth: '100%',
      overflow: 'hidden',
      background: 'rgba(128, 0, 128, 0.1)',
      minHeight: '100%', 
    
    }}
  >
   
    <div
      className="position-absolute top-0 end-0 p-2"
      onClick={() => toggleFavorite(room)}
      style={{ cursor: 'pointer', zIndex: 2 }}
    >
      {favorites.includes(`${room._id}-stay`) ? (
        <FaHeart style={{ color: 'purple' }} />
      ) : (
        <FaRegHeart style={{ color: 'white' }} />
      )}
    </div>

    <div style={{ width: '100%', height: '140px', overflow: 'hidden' }}>
      <img
        src={room.image || 'https://via.placeholder.com/300'}
        alt={room.title || 'Stay Image'}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>

    <div
      className="card-body p-2 d-flex flex-column justify-content-between"
      style={{ minHeight: '200px', position: 'relative' }}
    >
      <div>

        <h5 className="card-title mb-1" style={{ fontSize: '14px' }}>
          {room.title || 'No Title'}
        </h5>

        {room.description && (
          <p className="card-text mb-2" style={{ fontSize: '12px',color: 'rgba(255,255,255,0.7)'}}>
            {room.description.slice(0, 50)}...
          </p>
        )}

        <p className="card-text small mb-1">
          <FaMapMarkerAlt className="me-1" /> {room.location}
        </p>
        <p className="card-text small mb-1">
          <FaRupeeSign className="me-1" /> {room.price} / night
        </p>
      </div>

      <span
        className="position-absolute"
        style={{ bottom: '55px', left: '0px', fontSize: '13px',  padding: '2px 8px',  }}
      >
        ⭐ {room.rating}
      </span>

      <button
        onClick={() => navigate(`/book/stay/${room._id}`)}
        className="btn btn-light w-100 rounded-pill mt-2"
        style={{ backgroundColor: '#4B0082', color: 'white', fontSize: '13px', border : '#4B0082'}}
      >
        Book Now
      </button>
    </div>
  </div>
);

  return (
    <div className="container-fluid pt-4" style={{ backgroundColor: '#0B0C2A', minHeight: '100vh', color: 'white' }}>
      <h2 className="text-center mb-4">Explore Stays</h2>

      <div className="row g-3 mb-4 justify-content-center filter-bar">
        <div className="col-6 col-md-2">
          <input
            className="form-control rounded-pill shadow"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="col-6 col-md-2">
          <select className="form-select rounded-pill shadow" onChange={e => setLocationFilter(e.target.value)}>
            <option value="">All Locations</option>
            <option>Goa</option>
            <option>Delhi</option>
            <option>Jaipur</option>
          </select>
        </div>
        <div className="col-6 col-md-2">
          <input
            type="range"
            className="form-range"
            min="0"
            max="10000"
            onChange={e => setPriceRange([0, parseInt(e.target.value)])}
          />
          <small>Max Price: ₹{priceRange[1]}</small>
        </div>
        <div className="col-6 col-md-2">
          <select className="form-select rounded-pill shadow" onChange={e => setRating(parseFloat(e.target.value))}>
            <option value="0">All Ratings</option>
            <option value="3">3+ stars</option>
            <option value="4">4+ stars</option>
          </select>
        </div>
        <div className="col-6 col-md-2">
          <select className="form-select rounded-pill shadow" onChange={e => setType(e.target.value)}>
            <option value="">All Types</option>
            
          </select>
        </div>
        <div className="col-6 col-md-2">
          <select className="form-select rounded-pill shadow" onChange={e => setSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="priceLow">Price ↑</option>
            <option value="priceHigh">Price ↓</option>
            <option value="ratingHigh">Rating ↓</option>
          </select>
        </div>
      </div>

      <div className="d-none d-md-flex flex-wrap justify-content-center gap-3">
        {filtered.map(room => (
          <div key={room._id} style={{ width: '220px' }}>
            <StayCard room={room} />
          </div>
        ))}
      </div>

      <div className="d-md-none">
        {chunkArray(filtered, 2).map((row, index) => (
          <div key={index} className="d-flex overflow-auto gap-3 px-2 mb-3" style={{ scrollSnapType: 'x mandatory' }}>
            {row.map(room => (
              <div key={room._id} style={{ flex: '0 0 80%', scrollSnapAlign: 'start' }}>
                <StayCard room={room} />
              </div>
            ))}
          </div>
        ))}
      </div>

     
      {filtered.length === 0 && <p className="text-center mt-4">❌ No stays match your filter.</p>}

      <footer style={{ backgroundColor: '#2c2f48', color: 'white', padding: '30px 0', marginTop: '50px' }}>
        <div className="container">
          <div className="row text-center text-md-start">
            <div className="col-12 col-md-4 ">
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

export default StaysPage;
