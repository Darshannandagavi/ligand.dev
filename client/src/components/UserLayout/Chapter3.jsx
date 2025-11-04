import React, { useState } from 'react';

const Chapter3 = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Internal CSS
  const styles = {
    container: {
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      color: "#333",
      lineHeight: "1.6"
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
      padding: "30px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      fontFamily:"cursive"
    },
    headerH1: {
      margin: "0 0 15px 0",
      fontSize: "2.8rem",
      fontWeight: "700"
    },
    headerP: {
      margin: "0",
      fontSize: "1.3rem",
      opacity: "0.95"
    },
    companyInfo: {
      textAlign: "center",
      margin: "40px 0",
      padding: "25px",
      background: "linear-gradient(135deg, #764ba2  0%, #667eea  100%)",
      color: "white",
      borderRadius: "12px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)"
    },
    companyH2: {
      margin: "0 0 15px 0",
      fontSize: "2rem",
      fontWeight: "600"
    },
    companyP: {
      margin: "8px 0",
      fontSize: "1.1rem"
    },
    sectionsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "30px"
    },
    sectionCard: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
      borderLeft: "6px solid #667eea"
    },
    sectionH2: {
      color: "#2c3e50",
      marginTop: "0",
      marginBottom: "25px",
      fontSize: "1.9rem",
      borderBottom: "3px solid #f0f0f0",
      paddingBottom: "15px",
      textAlign: "left"
    },
    contentBlock: {
      marginBottom: "25px",
      textAlign: "left"
    },
    subtitleH3: {
      color: "#667eea",
      margin: "25px 0 15px 0",
      fontSize: "1.5rem",
      textAlign: "left"
    },
    textP: {
      margin: "0 0 18px 0",
      fontSize: "1.15rem",
      lineHeight: "1.7",
      textAlign: "left"
    },
    listBlock: {
      backgroundColor: "#f8f9fa",
      padding: "20px 25px 20px 45px",
      borderRadius: "10px",
      margin: "20px 0",
      borderLeft: "4px solid #667eea",
      textAlign: "left"
    },
    listH4: {
      margin: "0 0 15px 0",
      color: "#2c3e50",
      fontSize: "1.3rem",
      textAlign: "left"
    },
    listUl: {
      margin: "0",
      padding: "0",
      textAlign: "left"
    },
    listLi: {
      marginBottom: "12px",
      fontSize: "1.1rem",
      paddingLeft: "5px",
      textAlign: "left"
    },
    codeBlock: {
      position: "relative",
      backgroundColor: "#2d3436",
      color: "#dfe6e9",
      padding: "18px",
      borderRadius: "8px",
      margin: "20px 0",
      overflowX: "auto",
      border: "1px solid #444",
      textAlign: "left"
    },
    code: {
      fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
      fontSize: "1rem",
      whiteSpace: "pre-wrap",
      textAlign: "left"
    },
    pre: {
      fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
      fontSize: "1rem",
      whiteSpace: "pre-wrap",
      margin: "0",
      lineHeight: "1.5",
      textAlign: "left"
    },
    copyBtn: {
      position: "absolute",
      top: "12px",
      right: "12px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      padding: "8px 15px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "0.9rem",
      transition: "all 0.3s ease"
    },
    copiedBtn: {
      backgroundColor: "#27ae60"
    },
    imageContainer: {
      margin: "25px 0",
      textAlign: "center"
    },
    imageCaption: {
      fontStyle: "italic",
      color: "#666",
      marginBottom: "10px",
      fontSize: "1rem",
      textAlign: "center"
    },
    image: {
      maxWidth: "100%",
      borderRadius: "8px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      border: "1px solid #ddd"
    },
    footer: {
      textAlign: "center",
      marginTop: "50px",
      padding: "30px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)"
    },
    footerP: {
      margin: "8px 0",
      fontSize: "1.15rem"
    }
  };

  const sections = [
    {
      title: "Introduction to Full-Stack Development",
      content: [
        {
          subtitle: "What is Full-Stack Development?",
          text: "Full-stack development refers to the process of developing both the frontend (client-side) and backend (server-side) parts of a web application. A full-stack developer is someone who is capable of working on both the front-end and back-end of a web application, as well as the database and the server.",
          list: {
            title: "The term \"full stack\" refers to the entire range of technologies used to build a complete web application. This includes:",
            items: [
              "Frontend (Client-Side): The part of the application that the user interacts with. It includes everything the user experiences directly in the browser: the user interface (UI), design, structure, and content. Technologies involved: HTML, CSS, JavaScript, and front-end libraries or frameworks like React.js, Vue.js, or Angular.",
              "Backend (Server-Side): The part of the application that runs on the server, handling business logic, databases, authentication, etc. It is responsible for managing and handling data sent between the user and the server. Technologies involved: Node.js, Express.js, Django, Ruby on Rails, etc.",
              "Database: Full-stack developers need to work with databases to store and retrieve application data. Technologies involved: MongoDB, MySQL, PostgreSQL, SQLite, etc.",
              "Version Control and Hosting: Full-stack developers also need to understand version control systems (e.g., Git) and cloud hosting platforms (e.g., AWS, Heroku, DigitalOcean)."
            ]
          }
        },
        {
          subtitle: "Importance of Full-Stack Web Development in Modern Applications",
          text: "Full-stack web development has gained significant importance in modern application development for several reasons:",
          list: {
            items: [
              "Unified Skill Set: Full-stack developers are highly sought after because they can work on the entire stack of an application, from the frontend to the backend, and understand how all components work together. This leads to more efficient development, as there is no need for separate teams of frontend and backend developers.",
              "Faster Development Cycle: With full-stack developers being proficient in both frontend and backend technologies, they can develop applications faster. This is especially valuable in startups or small teams where time-to-market is critical.",
              "Cost-Effective: Hiring a full-stack developer can be more cost-effective than hiring separate frontend and backend developers. Small businesses or startups can save on resources while still getting a highly skilled developer who can handle all aspects of development.",
              "Flexibility and Scalability: Full-stack developers are equipped to handle any project or challenge that arises in the development process, whether it's dealing with user interface issues or working on backend performance optimization. As the application grows, full-stack developers can scale both the frontend and backend to handle more users, data, and features.",
              "Seamless Integration Between Frontend and Backend: Since full-stack developers understand both the frontend and backend, they can ensure seamless integration between the two. A deeper understanding of how data flows from the backend to the frontend and how user inputs affect the backend helps avoid problems such as data inconsistencies or integration failures.",
              "Better Communication and Collaboration: Full-stack developers act as a bridge between the frontend and backend teams (if there are separate teams for these). This enables better communication and collaboration as they can translate requirements and constraints between teams and ensure that both sides align with the same goals.",
              "Complete Ownership of Projects: Full-stack developers can take full ownership of the entire project, from concept to deployment, as they have the knowledge and tools to handle every aspect of the development process. This is particularly beneficial for small businesses or freelancers who need to create, maintain, and scale applications on their own.",
              "Adaptability and Career Growth: Full-stack developers can work on a wide range of projects, which makes them adaptable to various domains (e.g., web development, mobile development, APIs). This adaptability increases their job market value, as they are capable of working in different industries or roles.",
              "Evolving with Technology: As new tools, frameworks, and technologies emerge, full-stack developers are in a good position to learn and incorporate new trends into their projects. This gives them an edge in a constantly evolving tech landscape. They are also likely to stay updated with the best practices in both frontend and backend development, making them highly versatile in the job market.",
              "Handling End-to-End Application Lifecycle: Full-stack developers manage the entire lifecycle of a web application, from planning, designing, developing, testing, and deploying to maintaining the application after launch. This gives them a comprehensive understanding of the project's needs and how to manage its success in the long term."
            ]
          }
        }
      ]
    },
    {
      title: "Introduction to MERN Stack",
      content: [
        {
          text: "The MERN stack is a powerful and popular full-stack development framework used to build modern web applications. It consists of four key technologies:",
          list: {
            items: [
              "MongoDB: A NoSQL database for storing application data.",
              "Express.js: A back-end web application framework built on Node.js for handling server-side logic.",
              "React: A front-end JavaScript library for building user interfaces, particularly single-page applications (SPAs).",
              "Node.js: A JavaScript runtime environment that allows the use of JavaScript on the server-side."
            ]
          }
        },
        {
          text: "Together, these components provide a seamless experience for developers, enabling them to work in a JavaScript ecosystem throughout the entire development process (both front-end and back-end)."
        },
        {
         
        }
      ]
    },
    {
      title: "Benefits of the MERN Stack",
      content: [
        {
          list: {
            items: [
              "JavaScript for Everything: MERN allows you to use JavaScript on both the client-side and the server-side. This unification reduces the learning curve and allows for easier data handling, as the same language is used throughout the development. Developers can focus on mastering one language (JavaScript) rather than learning different languages for front-end (e.g., HTML/CSS/JS) and back-end (e.g., PHP, Ruby, Python).",
              "Scalability and Flexibility: MongoDB is a NoSQL database, which makes it more scalable and flexible when dealing with large datasets or data that is unstructured. It's particularly suitable for applications that deal with high-volume, real-time data. Node.js is designed for building scalable network applications. It handles many concurrent connections efficiently, making it perfect for building highly scalable systems.",
              "Fast Development Cycle: React enables fast, responsive, and dynamic UI development using its component-based architecture. React's virtual DOM enhances performance by minimizing re-rendering of the entire UI, making updates and changes faster. Express.js simplifies back-end development by providing robust routing, middleware integration, and easy-to-use APIs, reducing the time needed to develop server-side logic.",
              "Full-Stack JavaScript: Since both front-end and back-end are written in JavaScript, developers can share code, libraries, and utilities between the two layers of the application, simplifying the entire development and maintenance process.",
              "Open-Source and Community Support: All components of the MERN stack are open-source, meaning that there is an extensive and growing community for each technology. This leads to frequent updates, plugins, resources, and tutorials to support development. Community-driven open-source tools and packages can accelerate development and reduce the need to build everything from scratch.",
              "Real-Time Application Support: Node.js and MongoDB are optimized for building real-time applications, such as messaging apps, live streaming platforms, and collaborative tools. The MERN stack makes it easier to integrate real-time data management with web applications.",
              "Cross-Platform: MERN stack applications are platform-independent and can run on different operating systems like Windows, Linux, and macOS, as well as deploy seamlessly to cloud platforms (AWS, Azure, etc.)."
            ]
          }
        }
      ]
    },
    {
      title: "Components of the MERN Stack",
      content: [
        {
          subtitle: "MongoDB (Database)",
          text: "Type: NoSQL database. Role: Stores and manages data in a flexible, document-based format (JSON-like documents). Why MongoDB?: MongoDB stores data as documents (JSON), which allows for a more flexible data structure and easier scaling. It is ideal for web apps with varying types of data or applications that require high throughput.",
         
        },
        {
          subtitle: "Express.js (Backend Framework)",
          text: "Type: Web framework for Node.js. Role: Express handles the server-side logic, routing, HTTP requests, and integrates with MongoDB and Node.js. Why Express?: Express is lightweight, unopinionated, and flexible, which makes it an excellent choice for building APIs quickly and efficiently. It provides a robust set of features for building web applications and services.",
         
        },
        {
          subtitle: "React (Frontend Library)",
          text: "Type: JavaScript library for building UIs. Role: React helps create dynamic and interactive UIs by breaking down the UI into small, reusable components. Why React?: React's component-based structure makes it highly maintainable, and it allows for fast rendering of UI elements thanks to its virtual DOM. It also supports a rich ecosystem of libraries and tools for building complex UIs efficiently.",
          
        },
        {
          subtitle: "Node.js (Runtime Environment)",
          text: "Type: JavaScript runtime built on Chrome's V8 engine. Role: Node.js allows you to use JavaScript on the server-side, making it possible to handle server-side logic, API requests, and database management all with JavaScript. Why Node.js?: Node.js is event-driven and non-blocking, which makes it extremely fast for I/O-heavy tasks. It's perfect for building scalable and high-performance applications.",
         
        }
      ]
    },
    {
      title: "Job Opportunities in MERN Stack Development",
      content: [
        {
          text: "As MERN stack developers, job opportunities are abundant due to the growing demand for full-stack developers who can work across both front-end and back-end technologies. Some of the most common roles include:",
          list: {
            items: [
              "Full-Stack Developer: A full-stack developer is responsible for both the front-end and back-end of web applications. MERN full-stack developers are skilled in using MongoDB, Express, React, and Node.js to build complete web applications from scratch. Skills: Proficiency in JavaScript, HTML, CSS, React, Node.js, MongoDB, and Express. Knowledge of REST APIs, authentication, and deployment strategies is also required.",
              "Front-End Developer (React Specialist): A front-end developer focuses on creating the user interface and user experience of web applications. A React specialist focuses specifically on using React to build dynamic and interactive UIs. Skills: Expertise in React, Redux, JavaScript, CSS, HTML, and tools like Webpack and Babel. Familiarity with testing libraries like Jest is also a plus.",
              "Back-End Developer (Node.js & Express Specialist): A back-end developer focuses on server-side application logic, database management, and API development. With Node.js and Express, back-end developers build scalable and efficient web services. Skills: Expertise in Node.js, Express.js, RESTful APIs, database management (MongoDB), security practices, and cloud platforms like AWS or Heroku.",
              "MERN Stack Developer: A MERN stack developer is skilled in using the entire stack (MongoDB, Express, React, Node.js) to build and deploy full-stack web applications. Skills: Proficiency in all four components of the MERN stack. Strong knowledge of JavaScript, database management, server-side logic, and UI development.",
              "Web Application Developer: Web application developers use technologies like the MERN stack to build complex, feature-rich web applications for various industries (e-commerce, social media, real-time applications). Skills: Strong understanding of JavaScript, web development frameworks, UI/UX principles, database design, and deployment techniques.",
              "Freelancer/Contract Developer: Many companies and startups require MERN stack developers on a contract basis for building web applications or MVPs (Minimum Viable Products). Skills: Flexibility to work with the MERN stack, as well as experience in managing clients and delivering projects independently."
            ]
          }
        },
        {
          subtitle: "Salary and Demand",
          text: "Full-stack developers in MERN stack are highly sought after due to their ability to handle both client-side and server-side development. The salary for a MERN stack developer varies depending on experience, but typically ranges from ₹50,000 to ₹120,000 annually in the United States. The demand for MERN stack developers is growing as more companies adopt this technology stack to create modern, fast, and scalable web applications."
        },
        {
          image: {
            src: ("/salaryanddemand.png"),
            caption: "Sample MERN Stack Syllabus Overview"
          }
        }
      ]
    },
    {
      title: "MERN Stack Architecture Overview",
      content: [
        {
          text: "In the MERN architecture, each of the components plays a specific role, and they work together to create a seamless web application. Here's a detailed breakdown of each part:",
          list: {
            items: [
              "MongoDB (Database Layer): MongoDB is a NoSQL database, which means it stores data in a flexible, JSON-like format. It doesn't rely on tables and rows as traditional relational databases do, which makes it highly scalable and performant for modern web applications. How it fits in the architecture: MongoDB stores data in collections instead of tables. It uses documents (JSON-like objects) to store data, which can contain nested data structures. MongoDB is used to store application data such as user profiles, posts, products, or other dynamic content.",
              "Express.js (Backend Framework): Express.js is a lightweight and fast web application framework built for Node.js. It simplifies routing and handling HTTP requests (GET, POST, PUT, DELETE) and middleware integration. How it fits in the architecture: Express serves as the backend framework that runs on Node.js. It handles API routes and provides a structure for developing RESTful web services. It processes requests, interacts with the database (MongoDB), and sends responses to the frontend.",
              "React.js (Frontend Framework): React.js is a JavaScript library for building interactive user interfaces, primarily for single-page applications (SPAs). React uses a component-based architecture to build reusable UI components. How it fits in the architecture: React interacts with the backend through HTTP requests (usually via Axios or Fetch API) to retrieve or send data. React handles the rendering of dynamic content based on the application's state and props. It updates the UI whenever the state changes. It often makes use of Redux or Context API for state management in large applications.",
              "Node.js (Runtime Environment): Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript code on the server side, enabling the use of JavaScript for both the client and server. How it fits in the architecture: Node.js runs the Express.js server and handles requests from the frontend. It is responsible for managing the application's server-side logic, including routing, middleware, and interacting with the database (MongoDB). Node.js is efficient and scalable because it uses an event-driven, non-blocking I/O model, which allows it to handle many simultaneous requests efficiently."
            ]
          }
        },
        {
          
        },
        {
          subtitle: "Flow of Data in a MERN Stack Application:",
          image: {
            src: ("/flowof data.png"),
            caption: "Sample MERN Stack Syllabus Overview"
          },
          list: {
            items: [
              "User Interaction (Frontend - React.js): The user interacts with the frontend (React.js), such as clicking a button or filling a form. React sends requests (e.g., using Axios or Fetch) to the backend (Node.js/Express) to fetch or send data.",
              "Backend Processing (Node.js + Express.js): The backend (Node.js with Express.js) receives the request, processes the logic, and if needed, interacts with the database (MongoDB) to retrieve or store data. Express.js routes the requests to the appropriate controllers or functions. The server sends back a response (usually in JSON format) to the frontend.",
              "Database Interaction (MongoDB): If the backend needs data (e.g., user info, posts, products), it queries MongoDB. MongoDB responds with the requested data, which is then sent back by the Express server to the React frontend.",
              "UI Rendering (React.js): Once the data is received by React (e.g., through state updates), React renders the data in the UI. React updates only the components that are changed based on the new data, making the UI dynamic and responsive."
            ]
          }
          
        },
        {
          
        }
      ]
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerH1}>Introduction to MERN Stack</h1>
        <p style={styles.headerP}>Learn about full-stack development with the powerful MERN stack - MongoDB, Express.js, React, and Node.js</p>
      </div>

      <div style={styles.companyInfo}>
        <h2 style={styles.companyH2}>LIGAND SOFTWARE SOLUTIONS</h2>
        <p style={styles.companyP}>Your Launchpad To Tech Success</p>
        <p style={styles.companyP}>Happy Learning!!!!!</p>
        <p style={styles.companyP}>Sankeshwar</p>
        <p style={styles.companyP}>8722585715</p>
        <p style={styles.companyP}>www.ligandsoftware.com</p>
      </div>

      <div style={styles.sectionsContainer}>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} style={styles.sectionCard}>
            <h2 style={styles.sectionH2}>{section.title}</h2>
            
            {section.content.map((content, contentIndex) => (
              <div key={contentIndex} style={styles.contentBlock}>
                {content.subtitle && <h3 style={styles.subtitleH3}>{content.subtitle}</h3>}
                {content.text && <p style={styles.textP}>{content.text}</p>}
                
                {content.list && (
                  <div style={styles.listBlock}>
                    {content.list.title && <h4 style={styles.listH4}>{content.list.title}</h4>}
                    <ul style={styles.listUl}>
                      {content.list.items.map((item, itemIndex) => (
                        <li key={itemIndex} style={styles.listLi}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {content.image && (
                  <div style={styles.imageContainer}>
                    <p style={styles.imageCaption}>{content.image.caption}</p>
                    <img 
                      src={content.image.src} 
                      alt={content.image.caption} 
                      style={styles.image}
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=";
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <p style={styles.footerP}>Join us for Programming, Coding, Project Training and Internship opportunities.</p>
        <p style={styles.footerP}>Let's learn, code and build together.</p>
      </div>
    </div>
  );
};

export default Chapter3;