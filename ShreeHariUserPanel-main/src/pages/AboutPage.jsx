import React from "react";
import { Footer, Navbar } from "../components";
import {
  FaLeaf,
  FaIndustry,
  FaGlobe,
  FaHandshake,
  FaCheckCircle,
  FaAward,
} from "react-icons/fa";
import { motion } from "framer-motion";

const theme = {
  bg: "#F7F9F0", // Softer light green
  primary: "#556B2F", // Olive Drab
  secondary: "#8FA31E", // Citrine
  accent: "#C6D870", // Pear
  textDark: "#2F3A1F",
  cardBg: "#FFFFFF",
};

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const AboutPage = () => {
  const galleryImages = [
    "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800", // Agriculture meeting
    "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&q=80&w=800", // Farm field
    "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80&w=800", // Herbal processing
    "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&q=80&w=800", // Networking
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800", // Sustainability
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800", // Bulk seeds
  ];

  return (
    <>
      <Navbar />
      <style>{`
        .hero-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(rgba(85, 107, 47, 0.8), rgba(85, 107, 47, 0.9)), 
                      url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1920');
          background-size: cover;
          background-position: center;
        }
        .process-dot {
          width: 50px; height: 50px; border-radius: 50%;
          background: ${theme.accent}; color: ${theme.primary};
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 15px; font-weight: bold; font-size: 1.2rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .feature-card:hover {
          border-bottom: 4px solid ${theme.secondary};
        }
        .gallery-img {
          transition: 0.5s all ease;
          filter: grayscale(20%);
        }
        .gallery-img:hover {
          filter: grayscale(0%);
          transform: scale(1.03);
        }
      `}</style>

      {/* ================= HERO ================= */}
      <section className="hero-section text-center d-flex align-items-center justify-content-center text-white" style={{ minHeight: "70vh" }}>
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="container">
          <span className="text-uppercase fw-bold mb-2 d-block" style={{ letterSpacing: 4, color: theme.accent }}>Rooted in Trust</span>
          <h1 className="fw-bold display-3 mb-4">Shree Hari Agritech</h1>
          <p className="lead mx-auto mb-5" style={{ maxWidth: 750 }}>
            Empowering the global supply chain by connecting pure, farm-fresh herbal 
            and agricultural products with international markets.
          </p>
          <motion.a href="/contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="btn shadow-lg"
            style={{ background: theme.accent, color: theme.primary, borderRadius: 50, padding: "15px 40px", fontWeight: 700 }}>
            Contact for Bulk Orders
          </motion.a>
        </motion.div>
      </section>

      {/* ================= STORY ================= */}
      <section className="container py-5 mt-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <motion.img initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} 
              src="https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800" 
              alt="Our Story" className="img-fluid rounded-4 shadow" />
          </div>
          <div className="col-lg-6 ps-lg-5">
            <h2 className="fw-bold mb-4" style={{ color: theme.primary }}>Our Journey</h2>
            <p className="text-muted leading-relaxed">
              Founded in the heart of Gujarat, <strong>Shree Hari Agritech</strong> began with a simple mission: 
              to ensure that the purity of the farm reaches the end consumer without compromise. 
            </p>
            <p className="text-muted">
              Through years of dedicated research and building a robust network of local farmers, 
              we have evolved into a reliable exporter and wholesaler. Today, we specialize in 
              everything from high-potency Moringa to traditional Ayurvedic staples like Ashwagandha.
            </p>
            <div className="d-flex gap-4 mt-4">
               <div><h3 className="fw-bold mb-0" style={{ color: theme.secondary }}>10+</h3><small>Countries Served</small></div>
               <div className="border-start ps-4"><h3 className="fw-bold mb-0" style={{ color: theme.secondary }}>500+</h3><small>Tons Supplied</small></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE DO ================= */}
      <section style={{ background: theme.bg }} className="py-5">
        <div className="container text-center py-4">
          <h2 className="fw-bold mb-5" style={{ color: theme.primary }}>What We Do</h2>
          <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} className="row g-4">
            {[
              { icon: <FaLeaf />, title: "Herbal Solutions", desc: "Premium Moringa, Amla, and Ashwagandha extracts." },
              { icon: <FaIndustry />, title: "Precision Processing", desc: "State-of-the-art facilities ensuring global safety standards." },
              { icon: <FaGlobe />, title: "Global Export", desc: "Seamless logistics for bulk international agriculture supply." },
            ].map((item, i) => (
              <motion.div className="col-md-4" key={i} variants={fadeInUp}>
                <div className="p-5 h-100 feature-card shadow-sm border-0" style={{ background: theme.cardBg, borderRadius: 20 }}>
                  <div className="mb-3" style={{ fontSize: 40, color: theme.secondary }}>{item.icon}</div>
                  <h4 className="fw-bold mb-3">{item.title}</h4>
                  <p className="text-muted small mb-0">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="container py-5 text-center">
        <h2 className="fw-bold mb-5" style={{ color: theme.primary }}>Our Quality Process</h2>
        <div className="row g-4">
          {["Sourcing", "Processing", "Testing", "Packaging"].map((step, i) => (
            <div className="col-md-3" key={i}>
              <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                <div className="process-dot">{i + 1}</div>
                <h6 className="fw-bold">{step}</h6>
                <p className="small text-muted">Ensuring maximum nutrition and purity.</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section style={{ background: theme.bg }} className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: theme.primary }}>Presence & Activities</h2>
          <div className="row g-3">
            {galleryImages.map((img, i) => (
              <div key={i} className="col-md-4 col-sm-6">
                <motion.div whileHover={{ y: -10 }} className="overflow-hidden rounded-4 shadow-sm">
                  <img src={img} alt="event" className="gallery-img" style={{ width: "100%", height: "280px", objectFit: "cover" }} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="container py-5">
        <div className="bg-white p-5 rounded-5 shadow-sm">
          <h2 className="text-center fw-bold mb-5" style={{ color: theme.primary }}>Why Choose Us</h2>
          <div className="row g-4">
            {[
              { t: "High Quality Products", i: <FaAward /> },
              { t: "Bulk Order Capability", i: <FaIndustry /> },
              { t: "Export Ready Documentation", i: <FaCheckCircle /> },
              { t: "Ethical Sourcing", i: <FaHandshake /> },
              { t: "Competitive Global Pricing", i: <FaGlobe /> },
              { t: "Timely Logistics", i: <FaGlobe /> },
            ].map((item, i) => (
              <div className="col-md-4" key={i}>
                <div className="d-flex align-items-center gap-3 p-3">
                   <span style={{ color: theme.secondary, fontSize: "1.5rem" }}>{item.i}</span>
                   <span className="fw-semibold text-dark">{item.t}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="text-center py-5 text-white mt-5" style={{ background: theme.primary }}>
        <div className="container py-4">
          <h2 className="display-6 fw-bold mb-3">Ready to Partner with Us?</h2>
          <p className="mb-4 opacity-75">Connect with us for wholesale pricing and export-grade herbal products.</p>
          <motion.a href="/contact" whileHover={{ scale: 1.1 }} className="btn px-5 py-3 fw-bold" 
            style={{ background: theme.accent, color: theme.primary, borderRadius: 50 }}>
            Get a Quote Now
          </motion.a>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutPage;