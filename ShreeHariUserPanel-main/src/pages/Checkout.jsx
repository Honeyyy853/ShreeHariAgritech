import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [sameAddress, setSameAddress] = useState("no");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const fd = new FormData();
    fd.append("user_id", userId);

    axios
      .post("http://localhost/ShreeHari/UserPanelAPI/viewCartUser.php", fd)
      .then((res) => {
        if (res.data.status === "true") {
          const data = (res.data.data || []).map((i) => ({
            ...i,
            qty: Number(i.quantity ?? i.qty ?? 0),
          }));
          setItems(data.filter((i) => i.qty > 0));
        }
      });
  }, []);

  const fetchRegisteredAddress = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const fd = new FormData();
    fd.append("user_id", userId);

    try {
      const res = await axios.post("http://localhost/ShreeHari/users.php", fd);
      if (res.data.status === "true") {
        const u = res.data.data;
        setForm({
          name: u.name || "",
          phone: u.phone || "",
          address: u.address || "",
          city: "",
          pincode: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.price || 0);
    const qty = Number(item.qty || 0);
    const discount = Number(item.discount_value || 0);
    const itemTotal = price * qty;
    const discountAmount = (itemTotal * discount) / 100;
    return sum + (itemTotal - discountAmount);
  }, 0);

  const total = subtotal;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please enter name, phone and address");
      return;
    }
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }
    navigate("/payment", {
      state: {
        items,
        address: form,
        subtotal,
        shippingAddressFinal: form.address,
        total,
      },
    });
  };

  return (
    <>
      <Navbar />
      <style>{`
        .checkout-page {
          padding: 28px 16px 48px;
          max-width: 1100px;
          margin: 0 auto;
          background-color: #fcfcfc;
        }
        .section-title {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 24px;
        }
        .co-card {
          background: #fff;
          border: 1px solid #e8e8e8;
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .co-header {
          background: #f6fbf7;
          border-bottom: 1px solid #e4f0e6;
          padding: 14px 18px;
        }
        .co-label {
          font-size: 11px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 600;
        }
        .form-label-custom {
          font-size: 13px;
          font-weight: 600;
          color: #444;
          margin-bottom: 6px;
          display: block;
        }
        .input-custom {
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 14px;
          transition: border-color 0.2s;
          width: 100%;
        }
        .input-custom:focus {
          border-color: #198754;
          outline: none;
          box-shadow: 0 0 0 3px rgba(25, 135, 84, 0.1);
        }
        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .summary-item:last-child { border-bottom: none; }
        
        .place-order-btn {
          background: linear-gradient(135deg, #198754, #22c55e);
          border: none;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          padding: 14px;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
          width: 100%;
          margin-top: 20px;
        }
        .place-order-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(25,135,84,0.3);
        }
        .badge-discount {
          background: #fff3e0;
          color: #f57c00;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 6px;
        }
        @media (max-width: 991px) {
          .sticky-sidebar { position: static !important; margin-top: 24px; }
        }
      `}</style>

      <div className="checkout-page">
        <div className="section-title text-center text-md-start">Secure Checkout</div>

        {items.length === 0 ? (
          <div className="co-card p-5 text-center">
            <div style={{fontSize: '40px'}}>🛒</div>
            <div className="mt-3 text-muted">Your cart is empty.</div>
            <button className="btn btn-link text-success fw-bold" onClick={() => navigate('/')}>Continue Shopping</button>
          </div>
        ) : (
          <div className="row g-4">
            {/* Left: Shipping Details */}
            <div className="col-lg-7">
              <div className="co-card">
                <div className="co-header">
                  <span className="co-label">Step 1: Delivery Address</span>
                </div>
                <div className="p-4">
                  <div className="mb-4 p-3 rounded-3" style={{ background: '#f8f9fa', border: '1px dashed #ddd' }}>
                    <span className="co-label d-block mb-2">Use Profile Information?</span>
                    <div className="d-flex gap-4">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="addr" id="a1" checked={sameAddress === "yes"} 
                          onChange={() => { setSameAddress("yes"); fetchRegisteredAddress(); }} />
                        <label className="form-check-label small fw-bold" htmlFor="a1">Yes</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="addr" id="a2" checked={sameAddress === "no"} 
                          onChange={() => { setSameAddress("no"); setForm({name:"", phone:"", address:"", city:"", pincode:""}); }} />
                        <label className="form-check-label small fw-bold" htmlFor="a2">No</label>
                      </div>
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label-custom">Full Name</label>
                      <input className="input-custom" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-custom">Mobile Number</label>
                      <input className="input-custom" name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit number" />
                    </div>
                    <div className="col-12">
                      <label className="form-label-custom">Complete Address</label>
                      <textarea className="input-custom" name="address" rows="3" value={form.address} onChange={handleChange} placeholder="House no, Building, Street, Area" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="col-lg-5">
              <div className="co-card sticky-sidebar" style={{ position: 'sticky', top: '20px' }}>
                <div className="co-header d-flex justify-content-between">
                  <span className="co-label">Step 2: Order Summary</span>
                  <span className="co-label text-success">{items.length} Items</span>
                </div>
                <div className="p-4">
                  <div style={{ maxHeight: '280px', overflowY: 'auto', paddingRight: '5px' }}>
                    {items.map((i) => {
                      const price = Number(i.price || 0);
                      const qty = Number(i.qty || 0);
                      const discount = Number(i.discount_value || 0);
                      const final = (price * qty) - ((price * qty * discount) / 100);

                      return (
                        <div key={i.product_id} className="summary-item">
                          <div style={{ maxWidth: '70%' }}>
                            <div className="fw-bold" style={{ fontSize: '14px', color: '#1a1a1a' }}>{i.name}</div>
                            <div className="text-muted small">Qty: {qty} × ₹{price}</div>
                            {discount > 0 && <span className="badge-discount">-{discount}% Off</span>}
                          </div>
                          <div className="text-end">
                            <div className="fw-bold" style={{ color: '#198754' }}>₹{final.toFixed(2)}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-top">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small fw-bold uppercase">Subtotal</span>
                      <span className="fw-bold">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="section-title mb-0" style={{fontSize: '18px'}}>Total Amount</span>
                      <span className="section-title mb-0" style={{ color: '#198754', fontSize: '20px' }}>₹{total.toFixed(2)}</span>
                    </div>

                    <button className="place-order-btn" onClick={handlePlaceOrder}>
                      PLACE ORDER NOW
                    </button>
                    
                    <div className="text-center mt-3">
                      <span className="text-muted" style={{ fontSize: '11px' }}>
                        🔒 Secure Checkout • 100% Authentic Products
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;