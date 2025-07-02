import React, { useRef, useEffect, useState, useMemo } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import './HomePagecss.css';

const NavBar = ({ onSignInClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const linkRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const links = useMemo(() => [
    { to: '/stays', label: 'Stays' },
    { to: '/experiences', label: 'Experiences' },
    { to: '/help', label: 'Help' }
  ], []);

  useEffect(() => {
    const activeIndex = links.findIndex(link => location.pathname === link.to);
    if (linkRefs.current[activeIndex]) {
      const linkElement = linkRefs.current[activeIndex];
      setIndicatorStyle({
        width: `${linkElement.offsetWidth + 20}px`,
        left: `${linkElement.offsetLeft - 10}px`,
      });
    } else {
      setIndicatorStyle({ width: 0, left: 0 });
    }
  }, [location.pathname, links]);

  return (
    <header className="navbar navbar-expand-lg shadow-sm px-2" style={{ backgroundColor: '#E6E6FA' }}>
      <div className="d-flex align-items-center">
        <FaMapMarkerAlt className="icon me-2" style={{ color: '#4B0082' }} />
        <Link to="/" className="text-decoration-none">
          <span className="fw-bold fs-4" style={{ color: '#4B0082' }}>Stayfinder</span>
        </Link>
      </div>

      <nav className="ms-auto d-flex align-items-center nav-links-container position-relative">
        {links.map((link, index) => (
          <Link
            key={link.to}
            to={link.to}
            ref={el => linkRefs.current[index] = el}
            className={`nav-link mx-2 fw-medium custom-nav-link ${location.pathname === link.to ? 'active-link' : ''}`}
          >
            {link.label}
          </Link>
        ))}

        <span className="slider-indicator" style={indicatorStyle}></span>

        {user ? (
          <button
            className="btn btn-outline-dark ms-3 rounded-pill px-3"
            onClick={() => navigate('/account')}
          >
            👤 {user.name.split(' ')[0]}
          </button>
        ) : (
          <button
            className="btn btn-dark ms-3 rounded-pill px-3"
            onClick={onSignInClick}
          >
            Sign Up
          </button>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
