import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar, Footer } from "../components";
import { CheckCircle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const loginUser = () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!email || !password) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post("http://localhost/ShreeHari/UserPanelAPI/LoginAPi.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("user_id", res.data.user_id);
          const mailData = new FormData();
          mailData.append("email", email);
          mailData.append("type", "login");
          axios
            .post("http://localhost/ShreeHari/sendMail.php", mailData)
            .then(() => console.log("Welcome email sent"))
            .catch((err) => console.log("Mail error:", err));
          setShowSuccess(true);
          setTimeout(() => navigate("/"), 1500);
        } else {
          alert("Invalid email or password");
        }
      })
      .catch(() => alert("Server error"))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Navbar />

      <style>{`
        .auth-page {
          min-height: calc(100vh - 70px);
          background: #f8f9f6;
          display: flex;
          align-items: center;
          padding: 60px 0;
        }

        .auth-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.08);
          overflow: hidden;
          width: 100%;
        }

        .auth-card-header {
          background: #111;
          padding: 32px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .auth-card-header::before {
          content: '';
          position: absolute;
          width: 180px;
          height: 180px;
          background: rgba(76,175,80,0.1);
          border-radius: 50%;
          top: -60px;
          right: -40px;
          pointer-events: none;
        }

        .auth-card-header::after {
          content: '';
          position: absolute;
          width: 100px;
          height: 100px;
          background: rgba(76,175,80,0.07);
          border-radius: 50%;
          bottom: -30px;
          left: -20px;
          pointer-events: none;
        }

        .auth-eyebrow {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #4caf50;
          margin-bottom: 8px;
          display: block;
          position: relative;
          z-index: 1;
        }

        .auth-card-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin: 0;
          position: relative;
          z-index: 1;
        }

        .auth-card-body {
          padding: 36px 40px 40px;
        }

        .auth-success {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 0.875rem;
          color: #166534;
          margin-bottom: 24px;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Fields */
        .af-group {
          margin-bottom: 20px;
        }

        .af-label {
          display: block;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9e9e9e;
          margin-bottom: 7px;
        }

        .af-input {
          width: 100%;
          border: 1.5px solid #e8e8e8;
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 0.9rem;
          color: #111;
          background: #fafafa;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          outline: none;
          font-family: inherit;
        }

        .af-input::placeholder { color: #bdbdbd; }

        .af-input:focus {
          border-color: #4caf50;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(76,175,80,0.1);
        }

        /* Forgot */
        .auth-forgot {
          text-align: right;
          margin-top: -10px;
          margin-bottom: 24px;
        }

        .auth-forgot a {
          font-size: 0.78rem;
          color: #9e9e9e;
          text-decoration: none;
          transition: color 0.2s;
        }

        .auth-forgot a:hover { color: #4caf50; }

        /* Submit */
        .auth-btn {
          width: 100%;
          padding: 13px;
          background: #111;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
        }

        .auth-btn:hover:not(:disabled) {
          background: #222;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          transform: translateY(-1px);
        }

        .auth-btn:active { transform: translateY(0); }

        .auth-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Footer link */
        .auth-switch {
          text-align: center;
          margin-top: 24px;
          font-size: 0.85rem;
          color: #9e9e9e;
        }

        .auth-switch a {
          color: #4caf50;
          font-weight: 700;
          text-decoration: none;
        }

        .auth-switch a:hover { text-decoration: underline; }

        /* Responsive */
        @media (max-width: 576px) {
          .auth-page { padding: 40px 0; }
          .auth-card-header { padding: 26px 24px; }
          .auth-card-body { padding: 28px 24px 32px; }
        }
      `}</style>

      <div className="auth-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 col-sm-10">

              {showSuccess && (
                <div className="auth-success">
                  <CheckCircle size={16} />
                  <span>Login successful. Redirecting…</span>
                </div>
              )}

              <div className="auth-card">
                <div className="auth-card-header">
                  <span className="auth-eyebrow">Shree Hari Agritech</span>
                  <h3 className="auth-card-title">Welcome Back</h3>
                </div>

                <div className="auth-card-body">

                  <div className="af-group">
                    <label className="af-label">Email Address</label>
                    <input ref={emailRef} type="email" className="af-input"
                      placeholder="you@email.com" />
                  </div>

                  <div className="af-group">
                    <label className="af-label">Password</label>
                    <input ref={passwordRef} type="password" className="af-input"
                      placeholder="Enter your password" />
                  </div>

                  <div className="auth-forgot">
                    <a href="/forgot-password">Forgot password?</a>
                  </div>

                  <button className="auth-btn" onClick={loginUser} disabled={loading}>
                    {loading ? "Signing in…" : "Sign In →"}
                  </button>

                  <p className="auth-switch">
                    Don't have an account?{" "}
                    <Link to="/register">Create account</Link>
                  </p>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;