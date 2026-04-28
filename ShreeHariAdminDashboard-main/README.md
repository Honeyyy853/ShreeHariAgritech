# 🛡️ ShreeHari Admin Dashboard

<p>
  <img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
</p>

## 📖 Description
The **ShreeHari Admin Dashboard** is the command center of the ShreeHariAgriTech platform. Engineered specifically for administrators, it provides an intuitive, real-time interface to oversee business operations, manage vast product catalogs, analyze sales data, and track customer orders effortlessly.

## ✨ Features & Key Functionalities
- **Comprehensive Analytics:** Visual statistical summaries of total users, revenue, and active orders.
- **Product Management (CRUD):** 
  - Add new products with rich details and images.
  - Edit pricing, stock availability, and categories.
  - Delete obsolete inventory.
- **Order Management:** View incoming orders, verify transaction details, and update shipping/delivery statuses.
- **User Oversight:** Browse registered customers to ensure platform integrity.
- **Secure Access:** Protected routes ensuring only authorized personnel can make system-wide changes.

## 🛠️ Tech Stack
- **Framework:** React.js
- **Routing:** React Router v6
- **State Management:** React Hooks / Context API
- **HTTP Client:** Axios

## ⚙️ Setup & Run Instructions

### Prerequisites
- Global installation of [Node.js](https://nodejs.org/).
- The **ShreeHari PHP Backend** must be actively running on a local Apache server (e.g., XAMPP).

### Installation
1. Open your terminal and navigate to the Admin Dashboard directory:
   ```bash
   cd ShreeHariAdminDashboard-main
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. The application will typically boot up at `http://localhost:3001` (if 3000 is occupied).

*Note: Verify that the API base URL inside the frontend code points appropriately to `http://localhost/ShreeHari`.*
