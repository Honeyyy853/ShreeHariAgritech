# ⚙️ ShreeHari Backend APIs

<p>
  <img src="https://img.shields.io/badge/Language-PHP_8+-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP" />
  <img src="https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
</p>

## 📖 Description
The **ShreeHari Backend** serves as the core data engine and secure REST API for the ShreeHariAgriTech ecosystem. Built purely in PHP and decoupled from the frontend, it efficiently handles requests from both the User Panel and Admin Dashboard, ensuring fast, secure, and reliable communication with the MySQL database.

## ✨ Features
- **API Endpoints:** Dedicated endpoints for Users, Categories, Products, and Orders.
- **Authentication Handling:** Secure mechanisms to validate credentials and protect sensitive data.
- **Payment Processing:** Handles Razorpay order creation verifications securely on the server-side.
- **CORS Configuration:** Pre-configured headers to facilitate seamless cross-origin browser requests.
- **Data Validation:** Server-side checks to guarantee the integrity of data entering the database.

## 🏗️ API Structure Overview
The APIs are generally categorized into standard endpoint modules:
- `/auth/` - Login, Registration, Session checks.
- `/products/` - Fetch, Insert, Update, and Delete actions for the catalog.
- `/orders/` - Order insertions, status updates, and retrieval per user.
- `/admin/` - Admin-specific metric aggregations.

## ⚙️ Setup Instructions
1. Install [XAMPP](https://www.apachefriends.org/) or [WAMP] on your local machine.
2. Start the **Apache** and **MySQL** modules.
3. Locate your server root (e.g., `htdocs` for XAMPP, `www` for WAMP).
4. **Copy the `ShreeHari` folder** into the server root directory.
   - Example path: `C:\xampp\htdocs\ShreeHari`
5. Create a database `shreeharidb` using `phpMyAdmin` and import the `shreeharidb.sql` file (found in the root project space).
6. Verify access by typing `http://localhost/ShreeHari/...` (to an endpoint file) in your browser.

## 🔗 Connecting with the Frontend
The React applications communicate with this backend via absolute URLs. 
If the API folder is deployed on `localhost` via XAMPP, the frontend Axios configs should point to:
```javascript
const API_BASE_URL = "http://localhost/ShreeHari";
// Ensure correct paths in frontend environment variables or API service files.
```

If CORS errors occur, ensure the PHP files have standardized headers indicating: `Access-Control-Allow-Origin: *` (or the specific port `http://localhost:3000`).
