````markdown
# 🛒 E-Commerce API

A RESTful API for a full-featured e-commerce platform, built with **Node.js**, **Express**, **MongoDB**, and **Mongoose**. It handles user management, product catalog, shopping cart, and orders.

---

## 🚀 Features & Endpoints

### 🔑 **Authentication**
- `POST /api/auth/register`: Create a new user account  
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
````

* `POST /api/auth/login`: Log in a user

  ```json
  { "email": "john@example.com", "password": "securepassword" }
  ```
* *On success:* Receives a JWT token for authenticated operations.

---

### 👤 **User Profile**

* `GET /api/users/:id`: Retrieve a user profile
* `PUT /api/users/:id`: Update user information
* `DELETE /api/users/:id`: Remove a user account

*All routes require JWT auth; users can only manage their own profile (unless admin).*

---

### 📦 **Product Catalog**

* `POST /api/products`: Add a new product (admin only)

  ```json
  {
    "title": "Sneakers",
    "description": "Comfortable running shoes",
    "price": 59.99,
    "inStock": true,
    "categories": ["shoes", "sports"]
  }
  ```
* `GET /api/products/:id`: Fetch a product by ID
* `PUT /api/products/:id`: Edit product details (admin only)
* `DELETE /api/products/:id`: Remove a product (admin only)
* `GET /api/products`: List products with optional filters:

  * `?category=shoes`
  * `?sort=asc|desc` (by date or price)
  * `?new=true` (most recent)

---

### 🛒 **Cart**

* `POST /api/carts/`: Create/update user cart

  ```json
  {
    "userId": "user123",
    "products": [
      { "productId": "prod1", "quantity": 2 },
      { "productId": "prod2", "quantity": 1 }
    ]
  }
  ```
* `PUT /api/carts/:id`: Modify cart items
* `DELETE /api/carts/:id`: Clear the entire cart
* `GET /api/carts/:userId`: Fetch user’s cart

*(Cart routes require the user’s JWT and apply only to their own cart.)*

---

### 📑 **Orders**

* `POST /api/orders`: Create a new order from cart

  ```json
  {
    "userId": "user123",
    "products": [ { "productId": "prod1", "quantity": 2 }, ... ],
    "amount": 119.98,
    "address": "123 Main St, City",
    "status": "pending"
  }
  ```
* `PUT /api/orders/:id`: Update order (admin only)
* `GET /api/orders/:userId`: User can view their orders
* `GET /api/orders`: Admin-only: view all orders
* `GET /api/orders/income`: Admin-only: view monthly income stats

---

## 🗄️ Tech Stack

* **Server**: Node.js + Express
* **Database**: MongoDB + Mongoose
* **Auth**: JWT token-based authentication
* **Security**: Route protection for users/admins

---

## 💾 Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/shubham-gupta-iphtech/E-Commerce-API-Project.git
   cd E-Commerce-API-Project
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file:

   ```env
   PORT=5000
   MONGO_URI=<your-mongo-db-connection-string>
   JWT_SECRET=<your_jwt_secret>
   ```
4. Run the server:

   ```bash
   npm start
   ```

   Server runs at `http://localhost:5000`.

---

## 🧪 Testing the API

* Tools: [Postman](https://www.postman.com), [Insomnia](https://insomnia.rest/), or `curl`
* Example flow:

  1. Register ➡️ receive user
  2. Login ➡️ receive JWT token
  3. Create/update Cart
  4. Create Order
  5. Admin actions: manage products/orders

---

## 🛡️ Authorization Rules

| Route                  | Access                               |
| ---------------------- | ------------------------------------ |
| `/api/auth/*`          | Public                               |
| `/api/users/:id`       | User owns account or admin           |
| `/api/products`        | Admin only (`POST`, `PUT`, `DELETE`) |
| `/api/products` filter | Public (`GET`)                       |
| `/api/carts`           | Authenticated user only              |
| `/api/orders`          | Authenticated users; admin sees all  |
| `/api/orders/income`   | Admin only                           |

---

## 🧑‍🤝‍🧑 Contributions

Contributions are welcome! Steps:

1. Fork the repo
2. Create a feature branch (`git checkout -b add-feature`)
3. Make changes & test
4. Submit a Pull Request

---

> Built with ❤️ by [Shubham Gupta](https://github.com/shubham-gupta-iphtech)

```

