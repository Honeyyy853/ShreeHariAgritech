import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../components";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const Review = () => {
  const { order_id, product_id } = useParams();
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!review.trim()) {
      alert("Please write a few words about your experience.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("product_id", product_id);
    formData.append("rating", rating);
    formData.append("review_text", review);

    try {
      const res = await axios.post(
        "http://localhost/ShreeHari/addReview.php",
        formData
      );

      if (res.data.status === true || res.data.status === "true") {
        alert("Thank you for your feedback!");
        navigate("/order-history");
      } else {
        alert(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <style>{`
        .review-page {
          background: #f8fafc;
          min-height: 80vh;
          display: flex;
          align-items: center;
        }
        .review-card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.04);
          padding: 40px;
          border: 1px solid #f1f5f9;
        }
        .star-container {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin: 20px 0;
        }
        .star {
          cursor: pointer;
          transition: transform 0.2s;
          font-size: 2.5rem;
        }
        .star:hover {
          transform: scale(1.2);
        }
        .review-textarea {
          border-radius: 16px;
          border: 1.5px solid #e2e8f0;
          padding: 15px;
          resize: none;
          min-height: 150px;
          transition: 0.3s;
        }
        .review-textarea:focus {
          border-color: #15803d;
          box-shadow: 0 0 0 4px rgba(21, 128, 61, 0.1);
          outline: none;
        }
        .submit-btn {
          background: linear-gradient(135deg, #15803d, #16a34a);
          color: white;
          border: none;
          border-radius: 50px;
          padding: 14px 40px;
          font-weight: 700;
          width: 100%;
          transition: 0.3s;
        }
        .submit-btn:disabled {
          background: #94a3b8;
        }
      `}</style>

      <div className="review-page py-5">
        <div className="container">
          <div className="row justify-content-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-md-6 col-lg-5"
            >
              <div className="review-card text-center">
                <div className="mb-4">
                  <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">Product Review</span>
                  <h2 className="fw-bold mt-3" style={{ color: "#1e293b" }}>Share Your Experience</h2>
                  <p className="text-muted">How would you rate the quality of our natural products?</p>
                </div>

                {/* Star Rating System */}
                <div className="star-container">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          style={{ display: "none" }}
                          value={ratingValue}
                          onClick={() => setRating(ratingValue)}
                        />
                        <FaStar
                          className="star"
                          color={ratingValue <= (hover || rating) ? "#fbbf24" : "#e2e8f0"}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
                <p className="fw-bold text-success mb-4">{rating} Out of 5 Stars</p>

                <div className="text-start mb-4">
                  <label className="form-label fw-semibold ps-2">Your Comments</label>
                  <textarea
                    className="form-control review-textarea"
                    placeholder="Describe the product quality, packaging, or delivery..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                </div>

                <button 
                  onClick={handleSubmit} 
                  className="submit-btn shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  ) : "Submit Review"}
                </button>
                
                <button 
                  className="btn btn-link text-muted mt-3 text-decoration-none"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Review;