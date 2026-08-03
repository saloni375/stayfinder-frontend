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
import { registerUser, loginUser, loginWithGoogle } from './utils/api';
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
 const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
 const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [showPasswordHints, setShowPasswordHints] = useState(false);
  const aboutScrollRef = useRef(null);
  const googleButtonRef = useRef(null);
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

const resetAuthForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setAuthError('');
    setAuthSuccess('');
    setShowPasswordHints(false);
  };

   const handleGoogleResponse = async (response) => {
    setAuthError('');
    try {
      const loginData = await loginWithGoogle(response.credential);
      login(loginData.user, loginData.token);
      resetAuthForm();
      setShowSignInModal(false);
      navigate('/account');
    } catch (err) {
      setAuthError('Google sign-in failed. Please try again.');
    }
  };

  useEffect(() => {
    if (showSignInModal && window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id: '143009733954-jcfiu83f8dle46t7pvv0v5q3i03mqss1.apps.googleusercontent.com',
        callback: handleGoogleResponse,
      });
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'outline',
        size: 'large',
        width: 320,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSignInModal]);


 const isPasswordStrongEnough = (pwd) =>
    /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && pwd.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (isSignUp && !isPasswordStrongEnough(password)) {
      setAuthError('Password must be at least 8 characters and include a lowercase letter, an uppercase letter, and a number.');
      return;
    }

    try {
      if (isSignUp) {
        await registerUser({ name, email, password });
        setAuthSuccess('Account created successfully! Please sign in below.');
        setIsSignUp(false);
        setName('');
        setPassword('');
        return;
      } else {
        const loginData = await loginUser({ email, password });
        login(loginData.user, loginData.token);
      }
      resetAuthForm();
      setShowSignInModal(false);
      navigate('/account');
    } catch (err) {
      setAuthError(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };
  return (
    <>
      <ScrollToTopButton />
      <NavBar onSignInClick={() => { resetAuthForm(); setIsSignUp(false); setShowSignInModal(true); }} />

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
              <button type="button" className="btn-close" onClick={() => { setShowSignInModal(false); resetAuthForm(); }}></button>
            </div>
            <div className="custom-modal-body">
              {authError && (
                <div className="alert alert-danger py-2" role="alert">
                  {authError}
                </div>
              )}
              {authSuccess && (
                <div className="alert alert-success py-2" role="alert">
                  {authSuccess}
                </div>
              )}
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
                    onFocus={() => setShowPasswordHints(true)}
                    onBlur={() => setShowPasswordHints(false)}
                    required
                  />
                  {isSignUp && showPasswordHints && (
                    <div
                      className="mt-2 p-2"
                      style={{ background: '#f8f9fa', borderRadius: '6px', fontSize: '0.85rem' }}
                    >
                      <div style={{ color: /[a-z]/.test(password) ? 'green' : '#999' }}>
                        {/[a-z]/.test(password) ? '✓' : '○'} A lowercase letter
                      </div>
                      <div style={{ color: /[A-Z]/.test(password) ? 'green' : '#999' }}>
                        {/[A-Z]/.test(password) ? '✓' : '○'} A capital (uppercase) letter
                      </div>
                      <div style={{ color: /[0-9]/.test(password) ? 'green' : '#999' }}>
                        {/[0-9]/.test(password) ? '✓' : '○'} A number
                      </div>
                      <div style={{ color: password.length >= 8 ? 'green' : '#999' }}>
                        {password.length >= 8 ? '✓' : '○'} Minimum 8 characters
                      </div>
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-dark w-100 rounded-pill mt-2">
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
              </form>

              <div className="text-center my-3" style={{ color: '#888' }}>— or —</div>
              <div className="d-flex justify-content-center" ref={googleButtonRef}></div>

              <p className="mt-3 text-center">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <span
                  onClick={() => { resetAuthForm(); setIsSignUp(!isSignUp); }}
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
