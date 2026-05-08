// src/components/CashierLogin.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { motion } from "framer-motion";
import { CreditCard, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import LogoImage from "../upload/logo.jpg";
import "../styles/PremiumUI.css";

const CashierLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://demo-chinese-restaurant-1-0.onrender.com/api/auth/login", { email, password });
      const data = res.data;
  
      if (data.role !== "cashier") {
        alert("Unauthorized access");
        setLoading(false);
        return;
      }
  
      login(data);
      navigate("/cashier");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-luxury">
      <div className="auth-split-left">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="auth-card-premium auth-accent-cashier"
        >
          <div className="auth-logo-box">
            <img src={LogoImage} alt="Logo" />
          </div>
          
          <h2 className="auth-title-premium">Cashier</h2>
          <span className="auth-subtitle-premium text-cashier">Point of Sale Access</span>

          <form onSubmit={handleLogin} className="mt-4">
            <div className="auth-input-group">
              <label>Work Email</label>
              <div className="position-relative">
                <Mail className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
                <input
                  type="email"
                  className="auth-input-premium ps-5"
                  placeholder="cashier@restaurant.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Password</label>
              <div className="position-relative">
                <Lock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
                <input
                  type="password"
                  className="auth-input-premium ps-5"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              className="auth-btn-primary btn-cashier mt-4"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="auth-footer">
             <p className="text-center text-sm text-muted">
              Don't have an account?{" "}
              <Link to="/signup?role=cashier" className="auth-link-gold">
                Register
              </Link>
            </p>
            <Link to="/forgot-password" size="sm" className="auth-link-gold text-sm d-block mt-2">
              Forgot Password?
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="auth-split-right">
        <div className="text-center" style={{ zIndex: 10 }}>
          <CreditCard size={80} color="#f59e0b" className="mb-4" />
          <h1 className="luxury-text-orient">CASHIER</h1>
          <p className="luxury-est">FRONT-OF-HOUSE OPS</p>
        </div>
      </div>
    </div>
  );
};

export default CashierLogin;
