import React, { useState } from "react";
import "./Chapter4.css";

const Chapter4 = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const htmlExample = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Webpage</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
  </header>
  <main>
    <section class="name">
      <h2>About Me</h2>
      <p>This is the about section of my webpage.</p>
    </section>
  </main>
  <footer>
    <p>&copy; 2024 My Webpage</p>
  </footer>
</body>
</html>`;

  const jsxExample = `import React from 'react';

function App() {
  return (
    <div>
      <header>
        <h1>Welcome to My React App</h1>
      </header>
      <main>
        <p>This is a paragraph inside the main section of the app.</p>
      </main>
      <footer>
        <p>&copy; 2024 My React App</p>
      </footer>
    </div>
  );
}

export default App;`;

  const cssExample = `// In styles.css
.container {
  background-color: lightblue;
  padding: 20px;
}

// In React component
import React from 'react';
import './styles.css';

function App() {
  return (
    <div className="container">
      <h1>Hello, World!</h1>
    </div>
  );
}

export default App;`;

  const inlineStyleExample = `function App() {
  const headingStyle = {
    color: 'blue',
    fontSize: '24px',
  };

  return (
    <h1 style={headingStyle}>Hello, World!</h1>
  );
}

export default App;`;

  const inlineStyleExample2 = `// In App.js
import React from 'react';

function App() {
  return (
    <div >
      <h1 style={{ color: "darkblue", fontSize: "24px" }}> Inline Styles in React </h1>
      <p style={{ color: "gray", fontSize: "18px" }}> This paragraph is styled using inline styles. </p>
    </div>
  );
}

export default App;`;

  const bootstrapButtonExample = `import React from 'react';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
    </div>
  );
}

export default App;`;

  const bootstrapNavbarExample = `import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function App() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default App;`;

  const bootstrapFormExample = `import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default App;`;

  const gridExample = `import { Container, Row, Col } from 'react-bootstrap';

function MyGrid() {
  return (
    <Container>
      <Row>
        <Col md={6} sm={12} className="bg-primary text-white p-3">
          Column 1 (50% on medium, 100% on small screens)
        </Col>
        <Col md={6} sm={12} className="bg-secondary text-white p-3">
          Column 2 (50% on medium, 100% on small screens)
        </Col>
      </Row>
    </Container>
  );
}

export default MyGrid;`;

  const indexHtmlExample = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`;

  const indexJsExample = `import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);`;

  return (
    <div className="chapter-container">
      <div className="chapter-header">
        <h1>Chapter 4: HTML, CSS, and Bootstrap in React Development</h1>
        <p className="chapter-subtitle">
          Mastering styling and layout in React applications
        </p>
      </div>

      <div className="content-section">
        <h2>Agenda</h2>
        <ol className="agenda-list">
          <li>
            <strong>Introduction to HTML, CSS, and Bootstrap in React</strong>
            <ul>
              <li>
                Overview of the importance of HTML, CSS, and Bootstrap in
                building React applications.
              </li>
              <li>How these technologies integrate with React.</li>
            </ul>
          </li>
          <li>
            <strong>HTML in React</strong>
            <ul>
              <li>What is HTML in the context of React?</li>
              <li>Key differences between regular HTML and JSX in React.</li>
              <li>Embedding HTML in React components.</li>
            </ul>
          </li>
          <li>
            <strong>CSS in React</strong>
            <ul>
              <li>Understanding CSS in React applications.</li>
              <li>Using external CSS, inline styles, and CSS Modules.</li>
              <li>
                Managing CSS with React components for better maintainability
                and scalability.
              </li>
            </ul>
          </li>
          <li>
            <strong>Bootstrap in React</strong>
            <ul>
              <li>
                Introduction to Bootstrap and why it's commonly used with React.
              </li>
              <li>
                How to integrate Bootstrap into React applications (via CDN or
                npm).
              </li>
              <li>
                Using Bootstrap components such as buttons, cards, and grid
                systems.
              </li>
              <li>
                Creating responsive layouts with Bootstrap's grid system in
                React.
              </li>
            </ul>
          </li>
          <li>
            <strong>
              Best Practices for HTML, CSS, and Bootstrap in React
            </strong>
            <ul>
              <li>
                Componentizing your layout for better reusability and
                management.
              </li>
              <li>
                Using React-Bootstrap for React-specific Bootstrap components.
              </li>
              <li>Performance optimization in styling React applications.</li>
              <li>
                Using CSS-in-JS libraries (Styled Components, Emotion) for
                advanced styling.
              </li>
            </ul>
          </li>
          <li>
            <strong>Conclusion</strong>
            <ul>
              <li>Recap of key concepts learned.</li>
              <li>How HTML, CSS, and Bootstrap enhance React development.</li>
            </ul>
          </li>
        </ol>
      </div>

      <div className="content-section">
        <h2>What You Will Learn</h2>
        <p>By the end of this chapter, you will be able to:</p>
        <ol>
          <li>
            <strong>Understand the role of HTML in React</strong>: Learn how
            HTML elements are used within React components, with a focus on JSX
            syntax and key differences from traditional HTML.
          </li>
          <li>
            <strong>Style React components with CSS</strong>: Learn various ways
            to apply styles to your React components, including external CSS,
            inline styles, and CSS Modules.
          </li>
          <li>
            <strong>Integrate Bootstrap into your React projects</strong>: Gain
            the ability to use Bootstrap's responsive grid system and pre-built
            UI components (like buttons, cards, and navigation bars) in React.
          </li>
          <li>
            <strong>
              Follow best practices for styling React applications
            </strong>
            : Learn to break your UI into components, manage styles effectively,
            and optimize performance in your React apps.
          </li>
          <li>
            <strong>Build responsive layouts</strong>: Use Bootstrap's grid
            system and media queries to create layouts that adjust seamlessly
            across different screen sizes.
          </li>
          <li>
            <strong>Explore advanced CSS techniques in React</strong>: Learn how
            to implement CSS-in-JS techniques and use libraries like Styled
            Components to enhance the styling of your React components.
          </li>
        </ol>
      </div>

      <div className="content-section">
        <h2>Introduction</h2>
        <p>
          In this chapter, we will explore how <strong>HTML</strong>,{" "}
          <strong>CSS</strong>, and
          <strong>Bootstrap</strong> are used in the context of{" "}
          <strong>React</strong>. While React is a powerful library for building
          dynamic UIs, understanding how to structure and style your components
          using HTML, CSS, and Bootstrap is crucial for creating visually
          appealing and responsive applications. We'll also discuss how to work
          with these technologies efficiently within a React project.
        </p>
      </div>

      <div className="content-section">
        <h2>What is HTML?</h2>
        <p>
          HTML is the standard markup language used to create web pages. It
          defines the structure of a web page by using various elements such as
          headings, paragraphs, links, images, tables, etc. These elements are
          enclosed in tags, which tell the browser how to render content on the
          page.
        </p>
        <p>
          HTML provides the skeleton for a website, organizing the content and
          making it accessible to users. It is the <strong>structure</strong> of
          the website.
        </p>

        <h3>HTML Structure</h3>
        <p>A typical HTML document has the following basic structure:</p>

        <div className="code-block">
          <pre>{htmlExample}</pre>
          <button
            className={`copy-btn ${copiedIndex === "html" ? "copied" : ""}`}
            onClick={() => copyToClipboard(htmlExample, "html")}
          >
            {copiedIndex === "html" ? "Copied!" : "Copy"}
          </button>
        </div>

        <ul>
          <li>
            <strong>DOCTYPE</strong>: Specifies the document type and version of
            HTML.
          </li>
          <li>
            <strong>&lt;html&gt;</strong>: Root element of the document.
          </li>
          <li>
            <strong>&lt;head&gt;</strong>: Contains metadata about the document
            like title, charset, and links to stylesheets.
          </li>
          <li>
            <strong>&lt;body&gt;</strong>: Contains the content of the document
            such as headers, sections, paragraphs, and other content elements.
          </li>
        </ul>

        <h3>HTML Tags</h3>
        <p>HTML consists of different tags such as:</p>
        <ul>
          <li>
            <strong>&lt;h1&gt; to &lt;h6&gt;</strong>: Headings.
          </li>
          <li>
            <strong>&lt;p&gt;</strong>: Paragraphs.
          </li>
          <li>
            <strong>&lt;a&gt;</strong>: Anchor tags for links.
          </li>
          <li>
            <strong>&lt;img&gt;</strong>: Images.
          </li>
          <li>
            <strong>&lt;div&gt;</strong> and <strong>&lt;section&gt;</strong>:
            Block elements to group content.
          </li>
          <li>
            <strong>&lt;video&gt;</strong> <strong>&lt;audio&gt;</strong>
          </li>
        </ul>
      </div>

      <div className="content-section">
        <h2>HTML in React</h2>

        <h3>What is HTML in React?</h3>
        <p>
          In React, we still use <strong>HTML</strong> to structure the content
          of the page, but the syntax is slightly different due to the{" "}
          <strong>JSX</strong> (JavaScript XML) syntax. JSX allows us to write
          HTML-like code directly within JavaScript files.
        </p>

        <h3>Key Differences between HTML and JSX:</h3>
        <ol>
          <li>
            <strong>Class vs className</strong>: In React, class is replaced
            with className because class is a reserved keyword in JavaScript.
            <div className="code-block">
              <pre>{`<div className="container">Hello, World!</div>`}</pre>
              <button
                className={`copy-btn ${
                  copiedIndex === "classname" ? "copied" : ""
                }`}
                onClick={() =>
                  copyToClipboard(
                    '<div className="container">Hello, World!</div>',
                    "classname"
                  )
                }
              >
                {copiedIndex === "classname" ? "Copied!" : "Copy"}
              </button>
            </div>
          </li>
          <li>
            <strong>Self-closing Tags</strong>: In JSX, all self-closing tags
            must have a closing slash (/), such as for &lt;img&gt;, &lt;br&gt;,
            or &lt;input&gt;.
            <div className="code-block">
              <pre>{`<img src="logo.png" alt="logo" />`}</pre>
              <button
                className={`copy-btn ${
                  copiedIndex === "selfclose" ? "copied" : ""
                }`}
                onClick={() =>
                  copyToClipboard(
                    '<img src="logo.png" alt="logo" />',
                    "selfclose"
                  )
                }
              >
                {copiedIndex === "selfclose" ? "Copied!" : "Copy"}
              </button>
            </div>
          </li>
          <li>
            <strong>Event Handling</strong>: In HTML, we use attributes like
            onclick, onchange, etc., but in React, these are written in
            camelCase (e.g., onClick, onChange).
            <div className="code-block">
              <pre>{`<button onClick={handleClick}>Click Me</button>`}</pre>
              <button
                className={`copy-btn ${
                  copiedIndex === "event" ? "copied" : ""
                }`}
                onClick={() =>
                  copyToClipboard(
                    "<button onClick={handleClick}>Click Me</button>",
                    "event"
                  )
                }
              >
                {copiedIndex === "event" ? "Copied!" : "Copy"}
              </button>
            </div>
          </li>
          <li>
            <strong>Embedding Expressions</strong>: In React, JavaScript
            expressions can be embedded inside curly braces {}.
            <div className="code-block">
              <pre>{`const name = "John";
return <h1>Hello, {name}!</h1>;`}</pre>
              <button
                className={`copy-btn ${
                  copiedIndex === "expression" ? "copied" : ""
                }`}
                onClick={() =>
                  copyToClipboard(
                    'const name = "John";\nreturn <h1>Hello, {name}!</h1>;',
                    "expression"
                  )
                }
              >
                {copiedIndex === "expression" ? "Copied!" : "Copy"}
              </button>
            </div>
          </li>
        </ol>

        <h3>Using HTML in React Components</h3>
        <p>
          HTML tags and structure are embedded directly within React components
          using JSX. The example below shows how you can write HTML inside a
          React component:
        </p>

        <div className="code-block">
          <pre>{jsxExample}</pre>
          <button
            className={`copy-btn ${copiedIndex === "jsx" ? "copied" : ""}`}
            onClick={() => copyToClipboard(jsxExample, "jsx")}
          >
            {copiedIndex === "jsx" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="content-section">
        <h2>CSS in React</h2>

        <h3>What is CSS in React?</h3>
        <p>
          In React, CSS is used to style the components, just like in regular
          HTML applications. However, React introduces some new ways of managing
          CSS:
        </p>
        <ol>
          <li>
            <strong>External Stylesheets</strong>: You can use traditional
            external CSS files to style React components.
          </li>
          <li>
            <strong>Inline Styles</strong>: You can use inline styles in JSX,
            where CSS properties are written in camelCase and values are
            strings.
          </li>
          <li>
            <strong>CSS Modules</strong>: These allow you to create locally
            scoped styles, ensuring that CSS styles don't leak between
            components.
          </li>
          <li>
            <strong>Styled Components</strong>: This is a modern technique that
            allows you to write component-level styles using JavaScript.
          </li>
        </ol>

        <h3>Using External CSS in React</h3>
        <p>To use an external CSS file in React:</p>
        <ol>
          <li>Create a CSS file (e.g., styles.css).</li>
          <li>Import the CSS file into your React component.</li>
        </ol>
        <p>Example:</p>

        <div className="code-block">
          <pre>{cssExample}</pre>
          <button
            className={`copy-btn ${copiedIndex === "css" ? "copied" : ""}`}
            onClick={() => copyToClipboard(cssExample, "css")}
          >
            {copiedIndex === "css" ? "Copied!" : "Copy"}
          </button>
        </div>

        <h3>Using Internal Styles in React</h3>
        <p>
          You can define inline styles directly within JSX using the style
          attribute. Styles are written in JavaScript object notation (camelCase
          for properties).
        </p>
        <p>Example:</p>

        <div className="code-block">
          <pre>{inlineStyleExample}</pre>
          <button
            className={`copy-btn ${copiedIndex === "inline" ? "copied" : ""}`}
            onClick={() => copyToClipboard(inlineStyleExample, "inline")}
          >
            {copiedIndex === "inline" ? "Copied!" : "Copy"}
          </button>
        </div>

        <h3>Inline Styles Example:</h3>

        <div className="code-block">
          <pre>{inlineStyleExample2}</pre>
          <button
            className={`copy-btn ${copiedIndex === "inline2" ? "copied" : ""}`}
            onClick={() => copyToClipboard(inlineStyleExample2, "inline2")}
          >
            {copiedIndex === "inline2" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="content-section">
        <h2>Bootstrap in React</h2>

        <h3>What is Bootstrap?</h3>
        <p>
          <strong>Bootstrap</strong> is a popular CSS framework that provides
          ready-made, responsive design components such as buttons, navigation
          bars, grids, forms, and more. It's designed to help developers quickly
          create clean and modern web designs without needing to write all the
          CSS from scratch.
        </p>
        <p>
          React-Bootstrap is a library that provides Bootstrap components as
          React components, making it easier to integrate Bootstrap's styling
          and functionality into React projects. Here's an overview of the
          basics:
        </p>

        <h3>1. Installation</h3>
        <p>Install both react-bootstrap and bootstrap:</p>
        <div className="code-block">
          <pre>npm install react-bootstrap bootstrap</pre>
          <button
            className={`copy-btn ${copiedIndex === "install" ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(
                "npm install react-bootstrap bootstrap",
                "install"
              )
            }
          >
            {copiedIndex === "install" ? "Copied!" : "Copy"}
          </button>
        </div>

        <h3>2. Include Bootstrap CSS</h3>
        <p>Import Bootstrap's CSS in your src/index.js or App.js:</p>
        <div className="code-block">
          <pre>import 'bootstrap/dist/css/bootstrap.min.css';</pre>
          <button
            className={`copy-btn ${copiedIndex === "import" ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(
                `import 'bootstrap/dist/css/bootstrap.min.css';`,
                "import"
              )
            }
          >
            {copiedIndex === "import" ? "Copied!" : "Copy"}
          </button>
        </div>

        <h3>3. Using React-Bootstrap Components</h3>
        <p>
          React-Bootstrap offers React components that correspond to Bootstrap's
          UI components. Here are some examples:
        </p>

        <h4>Buttons</h4>
        <div className="code-block">
          <pre>{bootstrapButtonExample}</pre>
          <button
            className={`copy-btn ${copiedIndex === "buttons" ? "copied" : ""}`}
            onClick={() => copyToClipboard(bootstrapButtonExample, "buttons")}
          >
            {copiedIndex === "buttons" ? "Copied!" : "Copy"}
          </button>
        </div>

        <h4>Navbar</h4>
        <div className="code-block">
          <pre>{bootstrapNavbarExample}</pre>
          <button
            className={`copy-btn ${copiedIndex === "navbar" ? "copied" : ""}`}
            onClick={() => copyToClipboard(bootstrapNavbarExample, "navbar")}
          >
            {copiedIndex === "navbar" ? "Copied!" : "Copy"}
          </button>
        </div>

        <h4>Forms</h4>
        <div className="code-block">
          <pre>{bootstrapFormExample}</pre>
          <button
            className={`copy-btn ${copiedIndex === "forms" ? "copied" : ""}`}
            onClick={() => copyToClipboard(bootstrapFormExample, "forms")}
          >
            {copiedIndex === "forms" ? "Copied!" : "Copy"}
          </button>
        </div>

        <h3>React Bootstrap Grid</h3>
        <p>
          React Bootstrap provides a <strong>flexible grid system</strong> based
          on <strong>Bootstrap's grid</strong>, making it easier to create
          responsive layouts in React applications.
        </p>

        <h4>Basic Structure</h4>
        <p>
          The grid system consists of <strong>three main components:</strong>
        </p>
        <ol>
          <li>Container -- Wraps the grid layout</li>
          <li>Row -- Creates a horizontal row</li>
          <li>Col -- Defines column sizes</li>
        </ol>

        <h4>Code Example</h4>
        <div className="code-block">
          <pre>{gridExample}</pre>
          <button
            className={`copy-btn ${copiedIndex === "grid" ? "copied" : ""}`}
            onClick={() => copyToClipboard(gridExample, "grid")}
          >
            {copiedIndex === "grid" ? "Copied!" : "Copy"}
          </button>
        </div>

        <h4>Grid Concepts</h4>
        <ul>
          <li>
            ✅ <strong>12-column layout</strong> → The grid is divided into 12
            parts.
          </li>
          <li>
            ✅ <strong>Responsive design</strong> → Uses breakpoints (sm, md,
            lg, xl).
          </li>
          <li>
            ✅ <strong>Auto Layout</strong> → Columns adjust automatically if no
            size is given.
          </li>
          <li>
            ✅ <strong>Nested Rows</strong> → Rows can be nested inside columns
            for complex layouts.
          </li>
        </ul>

        <h4>Column Sizing</h4>
        <ul>
          <li>
            <strong>Equal Columns:</strong> &lt;Col&gt; (auto-distribute space)
          </li>
          <li>
            <strong>Fixed Width:</strong> &lt;Col md={4}&gt; (4/12 width on
            medium screens)
          </li>
          <li>
            <strong>Offset Columns:</strong> &lt;Col md=&#123;&#123; span: 4,
            offset: 2 &#125;&#125;&gt; (offset by 2 columns)
          </li>
        </ul>

        <h4>Responsive Breakpoints</h4>
        <ul>
          <li>xs (Extra small) → &lt;576px</li>
          <li>sm (Small) → ≥576px</li>
          <li>md (Medium) → ≥768px</li>
          <li>lg (Large) → ≥992px</li>
          <li>xl (Extra large) → ≥1200px</li>
        </ul>

        <h4>Why Use React Bootstrap Grid?</h4>
        <ul>
          <li>
            ✔ <strong>Easy to use in React</strong>
          </li>
          <li>
            ✔ <strong>Prebuilt responsiveness</strong>
          </li>
          <li>
            ✔ <strong>Lightweight & customizable</strong>
          </li>
          <li>
            ✔ <strong>Consistent with Bootstrap styling</strong>
          </li>
        </ul>
      </div>

      <div className="content-section">
        <h2>Understanding JSX in React and the Role of index.html</h2>

        <h3>What is JSX?</h3>
        <p>
          JSX (JavaScript XML) is a syntax extension for JavaScript that allows
          developers to write HTML-like code inside JavaScript. It is used with
          React to describe the structure of the user interface. JSX looks like
          HTML but is actually converted to JavaScript code during the build
          process.
        </p>
        <p>Example of JSX:</p>
        <div className="code-block">
          <pre>{`const element = <h1>Hello, World!</h1>;`}</pre>
          <button
            className={`copy-btn ${copiedIndex === "jsx-def" ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(
                "const element = <h1>Hello, World!</h1>;",
                "jsx-def"
              )
            }
          >
            {copiedIndex === "jsx-def" ? "Copied!" : "Copy"}
          </button>
        </div>
        <p>
          JSX allows React to efficiently update and render components when data
          changes. It is a powerful tool to write UI in a declarative way.
        </p>

        <h3>Why Use JSX?</h3>
        <ul>
          <li>
            <strong>More readable</strong>: Writing HTML and JavaScript in the
            same file makes it easier to understand and maintain the code.
          </li>
          <li>
            <strong>Component-based</strong>: React uses components that can be
            reused throughout the application, and JSX makes it easier to
            describe the structure of each component.
          </li>
        </ul>

        <h3>index.html and JSX</h3>
        <p>
          In a React application, index.html is the main HTML file. It contains
          the basic structure of the web page, but all the dynamic content is
          rendered using React in the index.js or app.js file. The{" "}
          <strong>index.html</strong> file usually has a root &lt;div&gt;
          element with an id="root", where React will render the app.
        </p>
        <p>Example of index.html:</p>

        <div className="code-block">
          <pre>{indexHtmlExample}</pre>
          <button
            className={`copy-btn ${
              copiedIndex === "index-html" ? "copied" : ""
            }`}
            onClick={() => copyToClipboard(indexHtmlExample, "index-html")}
          >
            {copiedIndex === "index-html" ? "Copied!" : "Copy"}
          </button>
        </div>

        <p>
          The <strong>index.js</strong> file in React takes care of rendering
          the application into the root div element using ReactDOM.
        </p>
        <p>Example of index.js:</p>

        <div className="code-block">
          <pre>{indexJsExample}</pre>
          <button
            className={`copy-btn ${copiedIndex === "index-js" ? "copied" : ""}`}
            onClick={() => copyToClipboard(indexJsExample, "index-js")}
          >
            {copiedIndex === "index-js" ? "Copied!" : "Copy"}
          </button>
        </div>

        <ul>
          <li>
            <strong>ReactDOM.render()</strong>: This function renders the App
            component into the root element in the index.html file.
          </li>
          <li>
            <strong>App Component</strong>: This is where the main logic of your
            application resides.
          </li>
        </ul>
        <br />

        <div className="home-work step-card">
          <h2 style={{ color: "white" }}>Home-Work</h2>
          <p>🧠 Homework Task: Create Registration Form.</p>
          <br />
          <p>
            🎯 Objective: Create Registration form with different inputs and
            style it using bootstrap.
          </p>

          {/* 🧩 Homework Instructions Added Below */}
          <div
            className="homework-tips"
            style={{ color: "#f1f1f1", lineHeight: "1.6" }}
          >
            <p>
              Create a form with these fields at minimum:{" "}
              <strong>Full Name</strong>,<strong> Email</strong>,{" "}
              <strong>Profile Pic</strong>,<strong>Password</strong>,
              <strong> Confirm Password</strong>, <strong>Phone </strong>, and a{" "}
              <strong>Submit</strong> button.
            </p>

            {/* <p>
              Use <strong>React controlled components</strong> (state for each input).
            </p> */}

            <p>Validate before submit:</p>
            <ul>
              <li>Email pattern (simple regex).</li>
              <li>Password length ≥ 6 and check Confirm Password matches.</li>
              <li>Show inline error messages (under the input).</li>
            </ul>

            <p>
              Use <strong>Bootstrap classes</strong> (<code>form-group</code>,{" "}
              <code>form-control</code>, <code>btn</code>, grid{" "}
              <code>Row/Col</code>) for layout and styling.
            </p>

            <p>
              Make the form <strong>responsive</strong>: on mobile fields stack
              vertically, on desktop use 2-column layout for some fields.
            </p>

            <p>
              Prevent default submit and show a <strong>success message</strong>
            </p>

            <p>
              Add basic CSS or use <strong>Bootstrap utilities</strong> to make
              the form visually neat (spacing, rounded inputs, centered card).
            </p>
          </div>

          {/* Image Example */}
          <div className="">
            <p>Example Image:</p>
            <div className="image-container">
              <img
                src="/homework/homework_regisiterfrom.png"
                alt="Registration Form Example"
                className="step-image"
              />
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
                <source src="/registrationForm.mp4" type="video/mp4" />
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

            <div
              style={{
                padding: "1rem",
                backgroundColor: "#f8f9fa",
                color: "#333",
                fontSize: "0.9rem",
                textAlign: "center",
                borderTop: "1px solid #eaeaea",
                userSelect: "none",
              }}
            >
             Create Registration Form.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter4;
