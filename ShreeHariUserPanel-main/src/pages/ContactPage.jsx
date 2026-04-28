import React, { useState } from "react";
import axios from "axios";
import { Footer, Navbar } from "../components";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry_type: "",
    product: "",
    quantity: "",
    message: "",
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const options = ["Bulk Order", "Supplier Partnership", "General Inquiry"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (value) => {
    setForm({ ...form, inquiry_type: value });
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost/ShreeHari/contact_mail.php", form);
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        inquiry_type: "",
        product: "",
        quantity: "",
        message: "",
      });
    } catch (err) {
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <style>{`
        /* ── Page ─────────────────────────────────── */
        .contact-section {
          min-height: calc(100vh - 70px);
          background: #f8f9f6;
          display: flex;
          align-items: center;
          padding: 60px 0;
        }

        /* ── Card ─────────────────────────────────── */
        .contact-box {
          display: flex;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.09);
          background: #fff;
        }

        /* ── Left Panel ───────────────────────────── */
        .left-panel {
          flex: 0 0 320px;
          background: #111;
          color: #fff;
          padding: 48px 36px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .left-panel::before {
          content: '';
          position: absolute;
          width: 260px;
          height: 260px;
          background: rgba(76,175,80,0.12);
          border-radius: 50%;
          bottom: -80px;
          right: -80px;
          pointer-events: none;
        }

        .left-panel::after {
          content: '';
          position: absolute;
          width: 140px;
          height: 140px;
          background: rgba(76,175,80,0.08);
          border-radius: 50%;
          top: -40px;
          left: -40px;
          pointer-events: none;
        }

        .lp-eyebrow {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #4caf50;
          margin-bottom: 12px;
          display: block;
        }

        .lp-title {
          font-size: 1.65rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.25;
          margin-bottom: 14px;
          letter-spacing: -0.02em;
        }

        .lp-desc {
          font-size: 0.875rem;
          color: #9e9e9e;
          line-height: 1.75;
          margin: 0;
        }

        .lp-contacts {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 40px;
          position: relative;
          z-index: 1;
        }

        .lp-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .lp-contact-icon {
          width: 36px;
          height: 36px;
          background: rgba(76,175,80,0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          flex-shrink: 0;
        }

        .lp-contact-text {
          font-size: 0.825rem;
          color: #bdbdbd;
          line-height: 1.4;
        }

        .lp-contact-text strong {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #757575;
          margin-bottom: 2px;
        }

        /* ── Right Panel ──────────────────────────── */
        .right-panel {
          flex: 1;
          padding: 48px 44px;
          display: flex;
          align-items: center;
        }

        .rp-inner {
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
        }

        .rp-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: #111;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        .rp-subtitle {
          font-size: 0.825rem;
          color: #9e9e9e;
          margin-bottom: 28px;
        }

        /* ── Form Fields ──────────────────────────── */
        .cf-group {
          position: relative;
          margin-bottom: 20px;
        }

        .cf-label {
          display: block;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9e9e9e;
          margin-bottom: 6px;
        }

        .cf-input {
          width: 100%;
          border: 1.5px solid #e8e8e8;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.875rem;
          color: #111;
          background: #fafafa;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          outline: none;
          font-family: inherit;
        }

        .cf-input::placeholder {
          color: #bdbdbd;
        }

        .cf-input:focus {
          border-color: #4caf50;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(76,175,80,0.1);
        }

        textarea.cf-input {
          resize: vertical;
          min-height: 90px;
        }

        /* ── Custom Dropdown ──────────────────────── */
        .dropdown-custom {
          position: relative;
          margin-bottom: 20px;
        }

        .dropdown-header {
          width: 100%;
          border: 1.5px solid #e8e8e8;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.875rem;
          color: #111;
          background: #fafafa;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          user-select: none;
        }

        .dropdown-header.placeholder {
          color: #bdbdbd;
        }

        .dropdown-header:hover,
        .dropdown-header.active {
          border-color: #4caf50;
          box-shadow: 0 0 0 3px rgba(76,175,80,0.1);
        }

        .dropdown-chevron {
          font-size: 0.7rem;
          color: #9e9e9e;
          transition: transform 0.2s ease;
        }

        .dropdown-chevron.rotated {
          transform: rotate(180deg);
        }

        .dropdown-list {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: #fff;
          border-radius: 12px;
          border: 1.5px solid #e8e8e8;
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
          z-index: 100;
          overflow: hidden;
          animation: dropIn 0.15s ease;
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .dropdown-item {
          padding: 11px 14px;
          font-size: 0.875rem;
          color: #333;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .dropdown-item:hover {
          background: #f0fdf4;
          color: #111;
        }

        .dropdown-item:not(:last-child) {
          border-bottom: 1px solid #f5f5f5;
        }

        /* ── Submit Button ────────────────────────── */
        .btn-modern {
          background: #111;
          color: #fff;
          border: none;
          padding: 13px 24px;
          border-radius: 10px;
          width: 100%;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
          font-family: inherit;
        }

        .btn-modern:hover:not(:disabled) {
          background: #222;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          transform: translateY(-1px);
        }

        .btn-modern:active {
          transform: translateY(0);
        }

        .btn-modern:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        /* ── Success Screen ───────────────────────── */
        .success-screen {
          text-align: center;
          width: 100%;
          animation: fadeIn 0.5s ease;
          padding: 20px 0;
        }

        .success-icon {
          width: 72px;
          height: 72px;
          background: #f0fdf4;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 2rem;
          animation: pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .success-screen h3 {
          font-size: 1.4rem;
          font-weight: 800;
          color: #111;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .success-screen p {
          font-size: 0.875rem;
          color: #9e9e9e;
          line-height: 1.7;
          max-width: 320px;
          margin: 0 auto;
        }

        @keyframes pop {
          0%   { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1);   opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ───────────────────────────── */
        @media (max-width: 991px) {
          .contact-box {
            flex-direction: column;
          }

          .left-panel {
            flex: none;
            padding: 36px 30px;
          }

          .lp-contacts {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 28px;
          }

          .right-panel {
            padding: 36px 30px;
          }
        }

        @media (max-width: 576px) {
          .contact-section {
            padding: 40px 0;
          }

          .left-panel {
            padding: 28px 20px;
          }

          .lp-title {
            font-size: 1.35rem;
          }

          .lp-contacts {
            flex-direction: column;
            gap: 14px;
          }

          .right-panel {
            padding: 28px 20px;
          }
        }
      `}</style>

      <div className="contact-section">
        <div className="container">
          <div className="contact-box">

            {/* LEFT */}
            <div className="left-panel">
              <div>
                <span className="lp-eyebrow">Get in Touch</span>
                <h2 className="lp-title">Let's Connect 🌿</h2>
                <p className="lp-desc">
                  Bulk orders, dehydrated products, or partnerships —
                  send us your requirements and we'll get back to you.
                </p>
              </div>

              <div className="lp-contacts">
                <div className="lp-contact-item">
                  <div className="lp-contact-icon">📞</div>
                  <div className="lp-contact-text">
                    <strong>Phone</strong>
                    +91 8200050980
                  </div>
                </div>
                <div className="lp-contact-item">
                  <div className="lp-contact-icon">📧</div>
                  <div className="lp-contact-text">
                    <strong>Email</strong>
                    shreehariagri02@gmail.com
                  </div>
                </div>
                <div className="lp-contact-item">
                  <div className="lp-contact-icon">📍</div>
                  <div className="lp-contact-text">
                    <strong>Location</strong>
                    Navsari, Gujarat, India
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="right-panel">

              {!submitted ? (
                <div className="rp-inner">
                  <h3 className="rp-title">Send Inquiry</h3>
                  <p className="rp-subtitle">Fill in the details and we'll respond within 24 hours.</p>

                  <form onSubmit={handleSubmit}>

                    <div className="row g-3 mb-0">
                      <div className="col-md-6">
                        <div className="cf-group">
                          <label className="cf-label">Name</label>
                          <input type="text" className="cf-input" placeholder="Your full name"
                            name="name" value={form.name} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="cf-group">
                          <label className="cf-label">Email</label>
                          <input type="email" className="cf-input" placeholder="you@email.com"
                            name="email" value={form.email} onChange={handleChange} required />
                        </div>
                      </div>
                    </div>

                    <div className="cf-group">
                      <label className="cf-label">Phone</label>
                      <input type="text" className="cf-input" placeholder="+91 XXXXX XXXXX"
                        name="phone" value={form.phone} onChange={handleChange} />
                    </div>

                    <div className="dropdown-custom">
                      <label className="cf-label">Inquiry Type</label>
                      <div
                        className={`dropdown-header${!form.inquiry_type ? " placeholder" : ""}${open ? " active" : ""}`}
                        onClick={() => setOpen(!open)}
                      >
                        <span>{form.inquiry_type || "Select inquiry type"}</span>
                        <span className={`dropdown-chevron${open ? " rotated" : ""}`}>▼</span>
                      </div>
                      {open && (
                        <div className="dropdown-list">
                          {options.map((opt, i) => (
                            <div key={i} className="dropdown-item" onClick={() => handleSelect(opt)}>
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="row g-3 mb-0">
                      <div className="col-md-6">
                        <div className="cf-group">
                          <label className="cf-label">Product</label>
                          <input type="text" className="cf-input" placeholder="Product name"
                            name="product" value={form.product} onChange={handleChange} />
                        </div>
                      </div>
                      {form.inquiry_type === "Bulk Order" && (
                        <div className="col-md-6">
                          <div className="cf-group">
                            <label className="cf-label">Quantity</label>
                            <input type="text" className="cf-input" placeholder="e.g. 50 kg"
                              name="quantity" value={form.quantity} onChange={handleChange} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="cf-group">
                      <label className="cf-label">Message</label>
                      <textarea rows="3" className="cf-input" placeholder="Tell us more about your requirements..."
                        name="message" value={form.message} onChange={handleChange} required />
                    </div>

                    <button className="btn-modern" disabled={loading}>
                      {loading ? "Sending…" : "Send Message →"}
                    </button>

                  </form>
                </div>
              ) : (
                <div className="success-screen">
                  <div className="success-icon">🌿</div>
                  <h3>Request Received!</h3>
                  <p>
                    Thanks for reaching out. Our team will review your inquiry
                    and contact you shortly.
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;