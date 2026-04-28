import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkLogin = () => {
      const authStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(authStatus);
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowNavbar(false);
        setMenuOpen(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const menu = [
    { to: "/", label: "Home" },
    { to: "/product", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <style>{`
        :root {
          --nav-height: 70px;
          --ink: #212529;
          --ink-muted: #6c757d;
          --surface: #ffffff;
          --border: rgba(0,0,0,0.08);
          --accent: #212529;
          --danger: #dc3545;
          --pill-radius: 999px;
          --transition: 0.22s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sh-navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          transform: translateY(0);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.35s ease;
          will-change: transform;
        }

        .sh-navbar.nav-hidden {
          transform: translateY(-100%);
        }

        .sh-navbar.scrolled {
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }

        .sh-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: var(--nav-height);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* Brand */
        .sh-brand {
          font-family: inherit;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--ink);
          text-decoration: none;
          letter-spacing: 0.01em;
          line-height: 1;
          flex-shrink: 0;
          transition: color var(--transition);
        }
        .sh-brand span {
          color: var(--ink);
        }
        .sh-brand:hover {
          color: var(--ink-muted);
        }

        /* Desktop Menu */
        .sh-menu {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .sh-menu-link {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--ink-muted);
          text-decoration: none;
          padding: 6px 14px;
          border-radius: var(--pill-radius);
          letter-spacing: 0.03em;
          text-transform: uppercase;
          transition: color var(--transition), background var(--transition);
          position: relative;
        }
        .sh-menu-link:hover {
          color: var(--ink);
          background: rgba(0,0,0,0.04);
        }
        .sh-menu-link.active-link {
          color: var(--ink);
          font-weight: 600;
        }
        .sh-menu-link.active-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: var(--ink);
          border-radius: 2px;
        }

        /* Actions */
        .sh-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        /* Buttons */
        .sh-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 7px 16px;
          border-radius: var(--pill-radius);
          border: 1.5px solid transparent;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          transition: all var(--transition);
          line-height: 1;
        }
        .sh-btn i { font-size: 0.75rem; }

        .sh-btn-ghost {
          background: transparent;
          border-color: var(--ink);
          color: var(--ink);
        }
        .sh-btn-ghost:hover {
          background: var(--ink);
          color: #fff;
        }

        .sh-btn-solid {
          background: var(--ink);
          border-color: var(--ink);
          color: #fff;
        }
        .sh-btn-solid:hover {
          background: #2a2a2a;
          border-color: #2a2a2a;
        }

        .sh-btn-light {
          background: #f5f5f5;
          border-color: #e8e8e8;
          color: var(--ink);
        }
        .sh-btn-light:hover {
          background: #ebebeb;
          border-color: #ddd;
        }

        .sh-btn-danger {
          background: transparent;
          border-color: var(--danger);
          color: var(--danger);
        }
        .sh-btn-danger:hover {
          background: var(--danger);
          color: #fff;
        }

        /* Cart button */
        .sh-btn-cart {
          position: relative;
          background: transparent;
          border-color: var(--ink);
          color: var(--ink);
          padding: 7px 14px;
        }
        .sh-btn-cart:hover {
          background: var(--ink);
          color: #fff;
        }
        .sh-cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: var(--danger);
          color: #fff;
          font-size: 0.6rem;
          font-weight: 700;
          min-width: 17px;
          height: 17px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          border: 2px solid #fff;
          line-height: 1;
        }

        /* Divider */
        .sh-divider {
          width: 1px;
          height: 20px;
          background: var(--border);
          flex-shrink: 0;
        }

        /* Hamburger */
        .sh-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 8px;
          transition: background var(--transition);
          flex-shrink: 0;
        }
        .sh-hamburger:hover { background: rgba(0,0,0,0.05); }
        .sh-hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: var(--ink);
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          transform-origin: center;
        }
        .sh-hamburger.open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .sh-hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .sh-hamburger.open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* Mobile Drawer */
        .sh-drawer {
          position: fixed;
          top: var(--nav-height);
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255,255,255,0.99);
          backdrop-filter: blur(16px);
          z-index: 999;
          overflow-y: auto;
          padding: 24px 24px 40px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }
        .sh-drawer.open {
          transform: translateX(0);
        }

        .sh-drawer-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sh-drawer-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-muted);
          padding: 12px 4px 6px;
        }

        .sh-drawer-link {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: var(--ink);
          text-decoration: none;
          padding: 13px 16px;
          border-radius: 12px;
          transition: background var(--transition), color var(--transition);
        }
        .sh-drawer-link i {
          width: 18px;
          text-align: center;
          font-size: 0.875rem;
          color: var(--ink-muted);
        }
        .sh-drawer-link:hover,
        .sh-drawer-link.active-link {
          background: #f5f5f5;
          color: var(--ink);
        }
        .sh-drawer-link.active-link {
          font-weight: 600;
        }
        .sh-drawer-link.active-link i {
          color: var(--ink);
        }

        .sh-drawer-divider {
          height: 1px;
          background: var(--border);
          margin: 8px 0;
        }

        .sh-drawer-btn-row {
          display: flex;
          gap: 10px;
          padding: 4px 0;
        }
        .sh-drawer-btn-row .sh-btn {
          flex: 1;
          justify-content: center;
          font-size: 0.875rem;
          padding: 11px 16px;
        }

        .sh-drawer-logout {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: var(--danger);
          padding: 13px 16px;
          border-radius: 12px;
          background: none;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: background var(--transition);
        }
        .sh-drawer-logout i {
          width: 18px;
          text-align: center;
          font-size: 0.875rem;
        }
        .sh-drawer-logout:hover {
          background: #fff1f1;
        }

        /* Responsive */
        @media (max-width: 991px) {
          .sh-menu,
          .sh-actions,
          .sh-divider {
            display: none;
          }
          .sh-hamburger {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .sh-inner {
            padding: 0 16px;
          }
          .sh-brand {
            font-size: 1.45rem;
          }
          .sh-drawer {
            padding: 20px 16px 40px;
          }
        }
      `}</style>

      <nav
        className={`sh-navbar${!showNavbar ? " nav-hidden" : ""}${lastScrollY.current > 0 ? " scrolled" : ""}`}
      >
        <div className="sh-inner">
          {/* Brand */}
          <NavLink className="sh-brand" to="/">
            Shree Hari
          </NavLink>

          {/* Desktop Menu */}
          <ul className="sh-menu">
            {menu.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `sh-menu-link${isActive ? " active-link" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="sh-actions">
            {!isLoggedIn ? (
              <>
                <NavLink to="/login" className="sh-btn sh-btn-ghost">
                  Login
                </NavLink>
                <NavLink to="/register" className="sh-btn sh-btn-solid">
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/profile" className="sh-btn sh-btn-light">
                  <i className="fa fa-user" />
                  Profile
                </NavLink>
                <NavLink to="/orders" className="sh-btn sh-btn-light">
                  <i className="fa fa-shopping-bag" />
                  Orders
                </NavLink>
                <NavLink to="/orderhistory" className="sh-btn sh-btn-light">
                  <i className="fa fa-history" />
                  History
                </NavLink>
                <div className="sh-divider" />
                <button onClick={handleLogout} className="sh-btn sh-btn-danger">
                  Logout
                </button>
                <NavLink to="/cart" className="sh-btn sh-btn-cart">
                  <i className="fa fa-cart-shopping" />
                  <span className="sh-cart-badge"></span>
                </NavLink>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className={`sh-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`sh-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        {/* Nav Links */}
        <div className="sh-drawer-section">
          <p className="sh-drawer-label">Navigation</p>
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sh-drawer-link${isActive ? " active-link" : ""}`
              }
            >
              {item.to === "/" && <i className="fa fa-house" />}
              {item.to === "/product" && <i className="fa fa-box" />}
              {item.to === "/about" && <i className="fa fa-circle-info" />}
              {item.to === "/contact" && <i className="fa fa-envelope" />}
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="sh-drawer-divider" />

        {/* Auth / Account */}
        {!isLoggedIn ? (
          <div className="sh-drawer-section">
            <p className="sh-drawer-label">Account</p>
            <div className="sh-drawer-btn-row">
              <NavLink to="/login" className="sh-btn sh-btn-ghost">
                Login
              </NavLink>
              <NavLink to="/register" className="sh-btn sh-btn-solid">
                Register
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="sh-drawer-section">
            <p className="sh-drawer-label">Account</p>
            <NavLink to="/profile" className="sh-drawer-link">
              <i className="fa fa-user" />
              Profile
            </NavLink>
            <NavLink to="/orders" className="sh-drawer-link">
              <i className="fa fa-shopping-bag" />
              Orders
            </NavLink>
            <NavLink to="/orderhistory" className="sh-drawer-link">
              <i className="fa fa-history" />
              Order History
            </NavLink>
            <NavLink to="/cart" className="sh-drawer-link">
              <i className="fa fa-cart-shopping" />
              Cart
            </NavLink>
            <div className="sh-drawer-divider" />
            <button onClick={handleLogout} className="sh-drawer-logout">
              <i className="fa fa-right-from-bracket" />
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;