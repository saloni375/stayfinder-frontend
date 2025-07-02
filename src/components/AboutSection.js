import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const AboutSection = () => {
  useEffect(() => {
    document.title = 'StayFinder | About';
  }, []);

  return (
    <section id="about" className="about-section container my-5">
      <h2 className="text-center fw-bold mb-5 text-light" style={{ fontSize: '32px' }}>
        About StayFinder
      </h2>

      <div className="row align-items-center mb-5" data-aos="fade-up">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="https://novaresa.net/img/firm/larges/2870-65939.jpg"
            alt="Vision"
            className="img-fluid rounded shadow-lg"
            data-aos="zoom-in"
          />
        </div>
        <div className="col-md-6" data-aos="fade-left">
          <div className="p-4 rounded shadow" style={{ background: 'rgba(255,255,255,0.1)', color: '#E6E6FA' }}>
            <h4 className="fw-bold mb-3">Our Vision & Mission</h4>
            <p>StayFinder is committed to making travel easy, affordable, and unforgettable for everyone.</p>
          </div>
        </div>
      </div>

      <div className="row align-items-center mb-5 flex-md-row-reverse" data-aos="fade-up">
        <div className="col-md-6 mb-4 mb-md-0" data-aos="zoom-in">
          <img
            src="https://www.stayvista.com/blog/wp-content/uploads/2025/05/the-rain-2-1536x1024.jpg"
            alt="Why StayFinder"
            className="img-fluid rounded shadow-lg"
          />
        </div>
        <div className="col-md-6" data-aos="fade-right">
          <div className="p-4 rounded shadow" style={{ background: 'rgba(255,255,255,0.1)', color: '#E6E6FA' }}>
            <h4 className="fw-bold mb-3">Why Choose StayFinder?</h4>
            <ul className="list-unstyled text-light">
              <li className="mb-2"><FaCheckCircle className="me-2 text-success" /> Handpicked & Verified Listings</li>
              <li className="mb-2"><FaCheckCircle className="me-2 text-success" /> Affordable to Premium Options</li>
              <li className="mb-2"><FaCheckCircle className="me-2 text-success" /> 24/7 Customer Support</li>
              <li className="mb-2"><FaCheckCircle className="me-2 text-success" /> Instant Booking & Easy Cancellation</li>
              <li className="mb-2"><FaCheckCircle className="me-2 text-success" /> Multiple Payment Options</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row align-items-center mb-5" data-aos="fade-up">
        <div className="col-md-6 mb-4 mb-md-0" data-aos="zoom-in">
          <img
            src="https://roomraccoon.ie/wp-content/uploads/2024/05/4.png"
            alt="How It Works"
            className="img-fluid rounded shadow-lg"
          />
        </div>
        <div className="col-md-6" data-aos="fade-left">
          <div className="p-4 rounded shadow" style={{ background: 'rgba(255,255,255,0.1)', color: '#E6E6FA' }}>
            <h4 className="fw-bold mb-3">How StayFinder Works</h4>
            <p>Search ➡️ Compare ➡️ Book Securely ➡️ Travel & Enjoy with full support.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
