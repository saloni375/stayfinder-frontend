import React from 'react';
import { Accordion } from 'react-bootstrap';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';


import BottomNav from './BottomNav';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';

const HelpPage = () => {

  useEffect(() => {
  document.title = 'StayFinder | Help'; 
}, []);

  return (
    <div
      className="help-page  pt-1 min-vh-100 d-flex flex-column"
      style={{ backgroundColor: '#26264b' }} 
    >

      <div className="container my-5 flex-grow-1">
  
        <motion.h2
          className="text-center fw-bold mb-4"
          style={{ color: '#e6e6fa' }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Help & Support
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Accordion
            defaultActiveKey="0"
            className="mb-4 shadow rounded"
            style={{
              backgroundColor: '#f8f4ff',
              borderRadius: '20px',
              color: '#2c2f48',
            }}
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>How do I book a stay?</Accordion.Header>
              <Accordion.Body>
                Search for your destination, select dates, and click "Book Now" on the property page.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Can I cancel my booking?</Accordion.Header>
              <Accordion.Body>
                Yes, go to 'My Bookings' and click 'Cancel'. Refund depends on the property's cancellation policy.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>How can I become a host?</Accordion.Header>
              <Accordion.Body>
                Go to the 'Host Dashboard' and fill in your property details to start hosting on StayFinder.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>What payment methods are accepted?</Accordion.Header>
              <Accordion.Body>
                We accept Credit/Debit Cards, UPI, Net Banking, and major e-wallets.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Need technical support?</Accordion.Header>
              <Accordion.Body>
                For technical issues, contact us via email, phone, or WhatsApp below.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </motion.div>

        <motion.div
          className="card p-4 shadow mb-4"
          style={{
            backgroundColor: '#ede9fe',
            borderRadius: '20px',
            color: '#2c2f48',
          }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h4 className="fw-bold">Contact Us</h4>
          <p>
            <strong>Email:</strong> support@stayfinder.com
          </p>
          <p>
            <strong>Phone:</strong> +91 98765 43210
          </p>
          <p>
            <strong>WhatsApp:</strong>{' '}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#6c63ff' }}
            >
              Chat on WhatsApp
            </a>
          </p>
          <p>
            <strong>Live Chat:</strong> Available 24/7 via the chat icon on the bottom right.
          </p>
        </motion.div>

        <motion.div
          className="card p-4 shadow mb-4"
          style={{
            backgroundColor: '#ede9fe',
            borderRadius: '20px',
            color: '#2c2f48',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h4 className="fw-bold">Booking Help</h4>
          <ul>
            <li>Check your bookings under 'My Bookings' section.</li>
            <li>For date change or cancellation, use the 'Modify Booking' option.</li>
            <li>Need refund? Contact support within 24 hours of cancellation.</li>
            <li>For special requests (early check-in, etc.), message the host directly.</li>
          </ul>
        </motion.div>

        <motion.div
          className="quick-links text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h5 className="fw-bold mb-3" style={{ color: '#e6e6fa' }}>
            Quick Links
          </h5>
          <ul className="list-inline">
            <li className="list-inline-item mx-2">
              <a href="/terms" className="text-decoration-none" style={{ color: '#a18cfc' }}>
                Terms & Conditions
              </a>
            </li>
            <li className="list-inline-item mx-2">
              <a href="/privacy" className="text-decoration-none" style={{ color: '#a18cfc' }}>
                Privacy Policy
              </a>
            </li>
            <li className="list-inline-item mx-2">
              <a href="/cancellation-policy" className="text-decoration-none" style={{ color: '#a18cfc' }}>
                Cancellation Policy
              </a>
            </li>
          </ul>
        </motion.div>
      </div>

      <footer style={{ backgroundColor: '#2c2f48', color: 'white', padding: '30px 0' }}>
        <div className="container">
          <div className="row text-center text-md-start">
            <div className="col-12 col-md-4 mb-4">
              <h5 className="fw-bold mb-3">StayFinder</h5>
              <p>
                <FaMapMarkerAlt className="me-2" /> Jaipur, Rajasthan, India
              </p>
              <p>
                <FaPhoneAlt className="me-2" /> +91 98765 43210
              </p>
              <p>
                <FaEnvelope className="me-2" /> support@stayfinder.com
              </p>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <h5 className="fw-bold mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="/" className="text-decoration-none text-light">
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/stays" className="text-decoration-none text-light">
                    Stays
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/experiences" className="text-decoration-none text-light">
                    Experiences
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/help" className="text-decoration-none text-light">
                    Help
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <h5 className="fw-bold mb-3">Follow Us</h5>
              <div className="d-flex justify-content-center justify-content-md-start">
                <a href="/" className="text-light me-3 fs-4">
                  <FaFacebook />
                </a>
                <a href="/" className="text-light me-3 fs-4">
                  <FaInstagram />
                </a>
                <a href="/" className="text-light me-3 fs-4">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>

          <div
            className="text-center pt-3 border-top mt-3"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <p className="mb-0">&copy; 2025 StayFinder. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      <BottomNav />
    </div>
  );
};

export default HelpPage;
