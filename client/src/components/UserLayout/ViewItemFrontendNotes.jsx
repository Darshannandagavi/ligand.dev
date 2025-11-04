import React, { useState } from 'react';
import './MyNotes.css';

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
      content: "The ViewItem component displays inventory items with animations, modals, and responsive design.",
      explanation: "This component fetches and displays items from the backend API with a visually appealing card layout, image modals, and smooth animations.",
    },
    {
      title: "Create new file called ViewItem.jsx in UserLayout folder",
      content: "",
      explanation: "",
    image: "/viewitem file craetions.png"

    },
    {
      title: "Complete ViewItem Component Code",
      content: "Full implementation of the ViewItem component:",
      explanation: "This component combines React hooks, API calls, animations, and responsive design to create an engaging inventory display.",
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
      image: "/viewitem-code.png"
    },
    {
      title: "ViewItem - Import Statements",
      content: "Understanding the import statements:",
      explanation: "These imports bring in the necessary components, libraries, and styles for the ViewItem functionality.",
      code: `import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";`,
      breakdown: [
        "React, useState, useEffect: Core React hooks for state and lifecycle management",
        "Container, Row, Col, Modal, Button: Bootstrap components for layout and UI",
        "axios: HTTP client for API requests",
        "motion: Framer Motion for animations",
        "AOS: Animate On Scroll library for scroll-triggered animations"
      ],
    },
    {
      title: "ViewItem - State Management",
      content: "State initialization for component data:",
      explanation: "This state manages the items data, selected image, and modal visibility.",
      code: `const [items, setItems] = useState([]);
const [selectedImage, setSelectedImage] = useState(null);
const [showModal, setShowModal] = useState(false);`,
      breakdown: [
        "items: Array to store fetched items from the API",
        "setItems: Function to update the items state",
        "selectedImage: Stores the URL of the currently selected image",
        "setSelectedImage: Function to update the selected image",
        "showModal: Boolean to control modal visibility",
        "setShowModal: Function to show/hide the modal"
      ],
    },
    {
      title: "ViewItem - useEffect Hook",
      content: "Initialization and data fetching when component mounts:",
      explanation: "This effect runs once when the component loads to initialize animations and fetch items.",
      code: `useEffect(() => {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
  });
  fetchItems();
}, []);`,
      breakdown: [
        "AOS.init(): Initializes the Animate On Scroll library with configuration",
        "duration: 1000: Animation duration in milliseconds",
        "easing: 'ease-in-out': Animation easing function",
        "once: true: Animations trigger only once",
        "fetchItems(): Calls the function to fetch items from API",
        "Empty dependency array []: Ensures the effect runs only once on mount"
      ],
    },
    {
      title: "ViewItem - fetchItems Function",
      content: "API call to fetch items from the backend:",
      explanation: "This asynchronous function makes a GET request to retrieve items from the server.",
      code: `const fetchItems = async () => {
  try {
    const response = await axios.get("https://ligand-software-solutions-workshop-2.onrender.com/item");
    setItems(response.data.items);
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};`,
      breakdown: [
        "async: Marks the function as asynchronous",
        "try/catch: Error handling for the API request",
        "axios.get(): Makes a GET request to the specified URL",
        "setItems(response.data.items): Updates state with fetched items",
        "console.error(): Logs any errors that occur during the request"
      ],
    },
    {
      title: "ViewItem - Image Click Handler",
      content: "Handling image clicks to show modal:",
      explanation: "This function sets the selected image and opens the modal when an item image is clicked.",
      code: `const handleImageClick = (imageUrl) => {
  setSelectedImage(imageUrl);
  setShowModal(true);
};`,
      breakdown: [
        "imageUrl: Parameter containing the URL of the clicked image",
        "setSelectedImage(imageUrl): Updates state with the clicked image URL",
        "setShowModal(true): Opens the modal to display the image"
      ],
    },
    {
      title: "ViewItem - Modal Close Handler",
      content: "Handling modal closure:",
      explanation: "This function closes the modal and resets the selected image.",
      code: `const handleCloseModal = () => {
  setShowModal(false);
  setSelectedImage(null);
};`,
      breakdown: [
        "setShowModal(false): Closes the modal",
        "setSelectedImage(null): Clears the selected image from state"
      ],
    },
    {
      title: "ViewItem - Animation Variants",
      content: "Framer Motion animation configuration:",
      explanation: "This object defines the animation states for the item cards.",
      code: `const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};`,
      breakdown: [
        "cardVariants: Object containing animation states",
        "hidden: Initial state (invisible and positioned 50px down)",
        "visible: Final state (fully visible and in normal position)",
        "transition: Specifies animation duration and properties"
      ],
    },
    {
      title: "ViewItem - Component Structure",
      content: "Understanding the component's JSX structure:",
      explanation: "The component returns a Container with a title, Row of item cards, and a Modal for image viewing.",
      breakdown: [
        "Container: Bootstrap container for proper layout",
        "h2: Section title with AOS animation attribute",
        "Row: Bootstrap row to contain item columns",
        "Col: Bootstrap columns for responsive grid layout",
        "motion.div: Animated card container with Framer Motion",
        "item-image-container: Clickable image with overlay",
        "item-details: Container for item information",
        "Modal: Bootstrap modal for full-size image viewing"
      ],
    },
    {
      title: "ViewItem - Item Mapping",
      content: "Rendering items using map function:",
      explanation: "The items array is mapped to create a card for each item with proper data binding.",
      code: `{items.map((item, index) => (
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
      {/* Item content */}
    </motion.div>
  </Col>
))}`,
      breakdown: [
        "items.map(): Iterates over items array",
        "key={item._id}: Unique key for each item for React optimization",
        "md={6} lg={4}: Responsive column sizing (2 columns on medium, 3 on large)",
        "className='mb-4': Bottom margin for spacing",
        "variants={cardVariants}: Framer Motion animation variants",
        "initial='hidden': Starting animation state",
        "animate='visible': Target animation state",
        "transition={{ delay: index * 0.1 }}: Staggered animation delay",
        "data-aos='fade-up': AOS animation type",
        "data-aos-delay={index * 100}: Staggered AOS animation delay"
      ],
    },
    {
      title: "ViewItem - Image Container",
      content: "Image container with click handler and overlay:",
      explanation: "This section creates the clickable image with hover effects and overlay text.",
      code: `<div
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
</div>`,
      breakdown: [
        "item-image-container: Wrapper div with click handler",
        "onClick: Calls handleImageClick with the image URL",
        "img: Displays the item image",
        "src: Dynamic URL construction using template literal",
        "alt: Accessibility attribute with item name",
        "image-overlay: Semi-transparent overlay that appears on hover",
        "view-text: Instruction text shown on overlay"
      ],
      image: "/media/viewitem-imagecontainer.png"
    },
    {
      title: "ViewItem - Item Details",
      content: "Item information display:",
      explanation: "This section displays the item name, description, and metadata.",
      code: `<div className="item-details">
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
</div>`,
      breakdown: [
        "item-details: Container for item information",
        "item-name: Item name heading",
        "item-description: Item description paragraph",
        "item-meta: Container for metadata (quantity and category)",
        "meta-item: Individual metadata item container",
        "meta-label: Label for metadata (e.g., 'Quantity:')",
        "meta-value: Value of metadata (e.g., actual quantity)",
        "item.category?.name || item.category: Handles both populated category objects and simple category strings"
      ],
      image: "/media/viewitem-details.png"
    },
    {
      title: "ViewItem - Image Modal",
      content: "Modal for displaying full-size images:",
      explanation: "This Bootstrap modal displays the selected image in full size.",
      code: `<Modal
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
</Modal>`,
      breakdown: [
        "show={showModal}: Controls modal visibility based on state",
        "onHide={handleCloseModal}: Handler for modal close events",
        "centered: Centers the modal vertically",
        "size='lg': Sets the modal to large size",
        "closeButton: Adds a close button to the header",
        "Modal.Title: Sets the modal title",
        "Modal.Body: Container for modal content with centered text",
        "selectedImage &&: Conditional rendering to prevent errors",
        "img-fluid: Bootstrap class for responsive images",
        "Button: Close button with secondary styling"
      ],
    },
    {
      title: "ViewItem - Embedded CSS",
      content: "Component-specific styles using JSX style tag:",
      explanation: "The component includes embedded CSS for styling, providing a self-contained component with its own styles.",
      notes: [
        "All styles are scoped to this component",
        "Uses CSS classes prefixed with component-specific names",
        "Includes responsive design for mobile devices",
        "Uses modern CSS features like Flexbox and transitions",
        "Includes hover effects and animation styles"
      ],
    },
    {
      title: "Implementation Notes",
      content: "Important considerations when implementing the ViewItem component:",
      explanation: "These notes cover best practices and potential improvements for the ViewItem component.",
      notes: [
        "API URL: Consider using environment variables for the API base URL",
        "Error handling: Enhance error handling with user-friendly messages",
        "Loading states: Add loading indicators while fetching data",
        "Empty state: Handle empty items array with a friendly message",
        "Image optimization: Consider implementing lazy loading for images",
        "Pagination: For large inventories, implement pagination or infinite scroll",
        "Accessibility: Ensure proper ARIA attributes for screen readers"
      ],
    }
  ];

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>ViewItem Component Guide</h1>
        <p>Learn how to implement an inventory display component with animations and modals</p>
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

export default ViewItemFrontendNotes;