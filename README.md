# 📚 HAVEN. | Digital Library Management System

**HAVEN** is a sophisticated, high-performance **library management dashboard** designed for curators and avid readers. It offers a seamless way to archive, manage, and explore literary collections with a strong focus on **modern UI/UX** and **real-time data synchronization**.

---

## 🌐 Live Experience

🔗 **Live Demo:** *[https:/bookhaven1001.netlify.app/]*

---

## ⚡ Core Technologies

### 🎨 Frontend

* **React 18** – Functional components with Hooks (`useState`, `useEffect`, Context API)
* **Tailwind CSS** – Utility-first styling for a fully custom design
* **DaisyUI** – Accessible UI components (buttons, modals, forms)
* **React Router (v7)** – Advanced routing with **Protected Dashboard Routes**
* **React Icons** – Professional icon packs (FontAwesome, Lucide)

### 🔐 Backend & Security

* **Node.js & Express** – Scalable REST API architecture
* **MongoDB** – Flexible NoSQL database for book schemas
* **Firebase Authentication** – Secure Google & Email/Password login

### 🧰 Utilities

* **SweetAlert2** – Animated confirmation & alert dialogs
* **React Toastify** – Non-intrusive notifications for CRUD actions
* **React Tooltip** – Interactive hover previews for book covers

---

## ✨ Key Features

* **Curator Dashboard** – High-end workspace with statistics and quick actions
* **Glassmorphic UI** – Modern blur, gradient, and dark-themed sidebar design
* **Full CRUD System** – Add, update, and delete books with confirmation prompts
* **Responsive Sidebar** – Collapsible desktop sidebar & mobile drawer support
* **Real-time Search & Filter** – Instantly locate books in large collections
* **Protected Archives** – Only authenticated users can manage their books
* **Dynamic Banner Slider** – Interactive hero section with auto-play & controls

---

## 📸 Dashboard Overview

| Section               | Description                                       |
| --------------------- | ------------------------------------------------- |
| **Overview**          | Quick stats of total volumes & cloud sync status  |
| **Managed Archives**  | Modern data table with hover previews & actions   |
| **Add to Collection** | Clean, focused form to add new books              |
| **My Profile**        | Firebase-synced, verified user profile management |

---

## 🚀 Installation & Local Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/book-haven.git
cd book-haven
```

### 2️⃣ Install Dependencies

Install packages for both **Client** and **Server**.

```bash
# Frontend dependencies
npm install

# Server dependencies
cd server
npm install
```

### 3️⃣ Environment Configuration

Create a `.env` file in the **Client root** and add Firebase credentials:

```env
VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
```

For backend configuration, add MongoDB credentials:

```env
DB_USER=your_db_user
DB_PASS=your_db_password
```

### 4️⃣ Run the Project

```bash
# Run Client (Vite + React)
npm run dev

# Run Server (separate terminal)
cd server
npm start
```

---

## 🛠️ Project Structure

```plaintext
src/
├── Components/    # Reusable UI (Tables, Banners, Loaders)
├── Context/       # AuthProvider (Firebase logic)
├── Layouts/       # MainLayout & DashboardLayout
├── Pages/         # Home, MyBooks, AddBooks, Login
└── Assets/        # Images & global styles
```

---

## 🤝 Contributing

Contributions are welcome and appreciated ❤️

1. Fork the project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m "Add some AmazingFeature"`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

✨ *Built with passion for clean UI, scalability, and real-world usability.*
