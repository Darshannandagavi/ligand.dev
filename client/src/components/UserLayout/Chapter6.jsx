import React, { useState } from 'react';

const Chapter6 = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="chapter-container">
      <div className="chapter-header">
        <h1>Chapter 6 - Landing Pages</h1>
        <p>In this chapter we will see how to create Home page, About page and other pages.</p>
      </div>

      <div className="content-section">
        <h2>1. Home Page:</h2>
        <p>If you have not created <strong>Home.jsx</strong> file in <strong>guestLayout</strong> folder, please create one new file and write code like below:</p>
       
        <div className="code-block">
          <pre>{`import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import About from './About';
import Services from './Services';
import Contact from './Contact';

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const carouselImageStyle = {
    height: '95vh', // You can adjust the height value as needed
    objectFit: 'cover', // This ensures that the image covers the area without stretching
    width: '100%' // Ensure the image takes up the full width of the container
  };

  const captionStyle = {
    background: 'radial-gradient(961px at 1.9% 5%, rgb(242, 241, 36) 0%, rgb(11, 236, 218) 90%);',
    WebkitBackgroundClip: 'text', // This makes the background gradient clip to the text
    color: 'transparent', // Make sure text is transparent so the background gradient shows through
    textShadow: '0px 0px 3px rgba(121, 4, 4, 0.6)', // Optional: Adds a slight shadow to improve readability
    display: 'flex', // Enable flexbox
    flexDirection: 'column', // Stack the text vertically
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    height: '100%', // Ensure the caption takes the full height of the carousel item
    textAlign: 'center' // Ensure the text is centered
  };

  return (
    <div>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={2000} // Set the interval to 2 seconds (2000ms)
      >
        <Carousel.Item>
          <img
            src='https://cdni.iconscout.com/illustration/premium/thumb/event-planning-illustration-download-in-svg-png-gif-file-formats--plan-party-managing-service-manager-pack-entertainment-illustrations-4693328.png?f=webp'
            alt="Event Planning"
            style={carouselImageStyle}
          />
          <Carousel.Caption style={captionStyle}>
            I am capable," "I am enough," or "I am in control of my future.
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://c8.alamy.com/comp/JJ5C4J/event-management-concept-JJ5C4J.jpg"
            alt="Event Management"
            style={carouselImageStyle}
          />
          <Carousel.Caption style={captionStyle}>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://www.shutterstock.com/image-photo/crowd-raised-hands-concert-festival-260nw-1586074294.jpg"
            alt="Event Design"
            style={carouselImageStyle}
          />
          <Carousel.Caption style={captionStyle}>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div>
        <About />
        <Services />
        <Contact />
      </div>
    </div>
  );
};

export default Home;`}</pre>
          <button
            className={`copy-btn ${copiedIndex === 'homeCode' ? 'copied' : ''}`}
            onClick={() => copyToClipboard(`import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import About from './About';
import Services from './Services';
import Contact from './Contact';

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const carouselImageStyle = {
    height: '95vh',
    objectFit: 'cover',
    width: '100%'
  };

  const captionStyle = {
    background: 'radial-gradient(961px at 1.9% 5%, rgb(242, 241, 36) 0%, rgb(11, 236, 218) 90%);',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    textShadow: '0px 0px 3px rgba(121, 4, 4, 0.6)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center'
  };

  return (
    <div>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={2000}
      >
        <Carousel.Item>
          <img
            src='https://cdni.iconscout.com/illustration/premium/thumb/event-planning-illustration-download-in-svg-png-gif-file-formats--plan-party-managing-service-manager-pack-entertainment-illustrations-4693328.png?f=webp'
            alt="Event Planning"
            style={carouselImageStyle}
          />
          <Carousel.Caption style={captionStyle}>
            I am capable," "I am enough," or "I am in control of my future.
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://c8.alamy.com/comp/JJ5C4J/event-management-concept-JJ5C4J.jpg"
            alt="Event Management"
            style={carouselImageStyle}
          />
          <Carousel.Caption style={captionStyle}>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://www.shutterstock.com/image-photo/crowd-raised-hands-concert-festival-260nw-1586074294.jpg"
            alt="Event Design"
            style={carouselImageStyle}
          />
          <Carousel.Caption style={captionStyle}>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div>
        <About />
        <Services />
        <Contact />
      </div>
    </div>
  );
};

export default Home;`, 'homeCode')}
          >
            {copiedIndex === 'homeCode' ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        <h3>You have to make changes in App.js file like below:</h3>
        <p><strong>App.js:</strong></p>
       
        <div className="image-placeholder">
         <img src="\c6Picture1.png" alt="App.js" />
        </div>
       
        <p><strong>Code:</strong></p>
       
        <div className="code-block">
          <pre>{`import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GuestLayout from './components/guestLayout/GuestLayout';
import Home from './components/guestLayout/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;`}</pre>
          <button
            className={`copy-btn ${copiedIndex === 'appCode1' ? 'copied' : ''}`}
            onClick={() => copyToClipboard(`import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GuestLayout from './components/guestLayout/GuestLayout';
import Home from './components/guestLayout/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;`, 'appCode1')}
          >
            {copiedIndex === 'appCode1' ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        <h3>Home.jsx code Explanation:</h3>
       
        <h4>a. Imports</h4>
        <div className="code-block">
          <pre>{`import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import About from './About';
import Services from './Services';
import Contact from './Contact';`}</pre>
        </div>
        <ul>
          <li><strong>React:</strong> This is the main React library needed to create components.</li>
          <li><strong>useState:</strong> A React hook to manage the state within the component.</li>
          <li><strong>Carousel:</strong> This is a pre-built carousel component from the react-bootstrap library. It helps in creating the image slider.</li>
          <li><strong>About, Services, and Contact:</strong> These are custom components (most likely separate files) that will be displayed on the page.</li>
        </ul>

        <h4>b. State Management</h4>
        <div className="code-block">
          <pre>{`const [index, setIndex] = useState(0);`}</pre>
        </div>
        <ul>
          <li><strong>index:</strong> This state variable keeps track of which carousel image is currently active.</li>
          <li><strong>setIndex:</strong> This function is used to update the index value when the user selects a different carousel item.</li>
        </ul>

        <h4>c. Carousel Selection Handler</h4>
        <div className="code-block">
          <pre>{`const handleSelect = (selectedIndex) => {
  setIndex(selectedIndex);
};`}</pre>
        </div>
        <p><strong>handleSelect:</strong> This function is triggered when a user selects a different item in the carousel. It updates the index state to the new selected index.</p>

        <h4>d. Carousel Image Style</h4>
        <div className="code-block">
          <pre>{`const carouselImageStyle = {
  height: '95vh', // You can adjust the height value as needed
  objectFit: 'cover', // This ensures that the image covers the area without stretching
  width: '100%' // Ensure the image takes up the full width of the container
};`}</pre>
        </div>
        <p>This object defines the styles for each image in the carousel:</p>
        <ul>
          <li><strong>height: '95vh':</strong> The image will take 95% of the viewport height (the visible area of the browser).</li>
          <li><strong>objectFit: 'cover':</strong> Ensures the image covers the whole area without stretching. It might crop parts of the image if needed.</li>
          <li><strong>width: '100%':</strong> Makes sure the image spans the entire width of the carousel container.</li>
        </ul>

        <h4>e. Carousel Caption Style</h4>
        <div className="code-block">
          <pre>{`const captionStyle = {
  background: 'radial-gradient(961px at 1.9% 5%, rgb(242, 241, 36) 0%, rgb(11, 236, 218) 90%);',
  WebkitBackgroundClip: 'text', // This makes the background gradient clip to the text
  color: 'transparent', // Make sure text is transparent so the background gradient shows through
  textShadow: '0px 0px 3px rgba(121, 4, 4, 0.6)', // Optional: Adds a slight shadow to improve readability
  display: 'flex', // Enable flexbox
  flexDirection: 'column', // Stack the text vertically
  justifyContent: 'center', // Center horizontally
  alignItems: 'center', // Center vertically
  height: '100%', // Ensure the caption takes the full height of the carousel item
  textAlign: 'center' // Ensure the text is centered
};`}</pre>
        </div>
        <p>This object contains styles for the caption that appears over each image in the carousel:</p>
        <ul>
          <li>The gradient background (background: 'radial-gradient') is applied to the text.</li>
          <li>WebkitBackgroundClip: 'text' makes the gradient appear inside the text.</li>
          <li>color: 'transparent' ensures that the text itself is invisible, allowing the background to show through.</li>
          <li>textShadow adds a subtle shadow to the text for better readability.</li>
          <li>Flexbox styles (display: 'flex', flexDirection: 'column', etc.) are used to center the text both horizontally and vertically within the caption.</li>
        </ul>

        <h4>f. Carousel and Other Components</h4>
        <div className="code-block">
          <pre>{`return (
  <div>
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={2000} // Set the interval to 2 seconds (2000ms)
    >
      <Carousel.Item>
        <img
          src='https://cdni.iconscout.com/illustration/premium/thumb/event-planning-illustration-download-in-svg-png-gif-file-formats--plan-party-managing-service-manager-pack-entertainment-illustrations-4693328.png?f=webp'
          alt="Event Planning"
          style={carouselImageStyle}
        />
        <Carousel.Caption style={captionStyle}>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://c8.alamy.com/comp/JJ5C4J/event-management-concept-JJ5C4J.jpg"
          alt="Event Management"
          style={carouselImageStyle}
        />
        <Carousel.Caption style={captionStyle}>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://www.shutterstock.com/image-photo/crowd-raised-hands-concert-festival-260nw-1586074294.jpg"
          alt="Event Design"
          style={carouselImageStyle}
        />
        <Carousel.Caption style={captionStyle}>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <div>
      <About />
      <Services />
      <Contact />
    </div>
  </div>
);`}</pre>
        </div>
        <ul>
          <li><strong>Carousel:</strong> The carousel component displays multiple items (images) in a sliding fashion. Each carousel item contains an image and a caption.
            <ul>
              <li>activeIndex=: This prop makes sure the correct image is shown based on the index state.</li>
              <li>onSelect=: This tells the carousel to call handleSelect when the user clicks on a different item.</li>
              <li>interval={2000}: This sets the interval between slides to 2000 milliseconds (or 2 seconds), so each image will change every 2 seconds.</li>
            </ul>
          </li>
          <li><strong>Carousel.Item:</strong> Each Carousel.Item contains an image and an empty caption (there's no text content in the caption in this code).</li>
          <li><strong>About, Services, and Contact:</strong> These are custom components (About, Services, and Contact), which will be rendered after the carousel.</li>
        </ul>

        <h3>Final Output</h3>
        <ul>
          <li>The carousel will show three images, each with a unique background style applied to the text in the caption.</li>
          <li>After the carousel, the About, Services, and Contact components will be displayed on the page.</li>
        </ul>

        <h3>Key Features</h3>
        <ul>
          <li><strong>Dynamic Carousel:</strong> The carousel changes images automatically every 2 seconds, but users can also interact with it to select different slides.</li>
          <li><strong>Responsive Image Styling:</strong> The images are responsive to the screen size, and they cover the entire width and height of the carousel container.</li>
          <li><strong>Custom Styling for Captions:</strong> The captions have a stylish gradient background, and the text is transparent with a shadow effect.</li>
        </ul>
        <p>This code gives a nice, clean layout with an image carousel at the top, followed by sections like "About," "Services," and "Contact."</p>

        <div className="image-placeholder">
          <img src="/c6Picture2.png" alt="" />
        </div>

     
      </div>

      <div className="content-section">
        <h2>2. About Page:</h2>
        <p>Create <strong>About.jsx</strong> file if not created and write below code:</p>
       
        <div className="code-block">
          <pre>{`import React from "react";

const About = () => {
  return (
    <>
      <style>
        {\`
        /* About Section Styles */
        .about-section {
          padding: 80px 0;
          background: radial-gradient(circle at 10% 20%, rgb(226, 240, 254) 0%, rgb(255, 247, 228) 90%);  /* Gradient background */
          color: white;
          opacity: 0;
          animation: fadeIn 1s forwards; /* Fade-in effect for section */
        }

        .about-section .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Section Title */
        .section-title h2 {
          font-size: 38px;
          font-weight: 700;
          margin-bottom: 20px;
          text-transform: uppercase;
          color: #4a90e2;
          transition: transform 0.3s ease, color 0.3s ease;
          animation: fadeIn 1s forwards; /* Fade-in effect for section title */
        }

        .section-title h2:hover {
          transform: scale(1.1); /* Slightly scale up on hover */
          color: #ff8c00; /* Change color to orange on hover */
        }

        .section-title p {
          font-size: 18px;
          color: #9e9e9e;
          text-align: center;
          margin-bottom: 40px;
          transition: color 0.2s ease;
          animation: fadeIn 1s forwards 0.5s; /* Fade-in effect for paragraph */
        }

        .section-title p:hover {
          color: #ff8c00; /* Change paragraph color to orange when hovered */
        }

        .f-para {
          font-style: italic;
          font-weight: 300;
          color: #845454;
          transition: transform 0.2s ease;
          animation: fadeIn 1s forwards 1s; /* Fade-in effect for f-para */
        }

        .f-para:hover {
          transform: scale(1.05); /* Slight scale up on hover */
        }

        /* About Video */
        .about-video {
          margin-bottom: 30px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          transition: box-shadow 0.2s ease, transform 0.3s ease;
          opacity: 0;
          transform: translateY(50px); /* Start position (50px below) */
          animation: fadeIn 1s forwards 1.5s, slideUp 1s forwards 1.5s; /* Fade-in and slide-up effect */
        }

        .about-video:hover {
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2); /* Increase shadow on hover */
          transform: scale(1.05) rotate(3deg); /* Scale up and slightly rotate */
        }

        .about-video iframe {
          width: 100%;
          height: 315px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
          opacity: 0;
          animation: fadeIn 1s forwards 2s;
        }

        .about-video:hover iframe {
          transform: scale(1.05); /* Apply scale effect on hover */
        }

        /* About Text */
        .about-text {
          padding-left: 30px;
          margin-top: 30px;
          opacity: 0;
          animation: fadeIn 1s forwards 2.0s; /* Fade-in effect for the text */
        }

        .about-text h3 {
          font-size: 26px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #4a3563;
          transition: transform 0.2s ease, color 0.3s ease;
        }

        .about-text h3:hover {
          transform: translateX(10px); /* Slide text on hover */
          color: #ff8c00; /* Change color to orange on hover */
        }

        .about-text p {
          font-size: 18px;
          line-height: 1.8;
          color: #634d4d;
          transition: transform 0.2s ease, color 0.3s ease;
        }

        .about-text p:hover {
          transform: scale(1.05); /* Slight scale on hover */
          color: #ff8c00; /* Change color on hover */
        }

        .features-list {
          list-style: none;
          padding: 0;
        }

        .features-list li {
          font-size: 16px;
          color: #f1f1f1;
          margin-bottom: 12px;
          transition: transform 0.2s ease;
        }

        .features-list li:hover {
          transform: translateX(5px); /* Slight slide on hover */
        }

        .features-list li .icon_check {
          color: #00bfae;
          margin-right: 10px;
          transition: color 0.2s ease;
        }

        .features-list li:hover .icon_check {
          color: #ff8c00; /* Change color of check icon on hover */
        }

        /* CTA Button */
        .cta-button {
          display: inline-block;
          padding: 15px 25px;
          background-color: #ff8c00;
          color: white;
          text-transform: uppercase;
          font-weight: 600;
          border-radius: 50px;
          text-decoration: none;
          transition: background-color 0.2s ease, transform 0.3s ease;
          animation: fadeIn 1s forwards 3s; /* Fade-in effect for CTA button */
        }

        .cta-button:hover {
          background-color: #d47700;
          transform: scale(1.1); /* Scale up on hover */
        }

        /* Responsive Design */
        @media (max-width: 991px) {
          .about-video iframe {
            height: 250px;
          }
          .section-title h2 {
            font-size: 30px;
          }
          .about-text h3 {
            font-size: 22px;
          }
          .about-text p {
            font-size: 14px;
          }
          .features-list li {
            font-size: 14px;
          }
        }

        @media (max-width: 768px) {
          .about-video iframe {
            height: 220px;
          }
          .about-text {
            padding-left: 0;
          }
          .about-text h3 {
            font-size: 20px;
          }
          .about-text p {
            font-size: 14px;
          }
          .features-list li {
            font-size: 14px;
          }
        }

        /* Fade-In Animation */
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        /* Slide-Up Animation */
        @keyframes slideUp {
          0% {
            transform: translateY(50px); /* Start 50px below */
          }
          100% {
            transform: translateY(0); /* End at normal position */
          }
        }
        \`}
      </style>

      <section className="about-section spad">
        <div className="container">
          {/* Section Title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2>About Us: Revolutionizing the Event Industry</h2>
                <p className="f-para">
                  We believe in making your events extraordinary. From interactive
                  experiences to world-class speakers, we create events that leave
                  lasting impressions. Join us as we take your event to the next
                  level!
                </p>
              </div>
            </div>
          </div>

          {/* About Video and Text */}
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-video">
                {/* Embed YouTube Video */}
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/lljD-yXozSc?si=UObdYxWlPX6ko44s"
                  title="Event Overview Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-text">
                <h3>The 2025 Conference: Where Ideas Meet Reality</h3>
                <p>
                  When we first started organizing events, we were focused on
                  creating memorable experiences that would leave a lasting impact
                  on every participant. Our vision is simple: to empower the future
                  of industries through innovative event planning. After years of
                  success, we're proud to be the leaders in creating immersive
                  conferences that change the way people think, learn, and connect.
                </p>
                <ul className="features-list">
                  <li>
                    <span className="icon_check"></span> Tailored Event Planning
                  </li>
                  <li>
                    <span className="icon_check"></span> Interactive Experiences
                  </li>
                  <li>
                    <span className="icon_check"></span> Networking Opportunities
                  </li>
                  <li>
                    <span className="icon_check"></span> World-Class Speakers
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="row text-center mt-5">
            <div className="col-lg-12">
              <a href="/contact" className="cta-button">
                Get in Touch & Start Planning Your Event!
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;`}</pre>
          <button
            className={`copy-btn ${copiedIndex === 'aboutCode' ? 'copied' : ''}`}
            onClick={() => copyToClipboard(`import React from "react";

const About = () => {
  return (
    <>
      <style>
        {\`
        /* About Section Styles */
        .about-section {
          padding: 80px 0;
          background: radial-gradient(circle at 10% 20%, rgb(226, 240, 254) 0%, rgb(255, 247, 228) 90%);  /* Gradient background */
          color: white;
          opacity: 0;
          animation: fadeIn 1s forwards; /* Fade-in effect for section */
        }

        .about-section .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Section Title */
        .section-title h2 {
          font-size: 38px;
          font-weight: 700;
          margin-bottom: 20px;
          text-transform: uppercase;
          color: #4a90e2;
          transition: transform 0.3s ease, color 0.3s ease;
          animation: fadeIn 1s forwards; /* Fade-in effect for section title */
        }

        .section-title h2:hover {
          transform: scale(1.1); /* Slightly scale up on hover */
          color: #ff8c00; /* Change color to orange on hover */
        }

        .section-title p {
          font-size: 18px;
          color: #9e9e9e;
          text-align: center;
          margin-bottom: 40px;
          transition: color 0.2s ease;
          animation: fadeIn 1s forwards 0.5s; /* Fade-in effect for paragraph */
        }

        .section-title p:hover {
          color: #ff8c00; /* Change paragraph color to orange when hovered */
        }

        .f-para {
          font-style: italic;
          font-weight: 300;
          color: #845454;
          transition: transform 0.2s ease;
          animation: fadeIn 1s forwards 1s; /* Fade-in effect for f-para */
        }

        .f-para:hover {
          transform: scale(1.05); /* Slight scale up on hover */
        }

        /* About Video */
        .about-video {
          margin-bottom: 30px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          transition: box-shadow 0.2s ease, transform 0.3s ease;
          opacity: 0;
          transform: translateY(50px); /* Start position (50px below) */
          animation: fadeIn 1s forwards 1.5s, slideUp 1s forwards 1.5s; /* Fade-in and slide-up effect */
        }

        .about-video:hover {
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2); /* Increase shadow on hover */
          transform: scale(1.05) rotate(3deg); /* Scale up and slightly rotate */
        }

        .about-video iframe {
          width: 100%;
          height: 315px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
          opacity: 0;
          animation: fadeIn 1s forwards 2s;
        }

        .about-video:hover iframe {
          transform: scale(1.05); /* Apply scale effect on hover */
        }

        /* About Text */
        .about-text {
          padding-left: 30px;
          margin-top: 30px;
          opacity: 0;
          animation: fadeIn 1s forwards 2.0s; /* Fade-in effect for the text */
        }

        .about-text h3 {
          font-size: 26px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #4a3563;
          transition: transform 0.2s ease, color 0.3s ease;
        }

        .about-text h3:hover {
          transform: translateX(10px); /* Slide text on hover */
          color: #ff8c00; /* Change color to orange on hover */
        }

        .about-text p {
          font-size: 18px;
          line-height: 1.8;
          color: #634d4d;
          transition: transform 0.2s ease, color 0.3s ease;
        }

        .about-text p:hover {
          transform: scale(1.05); /* Slight scale on hover */
          color: #ff8c00; /* Change color on hover */
        }

        .features-list {
          list-style: none;
          padding: 0;
        }

        .features-list li {
          font-size: 16px;
          color: #f1f1f1;
          margin-bottom: 12px;
          transition: transform 0.2s ease;
        }

        .features-list li:hover {
          transform: translateX(5px); /* Slight slide on hover */
        }

        .features-list li .icon_check {
          color: #00bfae;
          margin-right: 10px;
          transition: color 0.2s ease;
        }

        .features-list li:hover .icon_check {
          color: #ff8c00; /* Change color of check icon on hover */
        }

        /* CTA Button */
        .cta-button {
          display: inline-block;
          padding: 15px 25px;
          background-color: #ff8c00;
          color: white;
          text-transform: uppercase;
          font-weight: 600;
          border-radius: 50px;
          text-decoration: none;
          transition: background-color 0.2s ease, transform 0.3s ease;
          animation: fadeIn 1s forwards 3s; /* Fade-in effect for CTA button */
        }

        .cta-button:hover {
          background-color: #d47700;
          transform: scale(1.1); /* Scale up on hover */
        }

        /* Responsive Design */
        @media (max-width: 991px) {
          .about-video iframe {
            height: 250px;
          }
          .section-title h2 {
            font-size: 30px;
          }
          .about-text h3 {
            font-size: 22px;
          }
          .about-text p {
            font-size: 14px;
          }
          .features-list li {
            font-size: 14px;
          }
        }

        @media (max-width: 768px) {
          .about-video iframe {
            height: 220px;
          }
          .about-text {
            padding-left: 0;
          }
          .about-text h3 {
            font-size: 20px;
          }
          .about-text p {
            font-size: 14px;
          }
          .features-list li {
            font-size: 14px;
          }
        }

        /* Fade-In Animation */
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        /* Slide-Up Animation */
        @keyframes slideUp {
          0% {
            transform: translateY(50px); /* Start 50px below */
          }
          100% {
            transform: translateY(0); /* End at normal position */
          }
        }
        \`}
      </style>

      <section className="about-section spad">
        <div className="container">
          {/* Section Title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2>About Us: Revolutionizing the Event Industry</h2>
                <p className="f-para">
                  We believe in making your events extraordinary. From interactive
                  experiences to world-class speakers, we create events that leave
                  lasting impressions. Join us as we take your event to the next
                  level!
                </p>
              </div>
            </div>
          </div>

          {/* About Video and Text */}
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-video">
                {/* Embed YouTube Video */}
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/lljD-yXozSc?si=UObdYxWlPX6ko44s"
                  title="Event Overview Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-text">
                <h3>The 2025 Conference: Where Ideas Meet Reality</h3>
                <p>
                  When we first started organizing events, we were focused on
                  creating memorable experiences that would leave a lasting impact
                  on every participant. Our vision is simple: to empower the future
                  of industries through innovative event planning. After years of
                  success, we're proud to be the leaders in creating immersive
                  conferences that change the way people think, learn, and connect.
                </p>
                <ul className="features-list">
                  <li>
                    <span className="icon_check"></span> Tailored Event Planning
                  </li>
                  <li>
                    <span className="icon_check"></span> Interactive Experiences
                  </li>
                  <li>
                    <span className="icon_check"></span> Networking Opportunities
                  </li>
                  <li>
                    <span className="icon_check"></span> World-Class Speakers
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="row text-center mt-5">
            <div className="col-lg-12">
              <a href="/contact" className="cta-button">
                Get in Touch & Start Planning Your Event!
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;`, 'aboutCode')}
          >
            {copiedIndex === 'aboutCode' ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        <div className="image-placeholder">
          <img src="/c6Picture3.png" alt="" />
        </div>

        
      </div>

      <div className="content-section">
        <h2>3. Services Page:</h2>
        <p>Create <strong>Services.jsx</strong> file if not created and write below code:</p>
       
        <div className="code-block">
          <pre>{`import React from "react";

const Services = () => {
  return (
    <>
      <style>
        {\`
        /* Services Section Styles */
        .services-section {
          padding: 80px 0;
          background: radial-gradient(circle at 10% 20%, rgb(222, 248, 248) 0%, rgb(249, 232, 232) 90%);
          color: #333;
          opacity: 0;
          animation: fadeIn 1s forwards;
        }

        .services-section .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Section Title */
        .section-title h2 {
          font-size: 38px;
          font-weight: 700;
          margin-bottom: 20px;
          text-transform: uppercase;
          color: #4a90e2;
          transition: transform 0.3s ease, color 0.3s ease;
          animation: fadeIn 1s forwards;
        }

        .section-title h2:hover {
          transform: scale(1.1);
          color: #ff8c00;
        }

        .section-title p {
          font-size: 18px;
          color: #9e9e9e;
          text-align: center;
          margin-bottom: 40px;
          transition: color 0.2s ease;
          animation: fadeIn 1s forwards 0.5s;
        }

        .section-title p:hover {
          color: #ff8c00;
        }

        /* Services Cards */
        .service-card {
          background: white;
          border-radius: 15px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 0;
          transform: translateY(50px);
          animation: fadeIn 1s forwards 1s, slideUp 1s forwards 1s;
        }

        .service-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .service-icon {
          font-size: 50px;
          color: #4a90e2;
          margin-bottom: 20px;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .service-card:hover .service-icon {
          transform: scale(1.2) rotate(10deg);
          color: #ff8c00;
        }

        .service-card h3 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #4a3563;
          transition: color 0.3s ease;
        }

        .service-card:hover h3 {
          color: #ff8c00;
        }

        .service-card p {
          font-size: 16px;
          line-height: 1.6;
          color: #634d4d;
          transition: color 0.3s ease;
        }

        .service-card:hover p {
          color: #ff8c00;
        }

        /* Responsive Design */
        @media (max-width: 991px) {
          .service-card {
            padding: 20px;
          }
          .service-icon {
            font-size: 40px;
          }
          .service-card h3 {
            font-size: 20px;
          }
          .service-card p {
            font-size: 14px;
          }
        }

        @media (max-width: 768px) {
          .service-card {
            padding: 15px;
          }
          .service-icon {
            font-size: 35px;
          }
          .service-card h3 {
            font-size: 18px;
          }
          .service-card p {
            font-size: 14px;
          }
        }

        /* Fade-In Animation */
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        /* Slide-Up Animation */
        @keyframes slideUp {
          0% {
            transform: translateY(50px);
          }
          100% {
            transform: translateY(0);
          }
        }
        \`}
      </style>

      <section className="services-section spad">
        <div className="container">
          {/* Section Title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2>Our Services</h2>
                <p>
                  We offer a wide range of services to make your event a success.
                  From planning to execution, we've got you covered.
                </p>
              </div>
            </div>
          </div>

          {/* Services Cards */}
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">🎯</div>
                <h3>Event Planning</h3>
                <p>
                  We handle all aspects of event planning, from venue selection to
                  catering, ensuring a seamless experience for you and your guests.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">🎨</div>
                <h3>Event Design</h3>
                <p>
                  Our creative team will design a unique and memorable event that
                  reflects your vision and brand identity.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">📢</div>
                <h3>Marketing & Promotion</h3>
                <p>
                  We'll help you promote your event through targeted marketing
                  campaigns and social media strategies to maximize attendance.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">🎤</div>
                <h3>Speaker Management</h3>
                <p>
                  We coordinate with speakers, manage schedules, and ensure that
                  all presentations run smoothly.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">🤝</div>
                <h3>Networking Sessions</h3>
                <p>
                  We facilitate networking opportunities to help attendees connect
                  and build valuable relationships.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">📊</div>
                <h3>Post-Event Analysis</h3>
                <p>
                  After the event, we provide detailed reports and analytics to
                  measure success and identify areas for improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;`}</pre>
          <button
            className={`copy-btn ${copiedIndex === 'servicesCode' ? 'copied' : ''}`}
            onClick={() => copyToClipboard(`import React from "react";

const Services = () => {
  return (
    <>
      <style>
        {\`
        /* Services Section Styles */
        .services-section {
          padding: 80px 0;
          background: radial-gradient(circle at 10% 20%, rgb(222, 248, 248) 0%, rgb(249, 232, 232) 90%);
          color: #333;
          opacity: 0;
          animation: fadeIn 1s forwards;
        }

        .services-section .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Section Title */
        .section-title h2 {
          font-size: 38px;
          font-weight: 700;
          margin-bottom: 20px;
          text-transform: uppercase;
          color: #4a90e2;
          transition: transform 0.3s ease, color 0.3s ease;
          animation: fadeIn 1s forwards;
        }

        .section-title h2:hover {
          transform: scale(1.1);
          color: #ff8c00;
        }

        .section-title p {
          font-size: 18px;
          color: #9e9e9e;
          text-align: center;
          margin-bottom: 40px;
          transition: color 0.2s ease;
          animation: fadeIn 1s forwards 0.5s;
        }

        .section-title p:hover {
          color: #ff8c00;
        }

        /* Services Cards */
        .service-card {
          background: white;
          border-radius: 15px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 0;
          transform: translateY(50px);
          animation: fadeIn 1s forwards 1s, slideUp 1s forwards 1s;
        }

        .service-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .service-icon {
          font-size: 50px;
          color: #4a90e2;
          margin-bottom: 20px;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .service-card:hover .service-icon {
          transform: scale(1.2) rotate(10deg);
          color: #ff8c00;
        }

        .service-card h3 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #4a3563;
          transition: color 0.3s ease;
        }

        .service-card:hover h3 {
          color: #ff8c00;
        }

        .service-card p {
          font-size: 16px;
          line-height: 1.6;
          color: #634d4d;
          transition: color 0.3s ease;
        }

        .service-card:hover p {
          color: #ff8c00;
        }

        /* Responsive Design */
        @media (max-width: 991px) {
          .service-card {
            padding: 20px;
          }
          .service-icon {
            font-size: 40px;
          }
          .service-card h3 {
            font-size: 20px;
          }
          .service-card p {
            font-size: 14px;
          }
        }

        @media (max-width: 768px) {
          .service-card {
            padding: 15px;
          }
          .service-icon {
            font-size: 35px;
          }
          .service-card h3 {
            font-size: 18px;
          }
          .service-card p {
            font-size: 14px;
          }
        }

        /* Fade-In Animation */
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        /* Slide-Up Animation */
        @keyframes slideUp {
          0% {
            transform: translateY(50px);
          }
          100% {
            transform: translateY(0);
          }
        }
        \`}
      </style>

      <section className="services-section spad">
        <div className="container">
          {/* Section Title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2>Our Services</h2>
                <p>
                  We offer a wide range of services to make your event a success.
                  From planning to execution, we've got you covered.
                </p>
              </div>
            </div>
          </div>

          {/* Services Cards */}
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">🎯</div>
                <h3>Event Planning</h3>
                <p>
                  We handle all aspects of event planning, from venue selection to
                  catering, ensuring a seamless experience for you and your guests.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">🎨</div>
                <h3>Event Design</h3>
                <p>
                  Our creative team will design a unique and memorable event that
                  reflects your vision and brand identity.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">📢</div>
                <h3>Marketing & Promotion</h3>
                <p>
                  We'll help you promote your event through targeted marketing
                  campaigns and social media strategies to maximize attendance.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">🎤</div>
                <h3>Speaker Management</h3>
                <p>
                  We coordinate with speakers, manage schedules, and ensure that
                  all presentations run smoothly.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">🤝</div>
                <h3>Networking Sessions</h3>
                <p>
                  We facilitate networking opportunities to help attendees connect
                  and build valuable relationships.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">📊</div>
                <h3>Post-Event Analysis</h3>
                <p>
                  After the event, we provide detailed reports and analytics to
                  measure success and identify areas for improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;`, 'servicesCode')}
          >
            {copiedIndex === 'servicesCode' ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        <div className="image-placeholder">
          <img src="/c6Picture4.png" alt="" />
        </div>

       
      </div>

      <div className="content-section">
        <h2>4. Contact Page:</h2>
        <p>Create <strong>Contact.jsx</strong> file if not created and write below code:</p>
       
        <div className="code-block">
          <pre>{`import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Form submitted! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <style>
        {\`
        /* Contact Section Styles */
        .contact-section {
          padding: 80px 0;
          background: radial-gradient(circle at 10% 20%, rgb(255, 243, 243) 0%, rgb(242, 247, 255) 90%);
          color: #333;
          opacity: 0;
          animation: fadeIn 1s forwards;
        }

        .contact-section .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Section Title */
        .section-title h2 {
          font-size: 38px;
          font-weight: 700;
          margin-bottom: 20px;
          text-transform: uppercase;
          color: #4a90e2;
          transition: transform 0.3s ease, color 0.3s ease;
          animation: fadeIn 1s forwards;
        }

        .section-title h2:hover {
          transform: scale(1.1);
          color: #ff8c00;
        }

        .section-title p {
          font-size: 18px;
          color: #9e9e9e;
          text-align: center;
          margin-bottom: 40px;
          transition: color 0.2s ease;
          animation: fadeIn 1s forwards 0.5s;
        }

        .section-title p:hover {
          color: #ff8c00;
        }

        /* Contact Form */
        .contact-form {
          background: white;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 0;
          animation: fadeIn 1s forwards 1s;
        }

        .contact-form:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #4a3563;
        }

        .form-control {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .form-control:focus {
          border-color: #4a90e2;
          box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
          outline: none;
        }

        textarea.form-control {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          display: inline-block;
          padding: 15px 30px;
          background-color: #ff8c00;
          color: white;
          text-transform: uppercase;
          font-weight: 600;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.3s ease;
        }

        .submit-btn:hover {
          background-color: #d47700;
          transform: scale(1.05);
        }

        /* Contact Info */
        .contact-info {
          margin-top: 40px;
          opacity: 0;
          animation: fadeIn 1s forwards 1.5s;
        }

        .contact-info h3 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #4a3563;
        }

        .contact-details {
          list-style: none;
          padding: 0;
        }

        .contact-details li {
          font-size: 16px;
          margin-bottom: 15px;
          color: #634d4d;
          display: flex;
          align-items: center;
        }

        .contact-details li .icon {
          margin-right: 10px;
          color: #4a90e2;
          font-size: 20px;
        }

        /* Responsive Design */
        @media (max-width: 991px) {
          .contact-form {
            padding: 30px;
          }
          .form-control {
            font-size: 14px;
          }
          .submit-btn {
            padding: 12px 25px;
            font-size: 14px;
          }
        }

        @media (max-width: 768px) {
          .contact-form {
            padding: 20px;
          }
          .form-control {
            font-size: 14px;
          }
          .submit-btn {
            padding: 10px 20px;
            font-size: 14px;
          }
        }

        /* Fade-In Animation */
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        \`}
      </style>

      <section className="contact-section spad">
        <div className="container">
          {/* Section Title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2>Contact Us</h2>
                <p>
                  Have questions or want to discuss your event? Get in touch with
                  our team today!
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="email">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>

              {/* Contact Info */}
              <div className="contact-info text-center">
                <h3>Other Ways to Reach Us</h3>
                <ul className="contact-details">
                  <li>
                    <span className="icon">📧</span> info@eventpro.com
                  </li>
                  <li>
                    <span className="icon">📞</span> +1 (555) 123-4567
                  </li>
                  <li>
                    <span className="icon">📍</span> 123 Event Street, City, State 12345
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;`}</pre>
          <button
            className={`copy-btn ${copiedIndex === 'contactCode' ? 'copied' : ''}`}
            onClick={() => copyToClipboard(`import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Form submitted! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <style>
        {\`
        /* Contact Section Styles */
        .contact-section {
          padding: 80px 0;
          background: radial-gradient(circle at 10% 20%, rgb(255, 243, 243) 0%, rgb(242, 247, 255) 90%);
          color: #333;
          opacity: 0;
          animation: fadeIn 1s forwards;
        }

        .contact-section .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Section Title */
        .section-title h2 {
          font-size: 38px;
          font-weight: 700;
          margin-bottom: 20px;
          text-transform: uppercase;
          color: #4a90e2;
          transition: transform 0.3s ease, color 0.3s ease;
          animation: fadeIn 1s forwards;
        }

        .section-title h2:hover {
          transform: scale(1.1);
          color: #ff8c00;
        }

        .section-title p {
          font-size: 18px;
          color: #9e9e9e;
          text-align: center;
          margin-bottom: 40px;
          transition: color 0.2s ease;
          animation: fadeIn 1s forwards 0.5s;
        }

        .section-title p:hover {
          color: #ff8c00;
        }

        /* Contact Form */
        .contact-form {
          background: white;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 0;
          animation: fadeIn 1s forwards 1s;
        }

        .contact-form:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #4a3563;
        }

        .form-control {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .form-control:focus {
          border-color: #4a90e2;
          box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
          outline: none;
        }

        textarea.form-control {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          display: inline-block;
          padding: 15px 30px;
          background-color: #ff8c00;
          color: white;
          text-transform: uppercase;
          font-weight: 600;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.3s ease;
        }

        .submit-btn:hover {
          background-color: #d47700;
          transform: scale(1.05);
        }

        /* Contact Info */
        .contact-info {
          margin-top: 40px;
          opacity: 0;
          animation: fadeIn 1s forwards 1.5s;
        }

        .contact-info h3 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #4a3563;
        }

        .contact-details {
          list-style: none;
          padding: 0;
        }

        .contact-details li {
          font-size: 16px;
          margin-bottom: 15px;
          color: #634d4d;
          display: flex;
          align-items: center;
        }

        .contact-details li .icon {
          margin-right: 10px;
          color: #4a90e2;
          font-size: 20px;
        }

        /* Responsive Design */
        @media (max-width: 991px) {
          .contact-form {
            padding: 30px;
          }
          .form-control {
            font-size: 14px;
          }
          .submit-btn {
            padding: 12px 25px;
            font-size: 14px;
          }
        }

        @media (max-width: 768px) {
          .contact-form {
            padding: 20px;
          }
          .form-control {
            font-size: 14px;
          }
          .submit-btn {
            padding: 10px 20px;
            font-size: 14px;
          }
        }

        /* Fade-In Animation */
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        \`}
      </style>

      <section className="contact-section spad">
        <div className="container">
          {/* Section Title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2>Contact Us</h2>
                <p>
                  Have questions or want to discuss your event? Get in touch with
                  our team today!
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="email">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>

              {/* Contact Info */}
              <div className="contact-info text-center">
                <h3>Other Ways to Reach Us</h3>
                <ul className="contact-details">
                  <li>
                    <span className="icon">📧</span> info@eventpro.com
                  </li>
                  <li>
                    <span className="icon">📞</span> +1 (555) 123-4567
                  </li>
                  <li>
                    <span className="icon">📍</span> 123 Event Street, City, State 12345
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;`, 'contactCode')}
          >
            {copiedIndex === 'contactCode' ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        <div className="image-placeholder">
          <img src="/c6Picture5.png" alt="" />
        </div>

        
      </div>

      <div className="content-section">
        <h2>5. Update App.js:</h2>
        <p>Now you have to update App.js file to include all pages:</p>
       
        <div className="code-block">
          <pre>{`import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GuestLayout from './components/guestLayout/GuestLayout';
import Home from './components/guestLayout/Home';
import About from './components/guestLayout/About';
import Services from './components/guestLayout/Services';
import Contact from './components/guestLayout/Contact';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;`}</pre>
          <button
            className={`copy-btn ${copiedIndex === 'appCode2' ? 'copied' : ''}`}
            onClick={() => copyToClipboard(`import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GuestLayout from './components/guestLayout/GuestLayout';
import Home from './components/guestLayout/Home';
import About from './components/guestLayout/About';
import Services from './components/guestLayout/Services';
import Contact from './components/guestLayout/Contact';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;`, 'appCode2')}
          >
            {copiedIndex === 'appCode2' ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

       
      </div>

      <div className="content-section">
        <h2>6. Update GuestLayout.jsx:</h2>
        <p>Now you have to update GuestLayout.jsx file to include navigation to all pages:</p>
       
        <div className="code-block">
          <pre>{`import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const GuestLayout = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">EventPro</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/services">Services</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default GuestLayout;`}</pre>
          <button
            className={`copy-btn ${copiedIndex === 'guestLayoutCode' ? 'copied' : ''}`}
            onClick={() => copyToClipboard(`import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const GuestLayout = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">EventPro</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/services">Services</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default GuestLayout;`, 'guestLayoutCode')}
          >
            {copiedIndex === 'guestLayoutCode' ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

       
      </div>

      
      <div className="home-work step-card">
          <h2 style={{ color: "white" }}>Home-Work</h2>
          <p>🧠 Homework Task: Add content in Multiple pages.</p>
          <br />
          <p>
            🎯 Objective: Add interactive content in Home, About, Contact, Login and Register page such as textual content, image content or video content.
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
    </div>
  );
};

export default Chapter6;
