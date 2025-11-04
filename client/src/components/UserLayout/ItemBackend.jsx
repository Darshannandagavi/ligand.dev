import React, { useState } from 'react';

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
      content: "The Item model defines the structure for item data in the database.",
      explanation: "This model specifies what fields an item document should have, their data types, and any validation rules. It includes timestamps for automatic creation and update tracking.",
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
        "timestamps: true automatically adds createdAt and updatedAt fields"
      ]
    },
    {
      title: "File Upload Middleware (middlewares/upload.js)",
      content: "This middleware handles file uploads using multer.",
      explanation: "The upload middleware configures multer to store uploaded files in a specific directory with unique filenames. It ensures the uploads directory exists and handles file storage configuration.",
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
        "filename: Generates unique filenames using current timestamp and original extension"
      ]
    },
    {
      title: "Item Controller (controllers/ItemController.js)",
      content: "The controller contains all the business logic for item CRUD operations.",
      explanation: "This controller handles creating, reading, updating, and deleting items. It processes incoming requests, interacts with the database through the Item model, and sends appropriate responses.",
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
          details: "Extracts data from request body and file, validates required fields, creates new item, and saves to database"
        },
        {
          name: "getItems",
          purpose: "Retrieves all items from the database",
          details: "Uses Item.find() to get all items without population (as indicated by the comment)"
        },
        {
          name: "getItemById",
          purpose: "Retrieves a specific item by its ID",
          details: "Uses Item.findById() to find a single item and returns 404 if not found"
        },
        {
          name: "updateItem",
          purpose: "Updates an existing item, optionally with a new image",
          details: "Handles partial updates, including file upload if provided, and returns the updated item"
        },
        {
          name: "deleteItem",
          purpose: "Deletes an item from the database",
          details: "Finds item by ID and removes it, returns success message or 404 if not found"
        }
      ]
    },
    {
      title: "Item Router (routes/itemRouter.js)",
      content: "The router defines the API endpoints for item operations.",
      explanation: "This router maps HTTP requests to the appropriate controller functions and applies middleware for file uploads where needed.",
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
          purpose: "Create a new item with image upload"
        },
        {
          method: "GET",
          path: "/",
          middleware: "None",
          controller: "getItems",
          purpose: "Get all items"
        },
        {
          method: "GET",
          path: "/:id",
          middleware: "None",
          controller: "getItemById",
          purpose: "Get a specific item by ID"
        },
        {
          method: "PUT",
          path: "/:id",
          middleware: "upload.single('itemImage')",
          controller: "updateItem",
          purpose: "Update an item, optionally with new image"
        },
        {
          method: "DELETE",
          path: "/:id",
          middleware: "None",
          controller: "deleteItem",
          purpose: "Delete an item by ID"
        }
      ]
    },
    {
      title: "Server Configuration (index.js)",
      content: "Configuring the server to use the item router and serve uploaded files.",
      explanation: "This setup connects the item router to the Express application and configures static file serving for uploaded images.",
      code: `app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/item", itemRouter);`,
      image: "/server-config.png",
      configuration: [
        {
          line: "app.use('/uploads', express.static(...))",
          purpose: "Serves uploaded files statically from the 'uploads' directory",
          details: "Allows clients to access uploaded images via URLs like https://ligand-software-solutions-workshop-2.onrender.com/uploads/filename.jpg"
        },
        {
          line: "app.use('/item', itemRouter)",
          purpose: "Mounts the item router at the '/item' base path",
          details: "All item routes will be prefixed with '/item', so createItem becomes POST /item, getItems becomes GET /item, etc."
        }
      ]
    },
    {
      title: "Folder Structure",
      content: "Recommended folder structure for the item backend implementation.",
      explanation: "This shows how to organize your files for the item management system with image uploads.",
      image: "/Folder Structures.png",
      structure: [
        "models/Item.js - Mongoose model for items",
        "middlewares/upload.js - Multer configuration for file uploads",
        "controllers/ItemController.js - Business logic for item operations",
        "routes/itemRouter.js - API route definitions",
        "uploads/ - Directory for storing uploaded images (created automatically)"
      ]
    },
    
    
  ];

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>Item Backend Guide</h1>
        <p>Follow these steps to set up your Node.js backend with item management and image uploads</p>
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
                    <p><strong>Purpose:</strong> {func.purpose}</p>
                    <p><strong>Details:</strong> {func.details}</p>
                  </div>
                ))}
              </div>
            )}
            
            {step.endpoints && (
              <div className="endpoints-list">
                <h4>API Endpoints:</h4>
                {step.endpoints.map((endpoint, i) => (
                  <div key={i} className="endpoint-item">
                    <h5>{endpoint.method} {endpoint.path}</h5>
                    <p><strong>Middleware:</strong> {endpoint.middleware}</p>
                    <p><strong>Controller:</strong> {endpoint.controller}</p>
                    <p><strong>Purpose:</strong> {endpoint.purpose}</p>
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
                    <p><strong>Purpose:</strong> {config.purpose}</p>
                    <p><strong>Details:</strong> {config.details}</p>
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
            
            {step.testing && (
              <div className="testing-list">
                <h4>API Testing:</h4>
                {step.testing.map((test, i) => (
                  <div key={i} className="test-item">
                    <h5>{test.method} {test.endpoint}</h5>
                    <p><strong>Body:</strong> {test.body}</p>
                    <p><strong>Notes:</strong> {test.notes}</p>
                  </div>
                ))}
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

            {step.image && (
              <div className="image-placeholder">
                <div className="image-container">
                  <img src={step.image} alt={step.title} className="step-image" />
                </div>
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
            
            
          </div>
        ))}
      </div>

      <div className="notes-footer">
        <p>Join us for Programming, Coding, Project Training and Internship opportunities.</p>
        <p>Let's learn, code and build together.</p>
      </div>
      <style>{`
      
.notes-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
}

.notes-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eaeaea;
}

.notes-header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.company-info {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  text-align: center;
}

.company-info h2 {
  color: #3498db;
  margin-bottom: 10px;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.step-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.step-card:hover {
  transform: translateY(-3px);
}

.step-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eaeaea;
}

.code-block {
  position: relative;
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 5px;
  margin: 15px 0;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  white-space: pre-wrap;
}

.code-block code {
  font-family: 'Consolas', 'Monaco', monospace;
}

.copy-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background-color 0.2s;
}

.copy-btn:hover {
  background-color: #2980b9;
}

.copy-btn.copied {
  background-color: #27ae60;
}

.image-placeholder {
  margin: 15px 0;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 5px;
  text-align: center;
}

.image-container {
  margin-top: 10px;
  padding: 20px;
  background-color: #e0e0e0;
  border: 2px dashed #a0a0a0;
  border-radius: 5px;
}

.step-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.notes-footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 2px solid #eaeaea;
  text-align: center;
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .notes-container {
    padding: 15px;
  }
  
  .step-card {
    padding: 15px;
  }
}
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

export default ItemBackend;