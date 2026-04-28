import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Navbar, Footer } from "../components";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = () => {
  const { orderId } = useParams();
  const [data, setData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const invoiceRef = useRef();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    axios
      .get(
        `http://localhost/ShreeHari/get_user_order_history.php?user_id=${userId}`
      )
      .then((res) => {
        const order = res.data.data.find((o) => o.order_id == orderId);
        setData(order);
      })
      .catch((err) => console.log(err));
  }, [orderId]);

  const downloadPDF = async () => {
    const element = invoiceRef.current;
    setIsGenerating(true);

    // --- MOBILE PDF OPTIMIZATION START ---
    // Save original styles
    const originalWidth = element.style.width;
    const originalPadding = element.style.padding;

    // Force A4 Desktop width (approx 800px) for the capture
    element.style.width = "800px";
    element.style.padding = "40px";
    // --- MOBILE PDF OPTIMIZATION END ---

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // 2 is balanced for mobile performance and clarity
        useCORS: true,
        allowTaint: true,
        windowWidth: 800, // Important: forces html2canvas to ignore mobile viewport
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`ShreeHari_Invoice_${orderId}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      // Restore original styles
      element.style.width = originalWidth;
      element.style.padding = originalPadding;
      setIsGenerating(false);
    }
  };

  if (!data) return <div className="text-center py-5">Loading Invoice...</div>;

  const orderTotal = data.items.reduce((sum, item) => {
    const price = Number(item.price || 0);
    const qty = Number(item.quantity || 0);
  
    return sum + (price * qty);
  }, 0);

  return (
    <>
      <Navbar />
      <style>{`
        .invoice-bg { background: #f8fafc; min-height: 100vh; padding: 40px 0; }
        
        /* This wrapper allows mobile users to see the full invoice by scrolling horizontally */
        .invoice-scroll-wrapper { 
          overflow-x: auto; 
          padding-bottom: 20px;
          display: flex;
          justify-content: center;
        }

        .invoice-paper {
          background: #fff;
          width: 800px; /* Fixed width ensures consistent layout */
          min-height: 1000px;
          padding: 60px;
          position: relative;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        .brand-green { color: #198754; }
        .bg-brand { background: #198754; color: white; }
        
        .status-stamp {
          position: absolute;
          top: 50px;
          right: 60px;
          border: 3px solid #198754;
          color: #198754;
          padding: 8px 20px;
          font-weight: 900;
          font-size: 24px;
          border-radius: 12px;
          transform: rotate(12deg);
          opacity: 0.6;
        }

        .table-custom thead th {
          background: #f1f5f9;
          text-transform: uppercase;
          font-size: 12px;
          color: #475569;
          padding: 15px;
        }

        .item-row td { padding: 15px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
        
        @media (max-width: 768px) {
          .invoice-paper { transform: scale(0.6); transform-origin: top center; margin-bottom: -400px; }
          .invoice-scroll-wrapper { justify-content: flex-start; }
        }
      `}</style>

      <div className="invoice-bg">
        <div className="container">
          <div className="invoice-scroll-wrapper">
            <div ref={invoiceRef} className="invoice-paper">
              {/* HEADER */}
              <div className="row mb-5">
                <div className="col-6">
                  <h2 className="fw-bold brand-green mb-1">SHREE HARI</h2>
                  <p className="text-muted small mb-0">
                    Agricultural Solutions & Accessories
                  </p>
                  <p className="text-muted small mb-0">
                    Surat, Gujarat - 395006
                  </p>
                  <p className="text-muted small">Support: +91 99000 88000</p>
                </div>
                <div className="col-6 text-end">
                  <h1
                    className="text-muted opacity-25 mb-0"
                    style={{ fontSize: "45px" }}
                  >
                    INVOICE
                  </h1>
                  <p className="fw-bold mb-0">Order ID: #SH-{data.order_id}</p>
                  <p className="text-muted small">Date: {data.order_date}</p>
                </div>
              </div>

              {/* BILLING INFO */}
              <div className="row mb-5">
                <div className="col-6">
                  <h6 className="fw-bold text-uppercase small text-muted mb-3 border-bottom pb-2">
                    Billed To
                  </h6>
                  <div className="fw-bold">{data.customer_name}</div>
                  <div className="small text-muted">{data.customer_phone}</div>
                  <div className="small text-muted">{data.customer_email}</div>
                </div>
                <div className="col-6 text-end">
                  <h6 className="fw-bold text-uppercase small text-muted mb-3 border-bottom pb-2">
                    Shipping Address
                  </h6>
                  <div
                    className="small text-muted"
                    style={{ maxWidth: "250px", marginLeft: "auto" }}
                  >
                    {data.customer_address}
                  </div>
                </div>
              </div>

              {/* PRODUCTS */}
              <table className="table table-custom mb-5">
                <thead>
                  <tr>
                    <th>Product Details</th>
                    <th className="text-center">Rate</th>
                    <th className="text-center">Qty</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, idx) => {
                    const price = Number(item.price);
                    const qty = Number(item.quantity);
                    const disc = Number(item.discount_value || 0);
                    const total = price * qty;

                    return (
                      <tr key={idx} className="item-row">
                        <td>
                          <div className="fw-bold">{item.product_name}</div>
                          {disc > 0 && (
                            <span
                              className="badge bg-success-subtle text-success border-0 small"
                              style={{ fontSize: "10px" }}
                            >
                              {disc}% Discount Applied
                            </span>
                          )}
                        </td>
                        <td className="text-center">
                          ₹{price.toLocaleString()}
                        </td>
                        <td className="text-center">{qty}</td>
                        <td className="text-end fw-bold">
                          ₹{total.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* SUMMARY */}
              <div className="row justify-content-end">
                <div className="col-5">
                  <div className="d-flex justify-content-between p-2">
                    <span className="text-muted">Subtotal</span>
                    <span>₹{orderTotal.toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between p-2">
                    <span className="text-muted">GST (0%)</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="d-flex justify-content-between p-3 bg-light rounded mt-2">
                    <span className="fw-bold">Amount Paid</span>
                    <span
                      className="fw-bold brand-green"
                      style={{ fontSize: "22px" }}
                    >
                      ₹{orderTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-5 pt-5 text-center border-top">
                <p className="small text-muted mb-0">
                  Thank you for your business with Shree Hari Agro.
                </p>
                <p className="small text-muted">
                  For returns or support, visit www.shreehari.com
                </p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="text-center mt-5">
            <button
              className="btn btn-success btn-lg px-5 rounded-pill shadow-lg fw-bold"
              onClick={downloadPDF}
              disabled={isGenerating}
            >
              {isGenerating ? "Preparing PDF..." : "DOWNLOAD PDF"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Invoice;
