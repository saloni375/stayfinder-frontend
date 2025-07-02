import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchSection from '../components/SearchSection';
import RecommendedStays from '../components/RecommendedStays';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import './HomePagecss.css';

const HomePage = ({ scrollToAbout }) => {
  const [rooms, setRooms] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const aboutRef = useRef(null);
  const navigate = useNavigate();

  const images = [
    'https://media.architecturaldigest.com/photos/659d9fbfe6cba71cbe6077f6/16:9/w_1920,c_limit/atr.royalmansion-bar-mr.jpg',
    'https://images.unsplash.com/photo-1625334782252-da92af3ad887?q=80&w=1170&auto=format&fit=crop',
    'https://a0.muscache.com/im/pictures/miso/Hosting-1109983691455486059/original/7d62f2bd-639f-49b6-94db-e66d8877a119.jpeg?im_w=1200',
    'https://images.unsplash.com/photo-1590447158019-883d8d5f8bc7?q=80&w=1932&auto=format&fit=crop'
  ];

  const places = [
    'Delhi', 'Agra', 'Jaipur', 'Mumbai', 'Goa', 'Kerala', 'Varanasi', 'Rishikesh', 'Manali', 'Shimla', 'Udaipur', 'Jodhpur', 'Chennai',
    'Hyderabad', 'Bangalore', 'Mysore', 'Amritsar', 'Leh-Ladakh', 'Darjeeling', 'Kolkata', 'Ooty', 'Pune', 'Lonavala', 'Khandala',
    'Bhopal', 'Lucknow', 'Patna', 'Chandigarh', 'Andaman', 'Ranthambore', 'Kanha', 'Bandhavgarh'
  ];

  const filteredPlaces = places.filter(place =>
    place.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    document.title = 'StayFinder | Home';
    axios.get(`${process.env.REACT_APP_API_URL}/properties`)
      .then(res => {
        const updatedRooms = res.data.map(room => ({
          ...room,
          isFavorited: false
        }));
        setRooms(updatedRooms);
      })
      .catch(err => console.error('Error:', err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (scrollToAbout && aboutRef.current) {
      scrollToAbout.current = () => {
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
      };
    }
  }, [scrollToAbout]);

  const handleSearch = () => {
    navigate('/stays', { state: { query: searchInput } });
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (place) => {
    setSearchInput(place);
    setShowSuggestions(false);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const toggleFavorite = (id) => {
    const updatedRooms = rooms.map(room =>
      room._id === id ? { ...room, isFavorited: !room.isFavorited } : room
    );
    setRooms(updatedRooms);
  };

  const roomsToDisplay = showAll ? rooms : rooms.slice(0, 6);

  return (
    <div className="container-fluid p-0 homepage">
      <div className="position-relative" style={{ height: '80vh', overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: `${images.length * 100}%`,
            transform: `translateX(-${currentImage * (100 / images.length)}%)`,
            transition: 'transform 1s ease-in-out'
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: `${100 / images.length}%`,
                height: '100%'
              }}
            />
          ))}
        </div>

        <section
          className="hero-section d-flex flex-column flex-md-row align-items-center justify-content-center px-3 py-4"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            color: '#E6E6FA'
          }}
        >
          <div className="hero-content text-center text-md-start w-100 d-flex flex-column align-items-center align-items-md-start justify-content-center">
            <h1 className="fw-bold text-white text-center text-md-start mb-2" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Find your stay
            </h1>
            <p className="lead text-white text-center text-md-start mb-4" style={{ fontSize: 'clamp(16px, 2vw, 20px)' }}>
              Book unique accommodations and more
            </p>
            <SearchSection
              searchInput={searchInput}
              handleChange={handleChange}
              handleSearch={handleSearch}
              filteredPlaces={filteredPlaces}
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
              handleSuggestionClick={handleSuggestionClick}
            />
          </div>
        </section>
      </div>

      <RecommendedStays roomsToDisplay={roomsToDisplay} toggleFavorite={toggleFavorite} />

      {rooms.length > 6 && (
        <div className="text-center mt-3">
          <button className="btn btn-light px-4 rounded-pill" onClick={toggleShowAll}>
            {showAll ? 'View Less' : 'View More'}
          </button>
        </div>
      )}

      <AboutSection />
      <Footer />
    </div>
  );
};

export default HomePage;
