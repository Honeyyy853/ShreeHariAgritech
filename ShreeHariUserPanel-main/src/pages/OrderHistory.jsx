import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Footer } from "../components";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const user_id = localStorage.getItem("user_id");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user_id) return;
    axios
      .get(
        `http://localhost/ShreeHari/get_user_order_history.php?user_id=${user_id}`
      )
      .then((res) => {
        if (res.data && res.data.data) setOrders(res.data.data);
        else setOrders([]);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, [user_id]);

  // ✅ FIXED: NO DOUBLE DISCOUNT
  const deliveredOrders = orders
    .map((order) => {
      const deliveredItems = order.items.filter(
        (item) => item.item_status === "Delivered"
      );

      const orderTotal = deliveredItems.reduce((sum, item) => {
        const price = Number(item.price || 0);
        const qty = Number(item.quantity || 0);

        return sum + (price * qty); // ✅ ONLY PRICE (NO DISCOUNT AGAIN)
      }, 0);

      return { ...order, items: deliveredItems, calculatedTotal: orderTotal };
    })
    .filter((order) => order.items.length > 0);

  const handleCancelOrder = async (order_id, product_id) => {
    const formData = new FormData();
    formData.append("order_id", order_id);
    formData.append("product_id", product_id);
    try {
      const res = await axios.post(
        "http://localhost/ShreeHari/cancelOrderApi.php",
        formData
      );
      alert(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      {/* ✅ UI SAME (NO CHANGE) */}
      <style>{`
        .oh-page {
          padding: 28px 16px 48px;
          max-width: 860px;
          margin: 0 auto;
        }
        .oh-title {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 24px;
        }
        .oh-empty {
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 14px;
          padding: 40px 20px;
          text-align: center;
          color: #888;
          font-size: 15px;
        }
        .oh-empty-icon {
          font-size: 40px;
          margin-bottom: 10px;
        }
        .order-card {
          background: #fff;
          border: 1px solid #e8e8e8;
          border-radius: 16px;
          margin-bottom: 20px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }
        .order-meta {
          background: #f6fbf7;
          border-bottom: 1px solid #e4f0e6;
          padding: 14px 18px;
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
          justify-content: space-between;
        }
        .order-meta-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .meta-label {
          font-size: 11px;
          color: #888;
          text-transform: uppercase;
        }
        .meta-value {
          font-size: 14px;
          font-weight: 600;
        }
        .meta-value.green { color: #198754; }
        .invoice-btn {
          background: linear-gradient(135deg, #198754, #22c55e);
          border: none;
          color: #fff;
          padding: 7px 16px;
          border-radius: 10px;
          cursor: pointer;
        }
        .items-list {
          padding: 14px 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .item-row {
          display: flex;
          gap: 12px;
          padding: 12px;
          border: 1px solid #f0f0f0;
          border-radius: 12px;
          background: #fafafa;
        }
        .item-img {
          width: 68px;
          height: 68px;
          object-fit: cover;
          border-radius: 10px;
        }
        .item-info { flex: 1; }
        .item-name { font-weight: 600; }
        .item-desc { font-size: 12px; color: #999; }
        .status-badge {
          background: #d4edda;
          color: #198754;
          font-size: 11px;
          padding: 2px 10px;
          border-radius: 20px;
        }
        .view-product-link {
          font-size: 12px;
          color: #198754;
          text-decoration: underline;
          cursor: pointer;
        }
        .item-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }
        .price-original {
          font-size: 12px;
          color: #bbb;
          text-decoration: line-through;
        }
        .price-final {
          font-size: 14px;
          font-weight: 700;
          color: #198754;
        }
        .discount-tag {
          font-size: 11px;
          color: #f57c00;
        }
      `}</style>

      <div className="oh-page">
        <div className="oh-title">Order History</div>

        {deliveredOrders.map((order) => (
          <div key={order.order_id} className="order-card">
            <div className="order-meta">
              <div>
                <div className="meta-label">Order ID</div>
                <div className="meta-value green">#{order.order_id}</div>
              </div>
              <div>
                <div className="meta-label">Order Date</div>
                <div className="meta-value">{order.order_date}</div>
              </div>
              <div>
                <div className="meta-label">Total</div>
                <div className="meta-value green">
                  ₹{order.calculatedTotal.toFixed(2)}
                </div>
              </div>
              <button
                className="invoice-btn"
                onClick={() => navigate(`/invoice/${order.order_id}`)}
              >
                View Invoice
              </button>
            </div>

            <div className="items-list">
              {order.items.map((item, index) => {
                const price = Number(item.price || 0);
                const qty = Number(item.quantity || 0);

                const itemTotal = price * qty;
                const finalPrice = itemTotal; // ✅ NO DISCOUNT AGAIN

                return (
                  <div key={index} className="item-row">
                    <img
                      src={`http://localhost/ShreeHari/uploads/${item.image}`}
                      alt={item.product_name}
                      className="item-img"
                    />

                    <div className="item-info">
                      <div className="item-name">{item.product_name}</div>
                      <div className="item-desc">{item.description}</div>
                      <span className="status-badge">{item.item_status}</span>
                      <div
                        className="view-product-link"
                        onClick={() =>
                          navigate(`/productDetails/${item.product_id}`)
                        }
                      >
                        View Product
                      </div>
                    </div>

                    <div className="item-actions">
                      <span className="price-original">
                        ₹{itemTotal.toFixed(2)}
                      </span>
                      <span className="price-final">
                        ₹{finalPrice.toFixed(2)}
                      </span>
                      {item.discount_value > 0 && (
                        <span className="discount-tag">
                          –{item.discount_value}% off
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default OrderHistory;