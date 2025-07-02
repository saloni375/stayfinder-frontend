import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#2c2f48', color: 'white', padding: '30px 0' }}>
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
              <li className="mb-2"><a href="/" className="text-decoration-none text-light">Home</a></li>
              <li className="mb-2"><a href="/stays" className="text-decoration-none text-light">Stays</a></li>
              <li className="mb-2"><a href="/experiences" className="text-decoration-none text-light">Experiences</a></li>
              <li className="mb-2"><a href="/help" className="text-decoration-none text-light">Help</a></li>
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
  );
};

export default Footer;
