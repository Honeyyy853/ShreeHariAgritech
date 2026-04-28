import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Footer } from "../components";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const userId = localStorage.getItem("user_id");
  const [orders, setOrders] = useState([]);
  const [showTrack, setShowTrack] = useState(false);
  const [trackItem, setTrackItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost/ShreeHari/get_user_active_orders.php?user_id=${userId}`)
      .then((res) => {
        setOrders(res.data.data || []);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <>
      <Navbar />

      <style>{`
        :root {
          --primary-green: #198754;
          --accent-green: #22c55e;
          --bg-soft: #f8fafc;
        }
        .orders-page { background-color: #fcfcfc; min-height: 80vh; }
        .page-header { font-weight: 800; color: #1e293b; position: relative; display: inline-block; }
        .page-header::after {
          content: ""; width: 50%; height: 4px; background: var(--primary-green);
          position: absolute; bottom: -8px; left: 0; border-radius: 10px;
        }
        .order-card {
          border: 1px solid #edf2f7; border-radius: 20px; 
          background: #fff; transition: all 0.3s ease; overflow: hidden;
        }
        .order-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.06); }
        .order-meta { background: #f6fbf7; padding: 24px; border-right: 1px solid #edf2f7; }
        .meta-label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.05em; }
        .meta-value { font-size: 15px; font-weight: 600; color: #334155; margin-bottom: 16px; }
        .item-row { 
          padding: 16px; border-radius: 14px; background: #fff; 
          border: 1px solid #f1f5f9; margin-bottom: 12px; transition: 0.2s;
        }
        .item-row:hover { border-color: var(--primary-green); background: #f0fdf4; }
        .btn-track {
          font-size: 12px; font-weight: 700; color: var(--primary-green);
          background: #fff; border: 1.5px solid var(--primary-green);
          padding: 6px 16px; border-radius: 10px; transition: 0.2s;
        }
        .btn-track:hover { background: var(--primary-green); color: #fff; }
        .track-modal-content {
          background: #fff; border-radius: 24px; width: 600px; padding: 32px;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
        }
        .track-dot { width: 14px; height: 14px; border-radius: 50%; background: #e2e8f0; position: relative; z-index: 2; }
        .track-dot.active { background: var(--primary-green); box-shadow: 0 0 0 4px #dcfce7; }
        .track-line-progress { height: 3px; background: #e2e8f0; flex-grow: 1; margin-top: 6px; position: relative; }
        .track-line-fill { height: 100%; background: var(--primary-green); width: 0; transition: width 0.8s ease; }
      `}</style>

      <div className="orders-page py-5">
        <div className="container">
          <h3 className="page-header mb-5">My Active Orders</h3>

          {orders.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-3 text-muted" style={{ fontSize: "48px" }}>📦</div>
              <h5>No active orders found</h5>
              <button className="btn btn-success mt-3 px-4 rounded-pill" onClick={() => navigate("/")}>
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map((o) => {
              const orderTotal = (o.items || []).reduce((sum, item) => {
                const price = Number(item.price || 0);
                const qty = Number(item.quantity || 0);
                const discount = Number(item.discount_value || 0);
                const finalPrice = (price * qty) - ((price * qty * discount) / 100);
                return sum + finalPrice;
              }, 0);

              return (
                <div key={o.order_id} className="order-card mb-4">
                  <div className="row g-0">
                    {/* LEFT SIDE - ORDER INFO */}
                    <div className="col-lg-3 order-meta">
                      <div className="meta-label">Reference ID</div>
                      <div className="meta-value text-success">#SHR-{o.order_id}</div>

                      <div className="meta-label">Placed On</div>
                      <div className="meta-value">{o.order_date}</div>

                      <div className="meta-label">Bill Amount</div>
                      <div className="meta-value text-dark" style={{ fontSize: "18px" }}>₹{orderTotal.toFixed(2)}</div>

                      <span className={`badge rounded-pill px-3 py-2 ${
                        o.order_status === "completed" ? "bg-success" : "bg-warning text-dark"
                      }`}>
                        {o.order_status.toUpperCase()}
                      </span>
                    </div>

                    {/* RIGHT SIDE - ITEMS LIST */}
                    <div className="col-lg-9 p-4">
                      {/* <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold mb-0">Order Items</h6>
                        <button className="btn btn-sm text-primary fw-bold border-0">Download Invoice</button>
                      </div> */}

                      {(o.items || []).map((item, idx) => (
                        <div key={idx} className="item-row d-flex align-items-center">
                          <img
                            src={`http://localhost/ShreeHari/uploads/${item.image}`}
                            alt=""
                            style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "10px" }}
                            className="me-3"
                          />
                          <div className="flex-grow-1">
                            <div className="fw-bold text-dark mb-0">{item.product_name}</div>
                            <div className="text-muted small">Qty: {item.quantity} | ₹{item.price} each</div>
                          </div>
                          <div className="text-end">
                            <div className="mb-2">
                              <span className="badge bg-light text-success border border-success-subtle">
                                {item.item_status}
                              </span>
                            </div>
                            <button
                              className="btn-track"
                              onClick={() => {
                                setTrackItem(item);
                                setShowTrack(true);
                              }}
                            >
                              Track
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* TRACKING MODAL */}
      {showTrack && trackItem && (
        <div className="track-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050 }}>
          <div className="track-modal-content">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Track Delivery</h5>
              <button className="btn-close" onClick={() => setShowTrack(false)}></button>
            </div>

            <div className="p-3 mb-4 rounded-3" style={{ background: '#f8fafc' }}>
              <div className="small text-muted">Tracking item</div>
              <div className="fw-bold text-dark">{trackItem.product_name}</div>
            </div>

            <TrackProgress status={trackItem.item_status} />
            
            <div className="mt-5 pt-3 border-top text-center">
                <button className="btn btn-dark w-100 rounded-pill py-2 fw-bold" onClick={() => setShowTrack(false)}>
                    Close Details
                </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

const TrackProgress = ({ status }) => {
  const steps = ["pending", "processing", "shipped", "delivered"];
  const currentStatus = (status || "").toLowerCase();
  const currentIndex = steps.indexOf(currentStatus);

  if (currentStatus === "cancelled") {
    return <div className="alert alert-danger rounded-4 text-center py-4">This item has been cancelled.</div>;
  }

  return (
    <div className="py-2">
      <div className="d-flex justify-content-between mb-2">
        {steps.map((step, idx) => (
          <div key={idx} className="text-center" style={{ width: '25%' }}>
            <div className="d-flex align-items-center justify-content-center">
              <div className={`track-dot ${idx <= currentIndex ? "active" : ""}`}></div>
              {idx < steps.length - 1 && (
                <div className="track-line-progress">
                  <div className="track-line-fill" style={{ width: idx < currentIndex ? "100%" : "0%" }}></div>
                </div>
              )}
            </div>
            <div className={`mt-3 small fw-bold ${idx <= currentIndex ? "text-success" : "text-muted"}`} style={{ textTransform: 'capitalize' }}>
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;