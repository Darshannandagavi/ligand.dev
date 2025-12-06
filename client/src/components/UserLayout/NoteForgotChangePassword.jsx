// // NoteForgotChangePassword.jsx
// import React, { useState } from "react";

// const NoteForgotChangePassword = () => {
//     const [copiedIndex, setCopiedIndex] = useState(null);

//     const copyToClipboard = (text, index) => {
//         navigator.clipboard.writeText(text);
//         setCopiedIndex(index);
//         setTimeout(() => setCopiedIndex(null), 2000);
//     };

//     // Internal CSS
//     const styles = {
//         container: {
//             fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//             maxWidth: "1200px",
//             margin: "0 auto",
//             padding: "20px",
//             backgroundColor: "#f9f9f9",
//             color: "#333",
//             lineHeight: "1.6",
//         },
//         header: {
//             textAlign: "center",
//             marginBottom: "30px",
//             padding: "30px",
//             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             color: "white",
//             borderRadius: "12px",
//             boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
//         },
//         headerH1: {
//             margin: "0 0 15px 0",
//             fontSize: "2.8rem",
//             fontWeight: "700",
//         },
//         headerP: {
//             margin: "0",
//             fontSize: "1.3rem",
//             opacity: "0.95",
//         },
//         companyInfo: {
//             textAlign: "center",
//             margin: "40px 0",
//             padding: "25px",
//             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             color: "white",
//             borderRadius: "12px",
//             boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
//         },
//         companyH2: {
//             margin: "0 0 15px 0",
//             fontSize: "2rem",
//             fontWeight: "600",
//         },
//         companyP: {
//             margin: "8px 0",
//             fontSize: "1.1rem",
//         },
//         sectionsContainer: {
//             display: "flex",
//             flexDirection: "column",
//             gap: "30px",
//         },
//         sectionCard: {
//             backgroundColor: "white",
//             padding: "30px",
//             borderRadius: "12px",
//             boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
//             borderLeft: "6px solid #3498db",
//         },
//         sectionH2: {
//             color: "#2c3e50",
//             marginTop: "0",
//             marginBottom: "25px",
//             fontSize: "1.9rem",
//             borderBottom: "3px solid #f0f0f0",
//             paddingBottom: "15px",
//             textAlign: "left",
//         },
//         contentBlock: {
//             marginBottom: "25px",
//             textAlign: "left",
//         },
//         subtitleH3: {
//             color: "#3498db",
//             margin: "25px 0 15px 0",
//             fontSize: "1.5rem",
//             textAlign: "left",
//         },
//         textP: {
//             margin: "0 0 18px 0",
//             fontSize: "1.15rem",
//             lineHeight: "1.7",
//             textAlign: "left",
//         },
//         listBlock: {
//             backgroundColor: "#f8f9fa",
//             padding: "20px 25px 20px 45px",
//             borderRadius: "10px",
//             margin: "20px 0",
//             borderLeft: "4px solid #3498db",
//             textAlign: "left",
//         },
//         listH4: {
//             margin: "0 0 15px 0",
//             color: "#2c3e50",
//             fontSize: "1.3rem",
//             textAlign: "left",
//         },
//         listUl: {
//             margin: "0",
//             padding: "0",
//             textAlign: "left",
//         },
//         listLi: {
//             marginBottom: "12px",
//             fontSize: "1.1rem",
//             paddingLeft: "5px",
//             textAlign: "left",
//         },
//         codeBlock: {
//             position: "relative",
//             backgroundColor: "#2d3436",
//             color: "#dfe6e9",
//             padding: "18px",
//             borderRadius: "8px",
//             margin: "20px 0",
//             overflowX: "auto",
//             border: "1px solid #444",
//             textAlign: "left",
//         },
//         code: {
//             fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
//             fontSize: "1rem",
//             whiteSpace: "pre-wrap",
//             textAlign: "left",
//         },
//         pre: {
//             fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
//             fontSize: "1rem",
//             whiteSpace: "pre-wrap",
//             margin: "0",
//             lineHeight: "1.5",
//             textAlign: "left",
//         },
//         copyBtn: {
//             position: "absolute",
//             top: "12px",
//             right: "12px",
//             backgroundColor: "#3498db",
//             color: "white",
//             border: "none",
//             padding: "8px 15px",
//             borderRadius: "6px",
//             cursor: "pointer",
//             fontSize: "0.9rem",
//             transition: "all 0.3s ease",
//         },
//         copiedBtn: {
//             backgroundColor: "#27ae60",
//         },
//         imageContainer: {
//             margin: "25px 0",
//             textAlign: "center",
//         },
//         imageCaption: {
//             fontStyle: "italic",
//             color: "#666",
//             marginBottom: "10px",
//             fontSize: "1rem",
//             textAlign: "center",
//         },
//         image: {
//             width: "100%",
//             maxWidth: "100%",
//             borderRadius: "8px",
//             boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
//             border: "1px solid #ddd",
//         },
//         footer: {
//             textAlign: "center",
//             marginTop: "50px",
//             padding: "30px",
//             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             color: "white",
//             borderRadius: "12px",
//             boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
//         },
//         footerP: {
//             margin: "8px 0",
//             fontSize: "1.15rem",
//         },
//     };

//     const sections = [
//         {
//             title: "Password Management: Forgot & Change Password",
//             content: "Complete implementation of password reset and change functionality with email integration",
//             image: "/password-management-overview.png",
//         },
//         {
//             title: "Backend Implementation (UserController.js)",
//             content: "Add these functions to your existing UserController.js file",
//             image: "/usercontroller-folder.png",

//             codeSections: [
//                 {
//                     title: "1.1. Forgot Password Function",
//                     code: `// -------------------- FORGOT PASSWORD --------------------
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: 'Email is required' });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     // Generate 6-digit temporary password
//     const tempPassword = Math.floor(100000 + Math.random() * 900000).toString();
    
//     user.password = tempPassword;
//     await user.save();

//     // Send email with temporary password
//     const html = \`<p>Hello \${user.name},</p>
//                   <p>Your temporary password: \${tempPassword}</p>
//                   <p>Use it to login and change password immediately.</p>\`;

//     await sendEmail({ 
//       to: user.email, 
//       subject: 'Password Reset - Temporary Password', 
//       html 
//     });

//     return res.status(200).json({ message: 'Temporary password sent to your email ✅' });
//   } catch (error) {
//     return res.status(500).json({ message: 'Failed to reset password ❌', error: error.message });
//   }
// };`,
//                     features: [
//                         "Generates secure 6-digit temporary password",
//                         "Automatically hashes password via User schema pre-save hook",
//                         "Sends email with temporary password",
//                         "Handles errors gracefully with appropriate status codes"
//                     ],
//                     image: "/forgot-password-code.png",
//                 },
//                 {
//                     title: "1.2. Change Password Function",
//                     code: `// -------------------- CHANGE PASSWORD --------------------
// export const changePassword = async (req, res) => {
//   try {
//     const { email, currentPassword, newPassword } = req.body;

//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({ message: 'Current and new passwords are required' });
//     }

//     let user = null;

//     // Find user by email or JWT token
//     if (email) {
//       user = await User.findOne({ email });
//     } else {
//       const auth = req.headers?.authorization;
//       if (!auth || !auth.startsWith('Bearer ')) {
//         return res.status(400).json({ message: 'Email not provided and no authorization token found' });
//       }
//       const token = auth.split(' ')[1];
//       const decoded = jwt.verify(token, 'secretKey123');
//       user = await User.findById(decoded.id);
//     }

//     if (!user) return res.status(404).json({ message: 'User not found' });

//     // Verify current password
//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect ❌' });

//     // Set and save new password
//     user.password = newPassword;
//     await user.save();
    
//     return res.status(200).json({ message: 'Password changed successfully ✅' });
//   } catch (error) {
//     return res.status(500).json({ message: 'Failed to change password ❌', error: error.message });
//   }
// };`,
//                     features: [
//                         "Verifies current password before allowing change",
//                         "Works with both email and JWT token authentication",
//                         "Auto-hashes new password via User schema",
//                         "Provides clear error messages for different scenarios"
//                     ],
//                     image: "/change-password-code.png",
//                 }
//             ]
//         },

//         {
//             title: "Full UserController.js File",
//             content: "Complete UserController.js with all authentication and password management functions",
//             code: `import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import nodemailer from 'nodemailer';

// // -------------------- EMAIL HELPER FUNCTION --------------------
// const sendEmail = async ({ to, subject, html }) => {
//   if (!to) throw new Error('No recipient specified for email');

//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const mailOptions = { 
//     from: process.env.EMAIL, 
//     to, 
//     subject, 
//     html 
//   };

//   return new Promise((resolve, reject) => {
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//         return reject(error);
//       }
//       console.log('Email sent:', info && info.response ? info.response : info);
//       resolve(info);
//     });
//   });
// };

// // -------------------- USER REGISTRATION --------------------
// export const registerUser = async (req, res) => {
//   console.log("Welcome to user registration");
//   try {
//     const { name, email, contact, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists ❌" });
//     }

//     // Create new user
//     const newUser = new User({ name, email, contact, password });
//     await newUser.save(); // Password will be hashed automatically by pre-save hook

//     // Send welcome email
//     try {
//       await sendEmail({
//         to: newUser.email,
//         subject: 'Welcome to Our Service!',
//         html: \`<p>Hello \${newUser.name},</p>
//                <p>Welcome to our service! We're thrilled to have you onboard.</p>
//                <p>If you have any questions or need help getting started, feel free to reach out to our support team.</p>
//                <p>Best regards,<br>Your Company Name</p>\`
//       });
//     } catch (emailErr) {
//       console.error('Failed to send welcome email:', emailErr);
//     }

//     res.status(201).json({ 
//       message: "User registered successfully ✅", 
//       user: newUser 
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Registration failed ❌", error: error.message });
//   }
// };

// // -------------------- FORGOT PASSWORD --------------------
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: 'Email is required' });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     // Generate random 6-digit temporary password
//     const tempPassword = Math.floor(100000 + Math.random() * 900000).toString();
//     console.log("Generated temp password:", tempPassword);

//     // Assign temporary password (will be hashed by pre-save hook)
//     user.password = tempPassword;
//     await user.save();

//     // Send temporary password via email
//     const html = \`<p>Hello \${user.name},</p>
//                   <p>A password reset was requested for your account. Use the temporary password below to log in and then change your password immediately.</p>
//                   <p><strong>Temporary password:</strong> \${tempPassword}</p>
//                   <p>This temporary password is valid for a limited time. If you did not request this, please contact support immediately.</p>
//                   <p>Best regards,<br>Your Company Name</p>\`;

//     try {
//       await sendEmail({ 
//         to: user.email, 
//         subject: 'Password Reset - Temporary Password', 
//         html 
//       });
//     } catch (emailErr) {
//       console.error('forgotPassword email error:', emailErr);
//       return res.status(500).json({ message: 'Temporary password created but failed to send email' });
//     }

//     return res.status(200).json({ message: 'Temporary password sent to your email ✅' });
//   } catch (error) {
//     console.error('forgotPassword error:', error);
//     return res.status(500).json({ message: 'Failed to reset password ❌', error: error.message });
//   }
// };

// // -------------------- USER LOGIN --------------------
// export const loginUser = async (req, res) => {
//   console.log("User login attempt");
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials ❌" });

//     // Check password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials ❌" });

//     // Create JWT token for session
//     const token = jwt.sign({ id: user._id }, "secretKey123", { expiresIn: "1h" });

//     res.status(200).json({
//       message: "Login successful ✅",
//       token,
//       user: {
//         userId: user._id,
//         name: user.name,
//         email: user.email,
//         contact: user.contact,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Login failed ❌", error: error.message });
//   }
// };

// // -------------------- CHANGE PASSWORD --------------------
// export const changePassword = async (req, res) => {
//   try {
//     const { email, currentPassword, newPassword } = req.body;

//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({ message: 'Current and new passwords are required' });
//     }

//     let user = null;

//     // Find user by email or JWT token
//     if (email) {
//       user = await User.findOne({ email });
//     } else {
//       const auth = req.headers?.authorization;
//       if (!auth || !auth.startsWith('Bearer ')) {
//         return res.status(400).json({ message: 'Email not provided and no authorization token found' });
//       }
//       const token = auth.split(' ')[1];
//       try {
//         const decoded = jwt.verify(token, 'secretKey123');
//         user = await User.findById(decoded.id);
//       } catch (e) {
//         return res.status(401).json({ message: 'Invalid or expired token' });
//       }
//     }

//     if (!user) return res.status(404).json({ message: 'User not found' });

//     // Verify current password
//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect ❌' });

//     // Set new password (will be hashed by pre-save hook)
//     user.password = newPassword;
//     await user.save();
    
//     return res.status(200).json({ message: 'Password changed successfully ✅' });
//   } catch (error) {
//     console.error('changePassword error:', error);
//     return res.status(500).json({ message: 'Failed to change password ❌', error: error.message });
//   }
// };

// // -------------------- GET ALL USERS --------------------
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select('-password');
//     res.status(200).json({
//       message: "Users fetched successfully ✅",
//       users: users
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch users ❌", error: error.message });
//   }
// };

// // -------------------- GET USER BY ID --------------------
// export const getUserById = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findById(userId).select('-password');
    
//     if (!user) {
//       return res.status(404).json({ message: "User not found ❌" });
//     }

//     res.status(200).json({
//       message: "User fetched successfully ✅",
//       user: user
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch user ❌", error: error.message });
//   }
// };

// // -------------------- UPDATE USER PROFILE --------------------
// export const updateUserProfile = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const updateData = req.body;

//     // Remove password from update data if present
//     if (updateData.password) {
//       delete updateData.password;
//     }

//     const user = await User.findByIdAndUpdate(
//       userId, 
//       updateData, 
//       { new: true, runValidators: true }
//     ).select('-password');

//     if (!user) {
//       return res.status(404).json({ message: "User not found ❌" });
//     }

//     res.status(200).json({
//       message: "User profile updated successfully ✅",
//       user: user
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update user profile ❌", error: error.message });
//   }
// };

// // -------------------- DELETE USER --------------------
// export const deleteUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findByIdAndDelete(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found ❌" });
//     }

//     res.status(200).json({
//       message: "User deleted successfully ✅"
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete user ❌", error: error.message });
//   }
// };`,
//             features: [
//                 "Complete user authentication system",
//                 "Password reset with email integration",
//                 "JWT token-based authentication",
//                 "Secure password hashing with bcrypt",
//                 "Email notifications for registration and password reset",
//                 "User profile management",
//                 "Error handling and validation"
//             ],
//         },
//         {
//             title: "Router Configuration (UserRouter.js)",
//             content: "Add these routes to your existing UserRouter.js file",
//             code: `import express from "express";
// import { 
//   registerUser, 
//   loginUser, 
//   forgotPassword, 
//   changePassword 
// } from "../controllers/userController.js";

// const UserRouter = express.Router();

// // Routes
// UserRouter.post("/register", registerUser);
// UserRouter.post("/login", loginUser);
// UserRouter.post("/forgot-password", forgotPassword);
// UserRouter.post("/change-password", changePassword);

// export default UserRouter;`,
//             endpoints: [
//                 "POST /api/users/register - User registration",
//                 "POST /api/users/login - User login",
//                 "POST /api/users/forgot-password - Password reset requests",
//                 "POST /api/users/change-password - Password change requests"
//             ],
//             image: "/userrouter-updated.png",
//         },
//         {
//             title: "Frontend Components - ForgotPassword.jsx",
//             content: "Create this component in guestLayout/ folder",
//             image: "/guestlayout-folder.png",
//             code: `import React from "react";
// import axios from "axios";
// import { Container, Row, Col, Form, Button, Alert, Spinner, Card } from "react-bootstrap";

// const API_BASE = "https://ligand-dev-7.onrender.com/api/users";

// export default class ForgotPassword extends React.Component {
//   state = {
//     email: "",
//     loading: false,
//     error: "",
//     success: "",
//   };

//   handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     this.setState({ error: "", success: "" });

//     const { email } = this.state;
//     if (!email) return this.setState({ error: "Please enter your email address." });

//     this.setState({ loading: true });
//     try {
//       const res = await axios.post(\`\${API_BASE}/forgot-password\`, { email });
//       this.setState({
//         success: res.data?.message || "Temporary password sent to your email.",
//         email: "",
//       });
//     } catch (err) {
//       const msg = err?.response?.data?.message || "Failed to send temporary password. Try again.";
//       this.setState({ error: msg });
//     } finally {
//       this.setState({ loading: false });
//     }
//   };

//   render() {
//     const { email, loading, error, success } = this.state;

//     return (
//       <Container className="py-4">
//         <Row className="justify-content-center">
//           <Col xs={12} md={8} lg={6}>
//             <Card className="shadow-sm">
//               <Card.Body>
//                 <h4 className="mb-3 text-center">Forgot Password</h4>
//                 {success && <Alert variant="success">{success}</Alert>}
//                 {error && <Alert variant="danger">{error}</Alert>}
//                 <Form onSubmit={this.handleSubmit}>
//                   <Form.Group className="mb-3" controlId="fpEmail">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control
//                       name="email"
//                       type="email"
//                       placeholder="you@example.com"
//                       value={email}
//                       onChange={this.handleChange}
//                       required
//                     />
//                   </Form.Group>
//                   <div className="d-grid">
//                     <Button variant="primary" type="submit" disabled={loading}>
//                       {loading ? <><Spinner size="sm" /> Sending...</> : "Send Temporary Password"}
//                     </Button>
//                   </div>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }`,
//             features: [
//                 "Email validation and input handling",
//                 "Loading states with spinner",
//                 "Success and error message display",
//                 "Responsive Bootstrap design"
//             ],
//             outputImage: "/forgot-password-output.png",
//         },
//         {
//             title: "Frontend Components - ChangePassword.jsx",
//             content: "Create this component in guestLayout/ folder",
//             code: `import React from "react";
// import axios from "axios";
// import { Container, Row, Col, Form, Button, Alert, Spinner, Card } from "react-bootstrap";

// const API_BASE = "https://ligand-dev-7.onrender.com/api/users";

// export default class ChangePassword extends React.Component {
//   state = {
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//     loading: false,
//     error: "",
//     success: "",
//   };

//   handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     this.setState({ error: "", success: "" });

//     const { currentPassword, newPassword, confirmPassword } = this.state;

//     // Get email from localStorage
//     const storedUser = localStorage.getItem('user');
//     const parsedUser = storedUser ? JSON.parse(storedUser) : null;
//     const email = parsedUser?.email;

//     if (!email) {
//       return this.setState({ error: "Could not determine your email. Please sign in and try again." });
//     }
//     if (!currentPassword || !newPassword) {
//       return this.setState({ error: "Please fill all required fields." });
//     }
//     if (newPassword.length < 6) {
//       return this.setState({ error: "New password should be at least 6 characters." });
//     }
//     if (newPassword !== confirmPassword) {
//       return this.setState({ error: "New password and confirmation do not match." });
//     }

//     this.setState({ loading: true });
//     try {
//       const payload = { email, currentPassword, newPassword };
//       const res = await axios.post(\`\${API_BASE}/change-password\`, payload);
//       this.setState({
//         success: res.data?.message || "Password changed successfully.",
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     } catch (err) {
//       const msg = err?.response?.data?.message || "Failed to change password. Try again.";
//       this.setState({ error: msg });
//     } finally {
//       this.setState({ loading: false });
//     }
//   };

//   render() {
//     const { currentPassword, newPassword, confirmPassword, loading, error, success } = this.state;

//     return (
//       <Container className="py-4">
//         <Row className="justify-content-center">
//           <Col xs={12} md={9} lg={7}>
//             <Card className="shadow-sm">
//               <Card.Body>
//                 <h4 className="mb-3 text-center">Change Password</h4>
//                 {success && <Alert variant="success">{success}</Alert>}
//                 {error && <Alert variant="danger">{error}</Alert>}
//                 <Form onSubmit={this.handleSubmit}>
//                   <Form.Group controlId="cpCurrent" className="mb-3">
//                     <Form.Label>Current Password</Form.Label>
//                     <Form.Control
//                       name="currentPassword"
//                       type="password"
//                       placeholder="Current password"
//                       value={currentPassword}
//                       onChange={this.handleChange}
//                       required
//                     />
//                   </Form.Group>
//                   <Row>
//                     <Col xs={12} md={6} className="mb-3">
//                       <Form.Group controlId="cpNew">
//                         <Form.Label>New Password</Form.Label>
//                         <Form.Control
//                           name="newPassword"
//                           type="password"
//                           placeholder="New password (min 6 chars)"
//                           value={newPassword}
//                           onChange={this.handleChange}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col xs={12} md={6} className="mb-3">
//                       <Form.Group controlId="cpConfirm">
//                         <Form.Label>Confirm New Password</Form.Label>
//                         <Form.Control
//                           name="confirmPassword"
//                           type="password"
//                           placeholder="Confirm new password"
//                           value={confirmPassword}
//                           onChange={this.handleChange}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <div className="d-grid">
//                     <Button variant="success" type="submit" disabled={loading}>
//                       {loading ? <><Spinner size="sm" /> Updating...</> : "Change Password"}
//                     </Button>
//                   </div>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }`,
//             features: [
//                 "Current password verification",
//                 "New password confirmation",
//                 "Password strength validation",
//                 "User authentication via localStorage"
//             ],
//             outputImage: "/change-password-output.png",
//         },
//         {
//             title: "App.js Route Configuration",
//             content: "Add these routes to your main App.js file",
//             code: `import ForgotPassword from './guestLayout/ForgotPassword';
// import ChangePassword from './guestLayout/ChangePassword';

// // Inside your App component routes
// <Route path="/forgot-password" element={<ForgotPassword />} />
// <Route path="/change-password" element={<ChangePassword />} />`,
//             instructions: [
//                 "Import both components at the top of App.js",
//                 "Add Route components inside your Router",
//                 "Ensure proper path configuration"
//             ],
//             image: "/appjs-routes.png",
//         },
        
//     ];

//     return (
//         <div style={styles.container}>
//             <div style={styles.header}>
//                 <h1 style={styles.headerH1}>Password Management System</h1>
//                 <p style={styles.headerP}>
//                     Complete implementation of Forgot Password and Change Password functionality
//                 </p>
//             </div>

//             <div style={styles.sectionsContainer}>
//                 {sections.map((section, sectionIndex) => (
//                     <div key={sectionIndex} style={styles.sectionCard}>
//                         <h2 style={styles.sectionH2}>{section.title}</h2>

//                         {section.content && <p style={styles.textP}>{section.content}</p>}

//                         {/* Main section image */}
//                         {section.image && (
//                             <div style={styles.imageContainer}>
//                                 <p style={styles.imageCaption}>
//                                     Image: {section.image}
//                                 </p>
//                                 <img
//                                     src={section.image}
//                                     alt={section.title}
//                                     style={styles.image}
//                                     onError={(e) => {
//                                         e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=";
//                                     }}
//                                 />
//                             </div>
//                         )}

//                         {section.codeSections && section.codeSections.map((codeSection, codeIndex) => (
//                             <div key={codeIndex}>
//                                 <h3 style={styles.subtitleH3}>{codeSection.title}</h3>
//                                 {codeSection.features && (
//                                     <div style={styles.listBlock}>
//                                         <h4 style={styles.listH4}>Key Features:</h4>
//                                         <ul style={styles.listUl}>
//                                             {codeSection.features.map((feature, i) => (
//                                                 <li key={i} style={styles.listLi}>{feature}</li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )}
//                                 <div style={styles.codeBlock}>
//                                     <pre style={styles.pre}>{codeSection.code}</pre>
//                                     <button
//                                         style={{
//                                             ...styles.copyBtn,
//                                             ...(copiedIndex === `code-${sectionIndex}-${codeIndex}` ? styles.copiedBtn : {}),
//                                         }}
//                                         onClick={() => copyToClipboard(codeSection.code, `code-${sectionIndex}-${codeIndex}`)}
//                                     >
//                                         {copiedIndex === `code-${sectionIndex}-${codeIndex}` ? "Copied!" : "Copy"}
//                                     </button>
//                                 </div>

//                                 {/* Code section specific image */}
//                                 {codeSection.image && (
//                                     <div style={styles.imageContainer}>
//                                         <p style={styles.imageCaption}>
//                                             Image: {codeSection.image}
//                                         </p>
//                                         <img
//                                             src={codeSection.image}
//                                             alt={codeSection.title}
//                                             style={styles.image}
//                                             onError={(e) => {
//                                                 e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=";
//                                             }}
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                         ))}

//                         {section.code && !section.codeSections && (
//                             <div style={styles.codeBlock}>
//                                 <pre style={styles.pre}>{section.code}</pre>
//                                 <button
//                                     style={{
//                                         ...styles.copyBtn,
//                                         ...(copiedIndex === `code-${sectionIndex}` ? styles.copiedBtn : {}),
//                                     }}
//                                     onClick={() => copyToClipboard(section.code, `code-${sectionIndex}`)}
//                                 >
//                                     {copiedIndex === `code-${sectionIndex}` ? "Copied!" : "Copy"}
//                                 </button>
//                             </div>
//                         )}

//                         {section.endpoints && (
//                             <div style={styles.listBlock}>
//                                 <h4 style={styles.listH4}>API Endpoints:</h4>
//                                 <ul style={styles.listUl}>
//                                     {section.endpoints.map((endpoint, i) => (
//                                         <li key={i} style={styles.listLi}>{endpoint}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         )}

//                         {section.features && (
//                             <div style={styles.listBlock}>
//                                 <h4 style={styles.listH4}>Component Features:</h4>
//                                 <ul style={styles.listUl}>
//                                     {section.features.map((feature, i) => (
//                                         <li key={i} style={styles.listLi}>{feature}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         )}

//                         {section.instructions && (
//                             <div style={styles.listBlock}>
//                                 <h4 style={styles.listH4}>Implementation Instructions:</h4>
//                                 <ul style={styles.listUl}>
//                                     {section.instructions.map((instruction, i) => (
//                                         <li key={i} style={styles.listLi}>{instruction}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         )}

//                         {/* Output image for frontend components */}
//                         {section.outputImage && (
//                             <div style={styles.imageContainer}>
//                                 <p style={styles.imageCaption}>
//                                     Output: {section.outputImage}
//                                 </p>
//                                 <img
//                                     src={section.outputImage}
//                                     alt={`${section.title} Output`}
//                                     style={styles.image}
//                                     onError={(e) => {
//                                         e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=";
//                                     }}
//                                 />
//                             </div>
//                         )}

//                         {section.steps && (
//                             <div>
//                                 <h3 style={styles.subtitleH3}>Testing Steps:</h3>
//                                 {section.steps.map((step, stepIndex) => (
//                                     <div key={stepIndex} style={styles.listBlock}>
//                                         <h4 style={styles.listH4}>{step.step}</h4>
//                                         {step.instructions && (
//                                             <ul style={styles.listUl}>
//                                                 {step.instructions.map((instruction, i) => (
//                                                     <li key={i} style={styles.listLi}>{instruction}</li>
//                                                 ))}
//                                             </ul>
//                                         )}
//                                         {step.image && (
//                                             <div style={styles.imageContainer}>
//                                                 <p style={styles.imageCaption}>
//                                                     Image: {step.image}
//                                                 </p>
//                                                 <img
//                                                     src={step.image}
//                                                     alt={step.step}
//                                                     style={styles.image}
//                                                     onError={(e) => {
//                                                         e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=";
//                                                     }}
//                                                 />
//                                             </div>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>

//             <div style={styles.footer}>
//                 <p style={styles.footerP}>
//                     Password management system implementation complete!
//                 </p>
//                 <p style={styles.footerP}>
//                     Users can now reset forgotten passwords and change existing passwords securely.
//                 </p>
//             </div>

//             <div style={styles.companyInfo}>
//                 <h2 style={styles.companyH2}>LIGAND SOFTWARE SOLUTIONS</h2>
//                 <p style={styles.companyP}>Your Launchpad To Tech Success</p>
//                 <p style={styles.companyP}>Happy Coding</p>
//                 <p style={styles.companyP}>Happy Learning!!!!!</p>
//             </div>
//         </div>
//     );
// };

// export default NoteForgotChangePassword;

// NoteForgotChangePassword.jsx

// NoteForgotChangePassword.jsx
import React, { useState } from "react";

const NoteForgotChangePassword = () => {
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
            title: "Password Management: Forgot & Change Password",
            content: "Complete implementation of password reset and change functionality with email integration",
           
        },
        {
            title: "Backend Implementation (UserController.js)",
            content: "Add these functions to your existing UserController.js file",
            image: "/usercontroller-folder.png",

            codeSections: [
                {
                    title: "1.1. Forgot Password Function",
                    code: `// -------------------- FORGOT PASSWORD --------------------
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.sDtatus(404).json({ message: 'User not found' });

    // Generate 6-digit temporary password
    const tempPassword = Math.floor(100000 + Math.random() * 900000).toString();
    
    user.password = tempPassword;
    await user.save();

    // Send email with temporary password
    const html = \`<p>Hello \${user.name},</p>
                  <p>Your temporary password: \${tempPassword}</p>
                  <p>Use it to login and change password immediately.</p>\`;

    await sendEmail({ 
      to: user.email, 
      subject: 'Password Reset - Temporary Password', 
      html 
    });

    return res.status(200).json({ message: 'Temporary password sent to your email ✅' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to reset password ❌', error: error.message });
  }
};`,
                    features: [
                        "Generates secure 6-digit temporary password",
                        "Automatically hashes password via User schema pre-save hook",
                        "Sends email with temporary password",
                        "Handles errors gracefully with appropriate status codes"
                    ],
                    image: "/forgot-password-code.png",
                },
                {
                    title: "1.2. Change Password Function",
                    code: `// -------------------- CHANGE PASSWORD --------------------
export const changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new passwords are required' });
    }

    let user = null;

    // Find user by email or JWT token
    if (email) {
      user = await User.findOne({ email });
    } else {
      const auth = req.headers?.authorization;
      if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Email not provided and no authorization token found' });
      }
      const token = auth.split(' ')[1];
      const decoded = jwt.verify(token, 'secretKey123');
      user = await User.findById(decoded.id);
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect ❌' });

    // Set and save new password
    user.password = newPassword;
    await user.save();
    
    return res.status(200).json({ message: 'Password changed successfully ✅' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to change password ❌', error: error.message });
  }
};`,
                    features: [
                        "Verifies current password before allowing change",
                        "Works with both email and JWT token authentication",
                        "Auto-hashes new password via User schema",
                        "Provides clear error messages for different scenarios"
                    ],
                    image: "/change-password-code.png",
                }
            ]
        },

        {
            title: "Full UserController.js File",
            content: "Complete UserController.js with all authentication and password management functions",
            code: `import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from 'nodemailer';

// -------------------- EMAIL HELPER FUNCTION --------------------
const sendEmail = async ({ to, subject, html }) => {
  if (!to) throw new Error('No recipient specified for email');

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = { 
    from: process.env.EMAIL, 
    to, 
    subject, 
    html 
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return reject(error);
      }
      console.log('Email sent:', info && info.response ? info.response : info);
      resolve(info);
    });
  });
};

// -------------------- USER REGISTRATION --------------------
export const registerUser = async (req, res) => {
  console.log("Welcome to user registration");
  try {
    const { name, email, contact, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    // Create new user
    const newUser = new User({ name, email, contact, password });
    await newUser.save(); // Password will be hashed automatically by pre-save hook

    // Send welcome email
    try {
      await sendEmail({
        to: newUser.email,
        subject: 'Welcome to Our Service!',
        html: \`<p>Hello \${newUser.name},</p>
               <p>Welcome to our service! We're thrilled to have you onboard.</p>
               <p>If you have any questions or need help getting started, feel free to reach out to our support team.</p>
               <p>Best regards,<br>Your Company Name</p>\`
      });
    } catch (emailErr) {
      console.error('Failed to send welcome email:', emailErr);
    }

    res.status(201).json({ 
      message: "User registered successfully ✅", 
      user: newUser 
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed ❌", error: error.message });
  }
};

// -------------------- FORGOT PASSWORD --------------------
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate random 6-digit temporary password
    const tempPassword = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated temp password:", tempPassword);

    // Assign temporary password (will be hashed by pre-save hook)
    user.password = tempPassword;
    await user.save();

    // Send temporary password via email
    const html = \`<p>Hello \${user.name},</p>
                  <p>A password reset was requested for your account. Use the temporary password below to log in and then change your password immediately.</p>
                  <p><strong>Temporary password:</strong> \${tempPassword}</p>
                  <p>This temporary password is valid for a limited time. If you did not request this, please contact support immediately.</p>
                  <p>Best regards,<br>Your Company Name</p>\`;

    try {
      await sendEmail({ 
        to: user.email, 
        subject: 'Password Reset - Temporary Password', 
        html 
      });
    } catch (emailErr) {
      console.error('forgotPassword email error:', emailErr);
      return res.status(500).json({ message: 'Temporary password created but failed to send email' });
    }

    return res.status(200).json({ message: 'Temporary password sent to your email ✅' });
  } catch (error) {
    console.error('forgotPassword error:', error);
    return res.status(500).json({ message: 'Failed to reset password ❌', error: error.message });
  }
};

// -------------------- USER LOGIN --------------------
export const loginUser = async (req, res) => {
  console.log("User login attempt");
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials ❌" });

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials ❌" });

    // Create JWT token for session
    const token = jwt.sign({ id: user._id }, "secretKey123", { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful ✅",
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed ❌", error: error.message });
  }
};

// -------------------- CHANGE PASSWORD --------------------
export const changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new passwords are required' });
    }

    let user = null;

    // Find user by email or JWT token
    if (email) {
      user = await User.findOne({ email });
    } else {
      const auth = req.headers?.authorization;
      if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Email not provided and no authorization token found' });
      }
      const token = auth.split(' ')[1];
      try {
        const decoded = jwt.verify(token, 'secretKey123');
        user = await User.findById(decoded.id);
      } catch (e) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect ❌' });

    // Set new password (will be hashed by pre-save hook)
    user.password = newPassword;
    await user.save();
    
    return res.status(200).json({ message: 'Password changed successfully ✅' });
  } catch (error) {
    console.error('changePassword error:', error);
    return res.status(500).json({ message: 'Failed to change password ❌', error: error.message });
  }
};

// -------------------- GET ALL USERS --------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      message: "Users fetched successfully ✅",
      users: users
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users ❌", error: error.message });
  }
};

// -------------------- GET USER BY ID --------------------
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.status(200).json({
      message: "User fetched successfully ✅",
      user: user
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user ❌", error: error.message });
  }
};

// -------------------- UPDATE USER PROFILE --------------------
export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    // Remove password from update data if present
    if (updateData.password) {
      delete updateData.password;
    }

    const user = await User.findByIdAndUpdate(
      userId, 
      updateData, 
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.status(200).json({
      message: "User profile updated successfully ✅",
      user: user
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user profile ❌", error: error.message });
  }
};

// -------------------- DELETE USER --------------------
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.status(200).json({
      message: "User deleted successfully ✅"
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user ❌", error: error.message });
  }
};`,
            features: [
                "Complete user authentication system",
                "Password reset with email integration",
                "JWT token-based authentication",
                "Secure password hashing with bcrypt",
                "Email notifications for registration and password reset",
                "User profile management",
                "Error handling and validation"
            ],
        },
        {
            title: "Router Configuration (UserRouter.js)",
            content: "Add these routes to your existing UserRouter.js file",
            code: `import express from "express";
import { 
  registerUser, 
  loginUser, 
  forgotPassword, 
  changePassword 
} from "../controllers/userController.js";

const UserRouter = express.Router();

// Routes
UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/forgot-password", forgotPassword);
UserRouter.post("/change-password", changePassword);

export default UserRouter;`,
            endpoints: [
                "POST /api/users/register - User registration",
                "POST /api/users/login - User login",
                "POST /api/users/forgot-password - Password reset requests",
                "POST /api/users/change-password - Password change requests"
            ],
            image: "/userrouter-updated.png",
        },
        {
            title: "Frontend Components - ForgotPassword.jsx",
            content: "Create this component in guestLayout/ folder",
            image: "/guestlayout-folder.png",
            code: `import React from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert, Spinner, Card } from "react-bootstrap";

const API_BASE = "https://ligand-dev-7.onrender.com/api/users";

export default class ForgotPassword extends React.Component {
  state = {
    email: "",
    loading: false,
    error: "",
    success: "",
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: "", success: "" });

    const { email } = this.state;
    if (!email) return this.setState({ error: "Please enter your email address." });

    this.setState({ loading: true });
    try {
      const res = await axios.post(\`\${API_BASE}/forgot-password\`, { email });
      this.setState({
        success: res.data?.message || "Temporary password sent to your email.",
        email: "",
      });
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to send temporary password. Try again.";
      this.setState({ error: msg });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { email, loading, error, success } = this.state;

    return (
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <h4 className="mb-3 text-center">Forgot Password</h4>
                {success && <Alert variant="success">{success}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3" controlId="fpEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={loading}>
                      {loading ? <><Spinner size="sm" /> Sending...</> : "Send Temporary Password"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}`,
            features: [
                "Email validation and input handling",
                "Loading states with spinner",
                "Success and error message display",
                "Responsive Bootstrap design"
            ],
            outputImage: "/forgot-password-output.png",
        },
        {
            title: "Frontend Components - ChangePassword.jsx",
            content: "Create this component in guestLayout/ folder",
            code: `import React from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert, Spinner, Card } from "react-bootstrap";

const API_BASE = "https://ligand-dev-7.onrender.com/api/users";

export default class ChangePassword extends React.Component {
  state = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    loading: false,
    error: "",
    success: "",
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: "", success: "" });

    const { currentPassword, newPassword, confirmPassword } = this.state;

    // Get email from localStorage
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const email = parsedUser?.email;

    if (!email) {
      return this.setState({ error: "Could not determine your email. Please sign in and try again." });
    }
    if (!currentPassword || !newPassword) {
      return this.setState({ error: "Please fill all required fields." });
    }
    if (newPassword.length < 6) {
      return this.setState({ error: "New password should be at least 6 characters." });
    }
    if (newPassword !== confirmPassword) {
      return this.setState({ error: "New password and confirmation do not match." });
    }

    this.setState({ loading: true });
    try {
      const payload = { email, currentPassword, newPassword };
      const res = await axios.post(\`\${API_BASE}/change-password\`, payload);
      this.setState({
        success: res.data?.message || "Password changed successfully.",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to change password. Try again.";
      this.setState({ error: msg });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { currentPassword, newPassword, confirmPassword, loading, error, success } = this.state;

    return (
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col xs={12} md={9} lg={7}>
            <Card className="shadow-sm">
              <Card.Body>
                <h4 className="mb-3 text-center">Change Password</h4>
                {success && <Alert variant="success">{success}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="cpCurrent" className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      name="currentPassword"
                      type="password"
                      placeholder="Current password"
                      value={currentPassword}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Group>
                  <Row>
                    <Col xs={12} md={6} className="mb-3">
                      <Form.Group controlId="cpNew">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          name="newPassword"
                          type="password"
                          placeholder="New password (min 6 chars)"
                          value={newPassword}
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} className="mb-3">
                      <Form.Group controlId="cpConfirm">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-grid">
                    <Button variant="success" type="submit" disabled={loading}>
                      {loading ? <><Spinner size="sm" /> Updating...</> : "Change Password"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}`,
            features: [
                "Current password verification",
                "New password confirmation",
                "Password strength validation",
                "User authentication via localStorage"
            ],
            outputImage: "/change-password-output.png",
        },
        {
            title: "App.js Route Configuration",
            content: "Add these routes to your main App.js file",
            code: `import ForgotPassword from './guestLayout/ForgotPassword';
import ChangePassword from './guestLayout/ChangePassword';

// Inside your App component routes
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/change-password" element={<ChangePassword />} />`,
            instructions: [
                "Import both components at the top of App.js",
                "Add Route components inside your Router",
                "Ensure proper path configuration"
            ],
            image: "/appjs-routes.png",
        },
        
    ];

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.headerH1}>Password Management System</h1>
                <p style={styles.headerP}>
                    Complete implementation of Forgot Password and Change Password functionality
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

                        {section.steps && (
                            <div>
                                <h3 style={styles.subtitleH3}>Testing Steps:</h3>
                                {section.steps.map((step, stepIndex) => (
                                    <div key={stepIndex} style={styles.listBlock}>
                                        <h4 style={styles.listH4}>{step.step}</h4>
                                        {step.instructions && (
                                            <ul style={styles.listUl}>
                                                {step.instructions.map((instruction, i) => (
                                                    <li key={i} style={styles.listLi}>{instruction}</li>
                                                ))}
                                            </ul>
                                        )}
                                        {step.image && (
                                            <div style={styles.imageContainer}>
                                                <p style={styles.imageCaption}>
                                                    Image: {step.image}
                                                </p>
                                                <img
                                                    src={step.image}
                                                    alt={step.step}
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
                        )}
                    </div>
                ))}
            </div>

            {/* HOMEWORK SECTION */}
            <div style={styles.homeworkContainer}>
                <h2 style={styles.homeworkTitle}>🧠 HOMEWORK - ADMIN PASSWORD MANAGEMENT</h2>
                <div style={styles.homeworkContent}>
                    
                    <div style={styles.homeworkSection}>
                        <h3 style={styles.homeworkSectionTitle}>Task : Create Admin-Specific Password Management</h3>
                        <ul style={styles.homeworkList}>
                            <li style={styles.homeworkListItem}>Create separate admin password reset functionality</li>
                            <li style={styles.homeworkListItem}>Implement enhanced security for admin password changes</li>
                            <li style={styles.homeworkListItem}>Add admin role verification in all password operations</li>
                            <li style={styles.homeworkListItem}>Create admin-specific email templates for password reset</li>
                        </ul>
                    </div>

                </div>
            </div>

            <div style={styles.footer}>
                <p style={styles.footerP}>
                    Password management system implementation complete!
                </p>
                <p style={styles.footerP}>
                    Users can now reset forgotten passwords and change existing passwords securely.
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

export default NoteForgotChangePassword;