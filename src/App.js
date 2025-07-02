import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './components/Navbar';
import BottomNav from './components/BottomNav';
import HomePage from './components/HomePage';
import StaysPage from './components/StaysPage';
import ExperiencesPage from './components/ExperiencesPage';
import HelpPage from './components/HelpPage';
import SearchResultPage from './components/SearchResultPage';
import FavoritesPage from './components/FavoritesPage';
import AccountPage from './components/AccountPage';
import BookNowPage from './components/BookDetailsPage';
import BookDetailsPage from './components/BookDetailsPage';
import BookExperiencePage from './components/BookExperiencePage';
import SecurityPage from './components/SecurityPage';
import BookingCard from './components/BookingCard';
import ScrollToTopButton from './components/ScrollToTopButton';
import { useAuth } from './context/useAuth';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css'; 

NProgress.configure({ showSpinner: false });

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const aboutScrollRef = useRef(null);
  const { login } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 400); 
    return () => clearTimeout(timer);
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fakeUser = isSignUp ? { name, email } : { name: 'User', email };
    login(fakeUser);
    setShowSignInModal(false);
    navigate('/account');
  };

  return (
    <>
      <ScrollToTopButton />
      <NavBar onSignInClick={() => setShowSignInModal(true)} />

      <Routes>
        <Route
          path="/"
          element={<HomePage showSignInModal={showSignInModal} setShowSignInModal={setShowSignInModal} scrollToAbout={aboutScrollRef} />}
        />
        <Route path="/stays" element={<StaysPage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/book/:id" element={<BookNowPage />} />
        <Route path="/book/:type/:id" element={<BookDetailsPage />} />
        <Route path="/book/experience/:id" element={<BookExperiencePage />} />
        <Route path="/my-bookings" element={<BookingCard />} />
        <Route path="/security" element={<SecurityPage />} />
      </Routes>

      <BottomNav scrollToAbout={aboutScrollRef} />

      {showSignInModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-header d-flex justify-content-between align-items-center">
              <h5 className="modal-title">{isSignUp ? 'Sign Up' : 'Sign In'}</h5>
              <button type="button" className="btn-close" onClick={() => setShowSignInModal(false)}></button>
            </div>
            <div className="custom-modal-body">
              <form onSubmit={handleSubmit}>
                {isSignUp && (
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark w-100 rounded-pill mt-2">
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
              </form>
              <p className="mt-3 text-center">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <span
                  onClick={() => setIsSignUp(!isSignUp)}
                  style={{ cursor: 'pointer', color: '#4B0082' }}
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
