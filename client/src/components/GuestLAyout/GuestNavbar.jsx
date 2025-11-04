import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';

const GuestNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand/Logo with animated logo image */}
        <div className="navbar-brand">
          <NavLink to="/" className="brand-link">
            <div className="logo-container">
              <img 
                src="/logo2.jpg" // Replace with your logo path
                alt="Ligand Software Solutions Logo"
                className="logo-image"
              />
              <span className="logo-text-container">
                <span className="logo-gradient">Ligand Software Solutions</span>
                <span className="logo-subtitle">Exclusive Software for Innnovative Minds</span>
              </span>
            </div>
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button 
          className={`navbar-toggle ${isOpen ? 'active' : ''}`}
          onClick={toggleNavbar}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes className="toggle-icon" /> : <FaBars className="toggle-icon" />}
        </button>

        {/* Navigation links */}
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <div className="navbar-nav">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              <FaHome className="nav-icon" />
              <span>Home</span>
            </NavLink>
            <NavLink 
              to="/register" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              <FaUserPlus className="nav-icon" />
              <span>Register</span>
            </NavLink>
            <NavLink 
              to="/login" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              <FaSignInAlt className="nav-icon" />
              <span>Login</span>
            </NavLink>
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          padding: 0.8rem 1.5rem;
          position: relative;
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .navbar-brand {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .brand-link {
          text-decoration: none;
          color: white;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .logo-image {
          height: 40px;
          width: 40px;
          object-fit: contain;
          animation: pulse 2s infinite, float 3s ease-in-out infinite;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 5px;
        }

        .logo-text-container {
          display: flex;
          flex-direction: column;
        }

        .logo-gradient {
          background: linear-gradient(90deg, #f0f0f0ff, #cad3eeff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
          font-size: 1.4rem;
          line-height: 1.2;
        }

        .logo-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.8rem;
          font-weight: 500;
          line-height: 1.2;
        }

        .navbar-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: white;
          font-size: 1.5rem;
        }

        .navbar-menu {
          display: flex;
          align-items: center;
        }

        .navbar-nav {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 1rem;
        }

        .nav-link {
          text-decoration: none;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .nav-link:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .nav-link.active {
          color: #fff;
          background: linear-gradient(90deg, #ff6b6b, #ff8e53);
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
        }

        .nav-icon {
          font-size: 1.1rem;
        }

        /* Logo animations */
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .navbar {
            padding: 0.6rem 1rem;
          }
          
          .navbar-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }

          .logo-container {
            gap: 0.6rem;
          }

          .logo-image {
            height: 35px;
            width: 35px;
          }

          .logo-gradient {
            font-size: 1.2rem;
          }

          .logo-subtitle {
            font-size: 0.7rem;
          }

          .navbar-menu {
            position: fixed;
            top: 0;
            right: 0;
            height: 100vh;
            width: 70%;
            max-width: 300px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            box-shadow: -5px 0 25px rgba(0, 0, 0, 0.15);
            flex-direction: column;
            align-items: flex-start;
            padding: 5rem 1.5rem 2rem;
            transform: translateX(100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s ease;
            z-index: 999;
          }

          .navbar-menu.active {
            transform: translateX(0);
            opacity: 1;
            visibility: visible;
          }

          .navbar-nav {
            flex-direction: column;
            width: 100%;
            gap: 1rem;
          }

          .nav-link {
            display: flex;
            padding: 1rem;
            width: 100%;
            border-radius: 6px;
          }
        }

        /* For very small screens */
        @media (max-width: 480px) {
          .logo-gradient {
            font-size: 1.1rem;
          }
          
          .logo-subtitle {
            font-size: 0.65rem;
          }
        }

        /* Animation for menu items */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .navbar-menu.active .nav-link {
          animation: slideIn 0.3s ease forwards;
        }

        .navbar-menu.active .nav-link:nth-child(1) {
          animation-delay: 0.1s;
        }

        .navbar-menu.active .nav-link:nth-child(2) {
          animation-delay: 0.2s;
        }

        .navbar-menu.active .nav-link:nth-child(3) {
          animation-delay: 0.3s;
        }
      `}</style>
    </nav>
  );
};

export default GuestNavbar;


