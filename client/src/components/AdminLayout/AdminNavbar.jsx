import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  
  FaSignInAlt,
  
  FaBars,
  FaTimes,
  FaBook,
  FaChevronDown,
  FaChevronUp,
  FaUser,
  FaObjectGroup,
  
  
} from "react-icons/fa";
import { GiProgression } from "react-icons/gi";

import { AiFillControl } from "react-icons/ai";
import { RiSettings4Fill } from "react-icons/ri";
import { MdDelete, MdOutlinePublishedWithChanges } from "react-icons/md";
import { TbHistoryToggle } from "react-icons/tb";
import { FaLaptopCode, FaMoneyCheck, FaChartBar, FaFileInvoiceDollar } from "react-icons/fa";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // Group related links under dropdowns - Reduced to 5 main items
  const navStructure = [
    {
      name: "Dashboard",
      to: "/admin/admindashboard",
      icon: FaChartBar,
      single: true
    },
     {
      name: "Students",
     
      icon: FaChartBar,
      
      dropdown: "Students",
      links: [
        {
          name: "Approve Students",
          to: "/admin/student/approve",
          icon: FaUser
        },
        {
          name: "Students",
          to: "/admin/dashboard",
          icon: FaUser
        },
        {
          name: "Attendance",
          to: "/admin/attendance",
          icon: FaChartBar
        },
        {
          name: "Student Progress",
          to: "/admin/getstudentprogress",
          icon: GiProgression
        },
        {
          name: "Delete Students",
          to: "/admin/deletestudents",
          icon: MdDelete
        },
       
      ]
    },
    {
      name: "Teacher",
     
      icon: FaChartBar,
      
       dropdown: "Teacher",
      links: [
        {
          name: "Home-Work",
          to: "/admin/student/homework",
          icon: FaUser
        },
        {
          name: "Add Teacher",
          to: "/admin/add-teacher",
          icon: FaChartBar
        },
        ,
        {
          name: "Manage Teacher",
          to: "/admin/manage-teacher",
          icon: FaChartBar
        }
       
      ]
    },
    {
      name: "Payments",
      icon: FaMoneyCheck,
      dropdown: "payments",
      links: [
        {
          name: "Groups",
          to: "/admin/payments",
          icon: FaObjectGroup
        },
        {
          name: "Fees Status",
          to: "/admin/payments/mark",
          icon: FaFileInvoiceDollar
        },
       
      ]
    },
    {
      name: "Exams",
      icon: FaBook,
      dropdown: "exams",
      links: [
        {
          name: "Manage Exams",
          to: "/admin/exam",
          icon: FaBook
        },
        {
          name: "Access Control",
          to: "/admin/manageexamsvisibility",
          icon: AiFillControl
        }
      ]
    },
    {
      name: "History",
      to: "/admin/history",
      icon: TbHistoryToggle,
      single: true
    },
    {
      name: "Settings",
      icon: RiSettings4Fill,
      dropdown: "settings",
      links: [
        {
          name: "Manage Notes",
          to: "/admin/notescontroll",
          icon: FaBook
        },
        {
          name: "Registration Options",
          to: "/admin/adminoptions",
          icon: RiSettings4Fill
        },
        {
          name: "Change Password",
          to: "/admin/changepassword",
          icon: MdOutlinePublishedWithChanges
        }
      ]
    }
  ];

  // Function to check if any link in a dropdown is active
  const isDropdownActive = (dropdownLinks) => {
    return dropdownLinks.some(link => 
      window.location.pathname === link.to
    );
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Do you want to logout?");
    if (confirmLogout) {
      setIsOpen(false);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/";
    }
  };

  const NavLinkItem = ({ to, icon: Icon, name, onClick, isDropdownItem = false }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-link ${isActive ? "active" : ""} ${isDropdownItem ? "dropdown-item" : ""}`
      }
      onClick={onClick}
    >
      <Icon className="nav-icon" />
      <span>{name}</span>
    </NavLink>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand/Logo */}
        <div className="navbar-brand">
          <NavLink to="/admin" className="brand-link">
            <div className="logo-container">
              <img
                src="/logo2.jpg"
                alt="Ligand Software Solutions Logo"
                className="logo-image"
              />
              <span className="logo-text-container">
                <span className="logo-gradient">Ligand Software Solutions</span>
                <span className="logo-subtitle">
                  Exclusive Software for Innovative Minds
                </span>
              </span>
            </div>
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          className={`navbar-toggle ${isOpen ? "active" : ""}`}
          onClick={toggleNavbar}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes className="toggle-icon" /> : <FaBars className="toggle-icon" />}
        </button>

        {/* Navigation links */}
        <div className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <div className="navbar-nav">
            {navStructure.map((item) => {
              if (item.single) {
                return (
                  <NavLinkItem
                    key={item.name}
                    to={item.to}
                    icon={item.icon}
                    name={item.name}
                    onClick={() => setIsOpen(false)}
                  />
                );
              }

              if (item.dropdown) {
                const isDropdownOpen = openDropdown === item.dropdown;
                const hasActiveChild = isDropdownActive(item.links);

                return (
                  <div key={item.name} className="dropdown-container">
                    <button
                      className={`dropdown-toggle ${hasActiveChild ? 'active' : ''} ${isDropdownOpen ? 'open' : ''}`}
                      onClick={() => toggleDropdown(item.dropdown)}
                    >
                      <item.icon className="nav-icon" />
                      <span>{item.name}</span>
                      {isDropdownOpen ? <FaChevronUp className="dropdown-arrow" /> : <FaChevronDown className="dropdown-arrow" />}
                    </button>
                    <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                      {item.links.map((link) => (
                        <NavLinkItem
                          key={link.name}
                          to={link.to}
                          icon={link.icon}
                          name={link.name}
                          onClick={() => {
                            setIsOpen(false);
                            setOpenDropdown(null);
                          }}
                          isDropdownItem={true}
                        />
                      ))}
                    </div>
                  </div>
                );
              }

              return null;
            })}

            {/* Logout button */}
            <a
              href="/"
              className="nav-link logout-link"
              onClick={handleLogout}
            >
              <FaSignInAlt className="nav-icon" />
              <span>Logout</span>
            </a>
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
          max-width: 1600px;
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
          gap: 0.5rem;
          align-items: center;
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
          white-space: nowrap;
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

        /* Dropdown Styles */
        .dropdown-container {
          position: relative;
        }

        .dropdown-toggle {
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
          cursor: pointer;
          white-space: nowrap;
          border: none;
          font-family: inherit;
          font-size: inherit;
        }

        .dropdown-toggle:hover,
        .dropdown-toggle.open {
          color: #fff;
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .dropdown-toggle.active {
          color: #fff;
          background: linear-gradient(90deg, #ff6b6b, #ff8e53);
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
        }

        .dropdown-arrow {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .dropdown-toggle.open .dropdown-arrow {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          min-width: 200px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 1000;
          margin-top: 0.5rem;
          overflow: hidden;
        }

        .dropdown-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-menu .nav-link {
          border-radius: 0;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: transparent;
          padding: 0.8rem 1rem;
        }

        .dropdown-menu .nav-link:last-child {
          border-bottom: none;
        }

        .dropdown-menu .nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .logout-link {
          margin-left: 0.5rem;
        }

        /* Logo animations */
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
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
            overflow-y: auto;
          }

          .navbar-menu.active {
            transform: translateX(0);
            opacity: 1;
            visibility: visible;
          }

          .navbar-nav {
            flex-direction: column;
            width: 100%;
            gap: 0.5rem;
          }

          .nav-link, .dropdown-toggle {
            display: flex;
            padding: 1rem;
            width: 100%;
            border-radius: 6px;
            justify-content: flex-start;
          }

          .dropdown-container {
            width: 100%;
          }

          .dropdown-menu {
            position: static;
            box-shadow: none;
            background: rgba(255, 255, 255, 0.05);
            margin-top: 0.5rem;
            border-radius: 6px;
            min-width: auto;
            transform: none;
          }

          .dropdown-menu.open {
            display: block;
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

        .navbar-menu.active .nav-link,
        .navbar-menu.active .dropdown-toggle {
          animation: slideIn 0.3s ease forwards;
        }

        .navbar-menu.active .nav-link:nth-child(1),
        .navbar-menu.active .dropdown-toggle:nth-child(1) {
          animation-delay: 0.1s;
        }

        .navbar-menu.active .nav-link:nth-child(2),
        .navbar-menu.active .dropdown-toggle:nth-child(2) {
          animation-delay: 0.2s;
        }
      `}</style>
    </nav>
  );
};

export default AdminNavbar;