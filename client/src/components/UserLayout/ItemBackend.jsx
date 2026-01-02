import React, { useState } from "react";

const ItemBackend = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: "Item Model (models/Item.js)",
      content:
        "The Item model defines the structure for item data in the database.",
      explanation:
        "This model specifies what fields an item document should have, their data types, and any validation rules. It includes timestamps for automatic creation and update tracking.",
      image: "/create itemjs.png",
      code: `import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    itemImage: {
      type: String, // we'll store image filename or path
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export { Item };`,
      image: "/create itemjs.png",
      breakdown: [
        "itemName: String field for the item name, required and trimmed",
        "itemImage: String field to store image filename or path, required",
        "quantity: Number field with minimum value validation (min: 1)",
        "description: Optional String field for item description",
        "category: String field for item category, required and trimmed",
        "timestamps: true automatically adds createdAt and updatedAt fields",
      ],
    },
    {
      title: "File Upload Middleware (middlewares/upload.js)",
      content: "This middleware handles file uploads using multer.",
      explanation:
        "The upload middleware configures multer to store uploaded files in a specific directory with unique filenames. It ensures the uploads directory exists and handles file storage configuration.",
      code: `import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// uploads inside backend root
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
export default upload;`,
      image: "/upload-middleware.png",
      breakdown: [
        "multer: Middleware for handling multipart/form-data (file uploads)",
        "fileURLToPath and __dirname: Used to get the current directory path in ES modules",
        "uploadDir: Defines the directory where uploaded files will be stored",
        "fs.existsSync and fs.mkdirSync: Ensure the upload directory exists",
        "multer.diskStorage: Configures how files should be stored",
        "destination: Specifies where to store uploaded files",
        "filename: Generates unique filenames using current timestamp and original extension",
      ],
    },
    {
      title: "Item Controller (controllers/ItemController.js)",
      content:
        "The controller contains all the business logic for item CRUD operations.",
      explanation:
        "This controller handles creating, reading, updating, and deleting items. It processes incoming requests, interacts with the database through the Item model, and sends appropriate responses.",
      code: `import { Item } from "../models/Item.js";

// CREATE ITEM
export const createItem = async (req, res) => {
  try {
    const { itemName, quantity, description, category } = req.body;
    const itemImage = req.file ? req.file.filename : null;

    if (!itemImage) {
      return res.status(400).json({ message: "Item image is required" });
    }

    const newItem = new Item({
      itemName,
      itemImage,
      quantity,
      description,
      category,
    });

    await newItem.save();
    res
      .status(201)
      .json({ message: "Item created successfully", item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Error creating item", error });
  }
};

// GET ALL ITEMS
export const getItems = async (req, res) => {
  try {
    const items = await Item.find(); // ❌ remove populate
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

// GET ITEM BY ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id); // ❌ no populate
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: "Error fetching item", error });
  }
};

// UPDATE ITEM
export const updateItem = async (req, res) => {
  try {
    const { itemName, quantity, description, category } = req.body;
    let updateData = { itemName, quantity, description, category };

    if (req.file) {
      updateData.itemImage = req.file.filename;
    }

    const item = await Item.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
};

// DELETE ITEM
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};`,
      image: "/item-controller.png",
      functions: [
        {
          name: "createItem",
          purpose: "Handles creating new items with image upload",
          details:
            "Extracts data from request body and file, validates required fields, creates new item, and saves to database",
        },
        {
          name: "getItems",
          purpose: "Retrieves all items from the database",
          details:
            "Uses Item.find() to get all items without population (as indicated by the comment)",
        },
        {
          name: "getItemById",
          purpose: "Retrieves a specific item by its ID",
          details:
            "Uses Item.findById() to find a single item and returns 404 if not found",
        },
        {
          name: "updateItem",
          purpose: "Updates an existing item, optionally with a new image",
          details:
            "Handles partial updates, including file upload if provided, and returns the updated item",
        },
        {
          name: "deleteItem",
          purpose: "Deletes an item from the database",
          details:
            "Finds item by ID and removes it, returns success message or 404 if not found",
        },
      ],
    },
    {
      title: "Item Router (routes/itemRouter.js)",
      content: "The router defines the API endpoints for item operations.",
      explanation:
        "This router maps HTTP requests to the appropriate controller functions and applies middleware for file uploads where needed.",
      code: `import express from "express";
import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  updateItem,
} from "../controllers/ItemController.js";
import upload from "../middlewares/upload.js";

const itemRouter = express.Router();

itemRouter.post("/", upload.single("itemImage"), createItem);
itemRouter.get("/", getItems);
itemRouter.get("/:id", getItemById);
itemRouter.put("/:id", upload.single("itemImage"), updateItem);
itemRouter.delete("/:id", deleteItem);

export default itemRouter;`,
      image: "/item-router.png",
      endpoints: [
        {
          method: "POST",
          path: "/",
          middleware: "upload.single('itemImage')",
          controller: "createItem",
          purpose: "Create a new item with image upload",
        },
        {
          method: "GET",
          path: "/",
          middleware: "None",
          controller: "getItems",
          purpose: "Get all items",
        },
        {
          method: "GET",
          path: "/:id",
          middleware: "None",
          controller: "getItemById",
          purpose: "Get a specific item by ID",
        },
        {
          method: "PUT",
          path: "/:id",
          middleware: "upload.single('itemImage')",
          controller: "updateItem",
          purpose: "Update an item, optionally with new image",
        },
        {
          method: "DELETE",
          path: "/:id",
          middleware: "None",
          controller: "deleteItem",
          purpose: "Delete an item by ID",
        },
      ],
    },
    {
      title: "Server Configuration (index.js)",
      content:
        "Configuring the server to use the item router and serve uploaded files.",
      explanation:
        "This setup connects the item router to the Express application and configures static file serving for uploaded images.",
      code: `app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/item", itemRouter);`,
      image: "/server-config.png",
      configuration: [
        {
          line: "app.use('/uploads', express.static(...))",
          purpose:
            "Serves uploaded files statically from the 'uploads' directory",
          details:
            "Allows clients to access uploaded images via URLs like https://ligand-software-solutions-workshop-2.onrender.com/uploads/filename.jpg",
        },
        {
          line: "app.use('/item', itemRouter)",
          purpose: "Mounts the item router at the '/item' base path",
          details:
            "All item routes will be prefixed with '/item', so createItem becomes POST /item, getItems becomes GET /item, etc.",
        },
      ],
    },
    {
      title: "Folder Structure",
      content:
        "Recommended folder structure for the item backend implementation.",
      explanation:
        "This shows how to organize your files for the item management system with image uploads.",
      image: "/Folder Structures.png",
      structure: [
        "models/Item.js - Mongoose model for items",
        "middlewares/upload.js - Multer configuration for file uploads",
        "controllers/ItemController.js - Business logic for item operations",
        "routes/itemRouter.js - API route definitions",
        "uploads/ - Directory for storing uploaded images (created automatically)",
      ],
    },
  ];

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>Item Backend Guide</h1>
        <p>
          Follow these steps to set up your Node.js backend with item management
          and image uploads
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
                <ul>
                  {step.breakdown.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {step.functions && (
              <div className="functions-list">
                <h4>Controller Functions:</h4>
                {step.functions.map((func, i) => (
                  <div key={i} className="function-item">
                    <h5>{func.name}</h5>
                    <p>
                      <strong>Purpose:</strong> {func.purpose}
                    </p>
                    <p>
                      <strong>Details:</strong> {func.details}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {step.endpoints && (
              <div className="endpoints-list">
                <h4>API Endpoints:</h4>
                {step.endpoints.map((endpoint, i) => (
                  <div key={i} className="endpoint-item">
                    <h5>
                      {endpoint.method} {endpoint.path}
                    </h5>
                    <p>
                      <strong>Middleware:</strong> {endpoint.middleware}
                    </p>
                    <p>
                      <strong>Controller:</strong> {endpoint.controller}
                    </p>
                    <p>
                      <strong>Purpose:</strong> {endpoint.purpose}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {step.configuration && (
              <div className="configuration-list">
                <h4>Server Configuration:</h4>
                {step.configuration.map((config, i) => (
                  <div key={i} className="config-item">
                    <h5>{config.line}</h5>
                    <p>
                      <strong>Purpose:</strong> {config.purpose}
                    </p>
                    <p>
                      <strong>Details:</strong> {config.details}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {step.structure && (
              <div className="structure-list">
                <h4>Folder Structure:</h4>
                <ul>
                  {step.structure.map((item, i) => (
                    <li key={i}>{item}</li>
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
          </div>
        ))}
      </div>

      {/* Homework Section - Added exactly like RegistrationFrontend */}
      <div className="home-work-section">
        <div className="home-work-card">
          <div className="home-work-header">
            <h2>Homework Assignment</h2>
            <div className="difficulty-badge">Intermediate Level</div>
          </div>

          <div className="home-work-content">
            <h3>Develop Employee Backend CRUD Operations</h3>

            <div className="objective-section">
              <h4>Objective</h4>
              <p>
                Create a complete Employee backend system with CRUD operations
                following the same patterns and structure as the Item backend we
                just built. The employee system should handle employee data with
                image uploads.
              </p>
            </div>

            <div className="requirements-section">
              <h4>Requirements</h4>
              <ul>
                <li>
                  Create Employee Model with fields: employeeName,
                  employeeImage, position, department, salary, email, phone,
                  hireDate, address
                </li>
                <li>Implement Employee Controller with all CRUD operations</li>
                <li>Create Employee Router with proper endpoints</li>
                <li>Add file upload functionality for employee images</li>
                <li>Implement proper error handling and validation</li>
                <li>Test all endpoints using Postman</li>
                <li>Ensure email field is unique</li>
                <li>Add proper validation for all fields</li>
              </ul>
            </div>

            <div className="reference-section">
              <h4>Expected Output</h4>

              {/* <div className="reference-grid">
                <div className="reference-item">
                  <div className="image-container">
                    <img 
                      src="/homework/employee-model.png" 
                      alt="Employee Model Structure" 
                    />
                  </div>
                  <p>Employee Model Structure</p>
                </div>
                
                <div className="reference-item">
                  <div className="image-container">
                    <img 
                      src="/homework/postman-testing.png" 
                      alt="Postman Testing" 
                    />
                  </div>
                  <p>Postman API Testing</p>
                </div>
              </div> */}
              <div style={{ margin: "35px 0" }}>
              <iframe
                width="100%"
                height="515"
                src="https://www.youtube.com/embed/RiTLRqMirOQ?si=UMuej_k0Zm_XJYvi"
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

      <div className="notes-footer">
        <p>
          Join us for Programming, Coding, Project Training and Internship
          opportunities.
        </p>
        <p>Let's learn, code and build together.</p>
      </div>

      <style>{`
        .notes-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
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
        .functions-list,
        .endpoints-list,
        .configuration-list,
        .structure-list {
          background: white;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          margin: 16px 0;
        }

        .function-item,
        .endpoint-item,
        .config-item {
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
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .code-block code {
          color: #e2e8f0;
          padding: 20px;
          display: block;
          overflow-x: auto;
          font-family: 'Fira Code', 'Consolas', monospace;
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
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
        .bonus-section {
          margin-bottom: 30px;
        }

        .objective-section h4,
        .requirements-section h4,
        .reference-section h4,
        .submission-section h4,
        .bonus-section h4 {
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

export default ItemBackend;
