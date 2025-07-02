import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { FaHome, FaHeart, FaUser } from 'react-icons/fa';

const BottomNav = () => {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll hide/show nav
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNav(currentScrollY <= lastScrollY);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Detect active section from route
useEffect(() => {
  if (location.pathname === '/') {
    setActiveSection('home');
  } else if (location.pathname === '/favorites') {
    setActiveSection('favorites');
  }
}, [location.pathname]);


  const handleAboutClick = () => {
    setActiveSection('about');
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getItemStyle = (isActive, sectionName) => ({
    color: isActive || activeSection === sectionName ? 'purple' : 'black',
    backgroundColor:
      isActive || activeSection === sectionName ? 'rgba(128,0,128,0.1)' : 'transparent',
    borderRadius: '10px',
    padding: '4px 8px',
    transition: 'background-color 0.3s ease',
  });

  return (
    <footer
      className="bottom-nav shadow-sm fixed-bottom d-flex justify-content-around py-2"
      style={{
        backgroundColor: '#E6E6FA',
        transform: showNav ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.4s ease-in-out',
        zIndex: 1000,
      }}
    >
      <NavLink
        to="/"
        end
        className="nav-item text-center text-decoration-none"
        style={({ isActive }) => getItemStyle(isActive, 'home')}
      >
        <FaHome className="footer-icon mb-1" />
        <p className="mb-0 small">Homes</p>
      </NavLink>

      <NavLink
        to="/favorites"
        className="nav-item text-center text-decoration-none"
        style={({ isActive }) => getItemStyle(isActive, 'favorites')}
      >
        <FaHeart className="footer-icon mb-1" />
        <p className="mb-0 small">Favorites</p>
      </NavLink>

      <button
        onClick={handleAboutClick}
        className="nav-item text-center text-decoration-none btn btn-link p-0"
        style={getItemStyle(false, 'about')}
      >
        <FaUser className="footer-icon mb-1" />
        <p className="mb-0 small">About</p>
      </button>
    </footer>
  );
};

export default BottomNav;
