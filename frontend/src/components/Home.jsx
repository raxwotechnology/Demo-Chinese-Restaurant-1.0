// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, Flame, ShieldCheck, ChevronRight, Fingerprint } from "lucide-react";
import LogoImage from "../upload/logo.jpg";
import "../styles/PremiumUI.css";
import "./LandingPortal.css";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="auth-page-luxury">
      <div className="auth-split-left">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="portal-card"
        >
          <motion.div variants={itemVariants} className="portal-logo-section">
            <div className="portal-logo-container">
              <img src={LogoImage} alt="Gasma" className="portal-logo" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="portal-header-section">
            <h1 className="portal-title">Royal Orient</h1>
            <p className="portal-subtitle">INTELLIGENT RESTAURANT ECOSYSTEM</p>
          </motion.div>

          <motion.div variants={itemVariants} className="portal-actions-section">
            <Link to="/cashier-login" className="portal-btn-primary">
              <div className="btn-content-left">
                <CreditCard size={22} />
                <span>POS TERMINAL</span>
              </div>
              <ChevronRight size={18} className="btn-chevron" />
            </Link>

            <Link to="/kitchen-login" className="portal-btn-secondary">
              <div className="btn-content-left">
                <Flame size={20} className="icon-kitchen" />
                <span>LIVE KITCHEN</span>
              </div>
              <ChevronRight size={18} className="btn-chevron" />
            </Link>

            <Link to="/admin-login" className="portal-btn-secondary">
              <div className="btn-content-left">
                <ShieldCheck size={20} className="icon-admin" />
                <span>ADMINISTRATION</span>
              </div>
              <ChevronRight size={18} className="btn-chevron" />
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="portal-footer-section">
            <div className="secure-badge">
              <Fingerprint size={16} />
              <span>SECURE ACCESS ONLY</span>
            </div>
            <div className="portal-footer-links">
              <Link to="/signup?role=cashier" className="footer-link">STAFF REGISTER</Link>
              <Link to="/signup?role=kitchen" className="footer-link">KITCHEN OPS</Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="auth-split-right">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center"
          style={{ position: 'relative', zIndex: 10 }}
        >
          <div className="brand-badge-indigo mb-4">EST. 1998</div>
          <h1 className="giant-title">ROYAL<br />ORIENT</h1>
          <div style={{ width: '60px', height: '4px', background: '#c5a059', margin: '30px auto' }}></div>
          <p className="vision-text-modern" style={{ maxWidth: '400px', margin: '0 auto' }}>
            Elevating culinary management through digital precision and excellence.
          </p>
          <div className="auth-actions-group">
            <Link to="/signup?role=cashier" className="auth-btn-glass">
              <span>Sign Up as Cashier</span>
            </Link>
            <Link to="/signup?role=kitchen" className="auth-btn-glass secondary">
              <span>Sign Up as Kitchen Staff</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
