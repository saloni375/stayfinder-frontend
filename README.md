# StayFinder – Full-Stack Travel Booking App

StayFinder lets users search properties and experiences, book stays, and manage their bookings.

🔗 **Live Demo:** https://stayfinder-frontend-eta.vercel.app

## Features
- Search properties and experiences across 15+ locations
- Book stays and manage reservations
- Prevents double booking by checking for overlapping dates on the backend
- Secure login with JWT, bcrypt password hashing, and Google OAuth
- Protected API routes with token-verification middleware
- Profile photo upload with Cloudinary

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Auth:** JWT, bcrypt, Google OAuth
- **Deployment:** Vercel (frontend), Render (backend)

## Project Structure
- `src/` – React frontend
- `backend/` – Express API

## Run Locally
```bash
npm install
npm start          # frontend
cd backend && npm install && npm start   # backend
```
