# 🚕 Ride Booking API

A secure, scalable, and role-based **Ride Booking System** backend built using **Express.js, TypeScript, and Mongoose**, inspired by real-world apps like Uber and Pathao.

---

## 🎯 Features Overview

- 🔐 **JWT Authentication** (rider, driver, admin roles)
- 🔒 **Role-Based Authorization** Middleware
- 🧍 **Rider Functions**: Request, Cancel, Ride History
- 🚗 **Driver Functions**: Accept Ride, Update Status, Earnings
- 🧑‍💼 **Admin Panel**: Approve/Suspend Drivers, Block Users, View All Rides
- 📜 **Full Ride Lifecycle** with history and status updates
- 🔁 **Modular and Scalable Code Architecture**

---

## 🏗 Tech Stack

| Tool         | Description                            |
|--------------|----------------------------------------|
| **Node.js**  | JavaScript runtime                     |
| **Express.js**| Web framework                         |
| **MongoDB**  | NoSQL database                         |
| **Mongoose** | ODM for MongoDB                        |
| **TypeScript**| Type safety and cleaner development   |
| **Zod**      | Schema validation                      |
| **Bcrypt**   | Password hashing                       |
| **JWT**      | Token-based authentication             |

---

## 🔐 Authentication & Roles

- **Login** via email & password
- **JWT Access + Refresh Tokens**
- **Roles**:
  - `RIDER`: Request/cancel rides
  - `DRIVER`: Accept/update rides, earnings
  - `ADMIN`: Manage users, drivers, rides

---

## 🔁 Ride Lifecycle

- **Only riders** can request/cancel
- **Only drivers** can accept and update statuses (requested → accepted → picked_up → in_transit → completed)
- **Admins** can view all data

---

## 📦 API Endpoints Summary

### Needed Credential
- admin@gmail.com
- 123456

### 🔑 Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/auth/register`           | Register a driver              |
| POST   | `/auth/login`              | Login and receive JWT tokens   |
| POST   | `/auth/refresh-token`      | Get a new access token         |
| POST   | `/auth/logout`             | Logout current session         |
| POST   | `/auth/change-password`    | Change current password        |
| POST   | `/auth/forgot-password`    | Initiate password reset        |
| POST   | `/auth/reset-password`     | Reset password with token      |

---

### 👤 User (Rider/Admin)

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST   | `/user/register`             | RIDER  | Register a rider            |
| GET    | `/user/all-users`            | ADMIN  | View all users              |
| GET    | `/user/:id`                  | ALL    | View a specific user        |
| PATCH  | `/user/block-unblock/:id`    | ADMIN  | Block or unblock user       |

---

### 🚘 Driver Routes

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| PATCH  | `/driver/approve/:id`        | ADMIN  | Approve a driver            |
| PATCH  | `/driver/suspend/:id`        | ADMIN  | Suspend a driver            |
| GET    | `/driver/earnings-rides`     | DRIVER | View earnings and rides     |

---

### 🧾 Ride Routes

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST   | `/rides/request`            | RIDER   | Request a new ride         |
| PATCH  | `/rides/:id/cancel`         | RIDER   | Cancel a ride              |
| PATCH  | `/rides/:rideId/respond`    | DRIVER  | Accept or reject a ride    |
| PATCH  | `/rides/:rideId/status`     | DRIVER  | Update ride status         |
| GET    | `/rides/driver-history`     | DRIVER  | View driver ride history   |
| GET    | `/rides/rider-history`      | RIDER   | View rider ride history    |
| GET    | `/rides/all-rides`          | ADMIN   | View all rides             |