import React, { useState } from "react";
import "./MyNotes.css";

const ItemFrontend = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    // ... (all your existing steps remain the same)
    {
      title: "Complete Item Frontend Component",
      content:
        "Below is the complete code for the item management frontend component:",
      explanation:
        "This component provides a complete CRUD interface for managing items with image uploads, including form handling, API communication, and a responsive table display.",
      code: `import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Table,
  Button,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";

const Items = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [itemData, setItemData] = useState({
    itemName: "",
    quantity: "",
    description: "",
    category: "",
    itemImage: null,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get("https://ligand-software-solutions-workshop-2.onrender.com/item");
    setItems(response.data.items);
    console.log(response.data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "itemImage") {
      setItemData({ ...itemData, itemImage: files[0] });
    } else {
      setItemData({ ...itemData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(itemData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      let response;
      if (isEditMode) {
        response = await axios.put(
          \`https://ligand-software-solutions-workshop-2.onrender.com/item/\${itemId}\`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axios.post("https://ligand-software-solutions-workshop-2.onrender.com/item", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.status === 200 || response.status === 201) {
        fetchItems();
        setItemData({
          itemName: "",
          quantity: "",
          description: "",
          category: "",
          itemImage: null,
        });
        setIsEditMode(false);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleEdit = (item) => {
    setItemData({
      itemName: item.itemName,
      quantity: item.quantity,
      description: item.description,
      category: item.category._id,
      itemImage: null,
    });
    setItemId(item._id);
    setIsEditMode(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Do you really want to delete this item?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(\`https://ligand-software-solutions-workshop-2.onrender.com/item/\${id}\`);
      setItems(items.filter((item) => item._id !== id));
      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>{isEditMode ? "Edit Item" : "Add Item"}</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="itemName"
                value={itemData.itemName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={itemData.quantity}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={itemData.category}
                onChange={handleChange}
                required
                placeholder="Enter category name"
              />
            </Form.Group>
          </Col>

          <Col sm={6}>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="itemImage"
                onChange={handleChange}
                accept="image/*"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={itemData.description}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>

        <Button className="mt-3" type="submit">
          {isEditMode ? "Update Item" : "Add Item"}
        </Button>
      </Form>

      <h3 className="mt-5">Item List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
              <td>{item.category}</td>

              <td>
                <img
                  src={\`https://ligand-software-solutions-workshop-2.onrender.com/uploads/\${item.itemImage}\`}
                  alt={item.itemName}
                  width="50"
                />
              </td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(item)}>
                  <MdEdit />
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(item._id)}>
                  <MdDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Items;`,
      image: "/item-frontend-complete.png",
    },
    // ... (other steps remain the same)
  ];

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>Item Frontend Guide</h1>
        <p>
          Follow these steps to create a complete item management interface with
          React
        </p>
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

            {step.breakdown && (
              <div className="breakdown-list">
                <h4>Breakdown:</h4>
                {Array.isArray(step.breakdown) ? (
                  <ul>
                    {step.breakdown.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{step.breakdown}</p>
                )}
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

      {/* Homework Section - Added exactly like previous components */}
      <div className="home-work-section">
        <div className="home-work-card">
          <div className="home-work-header">
            <h2>Homework Assignment</h2>
            <div className="difficulty-badge">Intermediate Level</div>
          </div>

          <div className="home-work-content">
            <h3>Develop Employee Frontend CRUD Operations</h3>

            <div className="objective-section">
              <h4>Objective</h4>
              <p>
                Create a complete Employee frontend system with CRUD operations
                following the same patterns and structure as the Item frontend
                we just built. The employee system should handle employee data
                with image uploads and provide a professional user interface in
                different floder .
              </p>
            </div>

            <div className="requirements-section">
              <h4>Requirements</h4>
              <ul>
                <li>Create Employee.jsx component with all CRUD operations</li>
                <li>
                  Include form fields: employeeName, position, department,
                  salary, email, phone, hireDate, address, employeeImage
                </li>
                <li>Implement form validation for all required fields</li>
                <li>Add image upload functionality for employee photos</li>
                <li>Create a responsive table to display employee data</li>
                <li>
                  Implement edit and delete functionality with confirmation
                  dialogs
                </li>
                <li>Add proper error handling and loading states</li>
                <li>Make the design responsive and user-friendly</li>
                <li>Connect with the Employee backend API endpoints</li>
              </ul>
            </div>

            <div className="reference-section">
              <h4>Expected Employee Form OutPut</h4>

              <div className="reference-grid">
                <div className="reference-item">
                  <div className="image-container">
                    <img
                      src="/homeWork/home_work_emp_fileds.png"
                      alt="Employee Form Design"
                    />
                  </div>
                  <p>Employee Form Design</p>
                </div>

                <div className="reference-item">
                  <div className="image-container">
                    <img
                      src="/homeWork/home_work_emp_output.png"
                      alt="Employee Table Design"
                    />
                  </div>
                  <p>Employee Table Design</p>
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
                    <source src="/employee_crud.mp4" type="video/mp4" />
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

            <div className="api-endpoints-section">
              <h4>API Endpoints Reference</h4>
              <div className="endpoints-table">
                <table>
                  <thead>
                    <tr>
                      <th>Method</th>
                      <th>Endpoint</th>
                      <th>Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>POST</td>
                      <td>/employee</td>
                      <td>Create new employee with image upload</td>
                    </tr>
                    <tr>
                      <td>GET</td>
                      <td>/employee</td>
                      <td>Get all employees</td>
                    </tr>
                    <tr>
                      <td>GET</td>
                      <td>/employee/:id</td>
                      <td>Get specific employee by ID</td>
                    </tr>
                    <tr>
                      <td>PUT</td>
                      <td>/employee/:id</td>
                      <td>Update employee data</td>
                    </tr>
                    <tr>
                      <td>DELETE</td>
                      <td>/employee/:id</td>
                      <td>Delete employee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
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
        .breakdown-list {
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
        .submission-section,
        .bonus-section,
        .api-endpoints-section {
          margin-bottom: 30px;
        }

        .objective-section h4,
        .requirements-section h4,
        .reference-section h4,
        .submission-section h4,
        .bonus-section h4,
        .api-endpoints-section h4 {
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

        .api-endpoints-section .endpoints-table {
          background: #f8fafc;
          border-radius: 8px;
          padding: 20px;
          border: 1px solid #e2e8f0;
        }

        .api-endpoints-section table {
          width: 100%;
          border-collapse: collapse;
        }

        .api-endpoints-section th,
        .api-endpoints-section td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }

        .api-endpoints-section th {
          background: #667eea;
          color: white;
          font-weight: 600;
        }

        .api-endpoints-section tr:hover {
          background: #edf2f7;
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

          .api-endpoints-section table {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ItemFrontend;
