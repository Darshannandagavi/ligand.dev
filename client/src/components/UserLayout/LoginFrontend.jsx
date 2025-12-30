
import React, { useState } from 'react';

const LoginFrontend = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Internal CSS Styles
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
    instructionsList: {
      backgroundColor: "#f8f9fa",
      padding: "20px 25px 20px 45px",
      borderRadius: "10px",
      margin: "20px 0",
      borderLeft: "4px solid #e74c3c",
      textAlign: "left",
    },
    instructionsH4: {
      margin: "0 0 15px 0",
      color: "#2c3e50",
      fontSize: "1.3rem",
      textAlign: "left",
    },
  };

  const steps = [
    {
      title: "Step 1: Create Login Component",
      content: "Create new file Login.jsx file in components folder",
      explanation: "This file will contain the login form component that allows users to authenticate and access their accounts.",
      image: "/CreateLoginComponent.png"
    },
    {
      title: "Complete Login Component Code",
      content: "Below is the complete code for the login component:",
      explanation: "This component handles user authentication with form validation, API communication, and redirects users after successful login.",
      code: `import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";  

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post("https://ligand-software-solutions-workshop-2.onrender.com/api/users/login", formData);
      setMessage({ text: res.data.message, type: "success" });
      // Save user details in localStorage (optional)
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // Navigate to /user after success
      if(res.data.user.role==="admin"){
        navigate("/admin")
      }
      else if(res.data.user.role==="user"){
        navigate("/user")
      }
      setFormData({ email: "", password: "" });
      setValidated(false);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Something went wrong ❌",
        type: "danger"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow">
            <Card.Body>
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Welcome Back</h2>
                <p className="text-muted">Please sign in to your account</p>
              </div>
              {message && (
                <Alert variant={message.type} className="mb-3">
                  {message.text}
                </Alert>
              )}
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your password.
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    <a href="#forgot-password" className="text-decoration-none">Forgot password?</a>
                  </Form.Text>
                </Form.Group>
                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </div>
              </Form>
              <div className="text-center mt-3">
                <p className="text-muted">
                  Don't have an account? <a href="/register" className="text-decoration-none">Sign up</a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;`
    },
    {
      title: "Import Statements Explanation",
      content: "Understanding the import statements in the login component:",
      explanation: "These imports bring in the necessary libraries and components needed for the login form to function properly.",
      points: [
        {
          term: "React + useState",
          explanation: "React is required for JSX. useState hook manages component state."
        },
        {
          term: "axios",
          explanation: "Used for sending login data (email, password) to the backend API."
        },
        {
          term: "react-bootstrap components",
          explanation: "Container, Row, Col, Form, Button, Alert, Card → pre-styled UI elements."
        },
        {
          term: "useNavigate (React Router)",
          explanation: "Special hook to programmatically redirect users to another page after login."
        }
      ],
      image: "/Import Statements Explanations.png"
    },
    {
      title: "Component Declaration",
      content: "The component is defined as a functional component using arrow function syntax.",
      explanation: "This is the modern way to declare React components and provides a clean, concise syntax.",
      image: "/Component Declarations.png"
    },
    {
      title: "State Management with useState",
      content: "The component uses multiple useState hooks to manage different aspects of state.",
      explanation: "Each useState hook manages a specific piece of the component's state, allowing for controlled form inputs and user feedback.",
      states: [
        {
          name: "formData",
          purpose: "Stores the values from input fields (email, password)"
        },
        {
          name: "message",
          purpose: "Holds success or error messages to show to the user"
        },
        {
          name: "validated",
          purpose: "Tracks if the form has been validated"
        },
        {
          name: "isLoading",
          purpose: "Shows loading text on the button while waiting for API response"
        },
        {
          name: "navigate",
          purpose: "Function from useNavigate used to redirect users (e.g., to /user)"
        }
      ],
      image: "/login State Management with useState.png"
    },
    {
      title: "Handle Change Function",
      content: "The handleChange function updates form data as the user types.",
      explanation: "This function runs whenever the user types in an input box, updating the corresponding state value.",
      breakdown: [
        "...formData: Keeps previous data",
        "[e.target.name]: e.target.value: Updates only the field being typed"
      ],
      image: "/login handle change.png"
    },
    {
      title: "Handle Submit Function",
      content: "The handleSubmit function processes the form submission.",
      explanation: "This function handles form validation, API communication, user redirection, and state updates based on the response.",
      code: `const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  if (form.checkValidity() === false) {
    e.stopPropagation();
    setValidated(true);
    return;
  }
  setIsLoading(true);
  try {
    const res = await axios.post("https://ligand-software-solutions-workshop-2.onrender.com/api/users/login", formData);
    setMessage({ text: res.data.message, type: "success" });
    // Save user details in localStorage (optional)
    localStorage.setItem("user", JSON.stringify(res.data.user));
    // Navigate to /user after success
    navigate("/user");
    setFormData({ email: "", password: "" });
    setValidated(false);
  } catch (err) {
    setMessage({
      text: err.response?.data?.message || "Something went wrong ❌",
      type: "danger"
    });
  } finally {
    setIsLoading(false);
  }
};`,
      breakdown: [
        "e.preventDefault(): Prevents page reload",
        "form.checkValidity(): Uses HTML5 validation rules (required, email format, etc.)",
        "setValidated(true): Triggers validation UI",
        "axios.post(...): Sends login request to backend API with email + password",
        "On success: Shows success message, saves user details locally, redirects to /user page, and resets form fields",
        "On error: Shows error message (e.g., 'Invalid credentials')",
        "finally: Turns off loading state regardless of outcome"
      ],
    },
    {
      title: "JSX Structure - Container, Row, and Col",
      content: "The component uses Bootstrap's grid system for layout.",
      explanation: "These components create a responsive layout that works well on different screen sizes.",
      code: `<Container className="mt-5">
  <Row className="justify-content-center">
    <Col md={6} lg={5}>
      {/* Form content */}
    </Col>
  </Row>
</Container>`,
      purpose: [
        "Container: Wraps everything neatly with margin-top",
        "Row + Col: Bootstrap grid → centers form and makes it responsive",
        "Card: Provides a nice box for the login form"
      ],
    },
    {
      title: "Heading and Introduction",
      content: "The form includes a heading and introductory text.",
      explanation: "This provides context to the user about what the form is for and what they need to do.",
      code: `<div className="text-center mb-4">
  <h2 className="fw-bold text-primary">Welcome Back</h2>
  <p className="text-muted">Please sign in to your account</p>
</div>`,
    },
    {
      title: "Alert Component for Messages",
      content: "The component uses Alert to display success or error messages.",
      explanation: "This provides visual feedback to the user about the outcome of their form submission.",
      code: `{message && (
  <Alert variant={message.type} className="mb-3">
    {message.text}
  </Alert>
)}`,
    },
    {
      title: "Form Properties",
      content: "The Form component has several important properties.",
      explanation: "These properties control form validation and submission behavior.",
      code: `<Form noValidate validated={validated} onSubmit={handleSubmit}>`,
      properties: [
        "noValidate: Disables browser default validation",
        "validated: Connects with Bootstrap's validation UI",
        "onSubmit: Calls handleSubmit when user submits form"
      ],
    },
    {
      title: "Email Input Field",
      content: "The form includes an email input field with validation.",
      explanation: "This field captures the user's email address and validates it for proper email format.",
      code: `<Form.Group className="mb-3">
  <Form.Label>Email Address</Form.Label>
  <Form.Control
    type="email"
    name="email"
    placeholder="Enter your email"
    value={formData.email}
    onChange={handleChange}
    required
  />
  <Form.Control.Feedback type="invalid">
    Please provide a valid email.
  </Form.Control.Feedback>
</Form.Group>`,
      features: [
        "type='email': Ensures only valid emails are accepted",
        "value + onChange: Controlled component (value comes from state)",
        "required: Field cannot be empty",
        "Feedback: Error message shown if invalid"
      ],
    },
    {
      title: "Password Input Field",
      content: "The form includes a password input field with validation.",
      explanation: "This field captures the user's password and includes a forgot password link.",
      code: `<Form.Group className="mb-4">
  <Form.Label>Password</Form.Label>
  <Form.Control
    type="password"
    name="password"
    placeholder="Enter your password"
    value={formData.password}
    onChange={handleChange}
    required
  />
  <Form.Control.Feedback type="invalid">
    Please provide your password.
  </Form.Control.Feedback>
  <Form.Text className="text-muted">
    <a href="#forgot-password" className="text-decoration-none">Forgot password?</a>
  </Form.Text>
</Form.Group>`,
      features: [
        "type='password': Hidden characters input",
        "required: Field cannot be empty",
        "Forgot password link: Helps user recover account"
      ],
    },
    {
      title: "Submit Button",
      content: "The form includes a submit button with loading state.",
      explanation: "The button changes text and becomes disabled during form submission to prevent multiple clicks.",
      code: `<div className="d-grid">
  <Button
    variant="primary"
    type="submit"
    size="lg"
    disabled={isLoading}
  >
    {isLoading ? 'Signing In...' : 'Sign In'}
  </Button>
</div>`,
      features: [
        "disabled={isLoading}: Prevents multiple clicks",
        "Conditional text: Shows 'Signing In...' while API request is running"
      ],
    },
    {
      title: "Registration Link",
      content: "The form includes a link to the registration page for new users.",
      explanation: "This provides a convenient way for users who don't have accounts to navigate to the registration page.",
      code: `<div className="text-center mt-3">
  <p className="text-muted">
    Don't have an account? <a href="/register" className="text-decoration-none">Sign up</a>
  </p>
</div>`,
      purpose: "Suggests going to the Register page if user doesn't have an account",
    },
    {
      title: "Final look of Login Component",
      content: "Congratulations! You have successfully created a responsive login form using React and Bootstrap.",
      image: "/login.png"
    },
    {
      title: "If login successful",
      content: "If the login is successful, the user will be redirected to the user page.",
      image: "/user page.png"
    },
    {
      title: "🧠 Home Work",
      content: "Create Admin Login Component",
      explanation: "Now that you've successfully created a user login component, your homework is to create a similar login component specifically for administrators.",
      instructions: [
        "Create a new file called AdminLogin.jsx in the adminLayout folder",
        "Use the same structure as the regular login component",
        "Modify the API endpoint to point to your admin authentication endpoint",
        "After successful login, redirect admin users to '/admin/dashboard'",
        "Add admin-specific styling or branding to differentiate it from the user login",
        "Include proper validation and error handling for admin credentials",
        "Add a secure logout functionality for admin users"
      ],
      features: [
        "Admin-specific authentication endpoint",
        "Redirect to admin dashboard on success",
        "Admin role validation",
        "Enhanced security features",
        "Professional admin interface design"
      ]
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerH1}>Login Frontend Guide</h1>
        <p style={styles.headerP}>Follow these steps to create a responsive login form with React and Bootstrap</p>
      </div>



      <div style={styles.sectionsContainer}>
        {steps.map((step, index) => (
          <div key={index} style={styles.sectionCard}>
            <h2 style={styles.sectionH2}>{step.title}</h2>
            <p style={styles.textP}>{step.content}</p>

            {step.explanation && (
              <div style={styles.listBlock}>
                <h4 style={styles.listH4}>Explanation:</h4>
                <p style={styles.textP}>{step.explanation}</p>
              </div>
            )}

            {step.points && (
              <div style={styles.listBlock}>
                <h4 style={styles.listH4}>Import Details:</h4>
                <ul style={styles.listUl}>
                  {step.points.map((point, i) => (
                    <li key={i} style={styles.listLi}>
                      <strong>{point.term}:</strong> {point.explanation}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {step.states && (
              <div style={styles.listBlock}>
                <h4 style={styles.listH4}>State Variables:</h4>
                <ul style={styles.listUl}>
                  {step.states.map((state, i) => (
                    <li key={i} style={styles.listLi}>
                      <strong>{state.name}:</strong> {state.purpose}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {step.breakdown && (
              <div style={styles.listBlock}>
                <h4 style={styles.listH4}>Breakdown:</h4>
                <ul style={styles.listUl}>
                  {step.breakdown.map((item, i) => (
                    <li key={i} style={styles.listLi}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {step.purpose && (
              <div style={styles.listBlock}>
                <h4 style={styles.listH4}>Purpose:</h4>
                {Array.isArray(step.purpose) ? (
                  <ul style={styles.listUl}>
                    {step.purpose.map((item, i) => (
                      <li key={i} style={styles.listLi}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={styles.textP}>{step.purpose}</p>
                )}
              </div>
            )}

            {step.features && (
              <div style={styles.listBlock}>
                <h4 style={styles.listH4}>Features:</h4>
                <ul style={styles.listUl}>
                  {step.features.map((feature, i) => (
                    <li key={i} style={styles.listLi}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {step.properties && (
              <div style={styles.listBlock}>
                <h4 style={styles.listH4}>Properties:</h4>
                <ul style={styles.listUl}>
                  {step.properties.map((property, i) => (
                    <li key={i} style={styles.listLi}>{property}</li>
                  ))}
                </ul>
              </div>
            )}

            {step.instructions && (
              <div style={styles.instructionsList}>
                <h4 style={styles.instructionsH4}>Instructions:</h4>
                <ul style={styles.listUl}>
                  {step.instructions.map((instruction, i) => (
                    <li key={i} style={styles.listLi}>{instruction}</li>
                  ))}
                </ul>
              </div>
            )}

            {step.code && (
              <div style={styles.codeBlock}>
                <pre style={styles.pre}>{step.code}</pre>
                <button
                  style={{
                    ...styles.copyBtn,
                    ...(copiedIndex === index ? styles.copiedBtn : {}),
                  }}
                  onClick={() => copyToClipboard(step.code, index)}
                >
                  {copiedIndex === index ? 'Copied!' : 'Copy'}
                </button>
              </div>
            )}

            {step.image && (
              <div style={styles.imageContainer}>
                <p style={styles.imageCaption}>
                  Image: {step.image}
                </p>
                <img
                  src={step.image}
                  alt={step.title}
                  style={styles.image}
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=";
                  }}
                />
              </div>
            )}
          </div>
        ))}
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
            <source src="/loginFrontend.mp4" type="video/mp4" />
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

        
      </div>

      </div>
      <div style={styles.companyInfo}>
        <h2 style={styles.companyH2}>LIGAND SOFTWARE SOLUTIONS</h2>
        <p style={styles.companyP}>Your Launchpad To Tech Success</p>
        <p style={styles.companyP}>Happy Coding!!!!!</p>
        <p style={styles.companyP}>Sankeshwar</p>
        <p style={styles.companyP}>8722585715</p>
        <p style={styles.companyP}>www.ligandsoftware.com</p>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerP}>Join us for Programming, Coding, Project Training and Internship opportunities.</p>
        <p style={styles.footerP}>Let's learn, code and build together.</p>
      </div>
    </div>
  );
};

export default LoginFrontend;