import React, { useState } from "react";
import "./MyNotes.css";

const ViewItemFrontendNotes = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: "ViewItem Component Overview",
      content:
        "The ViewItem component displays inventory items with animations, modals, and responsive design.",
      explanation:
        "This component fetches and displays items from the backend API with a visually appealing card layout, image modals, and smooth animations.",
    },
    {
      title: "Create new file called ViewItem.jsx in UserLayout folder",
      content: "",
      explanation: "",
      image: "/viewitemfilecraetions.png",
    },
    {
      title: "Complete ViewItem Component Code",
      content: "Full implementation of the ViewItem component:",
      explanation:
        "This component combines React hooks, API calls, animations, and responsive design to create an engaging inventory display.",
      code: `import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const ViewItem = () => {
  const [items, setItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("https://ligand-software-solutions-workshop-2.onrender.com/item");
      setItems(response.data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  // Animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Container className="view-item-container">
      <h2 className="text-center mb-5 section-title" data-aos="fade-down">
        Our Inventory
      </h2>

      <Row>
        {items.map((item, index) => (
          <Col key={item._id} md={6} lg={4} className="mb-4">
            <motion.div
              className="item-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div
                className="item-image-container"
                onClick={() =>
                  handleImageClick(
                    \`https://ligand-software-solutions-workshop-2.onrender.com/uploads/\${item.itemImage}\`
                  )
                }
              >
                <img
                  src={\`https://ligand-software-solutions-workshop-2.onrender.com/uploads/\${item.itemImage}\`}
                  alt={item.itemName}
                  className="item-image"
                />
                <div className="image-overlay">
                  <span className="view-text">Click to View</span>
                </div>
              </div>

              <div className="item-details">
                <h3 className="item-name">{item.itemName}</h3>
                <p className="item-description">{item.description}</p>

                <div className="item-meta">
                  <div className="meta-item">
                    <span className="meta-label">Quantity:</span>
                    <span className="meta-value">{item.quantity}</span>
                  </div>

                  <div className="meta-item">
                    <span className="meta-label">Category:</span>
                    <span className="meta-value">
                      {item.category?.name || item.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Image Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        size="lg"
        className="image-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Item Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full size"
              className="img-fluid modal-image"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <style>{\`
      /* ViewItem.css */
.view-item-container {
  padding: 2rem 0;
  min-height: 100vh;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 3rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  border-radius: 2px;
}

.item-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.item-image-container {
  position: relative;
  height: 250px;
  overflow: hidden;
  cursor: pointer;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.item-image-container:hover .item-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.item-image-container:hover .image-overlay {
  opacity: 1;
}

.view-text {
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
}

.item-details {
  padding: 1.5rem;
}

.item-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.8rem;
}

.item-description {
  color: #7f8c8d;
  margin-bottom: 1.2rem;
  line-height: 1.5;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f1f2f6;
  padding-top: 1rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: 0.8rem;
  color: #95a5a6;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.2rem;
}

.meta-value {
  font-size: 1rem;
  color: #2c3e50;
  font-weight: 600;
}

.image-modal .modal-content {
  border-radius: 12px;
  overflow: hidden;
}

.image-modal .modal-header {
  border-bottom: 1px solid #eaeaea;
  background: #f8f9fa;
}

.image-modal .modal-title {
  color: #2c3e50;
  font-weight: 600;
}

.modal-image {
  border-radius: 8px;
  max-height: 70vh;
  object-fit: contain;
}

.image-modal .btn-secondary {
  background: #95a5a6;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
}

.image-modal .btn-secondary:hover {
  background: #7f8c8d;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .view-item-container {
    padding: 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .item-meta {
    flex-direction: column;
    gap: 0.8rem;
  }
}
      \`}</style>
    </Container>
  );
};

export default ViewItem;`,
      image: "/viewitem-code.png",
    },
    // ... (other steps remain the same)
    {
      title: "Implementation Notes",
      content:
        "Important considerations when implementing the ViewItem component:",
      explanation:
        "These notes cover best practices and potential improvements for the ViewItem component.",
      notes: [
        "API URL: Consider using environment variables for the API base URL",
        "Error handling: Enhance error handling with user-friendly messages",
        "Loading states: Add loading indicators while fetching data",
        "Empty state: Handle empty items array with a friendly message",
        "Image optimization: Consider implementing lazy loading for images",
        "Pagination: For large inventories, implement pagination or infinite scroll",
        "Accessibility: Ensure proper ARIA attributes for screen readers",
      ],
    },
  ];

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>ViewItem Component Guide</h1>
        <p>
          Learn how to implement an inventory display component with animations
          and modals
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

            {step.differences && (
              <div className="differences-list">
                <h4>Differences:</h4>
                <ul>
                  {step.differences.map((difference, i) => (
                    <li key={i}>{difference}</li>
                  ))}
                </ul>
              </div>
            )}

            {step.notes && (
              <div className="notes-list">
                <h4>Implementation Notes:</h4>
                <ul>
                  {step.notes.map((note, i) => (
                    <li key={i}>{note}</li>
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
            {/* <div className="difficulty-badge">Intermediate Level</div> */}
          </div>

          <div className="home-work-content">
            <h3>Create Employee View Component</h3>

            <div className="objective-section">
              <h4>Objective</h4>
              <p>
                Create a ViewEmployee component that fetches and displays all
                employees in a beautiful card layout, similar to the ViewItem
                component. The component should include employee details,
                profile images, and interactive features.
              </p>
            </div>

            <div className="requirements-section">
              <h4>Requirements</h4>
              <ul>
                <li>
                  Create ViewEmployee.jsx component in the userLayout folder
                </li>
                <li>Fetch all employees from the employee backend API</li>
                <li>Display employees in a responsive card layout</li>
                <li>
                  Include employee photo, name, position, department, and email
                </li>
                <li>
                  Add click-to-view functionality for employee profile images
                </li>
                <li>Implement animations using Framer Motion or AOS</li>
                <li>Add modal for viewing employee details</li>
                <li>Make the design responsive and user-friendly</li>
                <li>Include proper loading states and error handling</li>
              </ul>
            </div>

            <div className="reference-section">
              <h4>Expected Employee Card Design</h4>

              <div className="reference-grid">
                <div className="reference-item">
                  <div className="image-container">
                    <img
                      src="/homeWork/home_work_emp_frontend.png"
                      alt="Employee Card Design"
                    />
                  </div>
                  <p>Employee Card Layout</p>
                </div>

                <div className="reference-item">
                  <div className="image-container">
                    <img
                      src="/homeWork/home_work_emp_frontend1.png"
                      alt="Employee Modal Design"
                    />
                  </div>
                  <p>Employee Details Modal</p>
                </div>
              </div>
            </div>

            <div className="note-section">
              <h4>Important Note</h4>
              <div className="note-box">
                <p>
                  <strong>
                    Homework: Employees fetch all employees and show in card
                    form
                  </strong>
                  <br />
                  Your main task is to create a component that fetches all
                  employees from the backend API and displays them in an
                  attractive card layout. Follow the same patterns used in the
                  ViewItem component but adapt them for employee data with
                  additional fields like position, department, and contact
                  information.
                </p>
              </div>
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
              <div style={{ margin: "35px 0" }}>
              <iframe
                width="100%"
                height="515"
                src="https://www.youtube.com/embed/5twZ6Ym-n6I?si=MVYbwBm5vK6bvqQz"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: "8px" }}
              ></iframe>
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

        .company-info {
          text-align: center;
          margin: 50px 0;
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
        .breakdown-list,
        .differences-list,
        .notes-list {
          background: white;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          margin: 16px 0;
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
        .implementation-steps,
        .employee-fields-section,
        .submission-section,
        .bonus-section,
        .note-section {
          margin-bottom: 30px;
        }

        .objective-section h4,
        .requirements-section h4,
        .reference-section h4,
        .implementation-steps h4,
        .employee-fields-section h4,
        .submission-section h4,
        .bonus-section h4,
        .note-section h4 {
          font-size: 1.3rem;
          margin: 0 0 15px 0;
          font-weight: 600;
          color: #2d3748;
          border-left: 4px solid #667eea;
          padding-left: 12px;
        }

        .objective-section p {
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

        .implementation-steps ol {
          margin: 0;
          padding-left: 20px;
        }

        .implementation-steps li {
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

        .code-example {
          margin-top: 20px;
        }

        .code-example h5 {
          font-size: 1.1rem;
          margin: 0 0 10px 0;
          font-weight: 600;
          color: #2d3748;
        }

        .employee-fields-section .fields-table {
          background: #f8fafc;
          border-radius: 8px;
          padding: 20px;
          border: 1px solid #e2e8f0;
          overflow-x: auto;
        }

        .employee-fields-section table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        .employee-fields-section th,
        .employee-fields-section td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }

        .employee-fields-section th {
          background: #667eea;
          color: white;
          font-weight: 600;
        }

        .employee-fields-section tr:hover {
          background: #edf2f7;
        }

        .note-box {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 20px;
          margin-top: 15px;
        }

        .note-box p {
          margin: 0;
          color: #856404;
          line-height: 1.6;
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

          .employee-fields-section .fields-table {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default ViewItemFrontendNotes;
