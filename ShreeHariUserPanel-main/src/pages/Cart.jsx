import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const formData = new FormData();
    formData.append("user_id", userId);

    axios
      .post("http://localhost/ShreeHari/UserPanelAPI/viewCartUser.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          const data = (res.data.data || []).map((i) => ({
            ...i,
            qty: Number(i.quantity || 0),
          }));
          setCartItems(data);
        } else {
          setCartItems([]);
        }
      })
      .catch((err) => console.error("Cart API Error", err));
  }, []);

  const changeLocalQty = (productId, diff) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product_id === productId
          ? { ...item, qty: Math.max(0, Number(item.qty || 0) + diff) }
          : item
      )
    );
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty < 0) return;
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const formData = new FormData();
    formData.append("productID", productId);
    formData.append("userId", userId);
    formData.append("qty", newQty);

    axios
      .post("http://localhost/ShreeHari/updateCart.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          setCartItems((prev) =>
            prev.map((item) =>
              item.product_id === productId ? { ...item, qty: newQty } : item
            )
          );
        } else {
          alert(res.data.message || "Update failed");
        }
      })
      .catch((err) => console.error(err));
  };

  const removeFromCart = (productId) => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("product_id", productId);

    axios
      .post("http://localhost/ShreeHari/UserPanelAPI/removeCart.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          setCartItems((prev) => prev.filter((item) => item.product_id !== productId));
        } else {
          alert("Failed to remove item from cart");
        }
      })
      .catch((err) => console.error("Remove from Cart API Error", err));
  };

  const getFolder = (cat_id) => {
    if (cat_id === "1") return "Herbs";
    if (cat_id === "2") return "DehydratedFruits";
    if (cat_id === "3") return "DehydratedVegetables";
    return "Other";
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.price || 0);
    const qty = Number(item.qty || 0);
    const discount = Number(item.discount_value || 0);
    return sum + (price * qty - (price * qty * discount) / 100);
  }, 0);

  const EmptyCart = () => (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🛒</div>
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", color: "var(--s900)", marginBottom: 10 }}>
        Your Cart is Empty
      </h3>
      <p style={{ color: "var(--s500)", marginBottom: 28, fontSize: "0.95rem" }}>
        Looks like you haven't added anything yet.
      </p>
      <Link to="/" className="cart-cta-btn">← Continue Shopping</Link>
    </div>
  );

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
          --red:  #e11d48;
          --white: #ffffff;
        }

        .cart-page {
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(160deg, #f0fdf4 0%, #f8fafc 40%, #fff 100%);
          min-height: 100vh;
          padding: 40px 0 80px;
        }

        .cart-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .cart-page-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          font-weight: 800;
          color: var(--s900);
          text-align: center;
          margin-bottom: 36px;
        }

        .cart-page-title span { color: var(--g600); }

        .cart-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: start;
        }

        @media (min-width: 960px) {
          .cart-layout { grid-template-columns: 1fr 360px; }
        }

        /* ── Item Card ── */
        .cart-item {
          background: var(--white);
          border: 1px solid var(--s200);
          border-radius: 18px;
          padding: 18px;
          margin-bottom: 14px;
          transition: all 0.25s ease;
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 16px;
          align-items: start;
        }

        @media (min-width: 480px) {
          .cart-item { grid-template-columns: 100px 1fr; padding: 22px; }
        }

        .cart-item:hover {
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          transform: translateY(-2px);
          border-color: var(--g100);
        }

        .cart-img-wrap {
          background: var(--s50);
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .cart-item-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .cart-item-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }

        .cart-item-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--s900);
          line-height: 1.3;
          margin: 0;
        }

        .cart-item-desc {
          font-size: 0.78rem;
          color: var(--s500);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .cart-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 2px;
        }

        .cart-offer-tag {
          background: var(--g50);
          color: var(--g700);
          border: 1px solid var(--g100);
          font-size: 10px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 40px;
          white-space: nowrap;
        }

        .cart-promo-tag {
          background: #fff7ed;
          color: #c2410c;
          border: 1px solid #fed7aa;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 40px;
          white-space: nowrap;
        }

        .cart-item-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 8px;
        }

        /* Qty Box */
        .qty-box {
          display: inline-flex;
          align-items: center;
          border: 1.5px solid var(--s200);
          border-radius: 999px;
          overflow: hidden;
          background: var(--s50);
        }

        .qty-btn {
          border: none;
          background: transparent;
          padding: 6px 14px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          color: var(--s700);
          transition: background 0.15s;
          line-height: 1;
        }

        .qty-btn:hover { background: var(--s200); }
        .qty-btn:active { background: var(--s300); }

        .qty-value {
          min-width: 32px;
          text-align: center;
          font-weight: 700;
          font-size: 14px;
          color: var(--s900);
          pointer-events: none;
        }

        .cart-item-price {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--g700);
        }

        /* Action Buttons */
        .cart-action-btns {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }

        .update-btn {
          background: linear-gradient(135deg, var(--g700), var(--g500));
          color: #fff;
          border: none;
          padding: 7px 18px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 3px 10px rgba(22,163,74,0.25);
        }

        .update-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(22,163,74,0.35);
        }

        /* ── Summary Card ── */
        .summary-card {
          background: var(--white);
          border: 1px solid var(--s200);
          border-radius: 22px;
          padding: 28px 24px;
          position: sticky;
          top: 90px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.07);
        }

        .summary-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--s900);
          margin: 0 0 22px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--s200);
        }

        .summary-item {
          margin-bottom: 18px;
          padding-bottom: 18px;
          border-bottom: 1px dashed var(--s200);
        }

        .summary-item:last-of-type { border-bottom: none; margin-bottom: 0; }

        .summary-item-name {
          font-weight: 700;
          font-size: 0.88rem;
          color: var(--s900);
          margin-bottom: 8px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: var(--s500);
          margin-bottom: 4px;
        }

        .summary-row.discount { color: var(--g600); }

        .summary-row.item-total {
          font-weight: 700;
          color: var(--s900);
          font-size: 14px;
          margin-top: 4px;
        }

        .summary-grand-total {
          display: flex;
          justify-content: space-between;
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--s900);
          padding: 18px 0 0;
          border-top: 2px solid var(--s200);
          margin-top: 16px;
        }

        .summary-grand-total span:last-child { color: var(--g700); }

        .cart-cta-btn {
          display: block;
          text-align: center;
          background: linear-gradient(135deg, var(--g700), var(--g500));
          color: #fff;
          text-decoration: none;
          padding: 14px 20px;
          border-radius: 14px;
          font-weight: 700;
          font-size: 0.95rem;
          margin-top: 20px;
          transition: all 0.25s;
          box-shadow: 0 6px 20px rgba(22,163,74,0.3);
        }

        .cart-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(22,163,74,0.42);
          color: #fff;
          filter: brightness(1.05);
        }

        .cart-cta-continue {
          display: block;
          text-align: center;
          background: var(--g50);
          color: var(--g700);
          border: 1.5px solid var(--g100);
          text-decoration: none;
          padding: 11px 20px;
          border-radius: 14px;
          font-weight: 600;
          font-size: 0.875rem;
          margin-top: 10px;
          transition: all 0.2s;
        }

        .cart-cta-continue:hover {
          background: var(--g100);
          color: var(--g700);
        }
      `}</style>

      <div className="cart-page">
        <div className="cart-container">
          <h1 className="cart-page-title">My <span>Cart</span></h1>

          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="cart-layout">
              {/* Items Column */}
              <div>
                {cartItems.map((item) => {
                  const price = Number(item.price || 0);
                  const qty = Number(item.qty || 0);
                  return (
                    <div className="cart-item" key={item.product_id}>
                      <div className="cart-img-wrap">
                        <img
                          src={`http://localhost/ShreeHari/uploads/${getFolder(item.cat_id)}/${item.image}`}
                          alt={item.name}
                          className="cart-img"
                          onError={(e) => (e.target.src = "https://via.placeholder.com/100x100?text=No+Image")}
                        />
                      </div>

                      <div className="cart-item-body">
                        <div className="cart-item-header">
                          <h6 className="cart-item-name">{item.name}</h6>
                          <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--g700)", whiteSpace: "nowrap" }}>
                            ₹{price}
                          </span>
                        </div>

                        <p className="cart-item-desc">{item.description}</p>

                        <div className="cart-meta-row">
                          {item.offerName && (
                            <span className="cart-offer-tag">🏷️ {item.offerName}</span>
                          )}
                          {item.promocode && (
                            <span className="cart-promo-tag">🎟 {item.promocode}</span>
                          )}
                        </div>

                        <div className="cart-item-footer">
                          <div className="qty-box">
                            <button className="qty-btn" onClick={() => changeLocalQty(item.product_id, -1)}>−</button>
                            <div className="qty-value">{qty}</div>
                            <button className="qty-btn" onClick={() => changeLocalQty(item.product_id, 1)}>+</button>
                          </div>

                          <span className="cart-item-price">₹{price * qty}</span>

                          <div className="cart-action-btns">
                            <button
                              className="update-btn"
                              onClick={() => updateQuantity(item.product_id, item.qty)}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary Column */}
              <div className="summary-card">
                <h2 className="summary-title">Order Summary</h2>

                {cartItems.map((item) => {
                  const price = Number(item.price || 0);
                  const qty = Number(item.qty || 0);
                  const discount = Number(item.discount_value || 0);
                  const itemTotal = price * qty;
                  const discountAmt = (itemTotal * discount) / 100;
                  const finalPrice = itemTotal - discountAmt;

                  return (
                    <div className="summary-item" key={item.product_id}>
                      <div className="summary-item-name">{item.name}</div>
                      <div className="summary-row">
                        <span>Price × {qty}</span>
                        <span>₹{itemTotal}</span>
                      </div>
                      {discount > 0 && (
                        <div className="summary-row discount">
                          <span>Discount ({discount}%)</span>
                          <span>−₹{discountAmt.toFixed(0)}</span>
                        </div>
                      )}
                      <div className="summary-row item-total">
                        <span>Subtotal</span>
                        <span>₹{finalPrice.toFixed(0)}</span>
                      </div>
                    </div>
                  );
                })}

                <div className="summary-grand-total">
                  <span>Grand Total</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>

                <Link to="/checkout" className="cart-cta-btn">
                  Proceed to Checkout →
                </Link>
                <Link to="/" className="cart-cta-continue">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;