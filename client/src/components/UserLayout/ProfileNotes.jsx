// ProfileNotes.jsx
import React, { useState } from 'react';

const ProfileNotes = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Internal CSS
  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      color: "#333",
      lineHeight: "1.6",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
      padding: "30px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    },
    headerH1: {
      margin: "0 0 15px 0",
      fontSize: "2.8rem",
      fontWeight: "700",
    },
    headerP: {
      margin: "0",
      fontSize: "1.3rem",
      opacity: "0.95",
    },
    companyInfo: {
      textAlign: "center",
      margin: "40px 0",
      padding: "25px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      borderRadius: "12px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    },
    companyH2: {
      margin: "0 0 15px 0",
      fontSize: "2rem",
      fontWeight: "600",
    },
    companyP: {
      margin: "8px 0",
      fontSize: "1.1rem",
    },
    sectionsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "30px",
    },
    sectionCard: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
      borderLeft: "6px solid #3498db",
    },
    sectionH2: {
      color: "#2c3e50",
      marginTop: "0",
      marginBottom: "25px",
      fontSize: "1.9rem",
      borderBottom: "3px solid #f0f0f0",
      paddingBottom: "15px",
      textAlign: "left",
    },
    contentBlock: {
      marginBottom: "25px",
      textAlign: "left",
    },
    subtitleH3: {
      color: "#3498db",
      margin: "25px 0 15px 0",
      fontSize: "1.5rem",
      textAlign: "left",
    },
    textP: {
      margin: "0 0 18px 0",
      fontSize: "1.15rem",
      lineHeight: "1.7",
      textAlign: "left",
    },
    listBlock: {
      backgroundColor: "#f8f9fa",
      padding: "20px 25px 20px 45px",
      borderRadius: "10px",
      margin: "20px 0",
      borderLeft: "4px solid #3498db",
      textAlign: "left",
    },
    listH4: {
      margin: "0 0 15px 0",
      color: "#2c3e50",
      fontSize: "1.3rem",
      textAlign: "left",
    },
    listUl: {
      margin: "0",
      padding: "0",
      textAlign: "left",
    },
    listLi: {
      marginBottom: "12px",
      fontSize: "1.1rem",
      paddingLeft: "5px",
      textAlign: "left",
    },
    codeBlock: {
      position: "relative",
      backgroundColor: "#2d3436",
      color: "#dfe6e9",
      padding: "18px",
      borderRadius: "8px",
      margin: "20px 0",
      overflowX: "auto",
      border: "1px solid #444",
      textAlign: "left",
    },
    code: {
      fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
      fontSize: "1rem",
      whiteSpace: "pre-wrap",
      textAlign: "left",
    },
    pre: {
      fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
      fontSize: "1rem",
      whiteSpace: "pre-wrap",
      margin: "0",
      lineHeight: "1.5",
      textAlign: "left",
    },
    copyBtn: {
      position: "absolute",
      top: "12px",
      right: "12px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      padding: "8px 15px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "0.9rem",
      transition: "all 0.3s ease",
    },
    copiedBtn: {
      backgroundColor: "#27ae60",
    },
    imageContainer: {
      margin: "25px 0",
      textAlign: "center",
    },
    imageCaption: {
      fontStyle: "italic",
      color: "#666",
      marginBottom: "10px",
      fontSize: "1rem",
      textAlign: "center",
    },
    image: {
      width: "100%",
      maxWidth: "100%",
      borderRadius: "8px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      border: "1px solid #ddd",
    },
    footer: {
      textAlign: "center",
      marginTop: "50px",
      padding: "30px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    },
    footerP: {
      margin: "8px 0",
      fontSize: "1.15rem",
    },
    homeworkContainer: {
      marginTop: "40px",
      padding: "25px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      borderRadius: "12px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    },
    homeworkTitle: {
      margin: "0 0 20px 0",
      fontSize: "2rem",
      fontWeight: "700",
      textAlign: "center",
    },
    homeworkContent: {
      backgroundColor: "white",
      padding: "25px",
      borderRadius: "8px",
      color: "#333",
    },
    homeworkSection: {
      marginBottom: "25px",
    },
    homeworkSectionTitle: {
      color: "#e74c3c",
      marginBottom: "15px",
      fontSize: "1.4rem",
      fontWeight: "600",
    },
    homeworkList: {
      listStyleType: "disc",
      listStylePosition: "inside",
      marginLeft: "20px",
    },
    homeworkListItem: {
      marginBottom: "8px",
      fontSize: "1.1rem",
      lineHeight: "1.6",
    },
  };

  const sections = [
    {
      title: "Profile Management System",
      content: "Complete implementation of user profile management with view and edit functionality",
    },
    {
      title: "Backend Implementation (UserController.js)",
      content: "Add these profile management functions to your existing UserController.js file",
      image: "/usercontroller-folder.png",
      codeSections: [
        {
          title: "1.1. Get User Profile Function",
          code: `// -------------------- GET USER PROFILE --------------------
// GET /api/users/profile
export const getUserProfile = async (req, res) => {
  try {
    // Get user ID from token
    const auth = req.headers?.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    const token = auth.split(' ')[1];
    let userId;
    try {
      const decoded = jwt.verify(token, 'secretKey123');
      userId = decoded.id;
    } catch (e) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Find user and exclude password from response
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile retrieved successfully ✅',
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role
      }
    });
  } catch (error) {
    console.error('getUserProfile error:', error);
    res.status(500).json({ message: 'Failed to get profile ❌', error: error.message });
  }
};`,
          features: [
            "Extracts user ID from JWT token in Authorization header",
            "Returns user profile without password field",
            "Handles token validation and expiration",
            "Provides appropriate error messages for different scenarios"
          ],
          image: "/get-profile-code.png",
        },
        {
          title: "1.2. Update Profile Function",
          code: `// -------------------- UPDATE PROFILE --------------------
// PUT /api/users/profile
export const updateProfile = async (req, res) => {
  try {
    // Get user ID from token
    const auth = req.headers?.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    const token = auth.split(' ')[1];
    let userId;
    try {
      const decoded = jwt.verify(token, 'secretKey123');
      userId = decoded.id;
    } catch (e) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const { name, email, contact } = req.body;
    
    // Validate required fields
    if (!name || !email || !contact) {
      return res.status(400).json({ message: 'Name, email and contact are required' });
    }

    // Check if email is being changed and if it's already taken
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email !== user.email) {
      const emailExists = await User.findOne({ email, _id: { $ne: userId } });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    // Update user
    user.name = name;
    user.email = email;
    user.contact = contact;
    await user.save();

    // Send response without password
    res.status(200).json({
      message: 'Profile updated successfully ✅',
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role
      }
    });
  } catch (error) {
    console.error('updateProfile error:', error);
    res.status(500).json({ message: 'Failed to update profile ❌', error: error.message });
  }
};`,
          features: [
            "Validates all required fields (name, email, contact)",
            "Checks for email uniqueness when email is changed",
            "Updates user information and returns updated profile",
            "Maintains security by excluding password from response"
          ],
          image: "/update-profile-code.png",
        }
      ]
    },
    {
      title: "Router Configuration (userRouter.js)",
      content: "Add profile routes to your userRouter.js file",
      image: "/userrouter-folder.png",
      code: `import express from "express";
import { 
  loginUser, 
  registerUser, 
  forgotPassword, 
  changePassword,
  getUserProfile,
  updateProfile 
} from "../controllers/UserController.js";

const UserRouter = express.Router();

// auth routes
UserRouter.post("/register", registerUser); // POST /api/users/register
UserRouter.post("/login", loginUser); // POST /api/users/login
UserRouter.post('/forgot-password', forgotPassword); // POST /api/users/forgot-password
UserRouter.post('/change-password', changePassword); // POST /api/users/change-password

// profile routes
UserRouter.get('/profile', getUserProfile); // GET /api/users/profile
UserRouter.put('/profile', updateProfile); // PUT /api/users/profile

export default UserRouter;`,
      endpoints: [
        "GET /api/users/profile - Retrieve user profile",
        "PUT /api/users/profile - Update user profile"
      ],
      image: "/router-config.png"
    },
    {
      title: "Testing with Postman",
      content: "Test the profile endpoints using Postman to ensure they work correctly",

    },
    {
      title: "Frontend Implementation (Profile.jsx)",
      content: "Create a React component for profile management with view and edit functionality",
      image: "/profile-component-overview.png",
      code: `import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Spinner
} from 'react-bootstrap';

const API_BASE = "https://ligand-dev-7.onrender.com/api/users";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) {
        setError('Please login first');
        setLoading(false);
        return;
      }

      const config = {
        headers: { Authorization: \`Bearer \${storedUser.token}\` }
      };

      const res = await axios.get(\`\${API_BASE}/profile\`, config);
      setProfile(res.data.user);
      setFormData({
        name: res.data.user.name,
        email: res.data.user.email,
        contact: res.data.user.contact
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    setSuccess('');
    // Reset form data to current profile
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        contact: profile.contact
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const config = {
        headers: { Authorization: \`Bearer \${userData.token}\` }
      };

      const res = await axios.put(\`\${API_BASE}/profile\`, formData, config);
      setProfile(res.data.user);
      setSuccess('Profile updated successfully ✅');
      setIsEditing(false);
      
      // Update localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        localStorage.setItem('user', JSON.stringify({
          ...storedUser,
          ...res.data.user
        }));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body>
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">My Profile</h2>
                {!isEditing && <p className="text-muted">Your account information</p>}
              </div>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              {isEditing ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="success" type="submit">
                      Save Changes
                    </Button>
                    <Button variant="light" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                profile && (
                  <>
                    <div className="mb-4">
                      <h5 className="text-muted mb-2">Full Name</h5>
                      <p className="fs-5">{profile.name}</p>
                      
                      <h5 className="text-muted mb-2">Email Address</h5>
                      <p className="fs-5">{profile.email}</p>
                      
                      <h5 className="text-muted mb-2">Contact Number</h5>
                      <p className="fs-5">{profile.contact}</p>

                      <h5 className="text-muted mb-2">Role</h5>
                      <p className="fs-5 text-capitalize">{profile.role}</p>
                    </div>

                    <div className="d-grid">
                      <Button variant="primary" onClick={handleEdit}>
                        Edit Profile
                      </Button>
                    </div>
                  </>
                )
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;`,
      features: [
        "View profile information in read-only mode",
        "Edit profile with form validation",
        "Real-time form state management",
        "Error and success message handling",
        "Loading states for better UX",
        "Automatic localStorage update after profile changes"
      ],
      outputImage: "/profile-component-output.png"
    },
    {
      title: "App.js Route Configuration",
      content: "Add the profile route to your main App.js file",
      image: "/appjs-config.png",
      code: `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Other routes */}
          <Route path="/profile" element={<Profile />} />
          {/* More routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;`,
      instructions: [
        "Import the Profile component at the top of App.js",
        "Add the Route component with path='/profile'",
        "Ensure the component path is correct based on your folder structure"
      ],
      image: "/route-configuration.png"
    },
    
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerH1}>Profile Management System</h1>
        <p style={styles.headerP}>
          Complete implementation of User Profile View and Edit functionality
        </p>
      </div>

      <div style={styles.sectionsContainer}>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} style={styles.sectionCard}>
            <h2 style={styles.sectionH2}>{section.title}</h2>

            {section.content && <p style={styles.textP}>{section.content}</p>}

            {/* Main section image */}
            {section.image && (
              <div style={styles.imageContainer}>
                <p style={styles.imageCaption}>
                  Image: {section.image}
                </p>
                <img
                  src={section.image}
                  alt={section.title}
                  style={styles.image}
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=";
                  }}
                />
              </div>
            )}

            {section.codeSections && section.codeSections.map((codeSection, codeIndex) => (
              <div key={codeIndex}>
                <h3 style={styles.subtitleH3}>{codeSection.title}</h3>
                {codeSection.features && (
                  <div style={styles.listBlock}>
                    <h4 style={styles.listH4}>Key Features:</h4>
                    <ul style={styles.listUl}>
                      {codeSection.features.map((feature, i) => (
                        <li key={i} style={styles.listLi}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div style={styles.codeBlock}>
                  <pre style={styles.pre}>{codeSection.code}</pre>
                  <button
                    style={{
                      ...styles.copyBtn,
                      ...(copiedIndex === `code-${sectionIndex}-${codeIndex}` ? styles.copiedBtn : {}),
                    }}
                    onClick={() => copyToClipboard(codeSection.code, `code-${sectionIndex}-${codeIndex}`)}
                  >
                    {copiedIndex === `code-${sectionIndex}-${codeIndex}` ? "Copied!" : "Copy"}
                  </button>
                </div>

                {/* Code section specific image */}
                {codeSection.image && (
                  <div style={styles.imageContainer}>
                    <p style={styles.imageCaption}>
                      Image: {codeSection.image}
                    </p>
                    <img
                      src={codeSection.image}
                      alt={codeSection.title}
                      style={styles.image}
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=";
                      }}
                    />
                  </div>
                )}
              </div>
            ))}

            {section.code && !section.codeSections && (
              <div style={styles.codeBlock}>
                <pre style={styles.pre}>{section.code}</pre>
                <button
                  style={{
                    ...styles.copyBtn,
                    ...(copiedIndex === `code-${sectionIndex}` ? styles.copiedBtn : {}),
                  }}
                  onClick={() => copyToClipboard(section.code, `code-${sectionIndex}`)}
                >
                  {copiedIndex === `code-${sectionIndex}` ? "Copied!" : "Copy"}
                </button>
              </div>
            )}

            {section.endpoints && (
              <div style={styles.listBlock}>
                <h4 style={styles.listH4}>API Endpoints:</h4>
                <ul style={styles.listUl}>
                  {section.endpoints.map((endpoint, i) => (
                    <li key={i} style={styles.listLi}>{endpoint}</li>
                  ))}
                </ul>
              </div>
            )}

            {section.features && (
              <div style={styles.listBlock}>
                <h4 style={styles.listH4}>Component Features:</h4>
                <ul style={styles.listUl}>
                  {section.features.map((feature, i) => (
                    <li key={i} style={styles.listLi}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {section.instructions && (
              <div style={styles.listBlock}>
                <h4 style={styles.listH4}>Implementation Instructions:</h4>
                <ul style={styles.listUl}>
                  {section.instructions.map((instruction, i) => (
                    <li key={i} style={styles.listLi}>{instruction}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Output image for frontend components */}
            {section.outputImage && (
              <div style={styles.imageContainer}>
                <p style={styles.imageCaption}>
                  Output: {section.outputImage}
                </p>
                <img
                  src={section.outputImage}
                  alt={`${section.title} Output`}
                  style={styles.image}
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=";
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* HOMEWORK SECTION */}
      <div style={styles.homeworkContainer}>
        <h2 style={styles.homeworkTitle}>🧠 HOMEWORK - ENHANCED PROFILE MANAGEMENT</h2>
        <div style={styles.homeworkContent}>

          <div style={styles.homeworkSection}>
            <h3 style={styles.homeworkSectionTitle}>Task :Profile Module Tasks</h3>
            <ul style={styles.homeworkList}>
              <li style={styles.homeworkListItem}>Add profile picture field to User model</li>
              <li style={styles.homeworkListItem}>Create file upload endpoint for profile pictures</li>
              <li style={styles.homeworkListItem}>Implement image compression and validation</li>
              <li style={styles.homeworkListItem}>Update frontend to display and change profile pictures</li>
              <li style={styles.homeworkListItem}> The email field cannot be edited since it is used for login. Set it as read-only.</li>
            </ul>
          </div>

          

         

        </div>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerP}>
          Profile management system implementation complete!
        </p>
        <p style={styles.footerP}>
          Users can now view and edit their profiles securely with proper authentication.
        </p>
      </div>

      <div style={styles.companyInfo}>
        <h2 style={styles.companyH2}>LIGAND SOFTWARE SOLUTIONS</h2>
        <p style={styles.companyP}>Your Launchpad To Tech Success</p>
        <p style={styles.companyP}>Happy Coding</p>
        <p style={styles.companyP}>Happy Learning!!!!!</p>
      </div>
    </div>
  );
};

export default ProfileNotes;