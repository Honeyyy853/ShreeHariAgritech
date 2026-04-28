import React, { useEffect, useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

const Footer = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        .shop-footer {
          background: #111;
          color: #e5e5e5;
          padding: 56px 0 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }

        .shop-footer.shop-footer-show {
          opacity: 1;
          transform: translateY(0);
        }

        /* Brand column */
        .sf-brand-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.02em;
          margin-bottom: 10px;
        }

        .sf-brand-name span {
          color: #4caf50;
        }

        .sf-brand-desc {
          font-size: 0.85rem;
          color: #9e9e9e;
          line-height: 1.7;
          max-width: 300px;
        }

        /* Divider accent line under brand */
        .sf-brand-line {
          width: 36px;
          height: 2px;
          background: #4caf50;
          border-radius: 2px;
          margin: 14px 0 16px;
        }

        /* Section headings */
        .sf-section-title {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #757575;
          margin-bottom: 18px;
        }

        /* Contact list */
        .shop-footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .shop-footer-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.875rem;
          color: #bdbdbd;
          line-height: 1.6;
        }

        .sf-icon {
          flex-shrink: 0;
          margin-top: 3px;
          color: #4caf50;
          font-size: 0.9rem;
        }

        /* Quick links */
        .sf-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sf-links a {
          font-size: 0.875rem;
          color: #bdbdbd;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s ease;
        }

        .sf-links a::before {
          content: '';
          display: inline-block;
          width: 14px;
          height: 1px;
          background: #4caf50;
          flex-shrink: 0;
          transition: width 0.2s ease;
        }

        .sf-links a:hover {
          color: #fff;
        }

        .sf-links a:hover::before {
          width: 20px;
        }

        /* Divider */
        .sf-hr {
          border: none;
          border-top: 1px solid #222;
          margin: 40px 0 0;
        }

        /* Bottom bar */
        .sf-bottom {
          padding: 18px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }

        .sf-copyright {
          font-size: 0.78rem;
          color: #616161;
        }

        .sf-made {
          font-size: 0.78rem;
          color: #616161;
        }

        .sf-made span {
          color: #4caf50;
        }

        /* Responsive */
        @media (max-width: 767px) {
          .shop-footer {
            padding: 40px 0 0;
          }

          .sf-brand-desc {
            max-width: 100%;
          }

          .sf-bottom {
            justify-content: center;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .sf-brand-name {
            font-size: 1.1rem;
          }
        }
      `}</style>

      <footer className={`shop-footer ${show ? "shop-footer-show" : ""}`}>
        <div className="container">
          <div className="row gy-5">

            {/* Brand */}
            <div className="col-lg-4 col-md-12">
              <div className="sf-brand-name">
                Shree Hari <span>Agritech</span>
              </div>
              <div className="sf-brand-line" />
              <p className="sf-brand-desc">
                Quality agriculture products and trusted services for farmers
                and businesses across India.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-sm-6">
              <p className="sf-section-title">Quick Links</p>
              <ul className="sf-links">
                <li><a href="/">Home</a></li>
                <li><a href="/product">Products</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-lg-5 col-sm-6 offset-lg-1">
              <p className="sf-section-title">Contact Us</p>
              <ul className="shop-footer-list">
                <li>
                  <IoCall className="sf-icon" />
                  <span>+91 8200050980, +91 9265669191</span>
                </li>
                <li>
                  <FaEnvelope className="sf-icon" />
                  <span>shreehariagri02@gmail.com</span>
                </li>
                <li>
                  <FaMapMarkerAlt className="sf-icon" />
                  <span>
                    4022, Mota Faliya, Devsar, Bilimora Gandevi Road,
                    Navsari, Gujarat, India — 396380
                  </span>
                </li>
              </ul>
            </div>

          </div>

          <hr className="sf-hr" />

          <div className="sf-bottom">
            <span className="sf-copyright">
              &copy; 2026 Shree Hari Agritech. All Rights Reserved.
            </span>
            <span className="sf-made">
              Made with <span>♥</span> in Gujarat
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;