# 📬 HiFazat Inbox – Modern Email Management System


**HiFazat Inbox** is a feature-rich, modern email management system built using **React** and **Node.js**. It delivers a seamless and responsive user experience for composing, sending, and organizing emails, while offering robust administrative and security features.

![GitHub License](https://img.shields.io/badge/license-ISC-blue.svg)
![Made with React](https://img.shields.io/badge/Frontend-React-blue)
![Made with Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

---

## 🚀 Features

### 🔐 User Authentication

* Secure login and registration system
* JWT-based authentication
* Role-based access control (Admin/User)

### 📧 Email Management

* **Rich Text Editor** powered by TinyMCE for composing formatted emails
* Organize emails into Inbox, Sent, Drafts, and Trash
* Search, categorize, and filter emails
* Attach multiple files with size/type validation

### 🎨 User Experience

* Sleek, modern UI using Tailwind CSS and Radix UI
* Fully responsive design
* Smooth animations and transitions
* Real-time notifications and live email updates

### 🛠️ Admin Dashboard

* Manage users, roles, and permissions
* Monitor system health and usage statistics

---

## 🛠️ Tech Stack

### 🖥️ Frontend

* **React 19** with **Vite**
* **Tailwind CSS** for responsive styling
* **Radix UI** for accessible components
* **TinyMCE React** for rich text editing
* **Axios** for API communication
* **React Router DOM** for routing

### ⚙️ Backend

* **Node.js** with **Express.js**
* **MongoDB** with **Mongoose**
* **JWT** for authentication
* **Multer** for handling file uploads
* **Nodemailer** for sending emails
* **Google APIs** for integration (e.g., Gmail support)

---

## 📦 Getting Started

### ✅ Prerequisites

* Node.js (v18+)
* MongoDB (local or cloud)
* npm or yarn

### ⚙️ Backend Setup

```bash
cd Backend
npm install
npm run dev
```

### 💻 Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 🔧 Configuration

Create a `.env` file in the `Backend/` directory with the following values:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

> ⚠️ **Important**: Do not commit your `.env` file or any credentials to source control.

---

## 🤝 Contributing

We welcome all contributions! 🚀
To contribute:

1. Fork the repo
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Submit a Pull Request

---

## 📄 License

This project is licensed under the **ISC License** – see the [LICENSE](LICENSE) file for details.

---

## 👥 Author

* [**Muhammad Ahad**](https://github.com/Ahad-dev) – development and design

---

## 🙏 Acknowledgments

* Thanks to all contributors
* Special thanks to the open-source community
* TinyMCE, Radix UI, Tailwind CSS, and others for their excellent tools

