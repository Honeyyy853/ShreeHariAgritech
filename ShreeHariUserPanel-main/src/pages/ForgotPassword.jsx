import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Mail, Send, ArrowLeft } from "lucide-react";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendMail = async () => {
    if (email === "") {
      setMessage("Please enter your email address.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost/ShreeHari/forgotPwd/resetPwdApi.php",
        { email }
      );
      setMessage(res.data.message);
      setIsSuccess(res.data.status === true || res.data.status === "true");
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
      setIsSuccess(false);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSendMail();
  };

  return (
    <>
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        :root {
          --g900: #14532d;
          --g700: #15803d;
          --g600: #16a34a;
          --g500: #22c55e;
          --g100: #dcfce7;
          --g50:  #f0fdf4;
          --s900: #0f172a;
          --s700: #334155;
          --s500: #64748b;
          --s300: #cbd5e1;
          --s200: #e2e8f0;
          --s100: #f1f5f9;
          --s50:  #f8fafc;
          --red50: #fff1f2;
          --red500: #e11d48;
          --white: #ffffff;
        }

        .fp-page {
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(160deg, #f0fdf4 0%, #f8fafc 50%, #ffffff 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 16px 80px;
        }

        .fp-card {
          background: var(--white);
          border-radius: 28px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
          border: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
          width: 100%;
          max-width: 440px;
        }

        /* Top Banner */
        .fp-banner {
          background: linear-gradient(135deg, #14532d, #16a34a, #4ade80);
          padding: 36px 32px 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .fp-banner::before {
          content: '';
          position: absolute;
          width: 180px; height: 180px;
          background: rgba(255,255,255,0.08);
          border-radius: 50%;
          top: -60px; right: -40px;
        }

        .fp-banner::after {
          content: '';
          position: absolute;
          width: 100px; height: 100px;
          background: rgba(255,255,255,0.06);
          border-radius: 50%;
          bottom: -30px; left: -20px;
        }

        .fp-icon-wrap {
          width: 64px;
          height: 64px;
          background: rgba(255,255,255,0.18);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          position: relative;
          z-index: 1;
        }

        .fp-icon-wrap svg {
          color: #fff;
          width: 28px; height: 28px;
        }

        .fp-banner-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 6px;
          position: relative;
          z-index: 1;
        }

        .fp-banner-sub {
          font-size: 0.83rem;
          color: rgba(255,255,255,0.78);
          margin: 0;
          line-height: 1.55;
          position: relative;
          z-index: 1;
        }

        /* Body */
        .fp-body {
          padding: 30px 28px 32px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        @media (max-width: 400px) {
          .fp-body { padding: 24px 18px 26px; }
          .fp-banner { padding: 28px 20px 26px; }
        }

        /* Field */
        .fp-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .fp-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--s700);
          letter-spacing: .3px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .fp-label svg { width: 13px; height: 13px; color: var(--g600); }

        .fp-input-wrap {
          position: relative;
        }

        .fp-input {
          width: 100%;
          padding: 13px 44px 13px 14px;
          border: 1.5px solid var(--s200);
          border-radius: 13px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: var(--s900);
          background: var(--s50);
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .fp-input:focus {
          border-color: var(--g500);
          background: var(--white);
          box-shadow: 0 0 0 3px rgba(34,197,94,0.12);
        }

        .fp-input::placeholder { color: var(--s300); }

        /* Message */
        .fp-message {
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 500;
          line-height: 1.5;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          animation: fadeIn 0.25s ease;
        }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

        .fp-message.error {
          background: var(--red50);
          color: var(--red500);
          border: 1px solid #fecdd3;
        }

        .fp-message.success {
          background: var(--g50);
          color: var(--g700);
          border: 1px solid var(--g100);
        }

        /* Submit */
        .fp-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, var(--g700), var(--g500));
          color: #fff;
          border: none;
          border-radius: 13px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s;
          box-shadow: 0 6px 20px rgba(22,163,74,0.28);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .fp-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(22,163,74,0.4);
          filter: brightness(1.05);
        }

        .fp-btn:active:not(:disabled) { transform: scale(0.98); }

        .fp-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .fp-spinner {
          width: 16px; height: 16px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* Back Link */
        .fp-back-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 13px;
          color: var(--s500);
          text-decoration: none;
          transition: color 0.2s;
          padding-top: 4px;
        }

        .fp-back-link:hover { color: var(--g600); }

        .fp-back-link svg { width: 14px; height: 14px; }
      `}</style>

      <div className="fp-page">
        <div className="fp-card">
          {/* Banner */}
          <div className="fp-banner">
            <div className="fp-icon-wrap">
              <Mail />
            </div>
            <h1 className="fp-banner-title">Forgot Password?</h1>
            <p className="fp-banner-sub">
              Enter your email and we'll send you instructions to reset your password.
            </p>
          </div>

          {/* Form */}
          <div className="fp-body">
            <div className="fp-field">
              <label className="fp-label">
                <Mail size={13} /> Email Address
              </label>
              <div className="fp-input-wrap">
                <input
                  type="email"
                  className="fp-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            {/* Message */}
            {message && (
              <div className={`fp-message ${isSuccess ? "success" : "error"}`}>
                <span>{isSuccess ? "✅" : "⚠️"}</span>
                <span>{message}</span>
              </div>
            )}

            <button className="fp-btn" onClick={handleSendMail} disabled={loading}>
              {loading ? (
                <><div className="fp-spinner" /> Sending…</>
              ) : (
                <><Send size={16} /> Send Reset Link</>
              )}
            </button>

            <Link to="/login" className="fp-back-link">
              <ArrowLeft size={14} /> Back to Login
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}