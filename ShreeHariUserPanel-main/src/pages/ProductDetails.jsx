import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../components";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderStars = (rating = 0) => {
    const full = Math.floor(rating);
    return "★".repeat(full) + "☆".repeat(5 - full);
  };

  useEffect(() => {
    const formData = new FormData();
    formData.append("id", id);

    axios
      .post("http://localhost/ShreeHari/UserPanelAPI/viewDetailsProducts.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          const data = res.data.data;
          setProduct(data[0]);
          const allReviews = data
            .filter((item) => item.rating !== null)
            .map((r) => ({
              rating: r.rating,
              review_text: r.review_text,
              created_at: r.created_at,
            }));
          setReviews(allReviews);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  const getFolder = (category) => {
    if (category === "Herb") return "Herbs";
    if (category === "Dehydrated Fruit") return "DehydratedFruits";
    if (category === "Dehydrated vegetables") return "DehydratedVegetables";
    return "";
  };

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + Number(r.rating), 0) / reviews.length).toFixed(1)
      : null;

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
          --amber: #f59e0b;
          --red:   #e11d48;
          --white: #ffffff;
          --r20: 20px;
          --r14: 14px;
          --shadow: 0 4px 24px rgba(0,0,0,0.08);
          --shadow-lg: 0 16px 48px rgba(0,0,0,0.12);
        }

        .pd-page {
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(160deg, #f0fdf4 0%, #f8fafc 50%, #fff 100%);
          min-height: 100vh;
          padding: 40px 0 80px;
        }

        .pd-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 16px;
        }

        /* Breadcrumb */
        .pd-breadcrumb {
          font-size: 12px;
          color: var(--s500);
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .pd-breadcrumb span { color: var(--g600); font-weight: 600; }

        /* Main Card */
        .pd-card {
          background: var(--white);
          border-radius: 24px;
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
        }

        .pd-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }

        @media (min-width: 768px) {
          .pd-layout { grid-template-columns: 1fr 1fr; }
        }

        /* Image Panel */
        .pd-img-panel {
          background: linear-gradient(145deg, #f0fdf4, #e6f4ea);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 32px;
          min-height: 320px;
          position: relative;
          overflow: hidden;
        }

        .pd-img-panel::before {
          content: '';
          position: absolute;
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(34,197,94,0.12), transparent 70%);
          border-radius: 50%;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
        }

        .pd-img {
          max-width: 100%;
          max-height: 300px;
          object-fit: contain;
          border-radius: 16px;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 12px 32px rgba(0,0,0,0.15));
          transition: transform 0.4s ease;
        }

        .pd-img:hover { transform: scale(1.04); }

        /* Details Panel */
        .pd-info-panel {
          padding: 36px 32px 36px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        @media (max-width: 767px) {
          .pd-info-panel { padding: 28px 20px 28px; }
        }

        .pd-category-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--g50);
          color: var(--g700);
          border: 1px solid var(--g100);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 40px;
          margin-bottom: 14px;
          width: fit-content;
        }

        .pd-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3.5vw, 2.2rem);
          font-weight: 800;
          color: var(--s900);
          line-height: 1.2;
          margin: 0 0 16px;
        }

        /* Rating Summary */
        .pd-rating-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .pd-rating-badge {
          background: var(--g600);
          color: #fff;
          font-size: 13px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 8px;
        }

        .pd-stars { color: var(--amber); font-size: 15px; letter-spacing: 2px; }
        .pd-review-count { font-size: 12px; color: var(--s500); }

        /* Price Row */
        .pd-price-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }

        .pd-price {
          font-size: 2rem;
          font-weight: 800;
          color: var(--g700);
          letter-spacing: -1px;
        }

        .pd-unit-badge {
          background: var(--g50);
          color: var(--g700);
          border: 1px solid var(--g100);
          font-size: 12px;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: 40px;
        }

        /* Divider */
        .pd-divider {
          height: 1px;
          background: var(--s200);
          margin: 20px 0;
        }

        /* Section Label */
        .pd-section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--s500);
          margin-bottom: 10px;
        }

        /* Description */
        .pd-desc {
          font-size: 0.9rem;
          color: var(--s700);
          line-height: 1.75;
          background: var(--s50);
          padding: 16px 18px;
          border-radius: var(--r14);
          border-left: 3px solid var(--g500);
        }

        /* Offer */
        .pd-offer-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: linear-gradient(135deg, #fff7f7, #fff0f3);
          border: 1px solid #fecdd3;
          padding: 14px 18px;
          border-radius: var(--r14);
          flex-wrap: wrap;
        }

        .pd-offer-name {
          font-weight: 700;
          color: var(--s900);
          font-size: 0.92rem;
        }

        .pd-offer-pill {
          background: linear-gradient(135deg, #e11d48, #f43f5e);
          color: #fff;
          font-size: 13px;
          font-weight: 800;
          padding: 6px 16px;
          border-radius: 40px;
          letter-spacing: .5px;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(225,29,72,0.3);
        }

        .pd-no-offer {
          font-size: 0.875rem;
          color: var(--s500);
          font-style: italic;
        }

        /* ── Reviews Section ── */
        .pd-reviews-section {
          margin-top: 32px;
        }

        .pd-reviews-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .pd-reviews-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--s900);
        }

        .pd-reviews-count-badge {
          background: var(--g100);
          color: var(--g700);
          font-size: 12px;
          font-weight: 700;
          padding: 4px 14px;
          border-radius: 40px;
        }

        .pd-review-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }

        @media (min-width: 640px) {
          .pd-review-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 900px) {
          .pd-review-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .pd-review-card {
          background: var(--white);
          border: 1px solid var(--s200);
          border-radius: 16px;
          padding: 18px;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pd-review-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          transform: translateY(-3px);
          border-color: var(--g100);
        }

        .pd-review-stars { color: var(--amber); font-size: 14px; letter-spacing: 2px; }

        .pd-review-text {
          font-size: 0.875rem;
          color: var(--s700);
          line-height: 1.65;
          flex: 1;
        }

        .pd-review-date {
          font-size: 11px;
          color: var(--s500);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .pd-empty-reviews {
          text-align: center;
          padding: 40px 24px;
          color: var(--s500);
          background: var(--s50);
          border-radius: 16px;
          font-size: 0.9rem;
        }

        /* Skeleton */
        .pd-skeleton-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .pd-skeleton-layout { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="pd-page">
        <div className="pd-container">
          {/* Breadcrumb */}
          <div className="pd-breadcrumb">
            Home › Products › <span>{loading ? "…" : product?.name}</span>
          </div>

          {/* Loading */}
          {loading && (
            <div className="pd-skeleton-layout">
              <Skeleton height={380} borderRadius={24} />
              <div>
                <Skeleton height={28} width="60%" style={{ marginBottom: 12 }} />
                <Skeleton height={42} width="80%" style={{ marginBottom: 16 }} />
                <Skeleton height={20} width="40%" style={{ marginBottom: 20 }} />
                <Skeleton count={4} height={14} style={{ marginBottom: 8 }} />
              </div>
            </div>
          )}

          {/* Error */}
          {!loading && !product && (
            <div style={{ textAlign: "center", padding: "80px 24px", color: "var(--s500)" }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>🌿</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "var(--s700)", marginBottom: 8 }}>Product Not Found</div>
              <p style={{ fontSize: "0.9rem" }}>This product may no longer be available.</p>
            </div>
          )}

          {/* Product Card */}
          {!loading && product && (
            <>
              <div className="pd-card">
                <div className="pd-layout">
                  {/* Image */}
                  <div className="pd-img-panel">
                    <img
                      src={`http://localhost/ShreeHari/uploads/${getFolder(product.category_name)}/${product.image}`}
                      alt={product.name}
                      className="pd-img"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/300x300?text=No+Image")}
                    />
                  </div>

                  {/* Info */}
                  <div className="pd-info-panel">
                    <div className="pd-category-tag">🌱 {product.category_name}</div>
                    <h1 className="pd-name">{product.name}</h1>

                    {avgRating && (
                      <div className="pd-rating-row">
                        <span className="pd-rating-badge">{avgRating}</span>
                        <span className="pd-stars">{renderStars(Math.round(avgRating))}</span>
                        <span className="pd-review-count">({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
                      </div>
                    )}

                    <div className="pd-price-row">
                      <span className="pd-price">₹ {product.price}</span>
                      <span className="pd-unit-badge">{product.unit} gm</span>
                    </div>

                    <div className="pd-divider" />

                    <div className="pd-section-label">Description</div>
                    <div className="pd-desc">{product.description}</div>

                    <div className="pd-divider" />

                    <div className="pd-section-label">Active Offer</div>
                    <div className="pd-offer-box">
                      {product.offerName ? (
                        <>
                          <div>
                            <div className="pd-offer-name">{product.offerName}</div>
                            <div style={{ fontSize: 11, color: "var(--s500)", marginTop: 2 }}>Limited time offer 🎉</div>
                          </div>
                          <div className="pd-offer-pill">{product.discount_value}% OFF</div>
                        </>
                      ) : (
                        <span className="pd-no-offer">No active offer on this product.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="pd-reviews-section">
                <div className="pd-reviews-header">
                  <h2 className="pd-reviews-title">Customer Reviews</h2>
                  {reviews.length > 0 && (
                    <span className="pd-reviews-count-badge">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</span>
                  )}
                </div>

                {reviews.length === 0 ? (
                  <div className="pd-empty-reviews">
                    <div style={{ fontSize: 36, marginBottom: 10 }}>💬</div>
                    <p style={{ margin: 0, fontWeight: 600, color: "var(--s700)" }}>No reviews yet</p>
                    <p style={{ margin: "6px 0 0", fontSize: "0.82rem" }}>Be the first to share your experience!</p>
                  </div>
                ) : (
                  <div className="pd-review-grid">
                    {reviews.map((r, i) => (
                      <div className="pd-review-card" key={i}>
                        <div className="pd-review-stars">{renderStars(r.rating)}</div>
                        <p className="pd-review-text">"{r.review_text}"</p>
                        <div className="pd-review-date">📅 {r.created_at}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;