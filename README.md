# StayFinder – Full-Stack Travel Booking App

StayFinder is a full-stack travel booking website where users can browse stays and experiences, choose their dates and guests, book, and manage their bookings.

🔗 **Live Demo:** https://stayfinder-frontend-eta.vercel.app
⚙️ **Backend Repo:** https://github.com/saloni375/stayfinder

## Features
- Browse stays and experiences across 15+ locations, with filters for price, rating and location
- Book stays by choosing check-in and check-out dates and the number of guests, with the total price shown
- Book experiences for a chosen date
- Double-booking prevention: a stay can't be booked for overlapping dates
- View your bookings and cancel upcoming ones
- Sign up with email and password (with password-strength rules), or sign in with Google
- JWT authentication, with automatic logout when the session expires
- Profile photo upload with Cloudinary
- Save favorite stays and experiences

## Tech Stack
- **Frontend:** React, React Router, Axios, Bootstrap, Framer Motion
- **Backend:** Node.js, Express.js, MongoDB (Mongoose) – see the [backend repo](https://github.com/saloni375/stayfinder)
- **Auth:** JWT, bcrypt, Google OAuth
- **Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

## Project Structure
```
src/
├── components/   # Pages and UI components (Home, Stays, Experiences, Booking, Account…)
├── context/      # Auth context (login state, token handling)
└── utils/        # API calls (Axios instance with JWT interceptors)
```

## Run Locally
1. Start the backend first (see the [backend repo](https://github.com/saloni375/stayfinder)).
2. Clone and install:
   ```bash
   git clone https://github.com/saloni375/stayfinder-frontend.git
   cd stayfinder-frontend
   npm install
   ```
3. Create a `.env` file in the project root:
   ```
   REACT_APP_API_URL=http://localhost:5001/api
   ```
4. Start the app:
   ```bash
   npm start
   ```
   The app runs at http://localhost:3000.

## Future Improvements
- Online payments
- Admin panel to manage listings
- Handle simultaneous bookings with database transactions
- Automated tests