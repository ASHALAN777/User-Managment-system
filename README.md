# 🛡️ User Management System

A full-stack web application to manage employee records, user roles, and access control — built with the MERN stack. The idea came from a real problem I faced as an Operations Manager, where manual employee record-keeping was slow and error-prone.

**Live Demo:** [usermanagement-lemon.vercel.app](https://usermanagement-lemon.vercel.app)

---

## ⚙️ Tech Stack

**Frontend**
- React.js (Hooks, Context API)
- CSS3 (Flexbox, Grid)

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt Password Hashing

**Deployment**
- Frontend → Vercel
- Backend → Render

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based login with bcrypt password hashing
- 👥 **Role-Based Access Control** — Separate dashboards for Admin and Employee roles
- 🛡️ **Protected Routes** — Unauthorized users can't access restricted pages
- 🌐 **REST API Backend** — Clean Express.js API connected to MongoDB

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Clone the repo

```bash
git clone https://github.com/ASHALAN777/User-Managment-system.git
cd User-Managment-system
```

### Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

```bash
npm start
```

### Setup Frontend

```bash
cd "frontend/First Project function"
npm install
npm start
```

Frontend runs on `http://localhost:3000`
Backend runs on `http://localhost:5000`

---

## 📁 Project Structure

```
User-Managment-system/
├── server/              # Express.js backend
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middleware/       # Auth middleware
│   └── server.js
├── frontend/            # React.js frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── context/
```

---

## 🔗 Links

- 🌐 **Live:** [usermanagement-lemon.vercel.app](https://usermanagement-lemon.vercel.app)
- 💼 **LinkedIn:** [linkedin.com/in/alan-ricky-martin-910920228](https://linkedin.com/in/alan-ricky-martin-910920228)
- 🐙 **GitHub:** [github.com/ASHALAN777](https://github.com/ASHALAN777)

---

**Next Update:** [inbuild Chat Feature]

## 👨‍💻 Author

**Alan Ricky Martin** — Full Stack Developer (MERN) based in Chennai, India.
Open to internships and junior developer roles.
