import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
  FaUnlock,
  FaHourglassHalf,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate= useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("https://ligand-software-solutions-workshop-2.onrender.com/api/users/login", {
        email,
        password,
      });

      // Save JWT token and user ID

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("username", res.data.user.name);
      localStorage.setItem("usn", res.data.user.usn);
      localStorage.setItem("role",res.data.user.role);
      localStorage.setItem("collegeName",res.data.user.collegeName);
      console.log(res.data);

      setMessage({ text: "Login successful! Redirecting...", type: "success" });
      if(res.data.user.role==="admin")navigate("/admin/admindashboard")
      else navigate("/user")
    } catch (err) {
      setMessage({
        text: err.response?.data?.error || "Login failed",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container" data-aos="fade-up">
      
        <div className="login-card Tilt-inner">
          <div className="login-header">
            <h2>Welcome Back!</h2>
            <p>Sign in to continue your journey</p>
           
          </div>

          {message && (
            <div className={`message ${message.type}`} data-aos="fade-in">
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div
              className="form-group"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <label htmlFor="email">
                <FaEnvelope className="icon" /> Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div
              className="form-group"
              data-aos="fade-right"
              data-aos-delay="150"
            >
              <label htmlFor="password">
                <FaLock className="icon" /> Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={`submit-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              {isLoading ? (
                <>
                  <FaHourglassHalf className="icon" /> Signing in...
                </>
              ) : (
                <>
                  <FaSignInAlt className="icon" /> Login
                </>
              )}
            </button>
          </form>

          <div
            className="forgot-password"
            data-aos="fade-in"
            data-aos-delay="250"
          >
            <a href="/ForgotPassword">
              <FaUnlock className="icon" /> Forgot Password?
            </a>
          </div>

          <div
            className="register-redirect"
            data-aos="fade-in"
            data-aos-delay="300"
          >
            Don't have an account?{" "}
            <a href="/register">
              <FaUserPlus className="icon" /> Sign up here
            </a>
          </div>
        </div>
     

      <style jsx>{`
        .Tilt {
          transition: all 0.3s;
        }
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .login-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          padding: 40px;
          width: 450px;
          transition: transform 0.3s ease;
        }

        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .login-header h2 {
          color: #333;
          margin-bottom: 10px;
          font-weight: 700;
          font-size: 28px;
        }

        .login-header p {
          color: #666;
          font-size: 16px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          font-weight: 600;
          color: #444;
          font-size: 14px;
        }

        .icon {
          margin-right: 8px;
        }

        .form-group input {
          padding: 14px 16px;
          border: 2px solid #e1e5e9;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
          outline: none;
        }

        .submit-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 16px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 7px 14px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-btn.loading {
          background: linear-gradient(135deg, #a7a7a7 0%, #7a7a7a 100%);
        }

        .message {
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-weight: 500;
          text-align: center;
        }

        .message.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .message.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .forgot-password {
          text-align: center;
          margin: 20px 0;
        }

        .forgot-password a {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .forgot-password a:hover {
          text-decoration: underline;
          color: #5a67d8;
        }

        .register-redirect {
          text-align: center;
          margin-top: 25px;
          color: #666;
          font-size: 14px;
        }

        .register-redirect a {
          display: inline-flex;
          align-items: center;
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          margin-left: 5px;
        }

        .register-redirect a:hover {
          text-decoration: underline;
        }

        @media (max-width: 576px) {
          .login-card {
            padding: 25px;
            width: 100%;
          }

          .login-header h2 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
