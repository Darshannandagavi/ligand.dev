import React, { useState } from 'react';
import './MyNotes.css';

const ItemFrontend = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: "Complete Item Frontend Component",
      content: "Below is the complete code for the item management frontend component:",
      explanation: "This component provides a complete CRUD interface for managing items with image uploads, including form handling, API communication, and a responsive table display.",
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
      image: "/item-frontend-complete.png"
    },
    {
      title: "Import Statements",
      content: "Understanding the import statements in the item component:",
      explanation: "These imports bring in the necessary libraries and components needed for the item management interface to function properly.",
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
import { MdEdit, MdDelete } from "react-icons/md";`,
      breakdown: [
        "React, useEffect, useState: Core React hooks for state management and lifecycle",
        "React Bootstrap components: Pre-styled UI elements for layout and form",
        "axios: HTTP client for making API requests to the backend",
        "MdEdit, MdDelete: React Icons for edit and delete buttons"
      ],
    },
    {
      title: "Component Declaration and State Management",
      content: "The component declaration and state initialization:",
      explanation: "This section defines the component and initializes all the state variables needed for item management.",
      code: `const Items = () => {
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
  const [itemId, setItemId] = useState(null);`,
      breakdown: [
        "items: Array to store the list of items fetched from the backend",
        "categories: Array to store categories (though not fully implemented)",
        "itemData: Object to store form data for creating/editing items",
        "isEditMode: Boolean to track whether we're in edit mode",
        "itemId: Stores the ID of the item being edited"
      ],
    },
    {
      title: "useEffect Hook for Data Fetching",
      content: "The useEffect hook fetches items when the component mounts:",
      explanation: "This hook runs once when the component is first rendered to load the initial list of items from the backend.",
      code: `useEffect(() => {
  fetchItems();
}, []);`,
      breakdown: [
        "useEffect: React hook that runs after the component renders",
        "Empty dependency array []: Ensures the effect runs only once on mount",
        "fetchItems(): Function that makes API call to get all items"
      ],
    },
    {
      title: "fetchItems Function",
      content: "Function to fetch items from the backend API:",
      explanation: "This function makes a GET request to the backend to retrieve all items and updates the state with the response.",
      code: `const fetchItems = async () => {
  const response = await axios.get("https://ligand-software-solutions-workshop-2.onrender.com/item");
  setItems(response.data.items);
  console.log(response.data);
};`,
      breakdown: [
        "axios.get(): Makes HTTP GET request to the /item endpoint",
        "setItems(): Updates the items state with the response data",
        "console.log(): For debugging purposes (can be removed in production)"
      ],
    },
    {
      title: "handleChange Function",
      content: "Function to handle form input changes:",
      explanation: "This function updates the form state as the user types or selects files, handling both regular inputs and file inputs differently.",
      code: `const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === "itemImage") {
    setItemData({ ...itemData, itemImage: files[0] });
  } else {
    setItemData({ ...itemData, [name]: value });
  }
};`,
      breakdown: [
        "e.target: The form element that triggered the change event",
        "name, value, files: Destructured properties from the event target",
        "Conditional logic: Handles file inputs differently from text inputs",
        "setItemData(): Updates the form state with the new value"
      ],
    },
    {
      title: "handleSubmit Function",
      content: "Function to handle form submission:",
      explanation: "This function processes form submissions for both creating new items and updating existing ones, using FormData to handle file uploads.",
      code: `const handleSubmit = async (e) => {
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
};`,
      breakdown: [
        "e.preventDefault(): Prevents default form submission behavior",
        "FormData: API for constructing form data to include files",
        "Conditional requests: Uses PUT for edits, POST for new items",
        "Headers: Sets content type for file uploads",
        "Success handling: Refreshes list and resets form",
        "Error handling: Shows alert with error message"
      ],
    },
    {
      title: "handleEdit Function",
      content: "Function to handle editing an existing item:",
      explanation: "This function populates the form with an existing item's data when the user clicks the edit button.",
      code: `const handleEdit = (item) => {
  setItemData({
    itemName: item.itemName,
    quantity: item.quantity,
    description: item.description,
    category: item.category._id,
    itemImage: null,
  });
  setItemId(item._id);
  setIsEditMode(true);
};`,
      breakdown: [
        "setItemData(): Pre-fills form with the item's current data",
        "setItemId(): Stores the ID of the item being edited",
        "setIsEditMode(true): Switches the form to edit mode",
        "itemImage: null: Resets image field (user can upload new image if needed)"
      ],
    },
    {
      title: "handleDelete Function",
      content: "Function to handle deleting an item:",
      explanation: "This function confirms deletion with the user and then sends a DELETE request to the backend.",
      code: `const handleDelete = async (id) => {
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
};`,
      breakdown: [
        "window.confirm(): Shows confirmation dialog before deletion",
        "axios.delete(): Sends DELETE request to remove the item",
        "setItems(): Updates local state to remove the deleted item",
        "Error handling: Alerts user if deletion fails"
      ],
    },
    {
      title: "JSX Structure - Form Layout",
      content: "The form layout using React Bootstrap components:",
      explanation: "This section creates a responsive form layout with proper spacing and organization using Bootstrap's grid system.",
      code: `<Container className="mt-5">
  <h2>{isEditMode ? "Edit Item" : "Add Item"}</h2>
  <Form onSubmit={handleSubmit}>
    <Row>
      <Col sm={6}>
        {/* Item Name Field */}
      </Col>
      <Col sm={6}>
        {/* Quantity Field */}
      </Col>
    </Row>
    {/* More form fields... */}
  </Form>
</Container>`,
      breakdown: [
        "Container: Wraps the entire component with proper spacing",
        "Conditional title: Changes based on edit mode",
        "Row and Col: Creates responsive grid layout for form fields",
        "Form: Wraps all form elements and handles submission"
      ],
    },
    {
      title: "Form Input Fields",
      content: "The individual form input fields:",
      explanation: "Each form field is implemented with proper labeling, validation, and connection to the component state.",
      code: `<Form.Group>
  <Form.Label>Item Name</Form.Label>
  <Form.Control
    type="text"
    name="itemName"
    value={itemData.itemName}
    onChange={handleChange}
    required
  />
</Form.Group>`,
      breakdown: [
        "Form.Group: Groups label and input together for proper spacing",
        "Form.Label: Provides accessible labeling for the input",
        "Form.Control: The actual input field with various properties",
        "name: Matches the state property name",
        "value: Controlled component (value comes from state)",
        "onChange: Updates state when user types",
        "required: HTML5 validation attribute"
      ],
    },
    {
      title: "File Input Field",
      content: "The file input for image uploads:",
      explanation: "This special input field handles file selection and is configured to accept only image files.",
      code: `<Form.Group>
  <Form.Label>Image</Form.Label>
  <Form.Control
    type="file"
    name="itemImage"
    onChange={handleChange}
    accept="image/*"
  />
</Form.Group>`,
      breakdown: [
        "type='file': Creates a file selection input",
        "name='itemImage': Identifies this field in the form data",
        "accept='image/*': Restricts selection to image files only",
        "onChange: Handles file selection with special logic"
      ],
    },
    {
      title: "Items Table Display",
      content: "The table that displays all items:",
      explanation: "This section renders a responsive table showing all items with their details and action buttons.",
      code: `<Table striped bordered hover>
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
        {/* Table cells for each item */}
      </tr>
    ))}
  </tbody>
</Table>`,
      breakdown: [
        "Table: Bootstrap table component with styling",
        "striped, bordered, hover: Table styling options",
        "thead/tbody: Proper table structure",
        "items.map(): Iterates through items array to create rows",
        "key={item._id}: Unique key for each table row"
      ],
    },
    {
      title: "Image Display in Table",
      content: "Displaying item images in the table:",
      explanation: "This code renders the uploaded images in the table by constructing the proper URL to access them.",
      code: `<td>
  <img
    src={\`https://ligand-software-solutions-workshop-2.onrender.com/uploads/\${item.itemImage}\`}
    alt={item.itemName}
    width="50"
  />
</td>`,
      breakdown: [
        "src: Constructs URL to access uploaded images from the backend",
        "alt: Provides alternative text for accessibility",
        "width: Controls the display size of the image",
        "item.itemImage: The filename stored in the database"
      ],
    },
    
  ];

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>Item Frontend Guide</h1>
        <p>Follow these steps to create a complete item management interface with React</p>
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
    </div>
  );
};

export default ItemFrontend;