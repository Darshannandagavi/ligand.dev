import React, { useState } from "react";
import "./MyNotes.css";

const MyNotes = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: "Step 1: Create Project Folder",
      content:
        "Create a folder with your project name in any of the root drive (D, E, F)",
      image: "/Rootfolder.png",
    },
    {
      title: "Step 2: Open Folder in VS Code",
      content: "Open this folder in VSCODE (File → Open Folder)",
      image: "/OpenFolderInVS.png",
    },
    {
      title: "Step 3: Trust the Author",
      content: "Click on 'Yes, I trust the author' when prompted",
      image: "/TrustAuthor.png",
    },
    {
      title: "Step 4: Open Terminal",
      content: "Open Terminal (View → Terminal)",
      image: "/ViewTerminal.png",
    },
    {
      title: "Step 5: Create React App",
      content: "In terminal, run the command:",
      command: "npx create-react-app client",
      image: "/createReactApp.png",
    },
    {
      image: "/HappyHacking.png",
    },
    {
      title: "Step 6: Navigate to Client Folder",
      content: "Move to your client folder:",
      command: "cd client",
      image: "/cdClient.png",
    },
    {
      image: "/success_cd.png",
    },
    {
      title: "Step 7: Install Required Packages",
      content: "Install basic packages:",
      command: "npm i react-router-dom axios",
      image: "/npm_i_packages.png",
    },
    {
      image: "/successful_package_install.png",
    },
    {
      title: "Step 8: Test the Application",
      content: "Start the development server:",
      command: "npm start",
      image: "/npm_start.png",
    },
    {
      image: "/success_compile.png",
    },
    {
      image: "/web_start.png",
    },
    {
      title: "Step 9: Open App.js File",
      content: "Navigate to: MyProject → client → src → App.js",
      image: "/open_app.png",
    },
    {
      title: "Step 10: Modify App.js",
      image: "/header_section.png",
    },
    {
      image: "/after_delete_header.png",
    },
    {
      content:
        "Delete the <header> to </header> section and add 'WELCOME TO MERN' inside the div tag",
      code: `import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      WELCOME TO MERN
    </div>
  );
}

export default App;`,
      image: "/welcome_to_mern.png",
    },
    {
      image: "/welcome_to_mern_web.png",
    },
  ];

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>Client Setup Guide</h1>
        <p>Follow these steps to set up your React client application</p>
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
            {step.title && <h3>{step.title}</h3>}
            {step.content && <p>{step.content}</p>}

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
                <p>Image: {step.image}</p>
                <div className="image-container">
                  {/* Image will be displayed here */}
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

      <div className="home-work step-card">
        <h2>Home-Work</h2><br />
        <p>🧠 Homework Task: Build and Customize Your First React Client App</p><br />
        <p>
          🎯 Objective: Set up a new React client from scratch and display a
          custom landing page on the index page which shows <b>WELCOME to MERN</b> in <b>YELLOW</b> color with <b>RED</b> underline.
        </p>
      </div>

      <div className="notes-footer">
        <p>
          Join us for Programming, Coding, Project Training and Internship
          opportunities.
        </p>
        <p>Let's learn, code and build together.</p>
      </div>
    </div>
  );
};

export default MyNotes;
