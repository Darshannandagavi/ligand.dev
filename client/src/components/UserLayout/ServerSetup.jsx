import React, { useState } from "react";

const ServerSetup = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: "Step 1: Create Server Folder",
      content: "Create new folder as 'Server' in Explorer window",
      image: "/server-folder.png",
    },
    {
      title: "Step 2: Navigate to Server Folder",
      content: "Open Terminal and go to 'Server' folder",
      command: "cd Server",
      image: "/cd-server.png",
    },
    {
      title: "Step 3: Initialize Server",
      content: "Initialize server by running following command",
      command: "npm init",
      image: "/npm-init.png",
    },
    {
      title: "Step 4: Provide Package Details",
      content: "Provide details for server 'packagename' and other information",
      code: `package name: (server) [projectname]
version: (1.0.0)
description: 
entry point: (index.js)
test command: 
git repository: 
keywords: 
author: 
license: (ISC)`,
      image: "/npm-init-details.png",
    },
    {
      title: "Step 5: Install Required Packages",
      content: "Install required packages for server",
      command: "npm i express mongoose body-parser dotenv cors",
      image: "/install-packages.png",
    },
    {
      title: "Step 6: Install Nodemon",
      content: "Install nodemon as a dev dependency",
      command: "npm i --save-dev nodemon",
      image: "/install-nodemon.png",
    },
    {
      title: "Step 7: Create Folder Structure",
      content: "Create following folders and files inside 'Server' folder:",
      code: `1. controller (Folder)
2. models (Folder)
3. routes (Folder)
4. index.js (File)
5. .env (File)`,
      image: "/server-structure.png",
    },
    {
      title: "Step 8: Configure index.js",
      content: "Open index.js file and write server configuration code",
      code: `import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 2000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(() => {
  console.log("DB connected successfully");
  app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
  });
}).catch(error => console.log(error));`,
      image: "/indexjs-code.png",
    },
    {
      title: "Step 9: Configure Environment Variables",
      content: "Open .env file and create constants for PORT and MONGOURL",
      code: `PORT=8000
MONGOURL="mongodb+srv://username:password@cluster0.ofadrht.mongodb.net/dbname?retryWrites=true&w=majority&appName=Cluster0"`,
      note: "Note: Replace with your actual MongoDB Atlas connection string and database name",
      image: "/env-file.png",
    },
    {
      title: "Step 10: Update Package.json",
      content: "Open package.json and update the scripts section",
      content:
        " in package.json file, bellow main add type as module and in scripts add start command",
      codeBefore: `{
  "name": "bank",
  "version": "1.0.0",
  "main": "index.js",
      "scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
}`,
      codeAfter: `{
  "name": "bank",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "nodemon index.js"
  },`,
    },
    {
      title: "Step 11: Run the Server",
      content: "Start the server using the command",
      command: "npm start",
      image: "/npm-start-server.png",
    },
    {
      title: "Step 12: Verify Server Output",
      content: "Check if you get the following output in Terminal",
      code: `DB connected successfully
Server is running on Port:8000`,
      image: "/server-running.png",
    },
  ];

  return (
    <div className="server-setup-container">
      <div className="server-setup-header">
        <h1>Server Setup Guide</h1>
        <p>Follow these steps to set up your Node.js/Express server</p>
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

            {step.note && (
              <div className="note-box">
                <p>{step.note}</p>
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

            {step.code && !step.codeBefore && (
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

            {step.codeBefore && step.codeAfter && (
              <div className="code-comparison">
                <div className="code-block">
                  <h4>Before:</h4>
                  <pre>{step.codeBefore}</pre>
                </div>
                <div className="code-block">
                  <h4>After:</h4>
                  <pre>{step.codeAfter}</pre>
                  <button
                    className={`copy-btn ${
                      copiedIndex === index ? "copied" : ""
                    }`}
                    onClick={() => copyToClipboard(step.codeAfter, index)}
                  >
                    {copiedIndex === index ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            )}

            {step.image && (
              <div
                style={{
                  textAlign: "center",
                  padding: "10px",
                  background: "rgba(233, 233, 233, 1)",
                  borderRadius: "5px",
                }}
              >
                <img src={step.image} alt={step.title} className="step-image" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="congratulations">
        <h2>Congratulations</h2>
        <p>You are done with server setup</p>
        <h3>Empower Your Code, Unleash Your Creativity</h3>
      </div>
      
      <div className="home-work step-card">
        {" "}
        <h2>Home Work</h2>
        <br />{" "}
        <p>
          🧠 <strong>Homework Task:</strong> Set Up the Server.
        </p>
        <br />{" "}
        <p>
          {" "}
          🎯 <strong>Objective:</strong> Build a Node.js server with the default
          folders — <b>Models</b>, <b>Controllers</b>, and <b>Routes</b>. Create
          a <b>.env</b> file to store the <b>MongoDB URI</b> and <b>PORT</b>{" "}
          values. Use these environment variables to initialize the server and
          establish a successful connection to MongoDB.{" "}
        </p>{" "}
      </div>
      <div className="notes-footer">
        <p>
          Join us for Programming, Coding, Project Training and Internship
          opportunities.
        </p>
        <p>Let's learn, code and build together.</p>
      </div>
      <style>
        {` 
            .server-setup-container {
            width:100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.server-setup-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.server-setup-header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.server-setup-header p {
  color: #7f8c8d;
  font-size: 18px;
}

.company-info {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  text-align: center;
}

.company-info h2 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.company-info p {
  margin: 5px 0;
  color: #34495e;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.step-card {
  background-color: white;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #3498db;
}

.step-card h3 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 20px;
}

.step-card p {
  line-height: 1.6;
  margin-bottom: 15px;
}

.note-box {
  background-color: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 15px;
  margin: 15px 0;
  border-radius: 4px;
}

.note-box p {
  margin: 0;
  color: #856404;
}

.code-block {
  position: relative;
  background-color: #2d3748;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 6px;
  margin: 15px 0;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  white-space: pre-wrap;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.code-block code {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
}

.copy-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #4a5568;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;
}

.copy-btn:hover {
  background-color: #2d3748;
}

.copy-btn.copied {
  background-color: #38a169;
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 15px 0;
}

.code-comparison .code-block {
  margin: 0;
}

.code-comparison h4 {
  color: #e2e8f0;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 14px;
}

.image-placeholder {
  margin: 15px 0;
}

.image-container {
  border: 1px dashed #ddd;

}

.step-image {
  max-width: 100%;
  width:100%;
  object-fit:cover;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.congratulations {
  text-align: center;
  margin: 40px 0;
  padding: 30px;
  background-color: #d4edda;
  border-radius: 8px;
  border-left: 4px solid #28a745;
}

.congratulations h2 {
  color: #155724;
  margin-bottom: 10px;
}

.congratulations p {
  color: #155724;
  font-size: 18px;
  margin-bottom: 15px;
}

.congratulations h3 {
  color: #155724;
  margin: 0;
}

.notes-footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 2px solid #f0f0f0;
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .code-comparison {
    grid-template-columns: 1fr;
  }
  
  .server-setup-container {
    padding: 15px;
  }
  
  .step-card {
    padding: 15px;
  }
}
        `}
      </style>
    </div>
  );
};

export default ServerSetup;
