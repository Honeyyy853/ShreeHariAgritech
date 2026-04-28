import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./index.css";

const Home = () => {
  const [show, setShow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let openTimer;
    let closeTimer;
    openTimer = setTimeout(() => {
      setOpenChat(true);
      closeTimer = setTimeout(() => {
        setOpenChat(false);
      }, 4000);
    }, 5000);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  const sendMessage = async () => {
    if (!message) return;
    const userMsg = { sender: "user", text: message };
    setChat((prev) => [...prev, userMsg]);
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setChat((prev) => [...prev, { sender: "ai", text: data.reply }]);
    } catch (error) {
      console.error(error);
    }
    setMessage("");
  };

  return (
    <>
      <style>{`
        /* ── Hero ── */
        .shop-hero {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
          padding: 72px 0 60px;
          background: #fff;
          min-height: 88vh;
          display: flex;
          align-items: center;
        }
        .shop-hero.shop-hero-show {
          opacity: 1;
          transform: translateY(0);
        }

        .shop-badge {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: #111 !important;
          color: #fff !important;
          border-radius: 999px;
          padding: 6px 14px !important;
          display: inline-block;
        }

        .shop-title {
          font-size: clamp(1.75rem, 4vw, 2.6rem);
          font-weight: 800;
          line-height: 1.2;
          color: #111;
          letter-spacing: -0.02em;
        }

        .shop-subtitle {
          font-size: 1rem;
          color: #6c757d;
          line-height: 1.75;
          max-width: 480px;
        }

        .shop-hero-left {
          animation: fadeUp 0.7s ease both;
          animation-delay: 0.1s;
        }

        .shop-hero-right {
          animation: fadeUp 0.7s ease both;
          animation-delay: 0.25s;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .shop-image-wrap {
          position: relative;
          display: inline-block;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.12);
        }
        .shop-image-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(46,125,50,0.08) 0%, transparent 60%);
          z-index: 1;
          pointer-events: none;
        }
        .shop-hero-img {
          display: block;
          width: 100%;
          max-height: 460px;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .shop-image-wrap:hover .shop-hero-img {
          transform: scale(1.03);
        }

        /* Hero Buttons */
        .sh-hero-btn-primary {
          background: #111;
          color: #fff;
          border: 2px solid #111;
          padding: 11px 28px;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
          display: inline-block;
        }
        .sh-hero-btn-primary:hover {
          background: #333;
          border-color: #333;
          color: #fff;
        }
        .sh-hero-btn-outline {
          background: transparent;
          color: #111;
          border: 2px solid #111;
          padding: 11px 28px;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
          display: inline-block;
        }
        .sh-hero-btn-outline:hover {
          background: #111;
          color: #fff;
        }

        /* ── Chat FAB ── */
        .sh-chat-fab {
          position: fixed;
          bottom: 28px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #2e7d32;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(46,125,50,0.4);
          border: none;
          z-index: 1050;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .sh-chat-fab:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 28px rgba(46,125,50,0.5);
        }

        /* ── Chat Window ── */
        .sh-chat-window {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 340px;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.18);
          overflow: hidden;
          z-index: 1050;
          display: flex;
          flex-direction: column;
          animation: chatSlideUp 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .sh-chat-header {
          background: linear-gradient(135deg, #2e7d32, #66bb6a);
          color: #fff;
          padding: 14px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }
        .sh-chat-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .sh-chat-header-dot {
          width: 8px;
          height: 8px;
          background: #a5d6a7;
          border-radius: 50%;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.3);
          animation: pulse 1.8s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .sh-chat-close {
          background: none;
          border: none;
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          cursor: pointer;
          line-height: 1;
          padding: 2px 6px;
          border-radius: 4px;
          transition: color 0.15s, background 0.15s;
        }
        .sh-chat-close:hover {
          color: #fff;
          background: rgba(255,255,255,0.15);
        }

        .sh-chat-body {
          height: 260px;
          overflow-y: auto;
          padding: 14px;
          background: #f1f8f4;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scroll-behavior: smooth;
        }
        .sh-chat-body::-webkit-scrollbar { width: 4px; }
        .sh-chat-body::-webkit-scrollbar-thumb { background: #c8e6c9; border-radius: 4px; }

        .sh-chat-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #9e9e9e;
          font-size: 0.8rem;
          gap: 6px;
          text-align: center;
          height: 100%;
        }
        .sh-chat-empty-icon { font-size: 2rem; }

        .sh-msg-row { display: flex; }
        .sh-msg-row.user { justify-content: flex-end; }
        .sh-msg-row.ai   { justify-content: flex-start; }

        .sh-msg-bubble {
          max-width: 80%;
          padding: 9px 13px;
          border-radius: 14px;
          font-size: 0.845rem;
          line-height: 1.55;
        }
        .sh-msg-bubble.user {
          background: #2e7d32;
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .sh-msg-bubble.ai {
          background: #fff;
          color: #212529;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.07);
        }
        .sh-msg-bubble p { margin: 0; }
        .sh-msg-bubble ul, .sh-msg-bubble ol { padding-left: 16px; margin: 4px 0 0; }

        .sh-chat-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-top: 1px solid #e8f5e9;
          background: #fff;
          flex-shrink: 0;
        }
        .sh-chat-input {
          flex: 1;
          border: 1.5px solid #e0e0e0;
          border-radius: 999px;
          padding: 8px 14px;
          font-size: 0.845rem;
          outline: none;
          transition: border-color 0.2s;
          background: #fafafa;
        }
        .sh-chat-input:focus {
          border-color: #66bb6a;
          background: #fff;
        }
        .sh-chat-send {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #2e7d32;
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          transition: background 0.2s, transform 0.15s;
        }
        .sh-chat-send:hover {
          background: #1b5e20;
          transform: scale(1.05);
        }

        /* ── Popup ── */
        .sh-popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          padding: 16px;
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .sh-popup-card {
          background: #fff;
          border-radius: 20px;
          width: 100%;
          max-width: 360px;
          padding: 36px 28px 28px;
          text-align: center;
          position: relative;
          box-shadow: 0 24px 60px rgba(0,0,0,0.2);
          animation: popupIn 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes popupIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .sh-popup-close {
          position: absolute;
          top: 14px;
          right: 16px;
          background: #f5f5f5;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          font-size: 0.85rem;
          cursor: pointer;
          color: #616161;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
        }
        .sh-popup-close:hover { background: #e0e0e0; color: #111; }

        .sh-popup-badge {
          display: inline-block;
          background: #e8f5e9;
          color: #2e7d32;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 999px;
          margin-bottom: 14px;
        }

        .sh-popup-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #111;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 8px;
        }
        .sh-popup-title span { color: #2e7d32; }

        .sh-popup-desc {
          font-size: 0.875rem;
          color: #6c757d;
          margin-bottom: 22px;
          line-height: 1.6;
        }

        .sh-popup-btn {
          display: block;
          width: 100%;
          background: #2e7d32;
          color: #fff;
          border: none;
          padding: 12px 28px;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .sh-popup-btn:hover {
          background: #1b5e20;
          transform: translateY(-1px);
        }

        .sh-popup-skip {
          display: block;
          margin-top: 12px;
          font-size: 0.78rem;
          color: #9e9e9e;
          cursor: pointer;
          background: none;
          border: none;
          transition: color 0.15s;
          width: 100%;
        }
        .sh-popup-skip:hover { color: #555; }

        /* ── Responsive ── */
        @media (max-width: 991px) {
          .shop-hero {
            padding: 56px 0 48px;
            min-height: unset;
          }
          .shop-subtitle { max-width: 100%; }
        }

        @media (max-width: 767px) {
          .shop-hero { padding: 40px 0 40px; }
          .shop-hero-right { margin-top: 32px; }
          .sh-chat-window { width: calc(100vw - 32px); right: 16px; bottom: 16px; }
          .sh-chat-fab { bottom: 20px; right: 16px; }
        }

        @media (max-width: 480px) {
          .shop-title { font-size: 1.6rem; }
        }
      `}</style>

      <section className={`shop-hero ${show ? "shop-hero-show" : ""}`}>
        <div className="container">
          <div className="row align-items-center gy-4">

            {/* LEFT */}
            <div className="col-lg-6 text-center text-lg-start shop-hero-left">
              <span className="shop-badge mb-3">
                New Collection 2026
              </span>

              <h1 className="shop-title mb-3">
                Manufacturer &amp; Exporter of Dehydrated Fruits, Herbs &amp; Vegetables
              </h1>

              <p className="shop-subtitle mb-4">
                We are exporters of agricultural commodities. Flour, grains,
                fresh fruits and organic, Spices, eco-friendly Products and so on.
              </p>

              <div className="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap">
                <NavLink to="/product" className="sh-hero-btn-primary">
                  Shop Now
                </NavLink>
                <NavLink to="/about" className="sh-hero-btn-outline">
                  Learn More
                </NavLink>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-lg-6 text-center shop-hero-right">
              <div className="shop-image-wrap">
                <img
                  src="./assets/home.jpg"
                  alt="Shop hero"
                  className="img-fluid shop-hero-img"
                />
              </div>
            </div>

          </div>
        </div>

        {/* FAB */}
        {/* {!openChat && (
          <button
            className="sh-chat-fab"
            onClick={() => setOpenChat(true)}
            aria-label="Open AI chat"
          >
            🤖
          </button>
        )} */}

        {/* Chat Window */}
        {/* {openChat && !showPopup && (
          <div className="sh-chat-window">
            <div className="sh-chat-header">
              <div className="sh-chat-header-left">
                <span className="sh-chat-header-dot" />
                AI Assistant
              </div>
              <button className="sh-chat-close" onClick={() => setOpenChat(false)}>✕</button>
            </div>

            <div className="sh-chat-body">
              {chat.length === 0 ? (
                <div className="sh-chat-empty">
                  <span className="sh-chat-empty-icon">🌿</span>
                  <span>Hi! Ask me anything about our products.</span>
                </div>
              ) : (
                chat.map((msg, index) => (
                  <div key={index} className={`sh-msg-row ${msg.sender}`}>
                    <div className={`sh-msg-bubble ${msg.sender}`}>
                      {msg.sender === "ai" ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.text}
                        </ReactMarkdown>
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="sh-chat-input-row">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about our products…"
                className="sh-chat-input"
              />
              <button className="sh-chat-send" onClick={sendMessage}>➤</button>
            </div>
          </div>
        )} */}

        {/* Popup */}
        {showPopup && (
          <div className="sh-popup-overlay">
            <div className="sh-popup-card">
              <button className="sh-popup-close" onClick={() => setShowPopup(false)}>✕</button>
              <span className="sh-popup-badge">Limited Time</span>
              <h2 className="sh-popup-title">
                🔥 <span>25% Off</span> Today
              </h2>
              <p className="sh-popup-desc">
                Get 25% off on all dehydrated products. Fresh, organic &amp; straight from the farm.
              </p>
              <button
                className="sh-popup-btn"
                onClick={() => {
                  setShowPopup(false);
                  window.location.href = "/product";
                }}
              >
                Shop Now
              </button>
              <button className="sh-popup-skip" onClick={() => setShowPopup(false)}>
                No thanks, skip offer
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;