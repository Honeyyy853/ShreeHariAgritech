# 🛒 ShreeHari User Panel

<p>
  <img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Payments-Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=white" alt="Razorpay" />
</p>

## 📖 Description
The **ShreeHari User Panel** is a beautifully crafted, responsive customer-facing storefront for the ShreeHariAgriTech platform. Designed for maximizing user experience and conversion, it empowers farmers and customers to explore agricultural equipment, manage their carts, and execute highly secure checkout processes.

## ✨ Features
- **Dynamic Browsing:** High-performance product feeds sourced directly from the PHP APIs.
- **Advanced Filtering & Search:** Easily sort products by category, price, or relevance.
- **Robust Shopping Cart:** Persisted cart states, real-time total calculation, and quantity updates.
- **Secure Checkout:** Full integration with the Razorpay Payment Gateway for smooth transaction finalization.
- **User Accounts:** Seamless Login/Registration systems to track past orders and secure user data.

## 🛠️ Tech Stack
- **Framework:** React.js
- **Routing:** React Router
- **State & Data Handling:** Context API, Axios
- **Payments:** Razorpay Web Integration

## ⚙️ Setup & Run Instructions

### Prerequisites
- Global installation of [Node.js](https://nodejs.org/).
- Ensure the **ShreeHari PHP Backend** and Database are actively running locally via XAMPP/WAMP.

### Installation
1. Open your terminal and navigate to the User Panel directory:
   ```bash
   cd ShreeHariUserPanel-main
   ```
2. Install Node modules:
   ```bash
   npm install
   ```
3. Boot the development server:
   ```bash
   npm start
   ```
4. Access the storefront locally at `http://localhost:3000`.

### Razorpay Configuration
The frontend relies on Razorpay for payment pop-ups. Ensure your test API key (`rzp_test_...`) is accurately configured within the checkout component to allow dummy transactions.