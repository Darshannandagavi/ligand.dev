import React, { useState } from "react";
import "./MyNotes.css";

const PostmanSetup = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: "What is API?",
      content:
        "API stands for Application Programming Interface. It is a set of protocols, tools, and definitions that allow different software applications to communicate with each other. Essentially, an API defines how different software components should interact, and it serves as an intermediary that allows systems to exchange data and functionality.",
      content2:
        "APIs are used to enable communication between different applications, systems, or components, and they allow developers to access specific features or data from a service or platform without exposing the underlying code. APIs can be used in many different contexts, from web services to operating systems to databases.",
    },
    {
      title: "Step 1: Go to Web Browser and search",
      content: "Postman Download for windows",
      image: "/websearchPostman.png",
    },
    {
      title: "Step 2: After searching click on the first link",
      content: "it will move to the official website of postman",
      image: "/officalwebsite.png",
    },
    {
      title: "Step 3: Download Postman",
      content:
        "Click on the download button to download Postman for your operating system like image bellow👇",
      image: "/downloadPostman.png",
    },
    {
      title: "Step 4: Go to the downloaded file and install it",
      content:
        "Double click on the downloaded file and follow the installation process",
      image: "/installprocess.png",
    },
    {
      title: "Step 5: now postman is installed in your system",
      content: "",
      image: "/installedpostman.png",
    },
    {
      title: "Step 6: Postman Account Setup",
      content: "Create a Postman account or sign in via google",
      image: "/createyourpostmanaccount.png",
    },
    {
      title: "Step 7: Postman Account completed",
      content:
        "Congratulations! You have successfully set up your Postman account.",
      image: "/postmancomplted.png",
    },
  ];

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>Postman Setup Guide</h1>
        <p>Follow these steps to set up and use Postman for API testing</p>
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

            {step.content2 && <p>{step.content2}</p>}

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
        {" "}
        <h2>Home Work</h2>
        <br />{" "}
        <p>
          🧠 <strong>Homework Task:</strong> Complete Postman Installation and Setup.
        </p>
        <br />{" "}
        <p>
          {" "}
          🎯 <strong>Objective:</strong> Successfully install Postman, set up your account, and explore its interface to understand where and how APIs are tested.{" "}
        </p>{" "}
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

export default PostmanSetup;
