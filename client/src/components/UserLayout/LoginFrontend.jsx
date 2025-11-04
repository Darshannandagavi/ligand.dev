import React, { useState } from 'react';
import './MyNotes.css';

const LoginFrontend = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: "Step 1: Create Login Component",
      content: "Create new file Login.jsx file in components folder",
      explanation: "This file will contain the login form component that allows users to authenticate and access their accounts.",
      image: "/Create Login Component.png"
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
  ];

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>Login Frontend Guide</h1>
        <p>Follow these steps to create a responsive login form with React and Bootstrap</p>
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
            
            {step.points && (
              <div className="points-list">
                {step.points.map((point, i) => (
                  <div key={i} className="point-item">
                    <h5>{point.term}</h5>
                    <p>{point.explanation}</p>
                  </div>
                ))}
              </div>
            )}
            
            {step.states && (
              <div className="states-list">
                <h4>State Variables:</h4>
                {step.states.map((state, i) => (
                  <div key={i} className="state-item">
                    <h5>{state.name}</h5>
                    <p>{state.purpose}</p>
                  </div>
                ))}
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
            
            {step.purpose && (
              <div className="purpose-list">
                <h4>Purpose:</h4>
                {Array.isArray(step.purpose) ? (
                  <ul>
                    {step.purpose.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{step.purpose}</p>
                )}
              </div>
            )}
            
            {step.features && (
              <div className="features-list">
                <h4>Features:</h4>
                <ul>
                  {step.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {step.properties && (
              <div className="properties-list">
                <h4>Properties:</h4>
                <ul>
                  {step.properties.map((property, i) => (
                    <li key={i}>{property}</li>
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
      <style>{`
      .steps-container p{
        box-sizing: border-box;
        text-align: left;
      }
       .steps-container li{
        box-sizing: border-box;
        text-align: left;
      }
      `}</style>
    </div>
  );
};

export default LoginFrontend;