// import React, { useState } from 'react';
// import './MyNotes.css';

// const RegistrationFrontend = () => {
//   const [copiedIndex, setCopiedIndex] = useState(null);

//   const copyToClipboard = (text, index) => {
//     navigator.clipboard.writeText(text);
//     setCopiedIndex(index);
//     setTimeout(() => setCopiedIndex(null), 2000);
//   };

//   const steps = [
//     {
//       title: "Bootstrap Grid System Overview",
//       content: "Before starting, we will see some grid properties and understand how these work. We are using normal Bootstrap.",
//       explanation: "The grid system in Bootstrap is based on a 12-column layout, which allows you to divide your page into columns and rows in a flexible and responsive manner.",
//       keyPoints: [
//         "container: Wraps your grid and provides a responsive fixed width container",
//         "row: Creates horizontal groups of columns",
//         "col: Specifies equal portion of available horizontal space",
//         "col-md-*: Specifies column width at medium breakpoints and larger",
//         "col-*: Creates asymmetric layouts with different column portions"
//       ]
//     },
//     {
//       title: "Container Class",
//       content: "The container class is used to wrap your grid and provides a responsive fixed width container.",
//       explanation: "It controls the maximum width of your content based on the screen size. Containers are typically used to hold the grid system and ensure that content is spaced properly.",
//       usage: '<div className="container mt-5 border border-5 rounded mb-5">',
//       effects: [
//         "Sets a responsive container width (fixed based on screen size)",
//         "Provides margins to control spacing above and below the container",
//         "Ensures proper content spacing"
//       ]
//     },
//     {
//       title: "Row Class",
//       content: "The row class is used to create horizontal groups of columns.",
//       explanation: "This class is essential to align columns properly within a grid system. It acts as a wrapper for col or col-md-* classes.",
//       usage: '<div className="row mb-3">',
//       effects: [
//         "Acts as a wrapper for column classes",
//         "Ensures that columns inside it are displayed in a row",
//         "Distributes columns evenly based on their column size"
//       ]
//     },
//     {
//       title: "Column Classes",
//       content: "Column classes define how space is distributed in a row.",
//       explanation: "Bootstrap provides various column classes to create responsive layouts that work across different screen sizes.",
//       types: [
//         {
//           name: "col",
//           usage: '<div className="col">',
//           effect: "Takes up equal portion of available horizontal space without specific sizing"
//         },
//         {
//           name: "col-md-*",
//           usage: '<div className="col col-md-9">',
//           effect: "On medium (and larger) screens, takes up specified portion (9/12); on smaller screens spans full width"
//         },
//         {
//           name: "Breakpoints",
//           usage: "col-sm-, col-md-, col-lg-, col-xl-",
//           effect: "Different classes for different screen sizes (small, medium, large, extra-large)"
//         }
//       ]
//     },
//     {
//       title: "Step 1: Create Components Folder",
//       content: "Create one folder named components in src folder of client application.",
//       explanation: "Organizing your React components into a dedicated folder helps maintain a clean project structure and makes it easier to manage your codebase.",
//       image: "/createfloderinsrc.png"
//     },
//     {
//       title: "Step 2: Create Register.jsx File",
//       content: "Create one file 'Register.jsx' in the components folder.",
//       explanation: "This file will contain the registration form component that allows users to create new accounts in your application.",
//       image: "/createRegister.png"
//     },
//     {
//       title: "Complete Registration Component Code",
//       content: "Below is the complete code for the registration component:",
//       explanation: "This component handles user registration with form validation, API communication, and responsive UI using React Bootstrap.",
//       code: `import React, { useState } from "react";
// import axios from "axios";
// import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     contact: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");
//   const [validated, setValidated] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.currentTarget;

//     if (form.checkValidity() === false) {
//       e.stopPropagation();
//       setValidated(true);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const res = await axios.post("https://ligand-software-solutions-workshop-2.onrender.com/api/users/register", formData);
//       setMessage({ text: res.data.message, type: "success" });
//       setFormData({ name: "", email: "", contact: "", password: "" });
//       setValidated(false);
//     } catch (err) {
//       setMessage({
//         text: err.response?.data?.message || "Something went wrong ",
//         type: "danger"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={6} lg={5}>
//           <Card className="shadow">
//             <Card.Body>
//               <div className="text-center mb-4">
//                 <h2 className="fw-bold text-primary">Create Account</h2>
//                 <p className="text-muted">Please fill in your details to register</p>
//               </div>

//               {message && (
//                 <Alert variant={message.type} className="mb-3">
//                   {message.text}
//                 </Alert>
//               )}

//               <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Full Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     placeholder="Enter your name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     Please provide your name.
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Email Address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     Please provide a valid email.
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Contact Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="contact"
//                     placeholder="Enter your contact number"
//                     value={formData.contact}
//                     onChange={handleChange}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     Please provide your contact number.
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     placeholder="Create a password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     minLength={6}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     Password must be at least 6 characters.
//                   </Form.Control.Feedback>
//                   <Form.Text className="text-muted">
//                     Must be at least 6 characters long.
//                   </Form.Text>
//                 </Form.Group>

//                 <div className="d-grid">
//                   <Button
//                     variant="primary"
//                     type="submit"
//                     size="lg"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? 'Creating Account...' : 'Register'}
//                   </Button>
//                 </div>
//               </Form>

//               <div className="text-center mt-3">
//                 <p className="text-muted">
//                   Already have an account? <a href="/login" className="text-decoration-none">Sign in</a>
//                 </p>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <style>{\`
//         body {
//           background-color: #f8f9fa;
//         }
//         .card {
//           border: none;
//           border-radius: 12px;
//         }
//         .form-control {
//           border-radius: 8px;
//           padding: 12px 16px;
//         }
//         .form-control:focus {
//           box-shadow: 0 0 0 3px rgba(13,110,253,.25);
//           border-color: #86b7fe;
//         }
//         .btn {
//           border-radius: 8px;
//           padding: 12px;
//           font-weight: 600;
//         }
//         .form-label {
//           font-weight: 500;
//           margin-bottom: 8px;
//         }
//       \`}</style>
//     </Container>
//   );
// };

// export default Register;`
//     },
//     {
//       title: "Import Statements Explanation",
//       content: "Understanding the import statements in the registration component:",
//       explanation: "These imports bring in the necessary libraries and components needed for the registration form to function properly.",
//       points: [
//         {
//           term: "import React",
//           explanation: "Needed for JSX to work and for creating React components."
//         },
//         {
//           term: "useState from React",
//           explanation: "A hook to create and manage state inside functional components."
//         },
//         {
//           term: "axios",
//           explanation: "A library used to make HTTP requests (like GET/POST) to your backend API."
//         },
//         {
//           term: "react-bootstrap components",
//           explanation: "Pre-styled UI components from Bootstrap, used to make the UI look good without writing much CSS."
//         }
//       ],
//       image: "/Import Statements Explanation.png"
//     },
//     {
//       title: "Component Declaration",
//       content: "The component is defined as a functional component using arrow function syntax.",
//       explanation: "This is the modern way to declare React components and provides a clean, concise syntax.",
//       image: "/Component Declaration.png"
//     },
//     {
//       title: "State Management with useState",
//       content: "The component uses multiple useState hooks to manage different aspects of state.",
//       explanation: "Each useState hook manages a specific piece of the component's state, allowing for controlled form inputs and user feedback.",
//       states: [
//         {
//           name: "formData",
//           purpose: "Stores user input (name, email, contact, password) with all fields initially empty"
//         },
//         {
//           name: "message",
//           purpose: "Used to show success or error messages to the user"
//         },
//         {
//           name: "validated",
//           purpose: "Tracks whether the form has been checked for validity"
//         },
//         {
//           name: "isLoading",
//           purpose: "Used to show a loading state while the request is being processed"
//         }
//       ],
//       image: "/State Management with useState.png"
//     },
//     {
//       title: "Handle Change Function",
//       content: "The handleChange function updates form data as the user types.",
//       explanation: "This function runs every time the user types in a form field, updating the corresponding state value.",
//       breakdown: [
//         "e.target.name: Gets the input field's name (like 'email')",
//         "e.target.value: Gets the current value of the field",
//         "...formData: Keeps the existing form data intact",
//         "[e.target.name]: e.target.value: Updates only the field that the user changed"
//       ],
//       image: "/Handle Change Function.png"
//     },
//     {
//       title: "Handle Submit Function",
//       content: "The handleSubmit function processes the form submission.",
//       explanation: "This function handles form validation, API communication, and state updates based on the response.",

//       breakdown: [
//         "e.preventDefault(): Stops the page from refreshing when the form is submitted",
//         "form.checkValidity(): Checks if all required fields are filled correctly",
//         "setValidated(true): Shows validation feedback if the form is invalid",
//         "setIsLoading(true): Shows loading state while the request is being sent",
//         "axios.post(): Sends form data to the backend API (/register)",
//         "Success case: Shows success message and clears form fields",
//         "Error case: Shows an error message from server or default error",
//         "finally: Turns off the loading state regardless of outcome"
//       ],
//       image: "/Handle Submit Function.png"
//     },
//     {
//       title: "JSX Structure - Container, Row, and Col",
//       content: "The component uses Bootstrap's grid system for layout.",
//       explanation: "These components create a responsive layout that works well on different screen sizes.",
//       purpose: [
//         "Container: Centers and adds spacing around the form",
//         "Row and Col: Bootstrap grid system, makes the form responsive",
//         "Card: Provides a nice box with shadow for the form content"
//       ],
//       image: "/JSX Structure - Container, Row, and Col.png"
//     },
//     {
//       title: "Heading and Introduction",
//       content: "The form includes a heading and introductory text.",
//       explanation: "This provides context to the user about what the form is for and what they need to do.",

//       image: "/Heading and Introduction.png"
//     },
//     {
//       title: "Alert Component for Messages",
//       content: "The component uses Alert to display success or error messages.",
//       explanation: "This provides visual feedback to the user about the outcome of their form submission.",
//       image: "/Alert Component for Messages.png"
//     },
//     {
//       title: "Form Properties",
//       content: "The Form component has several important properties.",
//       explanation: "These properties control form validation and submission behavior.",
//       code: `<Form noValidate validated={validated} onSubmit={handleSubmit}>`,
//       properties: [
//         "noValidate: Disables browser's default validation (we handle validation with React instead)",
//         "validated={validated}: Controls Bootstrap's validation styles",
//         "onSubmit={handleSubmit}: Calls our function when the form is submitted"
//       ],
//       image: "/Form Properties.png"
//     },
//     {
//       title: "Form Input Fields",
//       content: "The form includes several input fields with validation.",
//       explanation: "Each field is implemented as a Form.Group containing a label, input, and validation feedback.",
//       fields: [
//         "Name: Text input for user's full name",
//         "Email: Email input with validation for proper email format",
//         "Contact: Text input for contact number",
//         "Password: Password input with minimum length requirement"
//       ],
//       image: "/Form Input Fields.png"
//     },
//     {
//       title: "Submit Button",
//       content: "The form includes a submit button with loading state.",
//       explanation: "The button changes text and becomes disabled during form submission to prevent multiple clicks.",

//       image: "/Submit Button.png"
//     },
//     {
//       title: "Login Link",
//       content: "The form includes a link to the login page for existing users.",
//       explanation: "This provides a convenient way for users who already have accounts to navigate to the login page.",

//       image: "/Login Link.png"
//     },
//     {
//       title: "Custom CSS Styles",
//       content: "The component includes custom CSS for enhanced styling.",
//       explanation: "These styles enhance the default Bootstrap styles to create a more polished and modern look.",

//       image: "/Custom CSS Styles.png"
//     },
//     {
//       title: "Final look of Registration Form",
//       content: "The final look of the registration form after applying all styles.",
//       explanation: "This shows how the form will appear to users once all styles and components are in place.",
//       image: "/Final look of Registration Form.png"
//     }
//   ];

//   return (
//     <div className="notes-container">
//       <div className="notes-header">
//         <h1>Registration Frontend Guide</h1>
//         <p>Follow these steps to create a responsive registration form with React and Bootstrap</p>
//       </div>

//       <div className="company-info">
//         <h2>LIGAND SOFTWARE SOLUTIONS</h2>
//         <p>Your Launchpad To Tech Success</p>
//         <p>Happy Coding!!!!!</p>
//         <p>Sankeshwar</p>
//         <p>8722585715</p>
//         <p>www.ligandsoftware.com</p>
//       </div>

//       <div className="steps-container">
//         {steps.map((step, index) => (
//           <div key={index} className="step-card">
//             <h3>{step.title}</h3>
//             <p>{step.content}</p>

//             {step.explanation && (
//               <div className="explanation-box">
//                 <h4>Explanation:</h4>
//                 <p>{step.explanation}</p>
//               </div>
//             )}

//             {step.keyPoints && (
//               <div className="key-points">
//                 <h4>Key Points:</h4>
//                 <ul>
//                   {step.keyPoints.map((point, i) => (
//                     <li key={i}>{point}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {step.effects && (
//               <div className="effects">
//                 <h4>Effects:</h4>
//                 <ul>
//                   {step.effects.map((effect, i) => (
//                     <li key={i}>{effect}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {step.types && (
//               <div className="types-list">
//                 <h4>Types:</h4>
//                 {step.types.map((type, i) => (
//                   <div key={i} className="type-item">
//                     <h5>{type.name}</h5>
//                     <p><strong>Usage:</strong> <code>{type.usage}</code></p>
//                     <p><strong>Effect:</strong> {type.effect}</p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {step.usage && (
//               <div className="usage-box">
//                 <h4>Usage:</h4>
//                 <code>{step.usage}</code>
//               </div>
//             )}

//             {step.points && (
//               <div className="points-list">
//                 {step.points.map((point, i) => (
//                   <div key={i} className="point-item">
//                     <h5>{point.term}</h5>
//                     <p>{point.explanation}</p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {step.states && (
//               <div className="states-list">
//                 <h4>State Variables:</h4>
//                 {step.states.map((state, i) => (
//                   <div key={i} className="state-item">
//                     <h5>{state.name}</h5>
//                     <p>{state.purpose}</p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {step.breakdown && (
//               <div className="breakdown-list">
//                 <h4>Breakdown:</h4>
//                 <ul>
//                   {step.breakdown.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {step.purpose && (
//               <div className="purpose-list">
//                 <h4>Purpose:</h4>
//                 <ul>
//                   {step.purpose.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {step.fields && (
//               <div className="fields-list">
//                 <h4>Form Fields:</h4>
//                 <ul>
//                   {step.fields.map((field, i) => (
//                     <li key={i}>{field}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {step.properties && (
//               <div className="properties-list">
//                 <h4>Properties:</h4>
//                 <ul>
//                   {step.properties.map((property, i) => (
//                     <li key={i}>{property}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {step.command && (
//               <div className="code-block">
//                 <code>{step.command}</code>
//                 <button
//                   className={`copy-btn ${copiedIndex === index ? 'copied' : ''}`}
//                   onClick={() => copyToClipboard(step.command, index)}
//                 >
//                   {copiedIndex === index ? 'Copied!' : 'Copy'}
//                 </button>
//               </div>
//             )}

//             {step.code && (
//               <div className="code-block">
//                 <pre>{step.code}</pre>
//                 <button
//                   className={`copy-btn ${copiedIndex === index ? 'copied' : ''}`}
//                   onClick={() => copyToClipboard(step.code, index)}
//                 >
//                   {copiedIndex === index ? 'Copied!' : 'Copy'}
//                 </button>
//               </div>
//             )}

//             {step.image && (
//               <div className="image-placeholder">
//                 <div className="image-container">
//                   <img src={step.image} alt={step.title} className="step-image" />
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="notes-footer">
//         <p>Join us for Programming, Coding, Project Training and Internship opportunities.</p>
//         <p>Let's learn, code and build together.</p>
//       </div>
//       <style>{`
//       .steps-container p{
//         box-sizing: border-box;
//         text-align: left;
//       }
//        .steps-container li{
//         box-sizing: border-box;
//         text-align: left;
//       }
//       `}</style>
//     </div>
//   );
// };

// export default RegistrationFrontend;

import React, { useState } from "react";
import "./MyNotes.css";

const RegistrationFrontend = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: "Bootstrap Grid System Overview",
      content:
        "Before starting, we will see some grid properties and understand how these work. We are using normal Bootstrap.",
      explanation:
        "The grid system in Bootstrap is based on a 12-column layout, which allows you to divide your page into columns and rows in a flexible and responsive manner.",
      keyPoints: [
        "container: Wraps your grid and provides a responsive fixed width container",
        "row: Creates horizontal groups of columns",
        "col: Specifies equal portion of available horizontal space",
        "col-md-*: Specifies column width at medium breakpoints and larger",
        "col-*: Creates asymmetric layouts with different column portions",
      ],
    },
    {
      title: "Container Class",
      content:
        "The container class is used to wrap your grid and provides a responsive fixed width container.",
      explanation:
        "It controls the maximum width of your content based on the screen size. Containers are typically used to hold the grid system and ensure that content is spaced properly.",
      usage: '<div className="container mt-5 border border-5 rounded mb-5">',
      effects: [
        "Sets a responsive container width (fixed based on screen size)",
        "Provides margins to control spacing above and below the container",
        "Ensures proper content spacing",
      ],
    },
    {
      title: "Row Class",
      content: "The row class is used to create horizontal groups of columns.",
      explanation:
        "This class is essential to align columns properly within a grid system. It acts as a wrapper for col or col-md-* classes.",
      usage: '<div className="row mb-3">',
      effects: [
        "Acts as a wrapper for column classes",
        "Ensures that columns inside it are displayed in a row",
        "Distributes columns evenly based on their column size",
      ],
    },
    {
      title: "Column Classes",
      content: "Column classes define how space is distributed in a row.",
      explanation:
        "Bootstrap provides various column classes to create responsive layouts that work across different screen sizes.",
      types: [
        {
          name: "col",
          usage: '<div className="col">',
          effect:
            "Takes up equal portion of available horizontal space without specific sizing",
        },
        {
          name: "col-md-*",
          usage: '<div className="col col-md-9">',
          effect:
            "On medium (and larger) screens, takes up specified portion (9/12); on smaller screens spans full width",
        },
        {
          name: "Breakpoints",
          usage: "col-sm-, col-md-, col-lg-, col-xl-",
          effect:
            "Different classes for different screen sizes (small, medium, large, extra-large)",
        },
      ],
    },
    {
      title: "Step 1: Create Components Folder",
      content:
        "Create one folder named components in src folder of client application.",
      explanation:
        "Organizing your React components into a dedicated folder helps maintain a clean project structure and makes it easier to manage your codebase.",
      image: "/createfloderinsrc.png",
    },
    {
      title: "Step 2: Create Register.jsx File",
      content: "Create one file 'Register.jsx' in the components folder.",
      explanation:
        "This file will contain the registration form component that allows users to create new accounts in your application.",
      image: "/createRegister.png",
    },
    {
      title: "Complete Registration Component Code",
      content: "Below is the complete code for the registration component:",
      explanation:
        "This component handles user registration with form validation, API communication, and responsive UI using React Bootstrap.",
      code: `import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      const res = await axios.post("https://ligand-software-solutions-workshop-2.onrender.com/api/users/register", formData);
      setMessage({ text: res.data.message, type: "success" });
      setFormData({ name: "", email: "", contact: "", password: "" });
      setValidated(false);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Something went wrong ",
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
                <h2 className="fw-bold text-primary">Create Account</h2>
                <p className="text-muted">Please fill in your details to register</p>
              </div>
              
              {message && (
                <Alert variant={message.type} className="mb-3">
                  {message.text}
                </Alert>
              )}
              
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your name.
                  </Form.Control.Feedback>
                </Form.Group>
                
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
                
                <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact"
                    placeholder="Enter your contact number"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your contact number.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                  <Form.Control.Feedback type="invalid">
                    Password must be at least 6 characters.
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Must be at least 6 characters long.
                  </Form.Text>
                </Form.Group>
                
                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Register'}
                  </Button>
                </div>
              </Form>
              
              <div className="text-center mt-3">
                <p className="text-muted">
                  Already have an account? <a href="/login" className="text-decoration-none">Sign in</a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <style>{\`
        body {
          background-color: #f8f9fa;
        }
        .card {
          border: none;
          border-radius: 12px;
        }
        .form-control {
          border-radius: 8px;
          padding: 12px 16px;
        }
        .form-control:focus {
          box-shadow: 0 0 0 3px rgba(13,110,253,.25);
          border-color: #86b7fe;
        }
        .btn {
          border-radius: 8px;
          padding: 12px;
          font-weight: 600;
        }
        .form-label {
          font-weight: 500;
          margin-bottom: 8px;
        }
      \`}</style>
    </Container>
  );
};

export default Register;`,
    },
    {
      title: "Import Statements Explanation",
      content:
        "Understanding the import statements in the registration component:",
      explanation:
        "These imports bring in the necessary libraries and components needed for the registration form to function properly.",
      points: [
        {
          term: "import React",
          explanation:
            "Needed for JSX to work and for creating React components.",
        },
        {
          term: "useState from React",
          explanation:
            "A hook to create and manage state inside functional components.",
        },
        {
          term: "axios",
          explanation:
            "A library used to make HTTP requests (like GET/POST) to your backend API.",
        },
        {
          term: "react-bootstrap components",
          explanation:
            "Pre-styled UI components from Bootstrap, used to make the UI look good without writing much CSS.",
        },
      ],
      image: "/Import Statements Explanation.png",
    },
    {
      title: "Component Declaration",
      content:
        "The component is defined as a functional component using arrow function syntax.",
      explanation:
        "This is the modern way to declare React components and provides a clean, concise syntax.",
      image: "/Component Declaration.png",
    },
    {
      title: "State Management with useState",
      content:
        "The component uses multiple useState hooks to manage different aspects of state.",
      explanation:
        "Each useState hook manages a specific piece of the component's state, allowing for controlled form inputs and user feedback.",
      states: [
        {
          name: "formData",
          purpose:
            "Stores user input (name, email, contact, password) with all fields initially empty",
        },
        {
          name: "message",
          purpose: "Used to show success or error messages to the user",
        },
        {
          name: "validated",
          purpose: "Tracks whether the form has been checked for validity",
        },
        {
          name: "isLoading",
          purpose:
            "Used to show a loading state while the request is being processed",
        },
      ],
      image: "/State Management with useState.png",
    },
    {
      title: "Handle Change Function",
      content: "The handleChange function updates form data as the user types.",
      explanation:
        "This function runs every time the user types in a form field, updating the corresponding state value.",
      breakdown: [
        "e.target.name: Gets the input field's name (like 'email')",
        "e.target.value: Gets the current value of the field",
        "...formData: Keeps the existing form data intact",
        "[e.target.name]: e.target.value: Updates only the field that the user changed",
      ],
      image: "/Handle Change Function.png",
    },
    {
      title: "Handle Submit Function",
      content: "The handleSubmit function processes the form submission.",
      explanation:
        "This function handles form validation, API communication, and state updates based on the response.",

      breakdown: [
        "e.preventDefault(): Stops the page from refreshing when the form is submitted",
        "form.checkValidity(): Checks if all required fields are filled correctly",
        "setValidated(true): Shows validation feedback if the form is invalid",
        "setIsLoading(true): Shows loading state while the request is being sent",
        "axios.post(): Sends form data to the backend API (/register)",
        "Success case: Shows success message and clears form fields",
        "Error case: Shows an error message from server or default error",
        "finally: Turns off the loading state regardless of outcome",
      ],
      image: "/Handle Submit Function.png",
    },
    {
      title: "JSX Structure - Container, Row, and Col",
      content: "The component uses Bootstrap's grid system for layout.",
      explanation:
        "These components create a responsive layout that works well on different screen sizes.",
      purpose: [
        "Container: Centers and adds spacing around the form",
        "Row and Col: Bootstrap grid system, makes the form responsive",
        "Card: Provides a nice box with shadow for the form content",
      ],
      image: "/JSX Structure - Container, Row, and Col.png",
    },
    {
      title: "Heading and Introduction",
      content: "The form includes a heading and introductory text.",
      explanation:
        "This provides context to the user about what the form is for and what they need to do.",

      image: "/Heading and Introduction.png",
    },
    {
      title: "Alert Component for Messages",
      content: "The component uses Alert to display success or error messages.",
      explanation:
        "This provides visual feedback to the user about the outcome of their form submission.",
      image: "/Alert Component for Messages.png",
    },
    {
      title: "Form Properties",
      content: "The Form component has several important properties.",
      explanation:
        "These properties control form validation and submission behavior.",
      code: `<Form noValidate validated={validated} onSubmit={handleSubmit}>`,
      properties: [
        "noValidate: Disables browser's default validation (we handle validation with React instead)",
        "validated={validated}: Controls Bootstrap's validation styles",
        "onSubmit={handleSubmit}: Calls our function when the form is submitted",
      ],
      image: "/Form Properties.png",
    },
    {
      title: "Form Input Fields",
      content: "The form includes several input fields with validation.",
      explanation:
        "Each field is implemented as a Form.Group containing a label, input, and validation feedback.",
      fields: [
        "Name: Text input for user's full name",
        "Email: Email input with validation for proper email format",
        "Contact: Text input for contact number",
        "Password: Password input with minimum length requirement",
      ],
      image: "/Form Input Fields.png",
    },
    {
      title: "Submit Button",
      content: "The form includes a submit button with loading state.",
      explanation:
        "The button changes text and becomes disabled during form submission to prevent multiple clicks.",

      image: "/Submit Button.png",
    },
    {
      title: "Login Link",
      content: "The form includes a link to the login page for existing users.",
      explanation:
        "This provides a convenient way for users who already have accounts to navigate to the login page.",

      image: "/Login Link.png",
    },
    {
      title: "Custom CSS Styles",
      content: "The component includes custom CSS for enhanced styling.",
      explanation:
        "These styles enhance the default Bootstrap styles to create a more polished and modern look.",

      image: "/Custom CSS Styles.png",
    },
    {
      title: "Final look of Registration Form",
      content:
        "The final look of the registration form after applying all styles.",
      explanation:
        "This shows how the form will appear to users once all styles and components are in place.",
      image: "/Final look of Registration Form.png",
    },
  ];

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>Registration Frontend Guide</h1>
        <p>
          Follow these steps to create a responsive registration form with React
          and Bootstrap
        </p>
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

            {step.keyPoints && (
              <div className="key-points">
                <h4>Key Points:</h4>
                <ul>
                  {step.keyPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {step.effects && (
              <div className="effects">
                <h4>Effects:</h4>
                <ul>
                  {step.effects.map((effect, i) => (
                    <li key={i}>{effect}</li>
                  ))}
                </ul>
              </div>
            )}

            {step.types && (
              <div className="types-list">
                <h4>Types:</h4>
                {step.types.map((type, i) => (
                  <div key={i} className="type-item">
                    <h5>{type.name}</h5>
                    <p>
                      <strong>Usage:</strong> <code>{type.usage}</code>
                    </p>
                    <p>
                      <strong>Effect:</strong> {type.effect}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {step.usage && (
              <div className="usage-box">
                <h4>Usage:</h4>
                <code>{step.usage}</code>
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
                <ul>
                  {step.purpose.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {step.fields && (
              <div className="fields-list">
                <h4>Form Fields:</h4>
                <ul>
                  {step.fields.map((field, i) => (
                    <li key={i}>{field}</li>
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
                  className={`copy-btn ${
                    copiedIndex === index ? "copied" : ""
                  }`}
                  onClick={() => copyToClipboard(step.command, index)}
                >
                  {copiedIndex === index ? "Copied!" : "Copy"}
                </button>
              </div>
            )}

            {step.code && (
              <div className="code-block">
                <pre>{step.code}</pre>
                <button
                  className={`copy-btn ${
                    copiedIndex === index ? "copied" : ""
                  }`}
                  onClick={() => copyToClipboard(step.code, index)}
                >
                  {copiedIndex === index ? "Copied!" : "Copy"}
                </button>
              </div>
            )}

            {step.image && (
              <div className="image-placeholder">
                <div className="image-container">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="step-image"
                  />
                </div>
              </div>
            )}
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
            <h3>Develop a Login Page</h3>

            <div className="objective-section">
              <h4>Objective</h4>
              <p>
                Create a professional login page that follows the same patterns
                and structure as the registration page we just built. The login
                page .
              </p>
            </div>

            <div className="requirements-section">
              <h4>Requirements</h4>
              <ul>
                <li>Create Login.jsx component in the components folder</li>
                <li>Include email and password fields with validation</li>
                <li>Implement form submission with API integration</li>
                <li>Add loading states and error handling</li>
                <li>Add "Forgot Password" link</li>
                <li>Include link to registration page for new users</li>
                <li>Make the design responsive and user-friendly</li>
              </ul>
            </div>

            <div className="reference-section">
              <h4>Expected output</h4>

              <div className="reference-grid">
                <div className="reference-item">
                  <div className="image-container">
                    <img
                      src="/homeWork/home_login_page.png"
                      alt="Login Page Example 1"
                    />
                  </div>
                  <p>Modern Login Form Design</p>
                </div>
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
                    <source src="/LoginFrontend.mp4" type="video/mp4" />
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
                >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="company-info">
        <h2>LIGAND SOFTWARE SOLUTIONS</h2>
        <p>Your Launchpad To Tech Success</p>
        <p>Happy Coding!!!!!</p>
        <p>Sankeshwar</p>
        <p>8722585715</p>
        <p>www.ligandsoftware.com</p>
      </div>

      <div className="notes-footer">
        <p>
          Join us for Programming, Coding, Project Training and Internship
          opportunities.
        </p>
        <p>Let's learn, code and build together.</p>
      </div>

      <style jsx>{`
        .notes-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
          color: #2d3748;
          background: white;
        }

        .notes-header {
          text-align: center;
          margin-bottom: 50px;
          padding: 50px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .notes-header h1 {
          font-size: 3rem;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 16px 0;
        }

        .notes-header p {
          font-size: 1.3rem;
          color: #718096;
          margin: 0;
          font-weight: 400;
        }

        .steps-container {
          margin-bottom: 50px;
        }

        .step-card {
          margin-bottom: 40px;
          padding: 30px;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .step-card h3 {
          font-size: 1.8rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0 0 16px 0;
          padding-bottom: 12px;
          border-bottom: 2px solid #667eea;
        }

        .step-card p {
          color: #4a5568;
          margin-bottom: 16px;
          line-height: 1.7;
          font-size: 1.1rem;
        }

        .step-card h4 {
          font-size: 1.3rem;
          font-weight: 600;
          color: #2d3748;
          margin: 20px 0 12px 0;
        }

        .step-card h5 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #4a5568;
          margin: 16px 0 8px 0;
        }

        .step-card ul {
          color: #4a5568;
          margin-bottom: 20px;
          padding-left: 20px;
        }

        .step-card li {
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .explanation-box,
        .key-points,
        .effects,
        .types-list,
        .usage-box,
        .points-list,
        .states-list,
        .breakdown-list,
        .purpose-list,
        .fields-list,
        .properties-list {
          background: white;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          margin: 16px 0;
        }

        .type-item,
        .point-item,
        .state-item {
          background: #f8fafc;
          padding: 16px;
          border-radius: 6px;
          margin: 12px 0;
          border: 1px solid #e2e8f0;
        }

        .code-block {
          position: relative;
          background: #1a202c;
          border-radius: 8px;
          margin: 20px 0;
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

        .code-block code {
          color: #e2e8f0;
          padding: 20px;
          display: block;
          overflow-x: auto;
          font-family: "Fira Code", "Consolas", monospace;
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

        .image-placeholder {
          margin: 20px 0;
          background: #e2e8f0;
          border-radius: 8px;
          padding: 30px;
          text-align: center;
          border: 2px dashed #cbd5e0;
        }

        .image-container {
          background: white;
          border-radius: 6px;
          padding: 20px;
          display: inline-block;
        }

        .step-image {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        /* Homework Section Styles */
        .home-work-section {
          margin: 60px 0;
        }

        .home-work-card {
          background: white;
          border-radius: 12px;
          padding: 40px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .home-work-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #667eea;
        }

        .home-work-header h2 {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          color: #2d3748;
        }

        .difficulty-badge {
          background: #667eea;
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .home-work-content h3 {
          font-size: 1.6rem;
          margin: 0 0 25px 0;
          font-weight: 600;
          color: #2d3748;
        }

        .objective-section,
        .requirements-section,
        .reference-section,
        .example-section,
        .submission-section,
        .bonus-section {
          margin-bottom: 30px;
        }

        .objective-section h4,
        .requirements-section h4,
        .reference-section h4,
        .example-section h4,
        .submission-section h4,
        .bonus-section h4 {
          font-size: 1.3rem;
          margin: 0 0 15px 0;
          font-weight: 600;
          color: #2d3748;
          border-left: 4px solid #667eea;
          padding-left: 12px;
        }

        .objective-section p,
        .example-section p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #4a5568;
          margin: 0;
        }

        .requirements-section ul,
        .submission-section ul,
        .bonus-section ul {
          margin: 0;
          padding-left: 20px;
        }

        .requirements-section li,
        .submission-section li,
        .bonus-section li {
          margin-bottom: 10px;
          color: #4a5568;
          line-height: 1.5;
        }

        .reference-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          margin: 20px 0;
        }

        .reference-item {
          background: #f8fafc;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          border: 1px solid #e2e8f0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .reference-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .reference-item .image-container {
          background: white;
          border-radius: 6px;
          padding: 15px;
          margin-bottom: 12px;
          border: 1px solid #e2e8f0;
        }

        .reference-item img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
        }

        .reference-item p {
          margin: 0;
          font-weight: 500;
          font-size: 1rem;
          color: #4a5568;
        }

        .video-tutorial {
          margin-top: 30px;
          padding: 25px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .video-tutorial h5 {
          font-size: 1.2rem;
          margin: 0 0 15px 0;
          font-weight: 600;
          color: #2d3748;
        }

        .video-container {
          background: white;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 15px;
          border: 1px solid #e2e8f0;
        }

        .video-container video {
          max-width: 100%;
          border-radius: 6px;
        }

        .video-description {
          text-align: center;
          font-size: 0.9rem;
          color: #718096;
          margin: 0;
        }

        .company-info {
          text-align: center;
          margin-top: 50px;
          padding: 30px;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .company-info h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0 0 10px 0;
        }

        .company-info p {
          color: #4a5568;
          margin: 5px 0;
          font-size: 1.1rem;
        }

        .notes-footer {
          text-align: center;
          margin-top: 40px;
          padding: 20px;
          color: #718096;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .notes-container {
            padding: 20px 16px;
          }

          .notes-header h1 {
            font-size: 2.2rem;
          }

          .step-card {
            padding: 20px;
          }

          .home-work-card {
            padding: 25px;
          }

          .home-work-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          .reference-grid {
            grid-template-columns: 1fr;
          }

          .home-work-content h3 {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default RegistrationFrontend;
