// src/components/AdminLogin.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import LogoImage from "../upload/logo.jpg";
import "../styles/PremiumUI.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://demo-chinese-restaurant-1-0.onrender.com/api/auth/login", { email, password });
      const data = res.data;

      if (data.role !== "admin") {
        alert("Unauthorized access");
        setLoading(false);
        return;
      }

      login(data);
      navigate("/admin");
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
          className="auth-card-premium auth-accent-admin"
        >
          <div className="auth-logo-box">
            <img src={LogoImage} alt="Logo" />
          </div>
          
          <h2 className="auth-title-premium">Admin</h2>
          <span className="auth-subtitle-premium text-admin">Secure Terminal Access</span>

          <form onSubmit={handleLogin} className="mt-4">
            <div className="auth-input-group">
              <label>Email Address</label>
              <div className="position-relative">
                <Mail className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
                <input
                  type="email"
                  className="auth-input-premium ps-5"
                  placeholder="admin@restaurant.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Secret Password</label>
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
              className="auth-btn-primary btn-admin mt-4"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Authenticate"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="auth-footer">
            <Link to="/forgot-password" size="sm" className="auth-link-gold text-sm">
              Trouble logging in?
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="auth-split-right">
        <div className="text-center" style={{ zIndex: 10 }}>
          <ShieldCheck size={80} color="#f59e0b" className="mb-4" />
          <h1 className="luxury-text-orient">MASTER</h1>
          <p className="luxury-est">CENTRAL COMMAND CENTER</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
