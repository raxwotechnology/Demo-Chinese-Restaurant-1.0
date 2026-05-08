// src/components/Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, User, Mail, Lock, Key, ArrowRight, Loader2, Sparkles } from "lucide-react";
import LogoImage from "../upload/logo.jpg";
import "../styles/PremiumUI.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const role = new URLSearchParams(location.search).get("role") || "cashier";

  const requiresKey = ["cashier", "kitchen"].includes(role);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !email || !password || (requiresKey && !key)) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      await axios.post("https://demo-chinese-restaurant-1-0.onrender.com/api/auth/signup", {
        name,
        email,
        password,
        role,
        ...(requiresKey && { signupKey: key }),
      });

      alert(`${role.charAt(0).toUpperCase() + role.slice(1)} account created successfully!`);
      navigate(`/${role}-login`);
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-luxury">
      <div className="auth-split-left">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="auth-card-premium"
          style={{ maxWidth: '480px' }}
        >
          <div className="auth-logo-box">
            <img src={LogoImage} alt="Logo" />
          </div>
          
          <h2 className="auth-title-premium">Join Team</h2>
          <span className="auth-subtitle-premium">Register as {role.toUpperCase()}</span>

          <form onSubmit={handleSignup} className="mt-4">
            <div className="auth-input-group">
              <label>Full Name</label>
              <div className="position-relative">
                <User className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
                <input
                  type="text"
                  className="auth-input-premium ps-5"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Email address</label>
              <div className="position-relative">
                <Mail className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
                <input
                  type="email"
                  className="auth-input-premium ps-5"
                  placeholder="email@example.com"
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

            {requiresKey && (
              <div className="auth-input-group">
                <label>Signup Key</label>
                <div className="position-relative">
                  <Key className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
                  <input
                    type="text"
                    className="auth-input-premium ps-5"
                    placeholder="Enter key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            {error && <div className="alert alert-danger py-2 px-3 rounded-3 text-sm mb-3">{error}</div>}

            <button
              type="submit"
              className="auth-btn-primary mt-4 auth-btn-gold"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : `Create ${role} Account`}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="auth-footer">
            <p className="text-center text-sm text-muted">
              Already have an account?{" "}
              <Link to={`/${role}-login`} className="auth-link-gold">
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <div className="auth-split-right">
        <div className="text-center" style={{ zIndex: 10 }}>
          <Sparkles size={80} color="#f59e0b" className="mb-4" />
          <h1 className="luxury-text-orient">JOIN</h1>
          <p className="luxury-est">THE ROYAL LEGACY</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
