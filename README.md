# 📘 TypeScript CRUD API with Node.js, Express & MySQL

## 📌 Overview

This project is a TypeScript-based RESTful API that performs CRUD (Create, Read, Update, Delete) operations for user management. It uses Node.js, Express, and MySQL with Sequelize ORM, and includes validation, authentication-ready structure, and strong typing.

---

## 🚀 Features

- ✅ Fully typed backend using TypeScript
- ✅ RESTful API for user management
- ✅ MySQL database integration using Sequelize
- ✅ Input validation with Joi
- ✅ Password hashing using bcrypt
- ✅ Modular architecture (Controller, Service, Model)
- ✅ Centralized error handling
- ✅ API testing with Postman

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| TypeScript | Type-safe JavaScript |
| MySQL | Relational database |
| Sequelize ORM | Database abstraction |
| Joi | Input validation |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT-ready auth |
| nodemon & ts-node | Development tools |

---

## 📂 Project Structure

```
typescript-crud-api/
│── src/
│   ├── _helpers/
│   │   ├── db.ts
│   │   ├── role.ts
│   ├── _middleware/
│   │   ├── errorHandler.ts
│   │   ├── validateRequest.ts
│   ├── users/
│   │   ├── user.model.ts
│   │   ├── user.service.ts
│   │   ├── users.controller.ts
│   ├── server.ts
│
│── config.json
│── tsconfig.json
│── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd typescript-crud-api
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure database

Edit `config.json`:

```json
{
  "database": {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "",
    "database": "typescript_crud_api"
  },
  "jwtSecret": "your_secret_key"
}
```

---

## ▶️ Running the Project

**Development mode (recommended)**

```bash
npm run start:dev
```

**Build project**

```bash
npm run build
```

**Run production build**

```bash
npm start
```

---

## 🧪 API Testing (Postman)

**Base URL:**

```
http://localhost:4000
```

### 📍 Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/users` | Create a new user |
| `GET` | `/users` | Get all users |
| `GET` | `/users/:id` | Get user by ID |
| `PUT` | `/users/:id` | Update user by ID |
| `DELETE` | `/users/:id` | Delete user by ID |

---

## 🔐 Validation Rules

- Email must be **unique**
- `password` and `confirmPassword` must **match**
- Required fields must **not be empty**
- Role must be either `"Admin"` or `"User"`

---

## ⚠️ Error Handling

| Status Code | Meaning |
|---|---|
| `400` | Bad Request (validation errors) |
| `404` | Resource not found |
| `500` | Internal server error |

---

## 🧠 Key Concepts Used

- TypeScript Interfaces & Enums
- Sequelize ORM models
- Middleware (validation & error handling)
- Layered architecture (Controller → Service → Model)
- Secure password handling

---

## 🛠️ Scripts

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/server.js",
  "start:dev": "nodemon --exec ts-node src/server.ts",
  "test": "ts-node tests/users.test.ts"
}
```

---

## 📈 Future Improvements

- 🔐 Add JWT Authentication (`/auth/login`)
- 📄 Swagger API Documentation
- 🧪 Automated testing (Jest + Supertest)
- 📊 Pagination & filtering
- 🌐 Environment variables with dotenv

---

## 👨‍💻 Author

**Clint Eroll A. Capondag**

---

## 📄 License

This project is for **educational purposes** only.