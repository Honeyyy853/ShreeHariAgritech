import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../components";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const user_id = localStorage.getItem("user_id");
  const [item1, setItem1] = useState([]);
  const [item2, setItem2] = useState([]);
  const [item3, setItem3] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const formData = new FormData();
    formData.append("user_id", user_id);

    axios
      .post(
        "http://localhost/ShreeHari/UserPanelAPI/allProductAPI.php",
        formData
      )
      .then((response) => {
        if (response.data.status === true) {
          setItem1(response.data.herb || []);
          setItem2(response.data.df || []);
          setItem3(response.data.dv || []);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user_id]);

  const addToCart = (prod) => {
    if (!user_id) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("productID", prod.id);
    formData.append("userId", user_id);

    axios
      .post("http://localhost/ShreeHari/addCartApi.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          setItem1((prev) =>
            prev.map((p) => (p.id === prod.id ? { ...p, cartStatus: 1 } : p))
          );
          setItem2((prev) =>
            prev.map((p) => (p.id === prod.id ? { ...p, cartStatus: 1 } : p))
          );
          setItem3((prev) =>
            prev.map((p) => (p.id === prod.id ? { ...p, cartStatus: 1 } : p))
          );
        } else {
          alert(res.data.message || "Failed");
        }
      })
      .catch(() => {
        alert("Server error");
      });
  };

  const allProducts = [
    ...item1.map((p) => ({ ...p, type: "herb" })),
    ...item2.map((p) => ({ ...p, type: "df" })),
    ...item3.map((p) => ({ ...p, type: "dv" })),
  ];

  const renderStars = (rating = 0) => {
    const full = Math.floor(rating);
    return "★".repeat(full) + "☆".repeat(5 - full);
  };

  return (
    <>
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --green-900: #14532d;
          --green-700: #15803d;
          --green-600: #16a34a;
          --green-500: #22c55e;
          --green-100: #dcfce7;
          --green-50:  #f0fdf4;
          --slate-900: #0f172a;
          --slate-700: #334155;
          --slate-500: #64748b;
          --slate-200: #e2e8f0;
          --slate-100: #f1f5f9;
          --slate-50:  #f8fafc;
          --red-600:   #dc2626;
          --amber-400: #fbbf24;
          --white:     #ffffff;
          --radius-xl: 20px;
          --radius-lg: 14px;
          --shadow-card: 0 2px 16px rgba(0,0,0,0.07);
          --shadow-hover: 0 20px 48px rgba(0,0,0,0.13);
          --transition: all 0.35s cubic-bezier(.4,0,.2,1);
        }

        * { box-sizing: border-box; }

        .products-page {
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(160deg, #f0fdf4 0%, #f8fafc 60%, #ffffff 100%);
          min-height: 100vh;
        }

        /* ── Page Header ── */
        .page-header {
          text-align: center;
          padding: 64px 16px 40px;
        }

        .page-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--green-100);
          color: var(--green-700);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 40px;
          margin-bottom: 18px;
        }

        .page-eyebrow::before {
          content: '';
          width: 6px; height: 6px;
          background: var(--green-600);
          border-radius: 50%;
        }

        .page-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          color: var(--slate-900);
          line-height: 1.15;
          margin: 0 0 16px;
        }

        .page-title span {
          color: var(--green-600);
        }

        .page-subtitle {
          font-size: 1rem;
          color: var(--slate-500);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .title-rule {
          width: 72px;
          height: 4px;
          background: linear-gradient(90deg, var(--green-600), var(--green-400, #4ade80));
          border-radius: 4px;
          margin: 22px auto 0;
        }

        /* ── Grid ── */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 24px;
          padding: 0 16px 80px;
          max-width: 1280px;
          margin: 0 auto;
        }

        @media (min-width: 600px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); padding: 0 24px 80px; }
        }

        @media (min-width: 900px) {
          .products-grid { grid-template-columns: repeat(3, 1fr); padding: 0 32px 80px; }
        }

        @media (min-width: 1200px) {
          .products-grid { grid-template-columns: repeat(4, 1fr); gap: 28px; }
        }

        /* ── Card ── */
        .product-card {
          background: var(--white);
          border-radius: var(--radius-xl);
          border: 1px solid rgba(0,0,0,0.055);
          box-shadow: var(--shadow-card);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: var(--transition);
          position: relative;
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-hover);
          border-color: rgba(22,163,74,0.15);
        }

        /* ── Ribbon ── */
        .ribbon-wrap {
          position: absolute;
          top: 0; left: 0;
          width: 80px; height: 80px;
          overflow: hidden;
          z-index: 10;
          pointer-events: none;
        }

        .ribbon {
          position: absolute;
          top: 18px; left: -22px;
          background: linear-gradient(135deg, #e11d48, #f43f5e);
          color: #fff;
          padding: 5px 36px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          transform: rotate(-45deg);
          box-shadow: 0 4px 12px rgba(225,29,72,0.35);
        }

        /* ── Image ── */
        .img-wrapper {
          height: 210px;
          overflow: hidden;
          background: var(--slate-100);
          flex-shrink: 0;
        }

        @media (min-width: 600px) {
          .img-wrapper { height: 220px; }
        }

        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.55s cubic-bezier(.4,0,.2,1);
          display: block;
        }

        .product-card:hover .product-img {
          transform: scale(1.08);
        }

        /* ── Body ── */
        .card-body {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 18px 18px 20px;
        }

        @media (min-width: 480px) {
          .card-body { padding: 20px 20px 22px; }
        }

        .product-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--slate-900);
          margin: 0 0 8px;
          line-height: 1.35;
        }

        /* ── Reviews ── */
        .review-row {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }

        .rating-badge {
          background: var(--green-600);
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 6px;
          letter-spacing: .3px;
        }

        .stars {
          color: var(--amber-400);
          font-size: 13px;
          line-height: 1;
          letter-spacing: 1px;
        }

        .review-count {
          font-size: 11px;
          color: var(--slate-500);
          font-weight: 500;
        }

        .no-review {
          font-size: 11px;
          color: var(--slate-500);
          margin-bottom: 10px;
          font-style: italic;
        }

        /* ── Description ── */
        .product-desc {
          font-size: 0.82rem;
          color: var(--slate-500);
          line-height: 1.65;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 14px;
          flex: 1;
        }

        /* ── Price Row ── */
        .price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          gap: 8px;
        }

        .price {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--green-700);
          letter-spacing: -.3px;
        }

        .unit-badge {
          background: var(--green-50);
          color: var(--green-700);
          border: 1px solid var(--green-100);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 40px;
          white-space: nowrap;
        }

        /* ── Action Buttons ── */
        .action-row {
          display: flex;
          gap: 10px;
        }

        .cart-btn, .view-btn {
          flex: 1;
          padding: 11px 8px;
          border-radius: var(--radius-lg);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition);
          white-space: nowrap;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .cart-btn {
          background: linear-gradient(135deg, var(--green-700), var(--green-500));
          border: none;
          color: #fff;
          box-shadow: 0 4px 14px rgba(22,163,74,0.3);
        }

        .cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(22,163,74,0.42);
          filter: brightness(1.06);
        }

        .cart-btn:active { transform: scale(0.97); }

        .view-btn {
          background: var(--green-50);
          border: 1.5px solid var(--green-200, #bbf7d0);
          color: var(--green-900);
        }

        .view-btn:hover {
          background: var(--green-100);
          border-color: var(--green-600);
          transform: translateY(-2px);
        }

        .view-btn:active { transform: scale(0.97); }

        /* ── Skeletons ── */
        .skeleton-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 24px;
          padding: 0 16px 80px;
          max-width: 1280px;
          margin: 0 auto;
        }

        @media (min-width: 600px) {
          .skeleton-grid { grid-template-columns: repeat(2, 1fr); padding: 0 24px 80px; }
        }

        @media (min-width: 900px) {
          .skeleton-grid { grid-template-columns: repeat(3, 1fr); padding: 0 32px 80px; }
        }

        @media (min-width: 1200px) {
          .skeleton-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .skeleton-card {
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: var(--white);
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: var(--shadow-card);
        }

        /* ── Empty State ── */
        .empty-state {
          text-align: center;
          padding: 80px 24px;
          color: var(--slate-500);
        }

        .empty-icon {
          font-size: 56px;
          margin-bottom: 20px;
          opacity: .5;
        }

        .empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          color: var(--slate-700);
          margin-bottom: 8px;
        }

        .empty-sub {
          font-size: 0.9rem;
        }
      `}</style>

      <div className="products-page">
        {/* ── Page Header ── */}
        <div className="page-header">
          <div className="page-eyebrow">100% Natural & Organic</div>
          <h1 className="page-title">
            Our <span>Products</span>
          </h1>
          <p className="page-subtitle">
            Carefully sourced herbs, dehydrated fruits &amp; vegetables — nature's goodness delivered to your door.
          </p>
          <div className="title-rule" />
        </div>

        {/* ── Loading Skeletons ── */}
        {loading && (
          <div className="skeleton-grid">
            {[...Array(8)].map((_, i) => (
              <div className="skeleton-card" key={i}>
                <Skeleton height={210} style={{ display: "block" }} />
                <div style={{ padding: "18px" }}>
                  <Skeleton height={18} width="70%" style={{ marginBottom: 10 }} />
                  <Skeleton count={2} height={12} style={{ marginBottom: 6 }} />
                  <Skeleton height={14} width="45%" style={{ marginBottom: 16 }} />
                  <div style={{ display: "flex", gap: 10 }}>
                    <Skeleton height={44} borderRadius={14} style={{ flex: 1 }} />
                    <Skeleton height={44} borderRadius={14} style={{ flex: 1 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && allProducts.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🌿</div>
            <div className="empty-title">No Products Found</div>
            <p className="empty-sub">Check back soon — we're restocking our shelves.</p>
          </div>
        )}

        {/* ── Products Grid ── */}
        {!loading && allProducts.length > 0 && (
          <div className="products-grid">
            {allProducts.map((prod) => {
              let folder = "";
              if (prod.type === "herb") folder = "Herbs";
              if (prod.type === "df") folder = "DehydratedFruits";
              if (prod.type === "dv") folder = "DehydratedVegetables";

              return (
                <div className="product-card" key={`${prod.type}-${prod.id}`}>
                  {/* Ribbon */}
                  {prod.offerId && (
                    <div className="ribbon-wrap">
                      <div className="ribbon">OFFER</div>
                    </div>
                  )}

                  {/* Image */}
                  <div className="img-wrapper">
                    <img
                      src={`http://localhost/ShreeHari/uploads/${folder}/${prod.image}`}
                      alt={prod.name}
                      className="product-img"
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/300x220?text=No+Image")
                      }
                    />
                  </div>

                  {/* Body */}
                  <div className="card-body">
                    <h5 className="product-name">{prod.name}</h5>

                    {prod.total_reviews > 0 ? (
                      <div className="review-row">
                        <span className="rating-badge">
                          {Number(prod.avg_rating).toFixed(1)}
                        </span>
                        <span className="stars">
                          {renderStars(Math.round(prod.avg_rating))}
                        </span>
                        <span className="review-count">({prod.total_reviews})</span>
                      </div>
                    ) : (
                      <p className="no-review">No reviews yet</p>
                    )}

                    <p className="product-desc">{prod.description}</p>

                    <div className="price-row">
                      <span className="price">₹ {prod.price}</span>
                      <span className="unit-badge">{prod.unit} gm</span>
                    </div>

                    <div className="action-row">
                      <button
                        className="cart-btn"
                        onClick={() => {
                          if (prod.cartStatus === 1) {
                            navigate("/cart");
                          } else {
                            addToCart(prod);
                          }
                        }}
                      >
                        {prod.cartStatus === 1 ? (
                          <>🛒 Go to Cart</>
                        ) : (
                          <>+ Add to Cart</>
                        )}
                      </button>

                      <button
                        className="view-btn"
                        onClick={() => navigate(`/productDetails/${prod.id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Products;