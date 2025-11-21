# Letteram - Real-Time Messaging Application

A modern web-based messaging platform built with React and Node.js, featuring real-time communication, image sharing, and customizable themes.

![Letteram](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

<img width="1919" height="910" alt="Снимок экрана 2025-11-16 201000" src="https://github.com/user-attachments/assets/01312486-3518-4af7-9ea6-c8d294c808ab" />


## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Socket Events](#socket-events)
- [Usage](#usage)
- [Deployment](#deployment)
- [Security](#security)
- [Performance Optimizations](#performance-optimizations)
- [Browser Support](#browser-support)

## Features

- **Real-time messaging** with Socket.io
- **Multiple image uploads** (up to 10 images per message)
- **Image compression** for optimized performance
- **Online/offline status** tracking
- **34 theme options** including custom themes
- **Responsive design** for mobile and desktop
- **Secure authentication** with JWT
- **Profile customization** with avatar uploads
- **Contact pinning** for quick access
- **Search functionality** for contacts

## Tech Stack

### Frontend
- React 18
- Zustand (state management)
- Tailwind CSS + DaisyUI
- Socket.io-client
- Axios
- React Router DOM
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.io
- JWT (jsonwebtoken)
- Bcrypt.js
- Cloudinary
- Cookie-parser
- CORS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/letteram.git
cd letteram
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory:
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

### Running the Application

1. **Start the backend server**
```bash
cd backend
npm start
```

2. **Start the frontend development server**
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

<img width="446" height="832" alt="image" src="https://github.com/user-attachments/assets/659508e0-f0d1-4a9c-9c39-ea6cb16ba52a" />


## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | No |
| PUT | `/api/auth/update-profile` | Update profile picture | Yes |
| GET | `/api/auth/check` | Check authentication status | Yes |

### Messages

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/messages/users` | Get all users | Yes |
| GET | `/api/messages/:id` | Get messages with specific user | Yes |
| POST | `/api/messages/send/:id` | Send message to user | Yes |

## Socket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `connection` | Client → Server | User connects to socket |
| `disconnect` | Client → Server | User disconnects from socket |
| `getOnlineUsers` | Server → Client | Broadcast online users list |
| `newMessage` | Server → Client | Send new message to specific user |

## Usage

1. **Sign Up**: Create a new account with your email and password
2. **Login**: Access your account
3. **Start Chatting**: Select a user from the sidebar to begin messaging
4. **Send Images**: Click the image icon to attach up to 10 images
5. **Customize Theme**: Visit settings to change the application theme
6. **Update Profile**: Upload a profile picture from the profile page
7. **Pin Contacts**: Pin frequently contacted users for quick access

## Deployment

### Backend
The backend can be deployed on platforms like Heroku, Railway, or Render. Make sure to set all environment variables in your deployment platform.

**Steps:**
1. Create a new project on your chosen platform
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

### Frontend
The frontend can be deployed on Vercel, Netlify, or any static hosting service. Update the API URL in production mode.

**Steps:**
1. Build the production version: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables if needed

## Security

- Passwords are hashed using bcrypt
- JWT tokens stored in HTTP-only cookies
- CORS configured for specific origins
- Input validation on both client and server
- Secure cookie settings in production

## Performance Optimizations

- Image compression on client-side before upload
- Cloudinary transformations for optimal image delivery
- Lazy loading for message history
- Debounced search functionality
- Efficient state management with Zustand

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
