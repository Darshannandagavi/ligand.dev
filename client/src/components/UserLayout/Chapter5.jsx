import React, { useState } from 'react';
import './Chapter5.css';

const Chapter5 = () => {
  // State to track which code block was copied
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Copy code to clipboard
  const handleCopy = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  // All code blocks as array for easier mapping
  const codeBlocks = [
    `import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const GuestNavbar = () => {
    return (
        <>
            <style>
                {\`
                /* General Navbar Style */
                .navbarStyle {
                    transition: all 0.3s ease;
                    /* Smooth transition for hover effects */
                }
                /* Logo and Text Alignment */
                .brandStyle {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    /* Add gap between logo and text */
                }
                /* Text Animation for Event Management */
                .textAnimationStyle {
                    font-size: 24px;
                    font-weight: bold;
                    margin-left: 25px;  
                    transition: transform 0.3s ease;
                    /* Smooth transition for zoom effect */
                }
                .textAnimationStyle:hover {
                    transform: scale(1.2);
                    /* Zoom in the text by 20% on hover */
                }
                /* Individual Style for Event and Management Text */
                .eventStyle {
                    padding-right: 20px;
                    font-size: 32px;
                    color: #ff5733;
                    /* Event color (red-orange) */
                    padding: 0 5px;
                }
                .managementStyle {
                    color: #33c1ff;
                    /* Management color (blue) */
                    padding: 0 5px;
                }
                /* Navigation Item Style */
                .navItemStyle {
                    font-size: 20px;
                    padding: 15px;
                    transition: all 0.3s ease;
                }
                /* Hover Effect for Navbar Items */
                .navbar:hover {
                    background-color: #333;
                }
                .navbar .nav-item:hover {
                    color: #ffcc00;
                    /* Change color on hover */
                    transform: scale(1.1);
                    /* Slightly enlarge the item on hover */
                }
                /* Logo Zoom Effect */
                .zoomEffect {
                    transition: transform 0.3s ease;
                    /* Smooth transition */
                }
                .zoomEffect:hover {
                    transform: scale(1.8);
                    /* Zoom in the image by 80% */
                }
                /* Keyframes for Typing Animation */
                @keyframes typing {
                    0% {
                        width: 0;
                    }
                    100% {
                        width: 14em;
                    }
                }
                /* Keyframes for Blinking Cursor Effect */
                @keyframes blink {
                    50% {
                        border-color: transparent;
                    }
                }
                /* Media Queries for Responsiveness */
                @media (max-width: 992px) {
                    .navbar-brand span {
                        font-size: 20px;
                        /* Reduce font size on smaller screens */
                    }
                    .navbar .nav-item {
                        font-size: 14px;
                        /* Smaller nav item font size on mobile */
                    }
                }
                @media (max-width: 576px) {
                    .navbar-brand span {
                        font-size: 18px;
                        /* Reduce font size even further on extra small screens */
                    }
                    .navbar .nav-item {
                        font-size: 12px;
                        /* Even smaller nav item font size on extra small screens */
                    }
                }
                \`}
            </style>
            <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark" className="custom-navbar navbarStyle">
                <Container>
                    {/* Logo Image inside Navbar.Brand */}
                    <Navbar.Brand as={NavLink} to="/home" className="navbar-brand brandStyle">
                        <img
                            src="https://t4.ftcdn.net/jpg/06/58/52/67/240_F_658526752_reKZ5XIBNmCwlkeeAJS5lS1RMUxw6VWV.jpg" // Replace with your logo URL
                            alt="Event Management Logo"
                            className="zoomEffect"
                            style={{
                                width: '50px', // Adjust the width of the logo
                                height: 'auto', // Maintain aspect ratio
                                borderRadius: "60px"
                            }}
                        />
                        <span className='textAnimationStyle'>
                            <span className='eventStyle'>Event</span>
                            <span className='managementStyle'>Management</span>
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" aria-label="Toggle navigation" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {/* Aligning the navigation links to the right */}
                        <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to="/home" className="nav-item navItemStyle" >Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/about" className="nav-item navItemStyle" >About</Nav.Link>
                            <Nav.Link as={NavLink} to="/services" className="nav-item navItemStyle" >Services</Nav.Link>
                            <Nav.Link as={NavLink} to="/contact" className="nav-item navItemStyle" >Contact</Nav.Link>
                            <Nav.Link as={NavLink} to="/register" className="nav-item navItemStyle" >Register</Nav.Link>
                            <Nav.Link as={NavLink} to="/login" className="nav-item navItemStyle" >Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default GuestNavbar;`,
    `import React from 'react'
import { GuestNavbar } from './GuestNavbar'

const GuestHeader = () => {
    return (
        <div>
            <GuestNavbar />
        </div>
    )
}

export default GuestHeader`,
    `import React from 'react';
import { Nav } from 'react-bootstrap';

const GuestFooter = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>
        {\`
        /* Guest Footer Section */
        .footer-section {
            background-color: #2c3e50; /* Slightly darker background */
            color: #fff;
            position: relative;
            overflow: hidden;
            text-align: center;
            animation: fadeIn 1s ease-in-out;
        }
        /* Footer Logo */
        .footer-logo {
            font-size: 28px;
            font-weight: bold;
            color: #fff;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-decoration: none;
            position: relative;
            animation: slideInFromLeft 1.5s ease-in-out;
        }
        .footer-logo:hover {
            color: #ff5c8d;
            text-decoration: underline;
        }
        /* Footer Links */
        .footer-links {
            list-style: none;
            padding: 0;
            margin-top: 30px;
            display: flex;
            justify-content: center;
            gap: 30px;
        }
        .footer-links li a {
            color: #fff;
            font-size: 16px;
            text-decoration: none;
            transition: color 0.3s ease-in-out;
        }
        .footer-links li a:hover {
            color: #ff5c8d;
        }
        /* Copyright Text */
        .copyright-text {
            text-align: center;
            margin-top: 40px;
            font-size: 14px;
        }
        /* Social Media Icons */
        .social-icons {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }
        .social-icon {
            color: #fff;
            font-size: 20px;
            transition: color 0.3s ease-in-out;
        }
        .social-icon:hover {
            color: #ff5c8d;
        }
        /* Animations */
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        @keyframes slideInFromLeft {
            from {
                transform: translateX(-100px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        /* Responsive Styles */
        @media (max-width: 768px) {
            .footer-links {
                flex-direction: column;
                gap: 15px;
            }
        }
        \`}
      </style>
      <footer className="footer-section">
        <div className="container">
          {/* Footer Text and Links */}
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-text">
                {/* Footer Text Instead of Logo */}
                <div className="ft-logo">
                    Event Management
                </div>
               
                {/* Copyright Info */}
                <div className="copyright-text">
                  <p>
                    Copyright &copy; {currentYear} All rights reserved | Made with <i className="fa fa-heart" aria-hidden="true"></i> by
                    <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Colorlib">Event Management</a>
                  </p>
                </div>
                {/* Social Media Links */}
                <div className="social-icons">
                  <Nav className="justify-content-center">
                    <Nav.Link href="https://facebook.com" className="social-icon" aria-label="Visit our Facebook" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-facebook"></i>
                    </Nav.Link>
                    <Nav.Link href="https://twitter.com" className="social-icon" aria-label="Visit our Twitter" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-twitter"></i>
                    </Nav.Link>
                    <Nav.Link href="https://linkedin.com" className="social-icon" aria-label="Visit our LinkedIn" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-linkedin"></i>
                    </Nav.Link>
                    <Nav.Link href="https://instagram.com" className="social-icon" aria-label="Visit our Instagram" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-instagram"></i>
                    </Nav.Link>
                    <Nav.Link href="https://youtube.com" className="social-icon" aria-label="Visit our YouTube" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-youtube-play"></i>
                    </Nav.Link>
                  </Nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default GuestFooter;`,
    `import React from 'react';
import GuestHeader from './GuestHeader';
import { Outlet } from 'react-router-dom';
import GuestFooter from './GuestFooter';

const GuestLayout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Fixed Header */}
            <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100 }}>
                <GuestHeader />
            </div>
            {/* Main Content (Outlet) */}
            <div style={{ flex: 1, paddingTop: '75px', paddingBottom: '40px' }}>
                <Outlet />
            </div>
            {/* Fixed Footer */}
            <div style={{
                position: 'float',
                bottom: 0,
                width: '100%',
                zIndex: 100,
                backgroundColor: 'black',
                color: 'white'
            }}>
                <GuestFooter />
            </div>
        </div>
    );
};

export default GuestLayout;`,
    `import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GuestLayout from './components/guestLayout/GuestLayout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<GuestLayout />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;`,
    `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();`
  ];

  // Helper to render code blocks with copy button
  const renderCodeBlock = (code, idx) => (
    <div className="code-block" style={{ position: "relative" }} key={idx}>
      <pre>{code}</pre>
      <button
        className="copy-btn"
        onClick={() => handleCopy(code, idx)}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "#667eea",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "4px 10px",
          cursor: "pointer",
          fontSize: "13px",
          zIndex: 2
        }}
        aria-label="Copy code"
      >
        {copiedIndex === idx ? "Copied!" : "Copy"}
      </button>
    </div>
  );

  return (
    <div className="chapter-container">
      <div className="chapter-header">
        <h1>Chapter 5: Common Layouts</h1>
        <p className="chapter-subtitle">Implementing role-based layouts in React applications</p>
      </div>

      <div className="content-section">
        <h2>Agenda</h2>
        <ol className="agenda-list">
          <li>Overview of user-wise layouts (Admin, User, Guest)</li>
          <li>Purpose of implementing role-based layouts</li>
          <li>Organizing layout components and routes</li>
          <li>Creating AdminLayout, UserLayout, and GuestLayout components</li>
          <li>Integrating React Router for route-based layouts</li>
          <li>Handling private and public routes</li>
          <li>Protecting routes using authentication and authorization</li>
          <li>Implementing dynamic navigation (Navbar, Sidebar, Footer) for each layout</li>
          <li>Conditional rendering based on user type</li>
          <li>Testing and debugging different user layouts</li>
          <li>Optimizing performance using lazy loading and minimizing re-renders</li>
        </ol>
      </div>

      <div className="content-section">
        <h2>Steps to create Common Layouts</h2>
        
        <div className="step">
          <h3>Step 1: Create 'components' folder in client/src folder</h3>
          <p>Create a components folder in your React project structure.</p>
          <div className="image-placeholder">
            <img src='/c5Picture1.png'/>
          </div>
          <div className="image-placeholder">
            <img src='/c5Picture2.png'/>
          </div>
        </div>

        <div className="step">
          <h3>Step 2: Create user folders inside components folder</h3>
          <p>Create a folder for each user in your project inside components folder (here we will consider 1 user 'Guest' we will create a folder 'guestLayout').</p>
          <div className="image-placeholder">
            <img src='/c5Picture3.png'/>
          </div>
          <div className="image-placeholder">
            <img src='/c5Picture4.png'/>
          </div>
        </div>

        <div className="step">
          <h3>Step 3: Create layout files inside guestLayout folder</h3>
          <p>Create 3 basic layout .jsx files inside guestLayout folder i.e. GuestHeader.jsx, GuestFooter.jsx and GuestLayout.jsx.</p>
          <div className="image-placeholder">
            <img src='/c5Picture5.png'/>
          </div>
        </div>

        <div className="step">
          <h3>Step 4: Install required packages for navbar</h3>
          <p>To add navbar install some packages:</p>
          <div className="code-block" style={{ position: "relative" }}>
            <pre>npm i react-icons styled-components</pre>
            <button
              className="copy-btn"
              onClick={() => handleCopy("npm i react-icons styled-components", 100)}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "#667eea",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "4px 10px",
                cursor: "pointer",
                fontSize: "13px",
                zIndex: 2
              }}
              aria-label="Copy code"
            >
              {copiedIndex === 100 ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="image-placeholder">
            <img src='/c5Picture6.png'/>
          </div>
        </div>

        <div className="step">
          <h3>Step 5: Create GuestNavbar.jsx with styling</h3>
          <p>After successful installation create GuestNavbar.jsx file in guestLayout folder to design navbar component.</p>
          <div className="image-placeholder">
            <img src='/c5Picture7.png'/>
          </div>
          <p>Code for GuestNavbar.jsx:</p>
          {renderCodeBlock(codeBlocks[0], 0)}
        </div>

        <div className="step">
          <h3>Step 6: Create GuestHeader.jsx</h3>
          <p>Open GuestHeader.jsx, type 'rafc' and hit enter key to get basic snippet.</p>
          <div className="image-placeholder">
            <img src='/c5Picture8.png'/>
          </div>
          <p>Code for GuestHeader.jsx:</p>
          {renderCodeBlock(codeBlocks[1], 1)}
        </div>

        <div className="step">
          <h3>Step 7: Create GuestFooter.jsx</h3>
          <p>Open GuestFooter.jsx and add the following code:</p>
          {renderCodeBlock(codeBlocks[2], 2)}
        </div>

        <div className="step">
          <h3>Step 8: Create GuestLayout.jsx</h3>
          <p>Open GuestLayout.jsx and import GuestHeader.jsx and GuestFooter.jsx components.</p>
          <div className="image-placeholder">
            <img src='/c5Picture9.png'/>
          </div>
          <p>Code for GuestLayout.jsx:</p>
          {renderCodeBlock(codeBlocks[3], 3)}
          <p>In the above code we are importing Outlet from react-router-dom this Outlet is a special component where all child components will be rendered within this Outlet component.</p>
          <h4>How Outlet works:</h4>
          <div className="image-placeholder">
            <img src='/c5Picture10.png'/>
          </div>
          <p>All Child Elements like Home, About, Services, Contact, Register and Login are Child components of GuestLayout so All child components will be rendered between Guest Header and Guest Footer.</p>
          <div className="image-placeholder">
            <img src='/c5Picture11.png'/>
          </div>
        </div>

        <div className="step">
          <h3>Step 9: Include GuestLayout in App.js</h3>
          <p>After writing code into GuestLayout.jsx you must include that into App.js.</p>
          <div className="image-placeholder">
            <img src='/c5Picture12.png'/>
          </div>
          <p>Code for App.js:</p>
          {renderCodeBlock(codeBlocks[4], 4)}
          <ul>
            <li><strong>Routes Component</strong>: This is the parent component that holds all of your individual Route components. It is used to group together different routes and manage which one should be rendered based on the current URL.</li>
            <li><strong>Route Component</strong>: This is the child component that defines a single route. It specifies a path (URL) and the element (React component) that should be rendered when that path matches the current URL.</li>
          </ul>
          <p>In React Router v6, <strong>Routes</strong> is used to wrap all of the <strong>Route</strong> components. You can have multiple Route components inside a single Routes component, and <strong>multiple Routes components</strong> are used for different sections or parts of the app. You don't nest Route components directly inside each other, but instead, each route has a unique path and a component to render.</p>
        </div>

        <div className="step">
          <h3>Step 10: Configure BrowserRouter in index.js</h3>
          <p>Open index.js file and import BrowserRouter and wrap it with &lt;App/&gt;.</p>
          <div className="image-placeholder">
            <img src='/c5Picture13.png'/>
          </div>
          <p>Code for index.js:</p>
          {renderCodeBlock(codeBlocks[5], 5)}
          <p>Now open your browser and check output should be like below:</p>
          <div className="image-placeholder">
            <img src='/c5Picture14.png'/>
          </div>
        </div>

        <div className="step">
          <h3>Step 11: Create page components</h3>
          <p>Create files inside 'guestLayout' folder for Home, About, Products, Signup and Login.</p>
          <div className="image-placeholder">
            <img src='/c5Picture15.png'/>
          </div>
          <p>Now Check Output like this you can create Common Layout for all users of your project. We will start designing <strong>landing pages</strong> (Home, About, Contact, Services and other pages) in next chapter.</p>
        </div>
      </div>

      <div className="home-work step-card">
          <h2 style={{ color: "white" }}>Home-Work</h2>
          <p>🧠 Homework Task: Build a GuestLayout Component</p>
          <br />
          <p>
            🎯 Objective: Develop a GuestLayout that includes a responsive navigation bar with links to Home, About, Contact, Login, and Register pages.
          </p>
        </div>
      <style>{`
        .copy-btn {
          transition: background 0.2s;
        }
        .copy-btn:active {
          background: #4c51bf;
        }
      `}</style>
    </div>
  );
};

export default Chapter5;