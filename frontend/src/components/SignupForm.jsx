import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, User, Mail, Lock, ArrowRight, Loader2, Sparkles } from "lucide-react";
import LogoImage from "../upload/logo.jpg";
import "../styles/PremiumUI.css";

const SignupForm = ({ role, title }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("https://demo-chinese-restaurant-1-0.onrender.com/api/auth/signup", {
        name,
        email,
        password,
        role,
      });
      alert(`${role.charAt(0).toUpperCase() + role.slice(1)} account created successfully!`);
      navigate(`/${role}-login`);
    } catch (err) {
      alert("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-luxury">
      <div className="auth-split-left">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="auth-card-premium"
        >
          <div className="auth-logo-box">
            <img src={LogoImage} alt="Logo" />
          </div>
          
          <h2 className="auth-title-premium">Sign Up</h2>
          <span className="auth-subtitle-premium">{title}</span>

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
              <label>Email Address</label>
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

            <button
              type="submit"
              className="auth-btn-primary mt-4 auth-btn-gold"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Register Account"}
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
          <UserPlus size={80} color="#f59e0b" className="mb-4" />
          <h1 className="luxury-text-orient">JOIN</h1>
          <p className="luxury-est">RESTAURANT MANAGEMENT SYSTEM</p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
