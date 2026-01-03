                       # 📚 Book Haven

**Book Haven** is a modern digital library where readers can explore, add, update, and manage books online.  
It’s built for speed, style, and simplicity — combining React, Firebase, MongoDB, and Tailwind CSS for a smooth user experience.

Book Haven is a full-stack digital library web app where users can explore, add, update, and manage books in one place.
It features Firebase authentication, MongoDB data storage, and a clean React + Tailwind UI.
Fast, secure, and fully responsive — built to make managing your favorite books effortless and fun.

---

## 🌐 Live Site

🔗 [https://book-haven2.netlify.app/]

---

## 🚀 Tech Stack

- ⚛️ **React + React Router DOM** – Single Page Application (SPA)
- 🔥 **Firebase Authentication** – Secure user login & Google sign-in
- 🍃 **MongoDB + Express (API)** – Store and manage all book data
- 🧁 **Tailwind CSS + DaisyUI** – Clean, responsive UI
- 💨 **React Hot Toast** – Beautiful custom alerts
- ⚙️ **Axios + NPM Packages** – Fast and reliable data handling

---

## ✨ Features

- 📘 Explore all books in a dynamic library view
- 🧾 Add, update, and delete books (CRUD operations)
- 🔐 Private routes protected by Firebase authentication
- 💬 Real-time comments on book details page
- ⭐ Sort and filter books by rating
- 🌗 Light/Dark theme toggle
- 🪄 Toast messages for every action — no default alerts
- ⚡ Fully responsive on mobile, tablet, and desktop

---

## 📸Pages Overview

🏠 Home: Banner, latest books, and featured sections
📖 All Books: View and sort all available books
➕ Add Book: Add new books (private route)
📚 My Books: Manage your personal collection
💬 Book Details: View full details & comments
🔑 Login/Register: Firebase-auth-based access


## 🚀 Run Locally

Follow these steps to run the project on your local machine:

1. Clone the Repository
```bash
git clone https://github.com/your-username/your-project.git
cd your-project

2. Install Dependencies
# Frontend
npm install

# Backend
cd backend
npm install
cd ..

3. Setup Environment Variables

Create a .env file in the root directory and add your Firebase & MongoDB config:

REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

MONGO_URI=your_mongodb_connection_string
4. Start Frontend & Backend Together
Open two terminals or use a tool like concurrently:
# Terminal 1: Start Frontend
npm start

# Terminal 2: Start Backend
cd backend
npm run dev

