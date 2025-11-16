import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaUserGraduate, FaEye, FaEyeSlash, FaSignInAlt, FaBookReader } from "react-icons/fa";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const TeacherLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const apiUrl = "https://ligand-dev-7.onrender.com/api/teacher/login";

      const res = await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Welcome back! Login successful 🎉");

      // Store teacher data and token in localStorage
      localStorage.setItem("teacherToken", res.data.token);
      localStorage.setItem("teacherInfo", JSON.stringify(res.data.teacher));

      // Store remember me preference
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("savedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("savedEmail");
      }

      // Redirect to teacher dashboard
      setTimeout(() => {
        window.location.href = "/teacher";
      }, 1500);
    } catch (error) {
      console.error("Login Error:", error);
      const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      
      // Clear form on failure for security
      setFormData({
        email: formData.email, // Keep email for convenience
        password: "",
      });
    } finally {
      setLoading(false);
    }
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const remembered = localStorage.getItem("rememberMe");
    const savedEmail = localStorage.getItem("savedEmail");
    
    if (remembered === "true" && savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  return (
        <>
    <div className="teacher-login-container">
      <ToastContainer 
        position="top-right" 
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="login-card">
        {/* Header Section */}
        <div className="login-header">
          
          <div className="header-content">
            <h1>Welcome Back</h1>
            <p>Sign in to your teacher account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">
              <FaBookReader className="input-icon" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              autoComplete="email"
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">
              <FaSignInAlt className="input-icon" />
              Password
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="form-options">
            
            
            <Link to="/teacher-forgot-pwd" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`submit-button ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <>
                <div className="button-spinner"></div>
                Signing In...
              </>
            ) : (
              <>
                <FaSignInAlt />
                Sign In
              </>
            )}
          </button>
          <div
  style={{
    height: "50px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <Link
    to="/login"
    style={{
      marginTop: "20px",
      color: "#667eea",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    }}
  >
    <FaUserGraduate className="icon" style={{ color: "#667eea" }} />
    Back to Student Login
  </Link>
</div>
        </form>

        

        

        
      </div>

    
    </div>

    <style>
      {
        `
        /* TeacherLogin.css */

.teacher-login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 100px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  overflow: hidden;
}

.login-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
  padding: 40px;
  width: 100%;
  max-width: 450px;
  position: relative;
  z-index: 10;
  transition: transform 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
}

/* Header Styles */
.login-header {
  text-align: center;
  margin-bottom: 35px;
}

.header-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  margin: 0 auto 20px;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.header-content h1 {
  margin: 0 0 8px 0;
  color: #2d3748;
  font-size: 1.8rem;
  font-weight: 700;
}

.header-content p {
  margin: 0;
  color: #718096;
  font-size: 1rem;
}

/* Form Styles */
.login-form {
  width: 100%;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  color: #4a5568;
  font-weight: 600;
  font-size: 0.95rem;
}

.input-icon {
  color: #667eea;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 15px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.form-input::placeholder {
  color: #a0aec0;
}

/* Password Input */
.password-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.password-toggle {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.3s ease;
  padding: 5px;
}

.password-toggle:hover {
  color: #667eea;
}

/* Form Options */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 10px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4a5568;
  font-size: 0.9rem;
  cursor: pointer;
  position: relative;
}

.checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.checkbox:checked + .checkmark {
  background: #667eea;
  border-color: #667eea;
}

.checkbox:checked + .checkmark::after {
  content: "✓";
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.forgot-password {
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #5a6fd8;
  text-decoration: underline;
}

/* Submit Button */
.submit-button {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.submit-button:hover:not(.loading) {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.submit-button:active:not(.loading) {
  transform: translateY(-1px);
}

.submit-button.loading {
  background: #cbd5e0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.button-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid transparent;
  border-left: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Demo Credentials */
.demo-credentials {
  background: #f0f9ff;
  border: 1px solid #bee3f8;
  border-radius: 12px;
  padding: 20px;
  margin: 25px 0;
  text-align: center;
}

.demo-credentials h4 {
  margin: 0 0 15px 0;
  color: #2b6cb0;
  font-size: 1rem;
}

.credential-item {
  margin-bottom: 8px;
  color: #4a5568;
  font-size: 0.9rem;
}

.credential-item strong {
  color: #2d3748;
}

.demo-credentials small {
  color: #718096;
  font-style: italic;
}

/* Register Link */
.register-link {
  text-align: center;
  margin: 25px 0;
  padding-top: 25px;
  border-top: 1px solid #e2e8f0;
}

.register-link p {
  margin: 0;
  color: #718096;
}

.register-link-text {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.register-link-text:hover {
  color: #5a6fd8;
  text-decoration: underline;
}

/* Security Notice */
.security-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  background: #f0fff4;
  border-radius: 10px;
  border: 1px solid #c6f6d5;
}

.security-icon {
  font-size: 1.2rem;
}

.security-notice p {
  margin: 0;
  color: #2f855a;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .teacher-login-container {
    padding: 20px 15px;
  }

  .login-card {
    padding: 30px 25px;
  }

  .header-icon {
    width: 70px;
    height: 70px;
    font-size: 1.7rem;
  }

  .header-content h1 {
    font-size: 1.5rem;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .forgot-password {
    align-self: flex-end;
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 25px 20px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .header-content h1 {
    font-size: 1.3rem;
  }

  .form-input {
    padding: 12px;
  }

  .submit-button {
    padding: 14px;
    font-size: 1rem;
  }

  .floating-element {
    font-size: 1.5rem;
  }
}

/* Animation for form elements */
.form-group {
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger animation */
.form-group:nth-child(1) { animation-delay: 0.1s; }
.form-group:nth-child(2) { animation-delay: 0.2s; }
        `
      }
    </style>
    </>
  );
};

export default TeacherLogin;  