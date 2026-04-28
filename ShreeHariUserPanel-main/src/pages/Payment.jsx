import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../components";
import axios from "axios";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [method, setMethod] = useState("cod");

  const clearCart = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.toLowerCase().includes("cart")) {
        localStorage.removeItem(key);
      }
    });
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!state) {
    return <div className="container py-5 text-center">No order data found</div>;
  }

  const { items, address, subtotal, total, shippingAddressFinal } = state;

  // 🔥 MAIL FUNCTION
  const sendMail = async (type) => {
    const maildata = new FormData();
    maildata.append("email", localStorage.getItem("email"));
    maildata.append("name", localStorage.getItem("name"));
    maildata.append("type", type);

    await axios.post("http://localhost/ShreeHari/sendmail.php", maildata);
  };

  // 🔥 ONLINE PAYMENT
  const handlePaymentCheck = async () => {
    try {
      const res = await axios.get(
        `http://localhost/ShreeHari/payment/createorder.php?amount=${total}`
      );

      const options = {
        key: "rzp_test_SHvbTnyYE85HSK",
        amount: res.data.amount,
        currency: "INR",
        order_id: res.data.id,
        name: "ShreeHari Agro",
        description: `Payment for Order Total: ₹${total}`,

        handler: async function (response) {
          const formdata = new FormData();
          formdata.append("user_id", localStorage.getItem("user_id"));
          formdata.append("items", JSON.stringify(items));
          formdata.append("payment_method", "online");
          formdata.append("payment_id", response.razorpay_payment_id);
          formdata.append("order_id", response.razorpay_order_id);
          formdata.append("signature", response.razorpay_signature);
          formdata.append("shipping_address", shippingAddressFinal);

          try {
            await axios.post("http://localhost/ShreeHari/orders.php", formdata);

            const fd2 = new FormData();
            fd2.append("user_id", localStorage.getItem("user_id"));
            await axios.post("http://localhost/ShreeHari/clearCart.php", fd2);

            clearCart();

            // 🔥 PAYMENT MAIL
            await sendMail("payment");

            // 🔥 ORDER MAIL
            await sendMail("order");

            alert("Payment Successful!");
            navigate("/");
          } catch (err) {
            alert("Order saving failed");
          }
        },

        prefill: {
          name: address?.name || "",
          contact: address?.phone || "",
        },

        theme: {
          color: "#198754",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert("Payment failed");
    }
  };

  // 🔥 MAIN PAYMENT FUNCTION
  const handlePayment = () => {
    if (method === "cod") {
      const formdata = new FormData();
      formdata.append("user_id", localStorage.getItem("user_id"));
      formdata.append("items", JSON.stringify(items));
      formdata.append("payment_method", "cod");
      formdata.append("shipping_address", shippingAddressFinal);

      axios.post("http://localhost/ShreeHari/orders.php", formdata).then(async () => {
        const fd2 = new FormData();
        fd2.append("user_id", localStorage.getItem("user_id"));
        await axios.post("http://localhost/ShreeHari/clearCart.php", fd2);

        clearCart();

        // 🔥 ORDER MAIL ONLY
        await sendMail("order");

        alert("Order placed successfully (Cash on Delivery)");
        navigate("/");
      });

      return;
    }

    handlePaymentCheck();
  };

  return (
    <>
      <Navbar />
      <style>{`
        .payment-page {
          padding: 28px 16px 48px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .pay-title {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 24px;
        }
        .pay-card {
          background: #fff;
          border: 1px solid #e8e8e8;
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          overflow: hidden;
          margin-bottom: 20px;
        }
        .pay-header {
          background: #f6fbf7;
          border-bottom: 1px solid #e4f0e6;
          padding: 14px 18px;
        }
        .pay-label {
          font-size: 11px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 600;
        }
        .method-option {
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 14px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .method-option.active {
          border-color: #198754;
          background: #f4faf5;
        }
        .pay-btn {
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
          margin-top: 10px;
        }
        .pay-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(25,135,84,0.3);
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
        }
      `}</style>

      <div className="payment-page">
        <div className="pay-title">Finalize Payment</div>

        <div className="row g-4">
          <div className="col-md-7">
            <div className="pay-card">
              <div className="pay-header">
                <span className="pay-label">Delivery Details</span>
              </div>
              <div className="p-3">
                <div className="fw-bold">{address.name}</div>
                <div className="text-muted small">{address.phone}</div>
                <div className="mt-2 small text-dark">{shippingAddressFinal}</div>
              </div>
            </div>

            <div className="pay-card">
              <div className="pay-header">
                <span className="pay-label">Select Payment Method</span>
              </div>
              <div className="p-3">
                <div className={`method-option ${method === 'cod' ? 'active' : ''}`} onClick={() => setMethod('cod')}>
                  <input type="radio" checked={method === 'cod'} readOnly />
                  <div>
                    <div className="fw-bold small">Cash on Delivery</div>
                  </div>
                </div>

                <div className={`method-option ${method === 'online' ? 'active' : ''}`} onClick={() => setMethod('online')}>
                  <input type="radio" checked={method === 'online'} readOnly />
                  <div>
                    <div className="fw-bold small">Online Payment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="pay-card">
              <div className="pay-header">
                <span className="pay-label">Total Summary</span>
              </div>
              <div className="p-4">
                <div className="summary-row text-muted">
                  <span>Items Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-3">
                  <b>Total</b>
                  <b>₹{total.toFixed(2)}</b>
                </div>

                <button className="pay-btn" onClick={handlePayment}>
                  {method === 'cod' ? 'CONFIRM ORDER' : 'SECURE PAYMENT'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Payment;