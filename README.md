# 🛒 E-Commerce API

A full-featured RESTful API for an e-commerce platform, built with **Node.js**, **Express**, and **MongoDB**. It supports user and admin roles, product and cart management, orders, payments, and analytics.

---

## 🚀 Features

- ✅ User registration & authentication (JWT)
- 🛍️ Product management with image upload (admin-only)
- 🛒 Cart creation, update, and deletion
- 📦 Order processing & tracking
- 💳 Stripe payment integration
- 📈 Admin analytics for products & orders
- 🧪 Fully testable with Postman

---

## 📁 Project Structure (Example)
```
ecommerce-api/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── utils/
├── .env
├── server.js
├── package.json
```

## ⚙️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/shubham-gupta-iphtech/E-Commerce-API-Project.git
cd E-Commerce-API-Project
````

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file**

```env
PORT=5000
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
STRIPE_SECRET_KEY=<your_stripe_key>
```

4. **Run the project**

```bash
npm start
```

> Server will run on `http://localhost:5000`

---

## 🔐 Authentication

### `POST /api/auth/register`

Register a new user (admin or customer).

```json
{
  "name": "admin",
  "email": "admin@gmail.com",
  "password": "admin123",
  "role": "admin"
}
```

### `POST /api/auth/login`

Login to get JWT token.

---

## 👤 Users

* `GET /api/users/:id` — Get user profile
* `PUT /api/users/:id` — Update user
* `DELETE /api/users/:id` — Delete user

> 🔒 Protected by JWT

---

## 📦 Products

### `POST /api/products`

Create a product *(admin only, with image upload)*

### `GET /api/products`

Get all products
Supports:

* `?search=phone` (filter by search keyword)

### `GET /api/products/:id`

Get product by ID

---

## 🛒 Cart

### `POST /api/cart`

Add product to cart

```json
{
  "productId": "<product_id>",
  "quantity": 2
}
```

### `GET /api/cart`

Get current user's cart

### `DELETE /api/cart/:productId`

Remove product from cart

---

## 📑 Orders

### `POST /api/orders`

Create order and payment intent (Stripe)

```json
{
  "paymentMethod": "stripe"
}
```

### `POST /api/orders/confirmOrder`

Confirm order with Stripe payment intent ID

```json
{
  "paymentIntentId": "pi_..."
}
```

### `GET /api/orders`

Get logged-in user's orders

### `POST /api/orders/cancelUserOrder`

Cancel order

### `DELETE /api/orders/cancelUserOrder/:id`

Cancel specific order by ID

---

## 🔧 Admin Endpoints

### `GET /api/admin/orders`

Get all orders

### `GET /api/admin/orders/analytics`

Order stats (sales, revenue)

### `GET /api/admin/products/analytics`

Product stats

### `POST /api/admin/orders/confirmandshiporder/:id`

Confirm & mark order as shipped

### `POST /api/admin/orders/setorderdelivered/:id`

Mark as delivered

---

## 🧪 Postman Collection

Use the included [Postman Collection](https://node-js-3727.postman.co/workspace/Node-js-Workspace~d1729c94-a0af-41f5-8307-a829a835ebfe/collection/43309484-a5061480-6eac-4d7a-9a20-0896e8cc5d99?action=share) for testing all routes.

---

> Made with ❤️ by [Shubham Gupta](https://github.com/shubham-gupta-iphtech)




