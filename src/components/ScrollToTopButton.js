import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setVisible(true);
      else setVisible(false);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: window.innerWidth < 768 ? '20px' : '30px',
        right: window.innerWidth < 768 ? '20px' : '30px',
        width: window.innerWidth < 768 ? '40px' : '45px',
        height: window.innerWidth < 768 ? '40px' : '45px',
        
        backgroundColor: '#4B0082',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
       
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        cursor: 'pointer',
      }}
      aria-label="Scroll to top"
    >
      <FaArrowUp />
    </button>
  ) : null;
};

export default ScrollToTopButton;
