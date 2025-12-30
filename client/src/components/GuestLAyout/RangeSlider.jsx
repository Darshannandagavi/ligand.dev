import React, { useState } from 'react';

const RangeSlider = () => {
  const salaryData = [
    { 
      salary: '8 LPA',
      companies: 'Small Startups & Service Companies',
      skills: [
        'Basic DSA (arrays, strings, sorting)',
        'Programming language fundamentals',
        'Simple CRUD applications',
        'Basic database knowledge',
        'Frontend basics (HTML/CSS/JS)'
      ],
      effort: 4,
      difficulty: 'Beginner'
    },
    { 
      salary: '12 LPA',
      companies: 'Mid-size Companies & Product Startups',
      skills: [
        'Intermediate DSA (linked lists, graphs, recursion)',
        'Framework knowledge (React/Node.js/Spring)',
        'Database design & optimization',
        'REST APIs & authentication',
        'Basic system design concepts'
      ],
      effort: 6,
      difficulty: 'Intermediate'
    },
    { 
      salary: '17 LPA',
      companies: 'Top Indian MNCs & Global Startups',
      skills: [
        'Advanced DSA (hashmaps, trees, heaps)',
        'System design fundamentals',
        'Algorithmic complexity & optimizations',
        'Cloud basics (AWS/GCP/Azure)',
        'Full-stack project experience',
        'Collaborative workflows (Agile, CI/CD)'
      ],
      effort: 8,
      difficulty: 'Advanced'
    },
    { 
      salary: '25 LPA',
      companies: 'FAANG & Top Product Companies',
      skills: [
        'Expert-level DSA & problem solving',
        'Large-scale system design',
        'Distributed systems',
        'Microservices architecture',
        'Cloud expertise & DevOps',
        'Low-level system optimizations',
        'Leadership & mentorship skills'
      ],
      effort: 10,
      difficulty: 'Expert'
    }
  ];

  const [currentSalary, setCurrentSalary] = useState(17);

  const getCurrentData = (salary) => {
    if (salary <= 8) return salaryData[0];
    if (salary <= 12) return salaryData[1];
    if (salary <= 17) return salaryData[2];
    return salaryData[3];
  };

  const currentData = getCurrentData(currentSalary);

  const handleSliderChange = (e) => {
    setCurrentSalary(parseInt(e.target.value));
  };

  return (
    <div className="container">
      <div className="header">
        <h1 style={{
          color:'#2d3748'
        }}>What Starting Salary Are You Aiming For?</h1>
        <p  className="subtitle">Drag the slider to discover required skills and preparation time.</p>
      </div>

      <div className="slider-card">
        <div className="salary-display">
          <h2 className="salary">{currentSalary} LPA</h2>
          <p className="selection-label">Current Selection</p>
        </div>

        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="25"
            value={currentSalary}
            onChange={handleSliderChange}
            className="slider"
          />
          
          <div className="slider-track">
            <div 
              className="progress" 
              style={{ width: `${(currentSalary / 25) * 100}%` }}
            ></div>
          </div>

          <div className="slider-labels">
            <span>0 LPA</span>
            <span>25 LPA</span>
          </div>
        </div>
      </div>

      <div className="companies-card">
        <h3>{currentData.companies}</h3>
      </div>

      <div className="content-grid">
        <div className="skills-card">
          <h3>Skills Required</h3>
          <ul>
            {currentData.skills.map((skill, index) => (
              <li key={index}>
                <span className="bullet">•</span> {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="effort-card">
          <h3>Effort Required</h3>
          <div className="effort-content">
            <div className="score">{currentData.effort}/10</div>
            <div className="meter">
              <div 
                className="fill" 
                style={{ width: `${currentData.effort * 10}%` }}
              ></div>
            </div>
            <p className="difficulty">{currentData.difficulty} Difficulty</p>
            <p className="note">Based on industry standards</p>
          </div>
        </div>
      </div>

      <div className="cta-card">
        <h3>Start Learning with Ligand</h3>
        <p>We guide you to fulfill your dream</p>
      </div>

      <style jsx>{`
        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 1.5rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .header h1 {
          font-size: 1.8rem;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          color: #718096;
          font-size: 1rem;
        }

        .slider-card {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          border: 1px solid #e2e8f0;
        }

        .salary-display {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .salary {
          font-size: 2.5rem;
          font-weight: 700;
          color: #4c51bf;
          margin: 0;
        }

        .selection-label {
          color: #718096;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0.25rem 0 0;
        }

        .slider-container {
          position: relative;
          margin: 1.5rem 0;
        }

        .slider {
          width: 100%;
          height: 30px;
          opacity: 0;
          position: absolute;
          top: -10px;
          z-index: 2;
          cursor: pointer;
        }

        .slider-track {
          width: 100%;
          height: 6px;
          background: #e2e8f0;
          border-radius: 3px;
          position: relative;
          overflow: hidden;
        }

        .progress {
          height: 100%;
          background: linear-gradient(to right, #667eea, #764ba2);
          border-radius: 3px;
          transition: width 0.2s;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 0.75rem;
        }

        .slider-labels span {
          font-size: 0.8rem;
          color: #718096;
          font-weight: 500;
        }

        .companies-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
          padding: 1.25rem;
          text-align: center;
          margin-bottom: 1.5rem;
          color: white;
        }

        .companies-card h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .skills-card, .effort-card {
          background: white;
          border-radius: 10px;
          padding: 1.25rem;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .skills-card h3, .effort-card h3 {
          color: #2d3748;
          font-size: 1.1rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #f7fafc;
        }

        .skills-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .skills-card li {
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
          color: #4a5568;
          line-height: 1.4;
        }

        .bullet {
          color: #667eea;
          margin-right: 0.5rem;
          font-weight: bold;
        }

        .effort-content {
          text-align: center;
        }

        .score {
          font-size: 1.75rem;
          font-weight: 700;
          color: #4c51bf;
          margin-bottom: 0.75rem;
        }

        .meter {
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          margin-bottom: 0.75rem;
          overflow: hidden;
        }

        .fill {
          height: 100%;
          background: linear-gradient(to right, #667eea, #764ba2);
          border-radius: 4px;
          transition: width 0.3s;
        }

        .difficulty {
          color: #718096;
          font-size: 0.875rem;
          margin: 0.5rem 0;
          font-style: italic;
        }

        .note {
          color: #a0aec0;
          font-size: 0.75rem;
          margin: 0.5rem 0 0;
        }

        .cta-card {
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          border-radius: 10px;
          padding: 1.5rem;
          text-align: center;
          color: white;
        }

        .cta-card h3 {
          margin: 0 0 0.5rem;
          font-size: 1.25rem;
        }

        .cta-card p {
          margin: 0 0 1rem;
          font-size: 0.95rem;
          opacity: 0.9;
        }

        .cta-btn {
          background: white;
          color: #3182ce;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }
          
          .header h1 {
            font-size: 1.5rem;
          }
          
          .content-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .salary {
            font-size: 2rem;
          }
          
          .companies-card {
            padding: 1rem;
          }
          
          .skills-card, .effort-card {
            padding: 1rem;
          }
          
          .cta-card {
            padding: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default RangeSlider;