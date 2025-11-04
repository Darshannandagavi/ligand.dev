import React, { useState } from 'react';
import './MyNotes.css';

const RoleBasedNotes = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: "Role-Based Layout Components Overview",
      content: "These components provide protected routes based on user roles (admin/user).",
      explanation: "Create a files in admin and user layout folders.",
      image: "/adminlayout file creations.png"
    },
     {
      title: "Ues GuestFooter code in AdminLayout.jsx we provide in previous class only change the Nav items and paths based on new layouts(adminlayout and userlayout).",
      content: "These components provide protected routes based on user roles (admin/user).",
      explanation: "Create a files in admin and user layout folders.",
    },
    {
      title: "Admin Layout Component",
      content: "Complete code for the Admin Layout component:",
      explanation: "This component protects admin-only routes by checking if the logged-in user has the 'admin' role before granting access.",
      code: `import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import GuestFooter from "../guestLayout/GuestFooter";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  const [authorized, setAuthorized] = useState(null); // null = loading, false = not allowed, true = allowed

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        if (user?.role === 'admin') {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (e) {
        console.error("Invalid user data in localStorage");
        setAuthorized(false);
      }
    } else {
      setAuthorized(false);
    }
  }, []);

  if (authorized === null) {
    return <div>Loading...</div>;
  }

  if (authorized === false) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div style={{position:"fixed",top:"0",width:"100%",zIndex:"100"}}><AdminNavbar /></div>
      <div style={{minHeight:"100vh",marginTop:"80px"}}><Outlet /></div>
      <GuestFooter />
    </>
  );
};

export default AdminLayout;`,
    },
    {
      title: "Admin Layout - Import Statements",
      content: "Understanding the import statements:",
      explanation: "These imports bring in the necessary components and hooks for the admin layout functionality.",
      code: `import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import GuestFooter from "../guestLayout/GuestFooter";
import AdminNavbar from "./AdminNavbar";`,
      breakdown: [
        "Navigate, Outlet: React Router components for navigation and nested routes",
        "useEffect, useState: React hooks for side effects and state management",
        "GuestFooter: Footer component for the layout",
        "AdminNavbar: Navigation bar specific to admin users"
      ],
    },
    {
      title: "Admin Layout - State Management",
      content: "State initialization for authorization checking:",
      explanation: "This state manages the authorization status during the checking process.",
      code: `const [authorized, setAuthorized] = useState(null); // null = loading, false = not allowed, true = allowed`,
      breakdown: [
        "authorized: Tracks the authorization status with three possible values",
        "null: Initial state indicating the check is in progress (loading)",
        "false: User is not authorized to access admin routes",
        "true: User is authorized as an admin"
      ],
    },
    {
      title: "Admin Layout - useEffect Hook",
      content: "Authorization check when component mounts:",
      explanation: "This effect runs once when the component loads to check if the current user is an admin.",
      code: `useEffect(() => {
  const userString = localStorage.getItem("user");
  if (userString) {
    try {
      const user = JSON.parse(userString);
      if (user?.role === 'admin') {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    } catch (e) {
      console.error("Invalid user data in localStorage");
      setAuthorized(false);
    }
  } else {
    setAuthorized(false);
  }
}, []);`,
      breakdown: [
        "localStorage.getItem('user'): Retrieves user data from browser storage",
        "JSON.parse(): Converts the stored string back to a JavaScript object",
        "user?.role === 'admin': Checks if the user has admin role using optional chaining",
        "setAuthorized(): Updates state based on role verification",
        "Empty dependency array []: Ensures the effect runs only once on mount"
      ],
    },
    {
      title: "Admin Layout - Loading State",
      content: "Handling the loading state while checking authorization:",
      explanation: "Shows a loading indicator while the authorization check is in progress.",
      code: `if (authorized === null) {
  return <div>Loading...</div>;
}`,
      breakdown: [
        "authorized === null: Condition for loading state",
        "return: Early return to show loading indicator",
        "Loading message: Simple text shown while checking user role"
      ],
    },
    {
      title: "Admin Layout - Redirect for Unauthorized",
      content: "Redirecting unauthorized users to login:",
      explanation: "If the user is not an admin, they are redirected to the login page.",
      code: `if (authorized === false) {
  return <Navigate to="/login" replace />;
}`,
      breakdown: [
        "authorized === false: Condition for unauthorized access",
        "Navigate: React Router component for programmatic navigation",
        "to='/login': Destination for unauthorized users",
        "replace: Replaces current entry in history instead of adding new one"
      ],
    },
    {
      title: "Admin Layout - Authorized Render",
      content: "Rendering the admin layout for authorized users:",
      explanation: "This section renders the complete admin layout with navbar, content area, and footer.",
      code: `return (
  <>
    <div style={{position:"fixed",top:"0",width:"100%",zIndex:"100"}}><AdminNavbar /></div>
    <div style={{minHeight:"100vh",marginTop:"80px"}}><Outlet /></div>
    <GuestFooter />
  </>
);`,
      breakdown: [
        "Fragment (<></>): Wraps multiple elements without adding extra DOM nodes",
        "AdminNavbar: Fixed position navbar at the top with high z-index",
        "Outlet: Renders nested child routes from React Router",
        "minHeight:100vh: Ensures content area takes at least full viewport height",
        "marginTop:80px: Creates space below the fixed navbar",
        "GuestFooter: Footer component at the bottom"
      ],
    },
    {
      title: "User Layout Component",
      content: "Complete code for the User Layout component:",
      explanation: "This component protects user-only routes by checking if the logged-in user has the 'user' role before granting access.",
      code: `import { Navigate, Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import UserFooter from "./UserFooter";
import { useEffect, useState } from "react";

const UserLayout = () => {
  const [authorized, setAuthorized] = useState(null); // null = loading, false = not allowed, true = allowed

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        if (user?.role === 'user') {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (e) {
        console.error("Invalid user data in localStorage");
        setAuthorized(false);
      }
    } else {
      setAuthorized(false);
    }
  }, []);

  if (authorized === null) {
    // Optional: loading state
    return <div>Loading...</div>;
  }

  if (authorized === false) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div style={{position:"fixed",top:"0",width:"100%",zIndex:"100"}}><UserNavbar /></div>
      <div style={{minHeight:"100vh",marginTop:"80px"}}><Outlet /></div>
      <UserFooter />
    </>
  );
};

export default UserLayout;`,
    },
    {
      title: "User Layout - Key Differences from Admin",
      content: "Comparing User Layout with Admin Layout:",
      explanation: "The User Layout is very similar to the Admin Layout but with a few key differences in role checking and components.",
      differences: [
        "Role check: user?.role === 'user' instead of 'admin'",
        "Components: UserNavbar and UserFooter instead of AdminNavbar and GuestFooter",
        "Other functionality: Identical authorization logic and structure"
      ],
    },
    {
      title: "Implementation Notes",
      content: "Important considerations when implementing role-based layouts:",
      explanation: "These notes cover best practices and potential improvements for role-based authentication.",
      notes: [
        "Security: Client-side role checking is not sufficient for sensitive operations - always verify roles on the server",
        "Storage: Consider using more secure storage methods for sensitive user data",
        "Loading states: Enhance loading indicators with spinners or skeleton screens",
        "Error handling: Add proper error handling for localStorage parsing errors",
        "Role management: Consider implementing a more flexible role system with multiple roles or permissions"
      ],
    },
    {
      title: "In App.js - Route Setup",
      content: "",
      explanation: "Add this code in app.js it will make route connections.",
      code: `
      
            import { Route, Routes } from "react-router-dom";
            import "./App.css";
            import "bootstrap/dist/css/bootstrap.min.css";
            import GuestLayout from "./components/guestLayout/GuestLayout";
            import Home from "./components/guestLayout/Home";
            import About from "./components/guestLayout/About";
            import Services from "./components/guestLayout/Services";
            import Contact from "./components/guestLayout/Contact";
            import Register from "./components/guestLayout/Register";
            import Login from "./components/guestLayout/Login";
            import Items from "./components/adminLayout/Items";
            import UserLayout from "./components/userLayout/UserLayout";
            import AdminLayout from "./components/adminLayout/AdminLayout";
            import ViewItem from "./components/userLayout/ViewItem";




            function App() {
            return (
                <div className="App">
                <Routes>
                    <Route path="/" element={<GuestLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/itemform" element={<Items />} />
                    <Route path="/login" element={<Login />} />
                    </Route>
                    <Route path="/user" element={<UserLayout />}>
                    <Route index element={<ViewItem />} />
                    <Route path="viewitem" element={<ViewItem />} />

                    
                    </Route>
                    <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Items />} />
                    <Route path="item" element={<Items />} />
                    </Route>
                </Routes>
                </div>
            );
            }

            export default App;


      `,
      image: "/router-usage.png"
    }
  ];

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>Role-Based Layout Guide</h1>
        <p>Learn how to implement role-based protected routes in React applications</p>
      </div>

      <div className="company-info">
        <h2>LIGAND SOFTWARE SOLUTIONS</h2>
        <p>Your Launchpad To Tech Success</p>
        <p>Happy Coding!!!!!</p>
        <p>Sankeshwar</p>
        <p>8722585715</p>
        <p>www.ligandsoftware.com</p>
      </div>

      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <h3>{step.title}</h3>
            <p>{step.content}</p>
            
            {step.explanation && (
              <div className="explanation-box">
                <h4>Explanation:</h4>
                <p>{step.explanation}</p>
              </div>
            )}
            
            {step.breakdown && (
              <div className="breakdown-list">
                <h4>Breakdown:</h4>
                <ul>
                  {step.breakdown.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {step.differences && (
              <div className="differences-list">
                <h4>Differences:</h4>
                <ul>
                  {step.differences.map((difference, i) => (
                    <li key={i}>{difference}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {step.notes && (
              <div className="notes-list">
                <h4>Implementation Notes:</h4>
                <ul>
                  {step.notes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {step.command && (
              <div className="code-block">
                <code>{step.command}</code>
                <button 
                  className={`copy-btn ${copiedIndex === index ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(step.command, index)}
                >
                  {copiedIndex === index ? 'Copied!' : 'Copy'}
                </button>
              </div>
            )}
            
            {step.code && (
              <div className="code-block">
                <pre>{step.code}</pre>
                <button 
                  className={`copy-btn ${copiedIndex === index ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(step.code, index)}
                >
                  {copiedIndex === index ? 'Copied!' : 'Copy'}
                </button>
              </div>
            )}
            
            {step.image && (
              <div className="image-placeholder">
                <div className="image-container">
                  <img src={step.image} alt={step.title} className="step-image" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="notes-footer">
        <p>Join us for Programming, Coding, Project Training and Internship opportunities.</p>
        <p>Let's learn, code and build together.</p>
      </div>
    </div>
  );
};

export default RoleBasedNotes;