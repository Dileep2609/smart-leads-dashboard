# Smart Leads Dashboard

A full-stack MERN Lead Management Dashboard built using modern scalable architecture and professional development practices.

This project was developed as part of a Full Stack MERN Internship Assignment.

---

# Live Features

## Authentication System

- JWT Authentication
- User Registration
- User Login
- Password Hashing using bcrypt
- Protected Routes
- Persistent Login using Zustand + Local Storage

---

# Lead Management Features

## CRUD Operations

- Create Lead
- View Leads
- Update Lead Status
- Delete Lead

## Lead Fields

- Name
- Email
- Status
  - New
  - Contacted
  - Qualified
  - Lost
- Source
  - Website
  - Instagram
  - Referral
- Created At

---

# Advanced Features

## Search & Filtering

- Search by Name
- Search by Email
- Filter by Status
- Filter by Source

## Debounced Search

Optimized API requests using debounce for better performance and scalability.

## Pagination

- Backend Pagination
- 10 Records Per Page
- Dynamic Pagination Buttons

## CSV Export

Export all lead data into CSV format.

## Dark Mode

Responsive dark/light theme toggle.

## Analytics Dashboard

- Lead Statistics Cards
- Charts using Recharts

## Role-Based Access Control

### Admin

- Full Access
- Delete Leads
- Update Leads

### Sales User

- Limited Access
- Cannot Delete Leads

---

# Tech Stack

## Frontend

- React.js
- TypeScript
- TailwindCSS
- Zustand
- React Router DOM
- Axios
- React Hot Toast
- Recharts

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcryptjs

---

# Project Structure

smart-leads-dashboard/

├── backend/

│ ├── src/

│ ├── controllers/

│ ├── routes/

│ ├── middleware/

│ ├── models/

│ ├── config/

│ ├── utils/

│ ├── Dockerfile

│

├── frontend/

│ ├── src/

│ ├── components/

│ ├── pages/

│ ├── services/

│ ├── store/

│ ├── Dockerfile

│

├── docker-compose.yml

├── README.md

---

# Installation Guide

## 1. Clone Repository

git clone YOUR_GITHUB_REPO_URL

cd smart-leads-dashboard

---

# Backend Setup

cd backend

npm install

Create .env file:

PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

Run Backend:

npm run dev

Backend runs on:

http://localhost:5000

---

# Frontend Setup

cd frontend

npm install

Create .env file:

VITE_API_URL=http://localhost:5000/api

Run Frontend:

npm run dev

Frontend runs on:

http://localhost:5173

---

# Docker Setup

Run complete project using Docker:

docker-compose up --build

---

# API Endpoints

## Authentication

POST /api/auth/register

POST /api/auth/login

---

# Leads

GET /api/leads

POST /api/leads

PUT /api/leads/:id

DELETE /api/leads/:id

---

# Environment Variables

## Backend

PORT

MONGO_URI

JWT_SECRET

## Frontend

VITE_API_URL

---

# UI Features

- Responsive Design
- Modern Dashboard UI
- Reusable Components
- Error Handling
- Loading States
- Empty States
- Form Validation

---

# Security Features

- JWT Authentication
- Protected Routes
- Password Hashing
- Role-Based Authorization
- Secure API Access

---

# Future Improvements

- Email Notifications
- Real-Time Lead Updates
- Lead Assignment System
- Advanced Analytics
- File Upload Support

---

# Author

Dileep Guguloth

Full Stack MERN Developer

---

# Internship Assignment

Submitted for:
Full Stack MERN Internship Assignment
