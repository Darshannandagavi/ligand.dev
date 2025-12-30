import React, { useState } from "react";

const Chapter5 = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const codeBlocks = [
    `import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const GuestNavbar = () => {
    return (
        <>
            <style>
                {\`
                .navbarStyle {
                    transition: all 0.3s ease;
                }
                .brandStyle {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                .textAnimationStyle {
                    font-size: 24px;
                    font-weight: bold;
                    margin-left: 25px;  
                    transition: transform 0.3s ease;
                }
                .textAnimationStyle:hover {
                    transform: scale(1.2);
                }
                .eventStyle {
                    padding-right: 20px;
                    font-size: 32px;
                    color: #ff5733;
                    padding: 0 5px;
                }
                .managementStyle {
                    color: #33c1ff;
                    padding: 0 5px;
                }
                .navItemStyle {
                    font-size: 20px;
                    padding: 15px;
                    transition: all 0.3s ease;
                }
                .navbar:hover {
                    background-color: #333;
                }
                .navbar .nav-item:hover {
                    color: #ffcc00;
                    transform: scale(1.1);
                }
                .zoomEffect {
                    transition: transform 0.3s ease;
                }
                .zoomEffect:hover {
                    transform: scale(1.8);
                }
                @media (max-width: 992px) {
                    .navbar-brand span {
                        font-size: 20px;
                    }
                    .navbar .nav-item {
                        font-size: 14px;
                    }
                }
                @media (max-width: 576px) {
                    .navbar-brand span {
                        font-size: 18px;
                    }
                    .navbar .nav-item {
                        font-size: 12px;
                    }
                }
                \`}
            </style>
            <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark" className="custom-navbar navbarStyle">
                <Container>
                    <Navbar.Brand as={NavLink} to="/home" className="navbar-brand brandStyle">
                        <img
                            src="https://t4.ftcdn.net/jpg/06/58/52/67/240_F_658526752_reKZ5XIBNmCwlkeeAJS5lS1RMUxw6VWV.jpg"
                            alt="Event Management Logo"
                            className="zoomEffect"
                            style={{
                                width: '50px',
                                height: 'auto',
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
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>
        {\`
        .footer-section {
            background-color: #2c3e50;
            color: #fff;
            position: relative;
            overflow: hidden;
            text-align: center;
            animation: fadeIn 1s ease-in-out;
        }
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
        .copyright-text {
            text-align: center;
            margin-top: 40px;
            font-size: 14px;
        }
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
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
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
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-text">
                <div className="ft-logo">
                    Event Management
                </div>
                <div className="copyright-text">
                  <p>
                    Copyright &copy; {currentYear} All rights reserved | Made with <i className="fa fa-heart" aria-hidden="true"></i> by
                    <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Colorlib">Event Management</a>
                  </p>
                </div>
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
            <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100 }}>
                <GuestHeader />
            </div>
            <div style={{ flex: 1, paddingTop: '75px', paddingBottom: '40px' }}>
                <Outlet />
            </div>
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

reportWebVitals();`,
  ];

  const renderCodeBlock = (code, idx, title = null) => (
    <div className="code-block-container" key={idx}>
      {title && <h4 className="code-title">{title}</h4>}
      <div className="code-block">
        <pre>{code}</pre>
        <button
          className={`copy-btn ${copiedIndex === idx ? "copied" : ""}`}
          onClick={() => handleCopy(code, idx)}
          aria-label="Copy code"
        >
          {copiedIndex === idx ? "✓ Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );

  const steps = [
    {
      step: 1,
      title: "Create 'components' folder in client/src folder",
      description:
        "Create a components folder in your React project structure.",
      images: ["/c5Picture1.png", "/c5Picture2.png"],
    },
    {
      step: 2,
      title: "Create user folders inside components folder",
      description:
        "Create a folder for each user in your project inside components folder (here we will consider 1 user 'Guest' we will create a folder 'guestLayout').",
      images: ["/c5Picture3.png", "/c5Picture4.png"],
    },
    {
      step: 3,
      title: "Create layout files inside guestLayout folder",
      description:
        "Create 3 basic layout .jsx files inside guestLayout folder i.e. GuestHeader.jsx, GuestFooter.jsx and GuestLayout.jsx.",
      images: ["/c5Picture5.png"],
    },
    {
      step: 4,
      title: "Install required packages for navbar",
      description: "To add navbar install some packages:",
      code: "npm i react-icons styled-components",
      images: ["/c5Picture6.png"],
    },
    {
      step: 5,
      title: "Create GuestNavbar.jsx with styling",
      description:
        "After successful installation create GuestNavbar.jsx file in guestLayout folder to design navbar component.",
      images: ["/c5Picture7.png"],
      codeBlock: { code: codeBlocks[0], index: 0, title: "GuestNavbar.jsx" },
    },
    {
      step: 6,
      title: "Create GuestHeader.jsx",
      description:
        "Open GuestHeader.jsx, type 'rafc' and hit enter key to get basic snippet.",
      images: ["/c5Picture8.png"],
      codeBlock: { code: codeBlocks[1], index: 1, title: "GuestHeader.jsx" },
    },
    {
      step: 7,
      title: "Create GuestFooter.jsx",
      description: "Open GuestFooter.jsx and add the following code:",
      codeBlock: { code: codeBlocks[2], index: 2, title: "GuestFooter.jsx" },
    },
    {
      step: 8,
      title: "Create GuestLayout.jsx",
      description:
        "Open GuestLayout.jsx and import GuestHeader.jsx and GuestFooter.jsx components.",
      images: ["/c5Picture9.png"],
      codeBlock: { code: codeBlocks[3], index: 3, title: "GuestLayout.jsx" },
      additionalContent: (
        <>
          <p>
            In the above code we are importing Outlet from react-router-dom this
            Outlet is a special component where all child components will be
            rendered within this Outlet component.
          </p>
          <h4>How Outlet works:</h4>
          <div className="image-gallery">
            <img src="/c5Picture10.png" alt="Outlet diagram" />
          </div>
          <p>
            All Child Elements like Home, About, Services, Contact, Register and
            Login are Child components of GuestLayout so All child components
            will be rendered between Guest Header and Guest Footer.
          </p>
          <div className="image-gallery">
            <img src="/c5Picture11.png" alt="Layout structure" />
          </div>
        </>
      ),
    },
    {
      step: 9,
      title: "Include GuestLayout in App.js",
      description:
        "After writing code into GuestLayout.jsx you must include that into App.js.",
      images: ["/c5Picture12.png"],
      codeBlock: { code: codeBlocks[4], index: 4, title: "App.js" },
      additionalContent: (
        <>
          <div className="key-points">
            <div className="point">
              <strong>Routes Component</strong>: This is the parent component
              that holds all of your individual Route components. It is used to
              group together different routes and manage which one should be
              rendered based on the current URL.
            </div>
            <div className="point">
              <strong>Route Component</strong>: This is the child component that
              defines a single route. It specifies a path (URL) and the element
              (React component) that should be rendered when that path matches
              the current URL.
            </div>
          </div>
          <p>
            In React Router v6, <strong>Routes</strong> is used to wrap all of
            the <strong>Route</strong> components. You can have multiple Route
            components inside a single Routes component, and{" "}
            <strong>multiple Routes components</strong> are used for different
            sections or parts of the app. You don't nest Route components
            directly inside each other, but instead, each route has a unique
            path and a component to render.
          </p>
        </>
      ),
    },
    {
      step: 10,
      title: "Configure BrowserRouter in index.js",
      description:
        "Open index.js file and import BrowserRouter and wrap it with &lt;App/&gt;.",
      images: ["/c5Picture13.png"],
      codeBlock: { code: codeBlocks[5], index: 5, title: "index.js" },
      additionalContent: (
        <>
          <p>Now open your browser and check output should be like below:</p>
          <div className="image-gallery">
            <img src="/c5Picture14.png" alt="Final output" />
          </div>
        </>
      ),
    },
    {
      step: 11,
      title: "Create page components",
      description:
        "Create files inside 'guestLayout' folder for Home, About, Products, Signup and Login.",
      images: ["/c5Picture15.png"],
      additionalContent: (
        <p>
          Now Check Output like this you can create Common Layout for all users
          of your project. We will start designing{" "}
          <strong>landing pages</strong> (Home, About, Contact, Services and
          other pages) in next chapter.
        </p>
      ),
    },
  ];

  return (
    <div className="chapter-container">
      {/* Header Section */}
      <div className="chapter-header">
        <div className="header-content">
          <div className="chapter-badge">Chapter 5</div>
          <h1>Common Layouts</h1>
          <p className="chapter-subtitle" style={{ color: "white" }}>
            Implementing role-based layouts in React applications
          </p>
        </div>
      </div>

      {/* Agenda Section */}
      <div className="content-section">
        <div className="section-header">
          <h2>Agenda</h2>
          <div className="section-divider"></div>
        </div>
        <ol className="agenda-list">
          {[
            "Overview of user-wise layouts (Admin, User, Guest)",
            "Purpose of implementing role-based layouts",
            "Organizing layout components and routes",
            "Creating AdminLayout, UserLayout, and GuestLayout components",
            "Integrating React Router for route-based layouts",
            "Handling private and public routes",
            "Protecting routes using authentication and authorization",
            "Implementing dynamic navigation (Navbar, Sidebar, Footer) for each layout",
            "Conditional rendering based on user type",
            "Testing and debugging different user layouts",
            "Optimizing performance using lazy loading and minimizing re-renders",
          ].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>

      {/* Steps Section */}
      <div className="content-section">
        <div className="section-header">
          <h2>Implementation Steps</h2>
          <div className="section-divider"></div>
        </div>

        {steps.map((stepData, index) => (
          <div className="step" key={index}>
            <div className="step-header">
              <div className="step-number"> {stepData.step}</div>
              <h3>{stepData.title}</h3>
            </div>
            <p>{stepData.description}</p>

            {stepData.code && (
              <div className="code-block">
                <pre>{stepData.code}</pre>
                <button
                  className="copy-btn"
                  onClick={() => handleCopy(stepData.code, 100 + index)}
                  aria-label="Copy code"
                >
                  {copiedIndex === 100 + index ? "✓ Copied!" : "Copy"}
                </button>
              </div>
            )}

            {stepData.codeBlock &&
              renderCodeBlock(
                stepData.codeBlock.code,
                stepData.codeBlock.index,
                stepData.codeBlock.title
              )}

            {stepData.images && (
              <div className="image-gallery">
                {stepData.images.map((img, imgIndex) => (
                  <div className="image-container" key={imgIndex}>
                    <img
                      src={img}
                      alt={`Step ${stepData.step} visual ${imgIndex + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}

            {stepData.additionalContent}
          </div>
        ))}
      </div>

      {/* Homework Section */}
      <div className="home-work-section">
        <div className="home-work-card">
          <div className="home-work-header">
            <h2>Homework Assignment</h2>
          </div>

          <div className="home-work-content">
            <h3>Build an UserLayout Component</h3>
            <p className="objective">
              <strong>Objective:</strong> Develop an <strong>UserLayout</strong>{" "}
              that includes a responsive navigation with links to
              <strong> Home</strong>, <strong>Items</strong>,{" "}
              <strong>Profile</strong>,<strong>ChangePassword</strong>, and{" "}
              <strong>Logout</strong> pages.
            </p>

            <div className="requirements">
              <h4>Requirements:</h4>
              <ul>
                <li>
                  Create a responsive <strong> navigation</strong> using{" "}
                  <strong>Bootstrap</strong> or <strong>React-Bootstrap</strong>
                </li>
                <li>
                  Include <strong>header</strong>,{" "}
                  <strong>main content area</strong>, and{" "}
                  <strong>footer</strong>
                </li>
                <li>
                  Implement <strong>routing</strong> for each page (Home, Items,
                  Profile, ChangePassword, Logout)
                </li>
                <li>
                  Ensure layout is <strong>mobile-friendly</strong> with
                  collapsible sidebar
                </li>
                <li>
                  Use <strong>React Router Outlet</strong> to render child
                  components dynamically
                </li>
                <li>
                  Design clean, professional UI suitable for an user panel
                </li>
              </ul>
            </div>

            <div className="reference-materials">
              <h4>Expected Output:</h4>
              <div className="materials-grid">
                <div className="material-item">
                  <img
                    src="/homework/homework_user_setup.png"
                    alt="User Layout Example"
                  />
                  <p>Example User Layout Structure</p>
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "800px",
                    margin: "2rem auto",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    backgroundColor: "#000",
                  }}
                >
                  <div
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ position: "relative" }}
                  >
                    <video
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        outline: "none",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                      }}
                      controls
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      disableRemotePlayback
                      preload="metadata"
                      poster=""
                      onKeyDown={(e) => {
                        if (e.ctrlKey && (e.key === "s" || e.key === "S")) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <source src="/userLayout.mp4" type="video/mp4" />
                    </video>

                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                        zIndex: 1,
                      }}
                    />
                  </div>

                  <div
                    style={{
                      padding: "1rem",
                      backgroundColor: "#f8f9fa",
                      color: "#333",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      borderTop: "1px solid #eaeaea",
                      userSelect: "none",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .chapter-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
          color: #2d3748;
          background: white;
        }

        .chapter-header {
          text-align: center;
          margin-bottom: 50px;
          padding: 50px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .header-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .chapter-badge {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .chapter-header h1 {
          font-size: 3rem;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 16px 0;
        }

        .chapter-subtitle {
          font-size: 1.3rem;
          color: #718096;
          margin: 0;
          font-weight: 400;
        }

        .content-section {
          margin-bottom: 50px;
        }

        .section-header {
          margin-bottom: 30px;
        }

        .section-header h2 {
          font-size: 2rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0 0 12px 0;
        }

        .section-divider {
          height: 3px;
          background: #667eea;
          width: 60px;
          border-radius: 2px;
        }

        .agenda-list {
          counter-reset: agenda-counter;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 12px;
        }

        .agenda-list > li {
          list-style: none;
          padding: 20px 20px 20px 70px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          position: relative;
          transition: all 0.2s ease;
        }

        .agenda-list > li:hover {
          background: #f1f5f9;
          border-color: #cbd5e0;
        }

        .agenda-list > li::before {
          counter-increment: agenda-counter;
          content: counter(agenda-counter);
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          background: #667eea;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .step {
          padding: 30px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .step:last-child {
          border-bottom: none;
        }

        .step-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .step-number {
          background: #667eea;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .step h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0;
        }

        .step p {
          color: #4a5568;
          margin-bottom: 20px;
          line-height: 1.7;
          font-size: 1.1rem;
        }

        .code-block-container {
          margin: 25px 0;
        }

        .code-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 12px;
        }

        .code-block {
          position: relative;
          background: #1a202c;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #2d3748;
        }

        .code-block pre {
          color: #e2e8f0;
          padding: 25px;
          margin: 0;
          overflow-x: auto;
          font-family: "Fira Code", "Consolas", monospace;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .copy-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #e2e8f0;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .copy-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .copy-btn.copied {
          background: #48bb78;
          color: white;
        }

        .image-gallery {
          display: grid;
          gap: 20px;
          margin: 25px 0;
        }

        .image-container {
          background: #f8fafc;
          border-radius: 8px;
          padding: 25px;
          text-align: center;
          border: 1px solid #e2e8f0;
        }

        .image-container img {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .key-points {
          display: grid;
          gap: 15px;
          margin: 25px 0;
        }

        .point {
          background: #f0fff4;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #48bb78;
          color: #2f855a;
        }

        .home-work-section {
          margin-top: 50px;
        }

        .home-work-card {
          background: #f8fafc;
          border-radius: 12px;
          padding: 40px;
          border: 1px solid #e2e8f0;
        }

        .home-work-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .home-work-header h2 {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 600;
          color: #2d3748;
        }

        .difficulty-badge {
          background: #667eea;
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .home-work-content h3 {
          font-size: 1.4rem;
          margin: 0 0 20px 0;
          font-weight: 600;
          color: #2d3748;
        }

        .objective {
          font-size: 1.1rem;
          margin-bottom: 30px;
          color: #4a5568;
          line-height: 1.6;
        }

        .requirements {
          margin-bottom: 30px;
        }

        .requirements h4 {
          font-size: 1.2rem;
          margin: 0 0 15px 0;
          font-weight: 600;
          color: #2d3748;
        }

        .requirements ul {
          margin: 0;
          padding-left: 20px;
        }

        .requirements li {
          margin-bottom: 8px;
          color: #4a5568;
          line-height: 1.6;
        }

        .reference-materials h4 {
          font-size: 1.2rem;
          margin: 0 0 20px 0;
          font-weight: 600;
          color: #2d3748;
        }

        .materials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .material-item {
          background: white;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          border: 1px solid #e2e8f0;
        }

        .material-item img {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
          margin-bottom: 12px;
        }

        .material-item p {
          margin: 0;
          color: #4a5568;
          font-weight: 500;
        }

        .video-placeholder video {
          max-width: 100%;
          border-radius: 6px;
          margin-bottom: 12px;
        }

        @media (max-width: 768px) {
          .chapter-container {
            padding: 20px 16px;
          }

          .chapter-header {
            padding: 30px 0;
            margin-bottom: 30px;
          }

          .chapter-header h1 {
            font-size: 2.2rem;
          }

          .step-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .agenda-list > li {
            padding: 16px 16px 16px 60px;
          }

          .materials-grid {
            grid-template-columns: 1fr;
          }

          .home-work-card {
            padding: 25px;
          }
        }
      `}</style>
    </div>
  );
};

export default Chapter5;
