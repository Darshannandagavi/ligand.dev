import React, { useState } from "react";

const UserBackend = () => {
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
      width:"100%",
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
  };

  const sections = [
    {
      title: "Folder Structure Setup",
      content: "Create the following folders in your project:",
      image: "/User backend Folder Structure.png",
      imageSize: "6.5in x 2.17in",
    },
    {
      title: "Files Structure",
      content: "Create the following files in each folder",
      image: "/User backend Files Structure.png",
      imageSize: "6.5in x 2.35in",
    },
    {
      title: "User.js (Model)",
      purpose: [
        "The Model represents the structure of the data and is responsible for interacting with the MongoDB database.",
        "In Mongoose (Object Data Mapping for MongoDB and Node.js), the model defines how data is stored, validated, and retrieved.",
      ],
      whyNeeded: [
        "Schema Definition: The model defines the shape of the data, including required fields, data types, and any validation rules.",
        "Data Validation: Ensures that only valid data is stored in the database, reducing the risk of inconsistencies.",
        "CRUD Operations: Models abstract MongoDB operations, making it easier to interact with the database using simple methods for creating, retrieving, updating, or deleting data.",
      ],
    },
    {
      title: "UserController.js",
      purpose: [
        "The Controller handles the business logic for the application. It processes incoming requests, manipulates data (using the model), and sends responses back to the client.",
      ],
      whyNeeded: [
        "Separation of Concerns: The controller keeps business logic separate from the routing logic, improving maintainability and organization.",
        "Data Handling: It acts as the intermediary between the user-facing routes and the database. The controller interacts with the model to perform operations like creating, fetching, updating, or deleting users.",
        "Reusability: Methods in the controller can be reused across different routes, promoting DRY (Don't Repeat Yourself) principles and making the codebase more efficient.",
      ],
    },
    {
      title: "UserRouter.js",
      purpose: [
        "The Router defines the API endpoints and maps them to specific controller functions.",
      ],
      whyNeeded: [
        "Route Organization: It helps group related routes (e.g., all routes related to users) in one file, keeping the routing logic organized.",
        "Routing Logic: It connects incoming HTTP requests (GET, POST, PUT, DELETE) to the appropriate controller methods, ensuring the correct business logic is executed.",
        "Middleware Application: Routers can apply middleware (e.g., for authentication or validation) before routing the request to the controller.",
      ],
    },
    {
      title: "Setting Up the Models (/models/User.js)",
      content: "This file defines the User schema and exports it as a model.",
      image: "/User backend  User modal.png",
      imageSize: "6.5in x 3.68in",
      code: `import mongoose from "mongoose";
      import bcrypt from "bcryptjs";
      
      // Define schema (structure of user collection in DB)
      const userSchema = new mongoose.Schema({
        name: {
          type: String,
          required: true, // must provide
        },
        email: {
          type: String,
          required: true,
          unique: true, // no duplicate emails
        },
        contact: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        role:{
          type: String,
          default: "user", // default role is user 
          enum: ["user", "admin"] ,// can be either user or admin
        },
      });
      
      // Before saving → hash password
      userSchema.pre("save", async function (next) {
        if (!this.isModified("password")) return next(); // only hash if password is new
        this.password = await bcrypt.hash(this.password, 10);
        next();
      });
      
      const User = mongoose.model("User", userSchema);
      export default User;`,
      explanation: [
        "mongoose.Schema: In MongoDB, documents are stored as collections of data, and Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straight-forward, schema-based solution to model your application data.",
        "mongoose.Schema(): This is used to define the structure or schema for a document in a MongoDB collection. In this case, the schema defines how a User document should look. The schema defines the fields, their types, constraints, and any validation or other properties related to the fields.",
      ],
      fields: [
        "The schema defines several fields: name, email, contact, and password.",
        "Example: Name: { type: String, required: true }",
        "type: This defines the data type of the field",
        "required: This ensures that the name field must be provided when creating a document.",
      ],
    },
    {
      title: "Setting Up the Controllers (/controllers/ UserController.js)",
      image: "/User backend  User Controller.png",
      imageSize: "6.5in x 2.35in",
      code: `import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // optional for login token
import User from "../models/User.js"
import nodemailer from 'nodemailer';
// -------------------- REGISTER --------------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    // create new user
    const newUser = new User({ name, email, contact, password });
    await newUser.save(); // password will be hashed automatically
    sendEmail(newUser);
    res.status(201).json({ message: "User registered successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed ❌", error: error.message });
  }
};
const sendEmail = async (newUser) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
 
        const mailOptions = {
            from: process.env.EMAIL, // Sender's email address
            to: newUser.email, // Receiver's email address
            subject: 'Welcome to Our Service!', // Clear subject for the welcome email
            //remove space before (<p>Hello $ {newUser.name},</p>) to <p>Hello $ {newUser.name},</p> and add backticks from opening of p tag to closign of last p tag
            html: <p>Hello $ {newUser.name},</p>
                   <p>Welcome to our service! We're thrilled to have you onboard.</p>
                   <p>If you have any questions or need help getting started, feel free to reach out to our support team.</p>
                   <p>Best regards,<br>Your Company Name</p>, // HTML body for better formatting
        };
 
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Failed to send welcome email' });
            }
            console.log('Email sent:', info.response);
        });
    } catch (error) {
        console.error('Error in email function:', error);
        throw new Error(error);
    }
};

        


// -------------------- LOGIN --------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials ❌" });

    // check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials ❌" });

    // optional: create token for session
    const token = jwt.sign({ id: user._id }, "secretKey123", { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful ✅",
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed ❌", error: error.message });
  }
};`,
      explanations: [
        {
          title: "Export",
          content: [
            "Meaning: The export keyword is used to make the registerUser function available for import in other modules or files.",
            "Purpose: It allows other parts of the application (like the router or main application file) to access and use this function. In this case, registerUser is a controller function that handles user registration logic.",
          ],
        },
        {
          title: "Const",
          content: [
            "Meaning: The const keyword is used to declare a constant variable in JavaScript, meaning its value cannot be reassigned after initialization.",
            "Purpose: Here, const is used to define the registerUser function as a constant, ensuring that this specific function cannot be accidentally overwritten within its scope.",
          ],
        },
        {
          title: "registerUser",
          content: [
            "Meaning: This is the name of the function being defined.",
            "Purpose: This function will be responsible for registering a new user in the system. The name registerUser suggests that the function handles the logic for adding a new user.",
          ],
        },
        {
          title: "= async",
          content: [
            "Meaning: This part assigns an asynchronous function to the registerUser variable. The async keyword indicates that the function will perform asynchronous operations, meaning it can use await to wait for promises to resolve.",
            "Purpose: By making the function async, it allows us to handle asynchronous operations, such as database queries (like checking if a user exists) and password hashing, in a sequential and readable manner.",
          ],
        },
        {
          title: "(req, res) - req (request)",
          content: [
            "Meaning: The req object represents the HTTP request that is received from the client.",
            "Purpose: It contains details about the incoming request, such as the request method (GET, POST, etc.), URL, headers, and importantly, the request body (data sent by the client), which in this case includes the new user's information (email, password, userStatus, role).",
          ],
        },
        {
          title: "res (response)",
          content: [
            "Meaning: The res object represents the HTTP response that will be sent back to the client.",
            "Purpose: It allows the function to send data or status codes back to the client. For example, res.status(400).json() sends an HTTP response with a specific status code and message.",
          ],
        },
        {
          title: ". =>",
          content: [
            "Meaning: The => is the arrow function syntax in JavaScript. It is used to define a function in a shorter, more concise way.",
            "Purpose: The arrow function here is used to define the body of the registerUser function. It allows the function to be written in a more concise manner.",
          ],
        },
      ],
    },
    {
      title: "Setting Up the Routes (/routes/UserRouter.js)",
      content: "This file defines the route for the user registration endpoint",
      image: "/User backend  User Router.png",
      imageSize: "6.5in x 2.28in",
      code: `import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const UserRouter = express.Router();

// routes
UserRouter.post("/register", registerUser); // POST /api/users/register
UserRouter.post("/login", loginUser); // POST /api/users/login

export default UserRouter;`,
    },
    {
      title: "Adding Router to the Server (server.js)",
      image: "/User backend  index adding.png",
      imageSize: "6.5in x 3.66in",
      content: "Why to import userRouter or any other routers in index.js?",
      points: [
        "app.use('/user', userRouter);",
        "'/user': It is an API endpoint where you can call this router to handle user-related HTTP requests such as creating, updating, retrieving, or deleting user data.",
        "All the routes defined within userRouter will be prefixed with /user, meaning the routes inside userRouter will be accessed via paths like /register/, /login, etc., depending on how the individual routes are defined in the userRouter file",
      ],
    },
    {
      title: "Testing Backend with Postman",
      steps: [
        {
          step: "Step 1: Create new collection",
          image: "/User backend Create new collection.png",
          imageSize: "6.5in x 3.46in",
        },
        {
          step: "Step 2: Create new request",
          image: "/User backend  Create new request.png",
          imageSize: "6.5in x 3.65in",
        },
        {
          step: "Step 3: Register Test",
          instructions: [
            "Select POST method",
            "Add the path: https://ligand-software-solutions-workshop-2.onrender.com/api/users/register",
            "Select Body → raw",
            "Add your data in JSON format",
            `{
  "name": "user",
  "email": "user@gmail.com",
  "contact": "987654321",
  "password": "user@123"

}`,
            "Press Send",
            "You should see 200 OK message",
          ],
          image: "/User backend  Register Test.png",
          imageSize: "6.5in x 3.66in",
        },
        {
          step: "Step 4: Login Test",
          instructions: [
            "Create new request in Postman",
            "Select POST method",
            "Add path: https://ligand-software-solutions-workshop-2.onrender.com/api/users/login",
            "Add data in Body → raw (JSON format)",
            "Example data:",
            `{
  "email": "user@gmail.com",
  "password": user@123"
}`,
            "Press Send button",
            "You should see 200 OK message",
          ],
          image: "/User backend  Login Test.png",
          imageSize: "6.5in x 3.66in",
        },
      ],
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerH1}>User Side Backend Implementation</h1>
        <p style={styles.headerP}>
          Learn how to implement a complete user side backend and testing throgh
          Postman
        </p>
      </div>

      <div style={styles.sectionsContainer}>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} style={styles.sectionCard}>
            <h2 style={styles.sectionH2}>{section.title}</h2>

            {section.content && <p style={styles.textP}>{section.content}</p>}

            {section.purpose && (
              <div style={styles.listBlock}>
                <h4 style={styles.listH4}>Purpose:</h4>
                <ul style={styles.listUl}>
                  {section.purpose.map((item, i) => (
                    <li key={i} style={styles.listLi}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {section.whyNeeded && (
              <div style={styles.listBlock}>
                <h4 style={styles.listH4}>Why it's needed:</h4>
                <ul style={styles.listUl}>
                  {section.whyNeeded.map((item, i) => (
                    <li key={i} style={styles.listLi}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Show image first for specific sections */}
            {(sectionIndex === 5 || sectionIndex === 6 || sectionIndex === 7) &&
              section.image && (
                <div style={styles.imageContainer}>
                  <p style={styles.imageCaption}>
                    Image: {section.image} ({section.imageSize})
                  </p>
                  <img
                    src={section.image}
                    alt={section.title}
                    style={styles.image}
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=";
                    }}
                  />
                </div>
              )}

            {section.code && (
              <div style={styles.codeBlock}>
                <pre style={styles.pre}>{section.code}</pre>
                <button
                  style={{
                    ...styles.copyBtn,
                    ...(copiedIndex === `code-${sectionIndex}`
                      ? styles.copiedBtn
                      : {}),
                  }}
                  onClick={() =>
                    copyToClipboard(section.code, `code-${sectionIndex}`)
                  }
                >
                  {copiedIndex === `code-${sectionIndex}` ? "Copied!" : "Copy"}
                </button>
              </div>
            )}

            {section.explanation && (
              <div style={styles.listBlock}>
                <h4 style={styles.listH4}>Explanation:</h4>
                <ul style={styles.listUl}>
                  {section.explanation.map((item, i) => (
                    <li key={i} style={styles.listLi}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {section.fields && (
              <div style={styles.listBlock}>
                <h4 style={styles.listH4}>Fields in the Schema:</h4>
                <ul style={styles.listUl}>
                  {section.fields.map((item, i) => (
                    <li key={i} style={styles.listLi}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {section.explanations && (
              <div style={styles.listBlock}>
                {section.explanations.map((exp, expIndex) => (
                  <div key={expIndex}>
                    <h4 style={styles.listH4}>{exp.title}</h4>
                    <ul style={styles.listUl}>
                      {exp.content.map((item, i) => (
                        <li key={i} style={styles.listLi}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {section.points && (
              <div style={styles.listBlock}>
                <ul style={styles.listUl}>
                  {section.points.map((item, i) => (
                    <li key={i} style={styles.listLi}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Show image for other sections (not 5, 6, 7) */}
            {![5, 6, 7].includes(sectionIndex) && section.image && (
              <div style={styles.imageContainer}>
                <p style={styles.imageCaption}>
                  Image: {section.image} ({section.imageSize})
                </p>
                <img
                  src={section.image}
                  alt={section.title}
                  style={styles.image}
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=";
                  }}
                />
              </div>
            )}

            {section.steps && (
              <div>
                <h3 style={styles.subtitleH3}>Postman Testing Steps:</h3>
                {section.steps.map((step, stepIndex) => (
                  <div key={stepIndex} style={styles.listBlock}>
                    <h4 style={styles.listH4}>{step.step}</h4>
                    {step.instructions && (
                      <ul style={styles.listUl}>
                        {step.instructions.map((instruction, i) => (
                          <li key={i} style={styles.listLi}>
                            {instruction}
                          </li>
                        ))}
                      </ul>
                    )}
                    {step.image && (
                      <div style={styles.imageContainer}>
                        <p style={styles.imageCaption}>
                          Image: {step.image} ({step.imageSize})
                        </p>
                        <img
                          src={step.image}
                          alt={step.step}
                          style={styles.image}
                          onError={(e) => {
                            e.target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSI iaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=";
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

      <div style={styles.footer}>
        <p style={styles.footerP}>
          Backend implementation complete. Your user side backend is now ready!
        </p>
      </div>

      <div style={styles.companyInfo}>
        <h2 style={styles.companyH2}>LIGAND SOFTWARE SOLUTIONS</h2>
        <p style={styles.companyP}>Your Launchpad To Tech Success</p>
        <p style={styles.companyP}>Happy Coding </p>
        <p style={styles.companyP}>Happy Learning!!!!!</p>
        <p style={styles.companyP}>Sankeshwar</p>
        <p style={styles.companyP}>8722585715</p>
      </div>
    </div>
  );
};

export default UserBackend;
