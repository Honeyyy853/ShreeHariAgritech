import { Navbar, Main, Footer } from "../components";
import React from "react";

function Home() {
  return (
    <>
      <Navbar />
      <Main />

      {/* Business Intro Section */}
      <section className="business-section">
        <div className="container">

          <div className="bs-header">
            <p className="bs-eyebrow">Who We Are</p>
            <h2 className="bs-title">About Our Business</h2>
            <p className="bs-subtitle">
              Delivering premium agricultural products from trusted farmers to global markets.
            </p>
          </div>

          <div className="row align-items-center g-5">

            {/* Left Content */}
            <div className="col-lg-6">
              <h3 className="bs-brand-name">Shree Hari Agritech</h3>
              <div className="bs-brand-line" />

              <p className="bs-body">
                Shree Hari Agritech is dedicated to supplying high-quality agricultural
                products sourced directly from trusted farmers. Our mission is to
                connect Indian agriculture with global markets while maintaining the
                highest standards of quality and sustainability.
              </p>
              <p className="bs-body">
                We specialize in herbs, dehydrated fruits, and vegetables that are
                processed and packed carefully to preserve their natural taste and
                nutritional value.
              </p>
              <p className="bs-body">
                Through innovation, quality control, and strong farmer partnerships,
                we aim to deliver the best agro products to customers worldwide.
              </p>

              <div className="bs-stats">
                <div className="bs-stat">
                  <span className="bs-stat-num">100%</span>
                  <span className="bs-stat-label">Natural</span>
                </div>
                <div className="bs-stat-divider" />
                <div className="bs-stat">
                  <span className="bs-stat-num">50+</span>
                  <span className="bs-stat-label">Products</span>
                </div>
                <div className="bs-stat-divider" />
                <div className="bs-stat">
                  <span className="bs-stat-num">All India</span>
                  <span className="bs-stat-label">Supply</span>
                </div>
              </div>
            </div>

            {/* Right Feature Cards */}
            <div className="col-lg-6">
              <div className="row g-3">

                <div className="col-6">
                  <div className="bs-card">
                    <div className="bs-card-icon">🌿</div>
                    <h6 className="bs-card-title">Natural Products</h6>
                    <p className="bs-card-text">
                      100% natural herbs and agricultural products sourced directly from farmers.
                    </p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="bs-card">
                    <div className="bs-card-icon">🌍</div>
                    <h6 className="bs-card-title">Global Supply</h6>
                    <p className="bs-card-text">
                      Supplying premium agro products to customers across the world.
                    </p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="bs-card">
                    <div className="bs-card-icon">🚜</div>
                    <h6 className="bs-card-title">Farmer Partnership</h6>
                    <p className="bs-card-text">
                      Strong collaboration with farmers to ensure quality and fair trade.
                    </p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="bs-card">
                    <div className="bs-card-icon">📦</div>
                    <h6 className="bs-card-title">Quality Packaging</h6>
                    <p className="bs-card-text">
                      Advanced packaging to maintain freshness and nutritional value.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-header">
            <p className="bs-eyebrow">Our Work</p>
            <h2 className="bs-title">Gallery</h2>
          </div>

          <div className="bento-grid">

            <div className="bento-item big">
              <img src="/assets/4.jpeg" alt="Agritech product" />
            </div>

            <div className="bento-item">
              <img src="/assets/5.jpeg" alt="Agritech product" />
            </div>

            <div className="bento-item">
              <img src="/assets/6.jpeg" alt="Agritech product" />
            </div>

            <div className="bento-item wide">
              <img src="/assets/1683195269018.jpg" alt="Agritech product" />
            </div>

            <div className="bento-item">
              <img src="/assets/7.jpeg" alt="Agritech product" />
            </div>

            <div className="bento-item">
              <img src="/assets/1687437332351.jpg" alt="Agritech product" />
            </div>

            <div className="bento-item">
              <img src="/assets/9.jpeg" alt="Agritech product" />
            </div>

            <div className="bento-item">
              <img src="/assets/4.jpeg" alt="Agritech product" />
            </div>

          </div>
        </div>
      </section>

      <Footer />

      <style>{`

        /* ── Shared ───────────────────────────────── */
        .bs-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #4caf50;
          margin-bottom: 8px;
        }

        .bs-title {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 800;
          color: #111;
          margin-bottom: 10px;
          letter-spacing: -0.02em;
        }

        /* ── Business Section ─────────────────────── */
        .business-section {
          padding: 80px 0;
          background: #f8f9f6;
        }

        .bs-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .bs-subtitle {
          font-size: 1rem;
          color: #6c757d;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .bs-brand-name {
          font-size: 1.4rem;
          font-weight: 800;
          color: #111;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }

        .bs-brand-line {
          width: 36px;
          height: 3px;
          background: #4caf50;
          border-radius: 2px;
          margin-bottom: 20px;
        }

        .bs-body {
          font-size: 0.925rem;
          color: #555;
          line-height: 1.8;
          margin-bottom: 14px;
        }

        /* Stats row */
        .bs-stats {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 28px;
          padding: 20px 24px;
          background: #fff;
          border-radius: 14px;
          border: 1px solid #e8e8e8;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }

        .bs-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }

        .bs-stat-num {
          font-size: 1.4rem;
          font-weight: 800;
          color: #111;
          line-height: 1;
        }

        .bs-stat-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #9e9e9e;
          margin-top: 4px;
        }

        .bs-stat-divider {
          width: 1px;
          height: 36px;
          background: #e8e8e8;
          flex-shrink: 0;
        }

        /* Feature cards */
        .bs-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 14px;
          padding: 20px 16px;
          height: 100%;
          transition: box-shadow 0.22s ease, transform 0.22s ease;
        }

        .bs-card:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }

        .bs-card-icon {
          font-size: 1.75rem;
          margin-bottom: 10px;
          line-height: 1;
        }

        .bs-card-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: #111;
          margin-bottom: 6px;
        }

        .bs-card-text {
          font-size: 0.8rem;
          color: #777;
          line-height: 1.65;
          margin: 0;
        }

        /* ── Gallery Section ──────────────────────── */
        .gallery-section {
          padding: 80px 0;
          background: #fff;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 210px;
          gap: 12px;
        }

        .bento-item {
          overflow: hidden;
          border-radius: 14px;
          background: #f0f0f0;
          position: relative;
        }

        .bento-item::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0);
          transition: background 0.3s ease;
          border-radius: 14px;
          pointer-events: none;
        }

        .bento-item:hover::after {
          background: rgba(0,0,0,0.08);
        }

        .bento-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.45s cubic-bezier(0.4,0,0.2,1);
          display: block;
        }

        .bento-item:hover img {
          transform: scale(1.06);
        }

        .big {
          grid-column: span 2;
          grid-row: span 2;
        }

        .wide {
          grid-column: span 2;
        }

        .vertical {
          grid-row: span 2;
        }

        /* ── Responsive ───────────────────────────── */
        @media (max-width: 991px) {
          .business-section,
          .gallery-section {
            padding: 60px 0;
          }
        }

        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 160px;
            gap: 10px;
          }

          .bs-stats {
            gap: 12px;
            padding: 16px 18px;
          }

          .bs-stat-num {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .business-section,
          .gallery-section {
            padding: 48px 0;
          }

          .bs-header {
            margin-bottom: 36px;
          }

          .bento-grid {
            grid-auto-rows: 130px;
            gap: 8px;
          }

          .bento-item {
            border-radius: 10px;
          }
        }

      `}</style>
    </>
  );
}

export default Home;