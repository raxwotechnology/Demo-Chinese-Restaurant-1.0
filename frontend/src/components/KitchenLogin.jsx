// src/components/KitchenLogin.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { motion } from "framer-motion";
import { Utensils, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import LogoImage from "../upload/logo.jpg";
import "../styles/PremiumUI.css";

const KitchenLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://demo-chinese-restaurant-1-0.onrender.com/api/auth/login", {
        email,
        password,
      });
      const data = res.data;

      if (data.role !== "kitchen") {
        alert("Unauthorized access");
        setLoading(false);
        return;
      }

      login(data);
      navigate("/kitchen");
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
          className="auth-card-premium auth-accent-kitchen"
        >
          <div className="auth-logo-box">
            <img src={LogoImage} alt="Logo" />
          </div>
          
          <h2 className="auth-title-premium">Kitchen</h2>
          <span className="auth-subtitle-premium text-kitchen">Live Station Access</span>

          <form onSubmit={handleLogin} className="mt-4">
            <div className="auth-input-group">
              <label>Login Email</label>
              <div className="position-relative">
                <Mail className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
                <input
                  type="email"
                  className="auth-input-premium ps-5"
                  placeholder="chef@restaurant.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Passcode</label>
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
              className="auth-btn-primary btn-kitchen mt-4"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Access Kitchen"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="auth-footer">
             <p className="text-center text-sm text-muted">
              New team member?{" "}
              <Link to="/signup?role=kitchen" className="auth-link-gold">
                Join Now
              </Link>
            </p>
            <Link to="/forgot-password" size="sm" className="auth-link-gold text-sm d-block mt-2">
              Lost Password?
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="auth-split-right">
        <div className="text-center" style={{ zIndex: 10 }}>
          <Utensils size={80} color="#f59e0b" className="mb-4" />
          <h1 className="luxury-text-orient">KITCHEN</h1>
          <p className="luxury-est">CULINARY COMMAND</p>
        </div>
      </div>
    </div>
  );
};

export default KitchenLogin;
