# CodeNexus 🎓

**CodeNexus** is a full-stack EdTech platform that enables instructors to create and manage courses while allowing students to explore and purchase them. It features secure payment handling, cloud media uploads, and a fully responsive frontend.

> 🚀 Built using **React**, **Node.js**, **Express.js**, and **MongoDB**.

---

## 📌 Features

- 👨‍🏫 Instructor dashboard to publish and manage courses
- 🎓 Student interface for course discovery and enrollment
- 💳 Razorpay integration for secure online payments
- ☁️ Cloudinary for optimized image/video upload & delivery
- 🔐 JWT-based authentication and role-based access
- ⚡ Responsive UI built with Tailwind CSS
- 📡 RESTful API structure with Express + MongoDB

---

## 🛠️ Tech Stack

| Layer       | Tech Used                                |
|-------------|-------------------------------------------|
| Frontend    | React.js, Tailwind CSS, React Router      |
| Backend     | Node.js, Express.js, MongoDB, Mongoose    |
| Auth        | JWT, bcrypt                               |
| Payment     | Razorpay SDK *(Software Development Kit)* |
| Media Upload| Cloudinary SDK *(Software Development Kit)* |
| Others      | dotenv, nodemailer, cors, axios           |

---

## 📁 Folder Structure

```bash
CodeNexus/
├── public/                 # React public assets
├── src/                    # React source code (components, pages)
├── server/                 # Backend code (Node.js, Express, MongoDB)
│   ├── config/             # DB connection and 3rd-party service configs (e.g., Razorpay, Cloudinary)
│   ├── controllers/        # Functions handling request/response logic
│   ├── middlewares/        # Auth, error handling, and request validation middleware
│   ├── models/             # Mongoose schemas for database structure (User, Course, etc.)
│   ├── routes/             # API endpoint definitions and route handlers
│   ├── utils/              # Helper functions (token generation, mailing, etc.)
│   ├── .env.sample         # Example environment variable setup file
│   └── index.js
├── .gitignore
├── package.json            # Frontend package config
├── tailwind.config.js
├── README.md               # You're here!
