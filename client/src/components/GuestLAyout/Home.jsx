import React, { useState, useEffect } from 'react';
import { FaClock, FaExclamationTriangle, FaDesktop, FaSyncAlt, FaTimesCircle, FaCheckCircle, FaUserTie, FaLaptopCode, FaGraduationCap, FaBook, FaCode } from 'react-icons/fa';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    // Initialize animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
      observer.observe(el);
    });
    
    // Auto-advance carousel - updated to 5 slides
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 5);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 4 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home-container">
      <style>
        {`
          .home-container {
            min-height: 100vh;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          .carousel-container {
            position: relative;
            height: 100vh;
            overflow: hidden;
          }
          
          .carousel-track {
            position: absolute;
            inset: 0;
            display: flex;
            transition: transform 0.8s ease-in-out;
            width: 500%; /* Updated to 500% for 5 slides */
          }
          
          .carousel-slide {
            position: relative;
            min-width: 20%; /* Updated to 20% for 5 slides */
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
          }
          
          .slide-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7));
          }
          
          .slide-content {
            position: relative;
            z-index: 10;
            text-align: center;
            padding: 0 1rem;
            max-width: 800px;
          }
          
          .slide-title {
            font-size: 3.5rem;
            font-weight: bold;
            margin-bottom: 1.5rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }
          
          .slide-subtitle {
            font-size: 1.8rem;
            margin-bottom: 2.5rem;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
          }
          
          .slide-button {
            background-color: #4f46e5;
            color: white;
            padding: 1rem 2.5rem;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          .slide-button:hover {
            background-color: #3730a3;
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }
          
          .carousel-control {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 20;
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
          }
          
          .carousel-control:hover {
            background-color: rgba(255, 255, 255, 0.4);
          }
          
          .control-prev {
            left: 2rem;
          }
          
          .control-next {
            right: 2rem;
          }
          
          .carousel-indicators {
            position: absolute;
            bottom: 2rem;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            gap: 1rem;
            z-index: 20;
          }
          
          .indicator {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            transition: all 0.3s;
            border: 2px solid white;
            cursor: pointer;
          }
          
          .indicator-active {
            background-color: white;
            transform: scale(1.2);
          }
          
          .indicator-inactive {
            background-color: transparent;
          }
          
          .instructions-section {
            padding: 5rem 1rem;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .section-header {
            text-align: center;
            margin-bottom: 4rem;
          }
          
          .section-title {
            font-size: 2.8rem;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 1.5rem;
          }
          
          .section-divider {
            width: 80px;
            height: 4px;
            background: linear-gradient(to right, #4f46e5, #7c3aed);
            margin: 0 auto;
            border-radius: 2px;
          }
          
          .section-subtitle {
            color: #6b7280;
            margin-top: 1.5rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            font-size: 1.2rem;
            line-height: 1.6;
          }
          
          .instructions-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          
          @media (min-width: 768px) {
            .instructions-grid {
              grid-template-columns: 1fr 1fr;
            }
          }
          
          .instruction-card {
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            padding: 2rem;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          
          .instruction-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
          }
          
          .card-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
          }
          
          .instruction-list {
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
          }
          
          .instruction-item {
            display: flex;
            align-items: flex-start;
          }
          
          .instruction-icon {
            margin-top: 0.25rem;
            margin-right: 1rem;
            flex-shrink: 0;
            font-size: 1.2rem;
          }
          
          .icon-badge {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            margin-right: 1rem;
            flex-shrink: 0;
            margin-top: 0.25rem;
            font-weight: bold;
          }
          
          .features-section {
            color: ;
            padding: 5rem 1rem;
            text-align: center;
          }
          
          .features-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          @media (min-width: 768px) {
            .features-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          
          .feature-card {
            padding: 2rem;
            background: rgba(111, 107, 107, 0.1);
            border-radius: 12px;
            backdrop-filter: blur(10px);
            transition: transform 0.3s;
          }
          
          .feature-card:hover {
            transform: translateY(-5px);
          }
          
          .feature-icon {
            font-size: 3rem;
            margin-bottom: 1.5rem;
            color: #a5b4fc;
          }
          
          .feature-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }
          
          .feature-description {
            opacity: 0.9;
            line-height: 1.6;
          }
          
          .start-button-container {
            text-align: center;
            margin-top: 4rem;
          }
          
          .start-button {
            background: linear-gradient(to right, #4f46e5, #7c3aed);
            color: white;
            text-decoration:none;
            font-weight: bold;
            padding: 1.2rem 3rem;
            border-radius: 50px;
            font-size: 1.2rem;
            transition: all 0.3s;
            border: none;
            cursor: pointer;
            box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
          }
          
          .start-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 25px rgba(79, 70, 229, 0.4);
          }
          
          .button-note {
            color: #6b7280;
            margin-top: 1.5rem;
            font-size: 1rem;
          }
          
          .footer {
            background-color: #1f2937;
            color: white;
            padding: 3rem 1rem;
            text-align: center;
          }
          
          .footer-content {
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .footer-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-top: 1.5rem;
          }
          
          .footer-link {
            color: #a5b4fc;
            text-decoration: none;
            transition: color 0.3s;
          }
          
          .footer-link:hover {
            color: white;
          }
          
          /* Animation classes */
          [data-aos] {
            opacity: 0;
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
          
          [data-aos].animate-fade-in {
            opacity: 1;
          }
          
          [data-aos="fade-up"] {
            transform: translateY(40px);
          }
          
          [data-aos="fade-up"].animate-fade-in {
            transform: translateY(0);
          }
          
          [data-aos="fade-right"] {
            transform: translateX(-40px);
          }
          
          [data-aos="fade-right"].animate-fade-in {
            transform: translateX(0);
          }
          
          [data-aos="fade-left"] {
            transform: translateX(40px);
          }
          
          [data-aos="fade-left"].animate-fade-in {
            transform: translateX(0);
          }
          
          [data-aos="zoom-in"] {
            transform: scale(0.9);
          }
          
          [data-aos="zoom-in"].animate-fade-in {
            transform: scale(1);
          }
          
          /* Responsive adjustments */
          @media (max-width: 768px) {
            .slide-title {
              font-size: 2.5rem;
            }
            
            .slide-subtitle {
              font-size: 1.4rem;
            }
            
            .section-title {
              font-size: 2.2rem;
            }
            
            .carousel-control {
              width: 40px;
              height: 40px;
            }
          }
          
          @media (max-width: 480px) {
            .slide-title {
              font-size: 2rem;
            }
            
            .slide-subtitle {
              font-size: 1.2rem;
            }
            
            .slide-button {
              padding: 0.8rem 1.8rem;
            }
            
            .section-title {
              font-size: 1.8rem;
            }
            
            .carousel-control {
              width: 35px;
              height: 35px;
              font-size: 1.2rem;
            }
            
            .control-prev {
              left: 1rem;
            }
            
            .control-next {
              right: 1rem;
            }
          }
        `}
      </style>

      {/* Hero Section with Carousel */}
      <section className="carousel-container">
        <div 
          className="carousel-track" 
          style={{ transform:` translateX(-${currentSlide * 20}%) `}}
        >
          {/* Slide 1 */}
          <div 
            className="carousel-slide" 
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' }}
          >
            <div className="slide-overlay"></div>
            <div className="slide-content" data-aos="fade-up">
              <h1 className="slide-title">Ligand Software Solutions</h1>
              <p className="slide-subtitle">MERN Stack Workshop Daily Assessments</p>
              <button className="slide-button">
                Start Today's Exam
              </button>
            </div>
          </div>

          {/* Slide 2 */}
          <div 
            className="carousel-slide" 
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' }}
          >
            <div className="slide-overlay"></div>
            <div className="slide-content" data-aos="fade-up" data-aos-delay="200">
              <h2 className="slide-title">Test Your Knowledge</h2>
              <p className="slide-subtitle">25 Questions • 30 Minutes • Real-time Evaluation</p>
              <button className="slide-button">
                View Instructions
              </button>
            </div>
          </div>

          {/* Slide 3 */}
          <div 
            className="carousel-slide" 
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' }}
          >
            <div className="slide-overlay"></div>
            <div className="slide-content" data-aos="fade-up" data-aos-delay="400">
              <h2 className="slide-title">Enhance Your Skills</h2>
              <p className="slide-subtitle">Become a MERN Stack Expert with Daily Practice</p>
              <button className="slide-button">
                Learn More
              </button>
            </div>
          </div>

          {/* Slide 4 - Notes */}
          <div 
            className="carousel-slide" 
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' }}
          >
            <div className="slide-overlay"></div>
            <div className="slide-content" data-aos="fade-up" data-aos-delay="600">
              <h2 className="slide-title">Comprehensive Notes</h2>
              <p className="slide-subtitle">Access detailed study materials and reference guides</p>
              <button className="slide-button">
                View Study Materials
              </button>
            </div>
          </div>

          {/* Slide 5 - Code */}
          <div 
            className="carousel-slide" 
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' }}
          >
            <div className="slide-overlay"></div>
            <div className="slide-content" data-aos="fade-up" data-aos-delay="800">
              <h2 className="slide-title">Practical Code Examples</h2>
              <p className="slide-subtitle">Learn with real-world code snippets and implementations</p>
              <button className="slide-button">
                Explore Code Repository
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button 
          onClick={prevSlide}
          className="carousel-control control-prev"
          aria-label="Previous slide"
        >
          &#10094;
        </button>
        <button 
          onClick={nextSlide}
          className="carousel-control control-next"
          aria-label="Next slide"
        >
          &#10095;
        </button>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`indicator ${currentSlide === index ? 'indicator-active' : 'indicator-inactive'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Exam Instructions Section */}
      <section className="instructions-section">
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">Daily Exam Instructions</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Please read the following instructions carefully before starting the exam. 
            These guidelines ensure a fair testing environment for all participants.
          </p>
        </div>

        <div className="instructions-grid">
          {/* Left Column - Important Instructions */}
          <div className="instruction-card" data-aos="fade-up">
            <h3 className="card-title" style={{ color: '#dc2626' }}>
              <FaExclamationTriangle className="instruction-icon" /> Important Instructions
            </h3>
            <ul className="instruction-list">
              <li className="instruction-item">
                <FaTimesCircle className="instruction-icon" style={{ color: '#dc2626' }} />
                <span>Do not refresh the page during the exam - your progress will be lost</span>
              </li>
              <li className="instruction-item">
                <FaTimesCircle className="instruction-icon" style={{ color: '#dc2626' }} />
                <span>Do not close the browser window or tab during the assessment</span>
              </li>
              <li className="instruction-item">
                <FaTimesCircle className="instruction-icon" style={{ color: '#dc2626' }} />
                <span>Do not navigate away from the exam page for any reason</span>
              </li>
              <li className="instruction-item">
                <FaSyncAlt className="instruction-icon" style={{ color: '#dc2626' }} />
                <span>Any refresh or navigation will submit your exam automatically</span>
              </li>
              <li className="instruction-item">
                <FaDesktop className="instruction-icon" style={{ color: '#dc2626' }} />
                <span>Ensure you have a stable internet connection throughout the exam</span>
              </li>
              <li className="instruction-item">
                <FaTimesCircle className="instruction-icon" style={{ color: '#dc2626' }} />
                <span>Do not use any other applications or browser tabs during the exam</span>
              </li>
            </ul>
          </div>

          {/* Right Column - General Instructions */}
          <div className="instruction-card" data-aos="fade-up">
            <h3 className="card-title" style={{ color: '#4f46e5' }}>
              <FaCheckCircle className="instruction-icon" /> Exam Guidelines
            </h3>
            <ul className="instruction-list">
              <li className="instruction-item">
                <div className="icon-badge" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
                  <FaClock style={{ fontSize: '0.9rem' }} />
                </div>
                <span>Total time allotted: <strong>30 minutes</strong> (strictly enforced)</span>
              </li>
              <li className="instruction-item">
                <div className="icon-badge" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
                  25
                </div>
                <span>Total questions: <strong>25</strong> (Multiple Choice Questions)</span>
              </li>
              <li className="instruction-item">
                <div className="icon-badge" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
                  1
                </div>
                <span>All questions are multiple choice with single correct answer</span>
              </li>
              <li className="instruction-item">
                <div className="icon-badge" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
                  ✓
                </div>
                <span>You can review and change answers before submission</span>
              </li>
              <li className="instruction-item">
                <div className="icon-badge" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
                  ⏱
                </div>
                <span>A timer will be displayed to help you track your time</span>
              </li>
              <li className="instruction-item">
                <div className="icon-badge" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
                  📊
                </div>
                <span>Results will be displayed immediately after submission</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section" data-aos="fade-up">
          <div className="section-header">
            <h2 className="section-title">Why Choose Our Platform?</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="features-grid">
            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
              <FaUserTie className="feature-icon" />
              <h3 className="feature-title">Expert Instructors</h3>
              <p className="feature-description">
                Learn from industry professionals with years of experience in MERN stack development
                and real-world project implementation.
              </p>
            </div>
            
            <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
              <FaLaptopCode className="feature-icon" />
              <h3 className="feature-title">Hands-on Learning</h3>
              <p className="feature-description">
                Our daily assessments are designed to reinforce concepts with practical
                coding challenges and real-world scenarios.
              </p>
            </div>
            
            <div className="feature-card" data-aos="fade-up" data-aos-delay="600">
              <FaGraduationCap className="feature-icon" />
              <h3 className="feature-title">Career Advancement</h3>
              <p className="feature-description">
                Boost your employability with certified skills and a portfolio of projects
                that demonstrate your expertise to potential employers.
              </p>
            </div>
            
            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
              <FaBook className="feature-icon" />
              <h3 className="feature-title">Comprehensive Notes</h3>
              <p className="feature-description">
                Access detailed study materials, reference guides, and documentation to
                support your learning journey.
              </p>
            </div>
            
            <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
              <FaCode className="feature-icon" />
              <h3 className="feature-title">Real Code Examples</h3>
              <p className="feature-description">
                Learn with practical code snippets, implementations, and real-world
                projects to enhance your coding skills.
              </p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
              <FaLaptopCode className="feature-icon" />
              <h3 className="feature-title">Project Development</h3>
              <p className="feature-description">
                Build real-world projects step by step — from planning and coding 
  to testing and deployment — to strengthen your development skills.
              </p>
            </div>
            
          </div>
        </div>

        {/* Start Exam Button */}
        <div className="start-button-container" data-aos="zoom-in">
          <a href='/login' className="start-button">
            Start Exam Now
          </a>
          <p className="button-note">By starting the exam, you agree to abide by all instructions and guidelines</p>
        </div>
      </section>

     
    </div>
  );
};

export default Home;