
import { useEffect } from "react";
import {
  Users,
  TrendingUp,
  Shield,
  Zap,
  BookOpen,
  Clock,
  FileText,
  Video,
  Briefcase,
  BarChart,
  Building,
  Code,
  CheckCircle,
  ChevronRight,
  PlayCircle,
  Settings,
  GraduationCap,
  Cpu,
  Database,
  Cloud,
  Monitor,
  Smartphone,
  BookMarked,
  Award,
  Target,
  Brain,
  Rocket,
  Star,
} from "lucide-react";
import RangeSlider from "./RangeSlider";

const Home = () => {
  useEffect(() => {
    // Initialize scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeInUp");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Clock className="ligand-icon" />,
      title: "Daily Assessments",
      description: "Regular coding tests and quizzes to track your progress",
    },
    {
      icon: <BookMarked className="ligand-icon" />,
      title: "Comprehensive Notes",
      description: "Organized study materials and reference documentation",
    },
    {
      icon: <Video className="ligand-icon" />,
      title: "Live & Recorded Classes",
      description: "Interactive sessions with expert trainers",
    },
    {
      icon: <Code className="ligand-icon" />,
      title: "Code Repository",
      description: "Real-world projects and practice code examples",
    },
    {
      icon: <Briefcase className="ligand-icon" />,
      title: "Mock Interviews",
      description: "Industry-standard technical interviews practice",
    },
    {
      icon: <BarChart className="ligand-icon" />,
      title: "Performance Analytics",
      description: "Detailed insights into your learning journey",
    },
  ];

  const courses = [
    "MERN Stack Development",
    "Data Structures & Algorithms",
    "System Design",
    "Interview Preparation",
    "Full Stack Projects",
    "Industry Best Practices",
  ];

  const benefits = [
    {
      icon: <Rocket className="ligand-small-icon" />,
      text: "Industry-Ready Curriculum",
    },
    {
      icon: <Brain className="ligand-small-icon" />,
      text: "Personalized Learning Path",
    },
    {
      icon: <Target className="ligand-small-icon" />,
      text: "Placement-Focused Training",
    },
    {
      icon: <Award className="ligand-small-icon" />,
      text: "Certification Programs",
    },
  ];

  const stats = [
    { value: "7000+", label: "Happy Learners" },
    { value: "5☆", label: "Learners Rating" },
    { value: "20+", label: "Partner Colleges" },
    { value: "5000+", label: "Projects" },
  ];

  const techStack = [
    { icon: <Code className="ligand-tech-icon" />, label: "React" },
    { icon: <Database className="ligand-tech-icon" />, label: "Node.js" },
    { icon: <Cloud className="ligand-tech-icon" />, label: "MongoDB" },
    { icon: <Cpu className="ligand-tech-icon" />, label: "Express.js" },
  ];

  return (
    <>
      <div className="ligand-container">
        {/* Hero Section */}
        <section className="ligand-hero">
          <div className="ligand-container-inner">
            <div className="ligand-grid">
              <div className="ligand-hero-content animate-on-scroll">
                <div className="ligand-badge">
                  <span className="ligand-badge-dot"></span>A Dedicated Learning
                  Platform for Ligand Students
                </div>

                <h1 className="ligand-headline">
                  Welcome to{" "}
                  <span className="ligand-gradient-text">
                    Ligand Software Solutions
                  </span>
                </h1>

                <p className="ligand-subtitle">
                  Ligand Institution's dedicated learning platform for software
                  engineering mastery. Access daily assessments, study
                  materials, and track your progress all in one place.
                </p>

                <div className="ligand-checklist">
                  <div className="ligand-checklist-item">
                    <CheckCircle className="ligand-check-icon" />
                    <span className="ligand-checklist-text">
                      Track your learning progress
                    </span>
                  </div>
                  <div className="ligand-checklist-item">
                    <CheckCircle className="ligand-check-icon" />
                    <span className="ligand-checklist-text">
                      Access daily coding assessments
                    </span>
                  </div>
                  <div className="ligand-checklist-item">
                    <CheckCircle className="ligand-check-icon" />
                    <span className="ligand-checklist-text">
                      Access comprehensive study materials
                    </span>
                  </div>
                </div>

                <div className="ligand-cta-buttons">
                  <a
                    href="/login"
                    className="ligand-btn-primary ligand-btn-gradient"
                  >
                    Student Login
                    <ChevronRight className="ligand-btn-icon" />
                  </a>
                  <a href="/teacher-login" className="ligand-btn-secondary">
                    Trainer Portal
                  </a>
                </div>
              </div>

              <div className="ligand-hero-visual animate-on-scroll">
                <div className="ligand-dashboard-preview">
                  <div className="ligand-dashboard-header"></div>
                  <div className="ligand-dashboard-content">
                    <div className="ligand-dashboard-nav">
                      <div className="ligand-nav-dot ligand-nav-dot-red"></div>
                      <div className="ligand-nav-dot ligand-nav-dot-yellow"></div>
                      <div className="ligand-nav-dot ligand-nav-dot-green"></div>
                    </div>
                    <div className="ligand-dashboard-grid">
                      {techStack.map((tech, i) => (
                        <div
                          key={i}
                          className={`ligand-dashboard-card ${
                            i % 2 === 0
                              ? "ligand-card-gradient"
                              : "ligand-card-gray"
                          }`}
                        >
                          <div className="ligand-tech-icon-wrapper">
                            {tech.icon}
                            <span className="ligand-tech-label">
                              {tech.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="ligand-media-player">
                      <div className="ligand-class-indicator">
                        <div className="ligand-live-dot"></div>
                        <span>Recording Class MERN Stack </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="ligand-stats">
          <div className="ligand-container-inner">
            <div className="ligand-stats-grid">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="ligand-stat-card animate-on-scroll"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="ligand-stat-value">{stat.value}</div>
                  <div className="ligand-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="ligand-about">
          <div className="ligand-container-inner">
            <div className="ligand-about-content animate-on-scroll">
              <h2 className="ligand-section-title">About Ligand Institution</h2>
              <p className="ligand-section-description">
                A premier software training institute offering comprehensive
                full-stack development education across multiple technologies,
                with industry-focused training, hands-on projects, and placement
                assistance.
              </p>
              <div className="ligand-highlights">
                <div className="ligand-highlight">
                  <Star className="ligand-highlight-icon" />
                  <span>Industry Expert Trainers</span>
                </div>
                <div className="ligand-highlight">
                  <Star className="ligand-highlight-icon" />
                  <span>Project-Based Learning</span>
                </div>
                <div className="ligand-highlight">
                  <Star className="ligand-highlight-icon" />
                  <span>Placement Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="ligand-features">
          <div className="ligand-container-inner">
            <div className="ligand-section-header animate-on-scroll">
              <h2 className="ligand-section-title">Your Learning Dashboard</h2>
              <p className="ligand-section-subtitle">
                Everything you need for successful software engineering training
              </p>
            </div>

            <div className="ligand-features-grid">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="ligand-feature-card animate-on-scroll"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="ligand-feature-icon">{feature.icon}</div>
                  <h3 className="ligand-feature-title">{feature.title}</h3>
                  <p className="ligand-feature-description">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="ligand-multicollege">
          <div className="ligand-container-inner">
            <div className="ligand-multicollege-grid">
              <div className="ligand-multicollege-content animate-on-scroll">
                <h2 className="ligand-section-title">
                  Comprehensive Course Curriculum
                </h2>
                <p className="ligand-section-description">
                  Our structured curriculum covers everything from fundamentals
                  to advanced concepts, ensuring you become industry-ready.
                </p>

                <div className="ligand-institution-list">
                  {courses.map((item, index) => (
                    <div key={index} className="ligand-institution-item">
                      <CheckCircle className="ligand-list-icon" />
                      <span className="ligand-institution-text">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="ligand-tech-pill">
                  <div className="ligand-tech-avatars">
                    <div className="ligand-tech-avatar ligand-avatar-blue">
                      <Code className="ligand-avatar-icon" />
                    </div>
                    <div className="ligand-tech-avatar ligand-avatar-green">
                      <Database className="ligand-avatar-icon" />
                    </div>
                    <div className="ligand-tech-avatar ligand-avatar-orange">
                      <Cpu className="ligand-avatar-icon" />
                    </div>
                  </div>
                  <span className="ligand-tech-text">
                    Full Stack Development Focus
                  </span>
                </div>
              </div>

              <div className="ligand-college-grid animate-on-scroll">
                <div className="ligand-college-container">
                  <div className="ligand-college-grid-inner">
                    {[
                      {
                        icon: <GraduationCap />,
                        title: "Beginner",
                        desc: "Foundations",
                      },
                      {
                        icon: <Code />,
                        title: "Intermediate",
                        desc: "Core Concepts",
                      },
                      {
                        icon: <Briefcase />,
                        title: "Advanced",
                        desc: "Projects",
                      },
                      {
                        icon: <Award />,
                        title: "Placement",
                        desc: "Interview Prep",
                      },
                    ].map((item, i) => (
                      <div key={i} className="ligand-college-card">
                        <div className="ligand-college-icon">{item.icon}</div>
                        <h4 className="ligand-college-title">{item.title}</h4>
                        <p className="ligand-college-subtitle">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="ligand-benefits">
          <div className="ligand-container-inner">
            <div className="ligand-section-header animate-on-scroll">
              <h2 className="ligand-section-title">
                Why Choose Ligand Institution?
              </h2>
              <p className="ligand-section-subtitle">
                Experience the difference with our student-focused approach
              </p>
            </div>

            <div className="ligand-benefits-grid">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="ligand-benefit-card animate-on-scroll"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="ligand-benefit-icon">{benefit.icon}</div>
                  <h3 className="ligand-benefit-title">{benefit.text}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        <RangeSlider/>

        {/* Vision Section */}
        <section className="ligand-vision">
          <div className="ligand-container-inner">
            <div className="ligand-vision-content animate-on-scroll">
              <div className="ligand-vision-line"></div>
              <h2 className="ligand-vision-title">Our Mission</h2>
              <p className="ligand-vision-description">
                To transform aspiring developers into industry-ready software
                engineers through hands-on training, real-world projects, and
                personalized mentorship.
              </p>
            </div>
          </div>
        </section>

       
      </div>
     
        <style>
          {`
          /* Ligand Landing Page CSS */
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap');

          /* Reset and Base Styles */
          .ligand-container {
            min-height: 100vh;
            background-color: #ffffff;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            overflow-x: hidden;
          }

          .ligand-container-inner {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 1rem;
          }

          /* Typography */
          .ligand-headline {
            font-family: 'Poppins', system-ui, -apple-system, sans-serif;
            font-size: 3rem;
            font-weight: 800;
            line-height: 1.2;
            color: #111827;
            margin-bottom: 1.5rem;
          }

          .ligand-gradient-text {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .ligand-subtitle {
            font-size: 1.25rem;
            line-height: 1.8;
            color: #4b5563;
            margin-bottom: 2rem;
          }

          .ligand-section-title {
            font-family: 'Poppins', system-ui, -apple-system, sans-serif;
            font-size: 2.25rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 1.5rem;
            text-align: center;
          }

          .ligand-section-description {
            font-size: 1.125rem;
            line-height: 1.8;
            color: #4b5563;
            max-width: 768px;
            margin: 0 auto;
          }

          .ligand-section-subtitle {
            font-size: 1.25rem;
            color: #6b7280;
            text-align: center;
            max-width: 768px;
            margin: 0 auto 3rem;
          }

          /* Animations */
          .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          }

          .animate-fadeInUp {
            opacity: 1;
            transform: translateY(0);
          }

          /* Hero Section */
          .ligand-hero {
            position: relative;
            padding: 5rem 0 8rem;
            overflow: hidden;
          }

          .ligand-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
            align-items: center;
          }

          @media (min-width: 1024px) {
            .ligand-grid {
              grid-template-columns: 1fr 1fr;
              gap: 6rem;
            }
          }

          .ligand-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
            background: linear-gradient(to right, #f5f3ff, #eff6ff);
            color: #7c3aed;
            margin-bottom: 2rem;
            margin-top:25px;
          }

          .ligand-badge-dot {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin-right: 0.5rem;
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          .ligand-checklist {
            margin-bottom: 2.5rem;
          }

          .ligand-checklist-item {
            display: flex;
            align-items: center;
            margin-bottom: 0.75rem;
          }

          .ligand-check-icon {
            width: 1.25rem;
            height: 1.25rem;
            color: #10b981;
            margin-right: 0.75rem;
          }

          .ligand-checklist-text {
            font-size: 1.125rem;
            font-weight: 500;
            color: #374151;
          }

          /* Buttons */
          .ligand-cta-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .ligand-btn-primary, .ligand-btn-secondary {
            padding: 1rem 2rem;
            font-weight: 600;
            border-radius: 0.75rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-size: 1rem;
            text-decoration: none;
          }

          .ligand-btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
          }

          .ligand-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);
          }

          .ligand-btn-icon {
            width: 1.25rem;
            height: 1.25rem;
            margin-left: 0.5rem;
            transition: transform 0.3s ease;
          }

          .ligand-btn-primary:hover .ligand-btn-icon {
            transform: translateX(4px);
          }

          .ligand-btn-secondary {
            background: white;
            color: #1f2937;
            border: 2px solid #e5e7eb;
          }

          .ligand-btn-secondary:hover {
            border-color: #d1d5db;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }

          /* Dashboard Preview */
          .ligand-dashboard-preview {
            position: relative;
            background: linear-gradient(to bottom right, #f5f3ff, #eff6ff);
            border-radius: 1.5rem;
            padding: 2rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }

          .ligand-dashboard-header {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 1.5rem 1.5rem 0 0;
          }

          .ligand-dashboard-content {
            margin-top: 2rem;
            background: white;
            border-radius: 1rem;
            padding: 1.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }

          .ligand-dashboard-nav {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .ligand-nav-dot {
            width: 0.75rem;
            height: 0.75rem;
            border-radius: 50%;
          }

          .ligand-nav-dot-red {
            background-color: #f87171;
          }

          .ligand-nav-dot-yellow {
            background-color: #fbbf24;
          }

          .ligand-nav-dot-green {
            background-color: #10b981;
          }

          .ligand-dashboard-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          @media (min-width: 768px) {
            .ligand-dashboard-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }

          .ligand-dashboard-card {
            height: 5rem;
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .ligand-tech-icon-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }

          .ligand-tech-label {
            font-size: 0.75rem;
            font-weight: 600;
            color: #4b5563;
          }

          .ligand-card-gradient {
            background: linear-gradient(to right, #f5f3ff, #e0e7ff);
          }

          .ligand-card-gray {
            background: linear-gradient(to right, #f9fafb, #f3f4f6);
          }

          .ligand-media-player {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .ligand-class-indicator {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: linear-gradient(to right, #fef2f2, #fee2e2);
            border-radius: 9999px;
            color: #dc2626;
            font-weight: 500;
            font-size: 0.875rem;
          }

          .ligand-live-dot {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background-color: #dc2626;
            animation: pulse 1.5s infinite;
          }

          /* Stats Section */
          .ligand-stats {
            padding: 4rem 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }

          .ligand-stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }

          @media (min-width: 768px) {
            .ligand-stats-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }

          .ligand-stat-card {
            text-align: center;
            color: white;
          }

          .ligand-stat-value {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
          }

          .ligand-stat-label {
            font-size: 1rem;
            opacity: 0.9;
          }

          /* About Section */
          .ligand-about {
            padding: 5rem 0;
            background-color: #f9fafb;
          }

          .ligand-highlights {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 2rem;
          }

          @media (min-width: 768px) {
            .ligand-highlights {
              flex-direction: row;
              justify-content: center;
              gap: 2rem;
            }
          }

          .ligand-highlight {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #4f46e5;
            font-weight: 500;
          }

          .ligand-highlight-icon {
            width: 1.25rem;
            height: 1.25rem;
          }

          /* Features Section */
          .ligand-features {
            padding: 5rem 0;
          }

          .ligand-features-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          @media (min-width: 768px) {
            .ligand-features-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (min-width: 1024px) {
            .ligand-features-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          .ligand-feature-card {
            background: white;
            border-radius: 1.5rem;
            padding: 2rem;
            border: 1px solid #f3f4f6;
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .ligand-feature-card:hover {
            transform: translateY(-4px);
            border-color: #e9d5ff;
            box-shadow: 0 20px 40px -12px rgba(102, 126, 234, 0.2);
          }

          .ligand-feature-icon {
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 1rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            margin-bottom: 1.5rem;
            transition: transform 0.3s ease;
          }

          .ligand-feature-card:hover .ligand-feature-icon {
            transform: scale(1.1);
          }

          .ligand-icon {
            width: 1.5rem;
            height: 1.5rem;
          }

          .ligand-feature-title {
            font-family: 'Poppins', sans-serif;
            font-size: 1.25rem;
            font-weight: 600;
            color: #111827;
            margin-bottom: 0.75rem;
          }

          .ligand-feature-description {
            color: #6b7280;
            line-height: 1.6;
          }

          /* Multi-College Section (Courses) */
          .ligand-multicollege {
            padding: 5rem 0;
            background: linear-gradient(to right, #f5f3ff, #eff6ff);
          }

          .ligand-multicollege-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
            align-items: center;
          }

          @media (min-width: 1024px) {
            .ligand-multicollege-grid {
              grid-template-columns: 1fr 1fr;
              gap: 6rem;
            }
          }

          .ligand-institution-list {
            margin: 2rem 0;
          }

          .ligand-institution-item {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
          }

          .ligand-list-icon {
            width: 1.5rem;
            height: 1.5rem;
            color: #10b981;
            margin-right: 0.75rem;
          }

          .ligand-institution-text {
            font-size: 1.125rem;
            font-weight: 500;
            color: #374151;
          }

          .ligand-tech-pill {
            display: inline-flex;
            align-items: center;
            padding: 0.75rem 1.5rem;
            background: white;
            border-radius: 9999px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            margin-top: 2rem;
          }

          .ligand-tech-avatars {
            display: flex;
            margin-right: 1rem;
          }

          .ligand-tech-avatar {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            border: 2px solid white;
          }

          .ligand-avatar-blue {
            background: linear-gradient(to right, #60a5fa, #3b82f6);
            z-index: 3;
          }

          .ligand-avatar-green {
            background: linear-gradient(to right, #34d399, #10b981);
            margin-left: -0.75rem;
            z-index: 2;
          }

          .ligand-avatar-orange {
            background: linear-gradient(to right, #fb923c, #f97316);
            margin-left: -0.75rem;
            z-index: 1;
          }

          .ligand-avatar-icon {
            width: 1.25rem;
            height: 1.25rem;
          }

          .ligand-tech-text {
            font-weight: 600;
            color: #1f2937;
          }

          .ligand-college-container {
            background: white;
            border-radius: 1.5rem;
            padding: 2rem;
            box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
          }

          .ligand-college-grid-inner {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .ligand-college-card {
            background: #f9fafb;
            border-radius: 1rem;
            padding: 1.5rem;
            text-align: center;
            transition: all 0.3s ease;
          }

          .ligand-college-card:hover {
            background: linear-gradient(to bottom right, white, #f5f3ff);
            transform: translateY(-2px);
          }

          .ligand-college-icon {
            width: 4rem;
            height: 4rem;
            margin: 0 auto 1rem;
            color: #667eea;
          }

          .ligand-college-icon svg {
            width: 2rem;
            height: 2rem;
          }

          .ligand-college-title {
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            color: #111827;
            margin-bottom: 0.5rem;
          }

          .ligand-college-subtitle {
            font-size: 0.875rem;
            color: #6b7280;
          }

          /* Benefits Section */
          .ligand-benefits {
            padding: 5rem 0;
          }

          .ligand-benefits-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            max-width: 896px;
            margin: 0 auto;
          }

          @media (min-width: 768px) {
            .ligand-benefits-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (min-width: 1024px) {
            .ligand-benefits-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }

          .ligand-benefit-card {
            text-align: center;
            padding: 2rem;
            border-radius: 1rem;
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .ligand-benefit-card:hover {
            background: linear-gradient(to bottom right, white, #f5f3ff);
          }

          .ligand-benefit-icon {
            width: 4rem;
            height: 4rem;
            margin: 0 auto 1.5rem;
            border-radius: 1rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
          }

          .ligand-small-icon {
            width: 1.5rem;
            height: 1.5rem;
          }

          .ligand-benefit-title {
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            color: #111827;
          }

          /* Vision Section */
          .ligand-vision {
            padding: 5rem 0;
            
          }

          .ligand-vision-content {
            max-width: 768px;
            margin: 0 auto;
            text-align: center;
          }

          .ligand-vision-line {
            width: 4rem;
            height: 0.25rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0 auto 2rem;
            border-radius: 9999px;
          }

          .ligand-vision-title {
            font-family: 'Poppins', sans-serif;
            font-size: 2.25rem;
            font-weight: 700;
            color: #403f3fff;
            margin-bottom: 1.5rem;
          }

          .ligand-vision-description {
            font-size: 1.25rem;
            line-height: 1.8;
            color: #515050ff;
          }

          /* CTA Section */
          .ligand-cta {
            padding: 5rem 0;
          }

          .ligand-cta-container {
            max-width: 896px;
            margin: 0 auto;
            background: linear-gradient(to right, #f5f3ff, #eff6ff);
            border-radius: 2rem;
            padding: 3rem;
            text-align: center;
          }

          .ligand-cta-title {
            font-family: 'Poppins', sans-serif;
            font-size: 2.25rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 1.5rem;
          }

          .ligand-cta-description {
            font-size: 1.25rem;
            color: #4b5563;
            max-width: 576px;
            margin: 0 auto 2.5rem;
          }

          .ligand-cta-buttons-final {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: center;
            margin-bottom: 3rem;
          }

          @media (min-width: 640px) {
            .ligand-cta-buttons-final {
              flex-direction: row;
              flex-wrap: wrap;
            }
          }

          .ligand-btn-gradient-final {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            box-shadow: 0 15px 30px rgba(102, 126, 234, 0.3);
          }

          .ligand-btn-gradient-final:hover {
            transform: translateY(-2px);
            box-shadow: 0 25px 50px rgba(102, 126, 234, 0.4);
          }

          .ligand-btn-secondary-final {
            padding: 1rem 2.5rem;
            font-weight: 600;
            border-radius: 0.75rem;
            background: white;
            color: #1f2937;
            border: 2px solid #d1d5db;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .ligand-btn-secondary-final:hover {
            border-color: #9ca3af;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }

          .ligand-trust-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.75rem 1.5rem;
            background: white;
            border-radius: 9999px;
            box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.1);
            border-top: 1px solid #e5e7eb;
            padding-top: 2rem;
          }

          .ligand-shield-icon {
            width: 1.25rem;
            height: 1.25rem;
            color: #10b981;
            margin-right: 0.75rem;
          }

          .ligand-trust-text {
            color: #374151;
            font-weight: 500;
          }

          /* Footer */
          .ligand-footer {
            background: #111827;
            color: white;
            padding: 4rem 0 2rem;
          }

          .ligand-footer-content {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
            margin-bottom: 3rem;
          }

          @media (min-width: 768px) {
            .ligand-footer-content {
              grid-template-columns: 2fr 3fr;
            }
          }

          .ligand-footer-brand {
            max-width: 300px;
          }

          .ligand-footer-title {
            font-family: 'Poppins', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }

          .ligand-footer-tagline {
            opacity: 0.7;
            margin-bottom: 1.5rem;
          }

          .ligand-footer-contact {
            opacity: 0.8;
            font-size: 0.875rem;
            line-height: 1.6;
          }

          .ligand-footer-links {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }

          @media (min-width: 768px) {
            .ligand-footer-links {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          .ligand-footer-column h4 {
            font-weight: 600;
            margin-bottom: 1rem;
            color: white;
          }

          .ligand-footer-column a {
            display: block;
            color: #d1d5db;
            margin-bottom: 0.75rem;
            transition: color 0.3s ease;
            text-decoration: none;
            font-size: 0.875rem;
          }

          .ligand-footer-column a:hover {
            color: white;
          }

          .ligand-footer-bottom {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            text-align: center;
            font-size: 0.875rem;
            opacity: 0.7;
          }

          @media (min-width: 768px) {
            .ligand-footer-bottom {
              flex-direction: row;
              justify-content: space-between;
              text-align: left;
            }
          }

          .ligand-footer-note {
            color: #a5b4fc;
            font-weight: 500;
          }

          /* Tech Icons */
          .ligand-tech-icon {
            width: 1.5rem;
            height: 1.5rem;
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .ligand-headline {
              font-size: 2.25rem;
            }
           
            .ligand-section-title {
              font-size: 1.875rem;
            }
           
            .ligand-vision-title {
              font-size: 1.875rem;
            }
           
            .ligand-cta-title {
              font-size: 1.875rem;
            }
           
            .ligand-cta-container {
              padding: 2rem;
            }
          }

          @media (max-width: 640px) {
            .ligand-hero {
              padding: 3rem 0 5rem;
            }
           
            .ligand-about,
            .ligand-features,
            .ligand-multicollege,
            .ligand-benefits,
            .ligand-vision,
            .ligand-cta {
              padding: 3rem 0;
            }
           
            .ligand-headline {
              font-size: 2rem;
            }
           
            .ligand-subtitle {
              font-size: 1.125rem;
            }
          }
        `}
        </style>
    </>
  );
};

export default Home;
