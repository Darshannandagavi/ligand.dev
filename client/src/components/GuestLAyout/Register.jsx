import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    usn: "",
    year: "",
    batch: "",
    collegeName: "",
    programName: "",
    technology: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [options, setOptions] = useState({
    batch: [],
    collegeName: [],
    programName: [],
    technology: [],
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const types = ["batch", "collegeName", "programName", "technology"];
        const responses = await Promise.all(
          types.map((type) =>
            axios.get(`https://ligand-software-solutions-workshop-2.onrender.com/api/options/${type}`)
          )
        );
        setOptions({
          batch: responses[0].data,
          collegeName: responses[1].data,
          programName: responses[2].data,
          technology: responses[3].data,
        });
      } catch (err) {
        console.error("Error fetching options", err);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    if (profilePic) {
      data.append("profilePic", profilePic);
    }

    try {
      const res = await axios.post(
        "https://ligand-software-solutions-workshop-2.onrender.com/api/users/register",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage({ text: res.data.message + " 🎉", type: "success" });
      setFormData({
        name: "",
        email: "",
        contact: "",
        password: "",
        usn: "",
        year: "",
        batch: "",
        collegeName: "",
        programName: "",
        technology: "",
      });

      setProfilePic(null);
    } catch (err) {
      setMessage({
        text: err.response?.data?.error || "Registration failed 😢",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="register-container"
      data-aos="fade-up"
      style={{ marginTop: "100px" }}
    >
      <div className="register-card">
        <div className="register-header">
          <h2>Create Your Account ✨</h2>
          <p>Join our community today! 🚀</p>
        </div>

        {message && (
          <div className={`message ${message.type}`} data-aos="fade-in">
            {message.text}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="register-form"
        >
          <div className="form-row" data-aos="fade-right" data-aos-delay="100">
            <div className="form-group">
              <label htmlFor="usn">🎓 USN Number</label>
              <input
                type="text"
                id="usn"
                name="usn"
                placeholder="Enter your USN number"
                value={formData.usn}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">👤 Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">📧 Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row" data-aos="fade-right" data-aos-delay="150">
            <div className="form-group">
              <label htmlFor="contact">📞 Contact Number</label>
              <input
                type="text"
                id="contact"
                name="contact"
                placeholder="Enter your phone number"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">🔒 Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div
            className="form-group file-upload"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <label htmlFor="profilePic">🖼️ Profile Picture</label>
            <div className="file-input-container">
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                accept="image/*"
                onChange={handleFileChange}
              />
              <span className="file-custom">
                {profilePic ? profilePic.name : "Choose a file..."}
              </span>
            </div>
          </div>
          <div className="form-group" data-aos="fade-right"
            data-aos-delay="250">
            <label htmlFor="year">📅 Year</label>
            <input
              type="number"
              id="year"
              name="year"
              placeholder="Enter your year"
              value={formData.year || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div className="form-group" data-aos="fade-right"
            data-aos-delay="300">
              <label htmlFor="batch">📌 Batch</label>
              <select
                id="batch"
                name="batch"
                value={formData.batch || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Batch</option>
                {options.batch.map((opt) => (
                  <option key={opt._id} value={opt.value}>
                    {opt.value}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group" data-aos="fade-right"
            data-aos-delay="300">
              <label htmlFor="collegeName">🏫 College</label>
              <select
                id="collegeName"
                name="collegeName"
                value={formData.collegeName || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select College</option>
                {options.collegeName.map((opt) => (
                  <option key={opt._id} value={opt.value}>
                    {opt.value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div className="form-group" data-aos="fade-right"
            data-aos-delay="350">
              <label htmlFor="programName">📖 Program</label>
              <select
                id="programName"
                name="programName"
                value={formData.programName || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Program</option>
                {options.programName.map((opt) => (
                  <option key={opt._id} value={opt.value}>
                    {opt.value}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group" data-aos="fade-right"
            data-aos-delay="350">
              <label htmlFor="technology">💻 Technology</label>
              <select
                id="technology"
                name="technology"
                value={formData.technology || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Technology</option>
                {options.technology.map((opt) => (
                  <option key={opt._id} value={opt.value}>
                    {opt.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className={`submit-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            {isLoading ? <>⏳ Processing...</> : <>🌟 Register Now</>}
          </button>
        </form>

        <div className="login-redirect" data-aos="fade-in" data-aos-delay="300">
          Already have an account? <a href="/login">Login here 👉</a>
        </div>
      </div>

      <style jsx>{`
        .Tilt {
          transition: all 0.3s;
        }
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .register-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          padding: 40px;
          width: 100%;
          max-width: 600px;
          transition: transform 0.3s ease;
        }

        .register-card:hover {
          transform: translateY(-5px);
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 14px 16px;
          border: 2px solid #e1e5e9;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: white;
          appearance: none; /* removes ugly default select arrow on some browsers */
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
          outline: none;
        }

        .register-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .register-header h2 {
          color: #333;
          margin-bottom: 10px;
          font-weight: 700;
          font-size: 28px;
        }

        .register-header p {
          color: #666;
          font-size: 16px;
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: flex;
          gap: 15px;
          flex-wrap: wrap; /* Add this */
        }

        .form-group {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .form-group label {
          margin-bottom: 8px;
          font-weight: 600;
          color: #444;
          font-size: 14px;
        }

        .form-group input {
          padding: 14px 16px;
          border: 2px solid #e1e5e9;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
          outline: none;
        }

        .file-upload {
          margin-top: 10px;
        }

        .file-input-container {
          position: relative;
          min-height: 48px; /* Ensure consistent height */
        }

        .file-input-container input[type="file"] {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .file-custom {
          display: flex;
          align-items: center;
          padding: 14px 16px;

          border: 2px dashed #ccc;
          border-radius: 10px;
          text-align: center;
          color: #666;
          background: #f9f9f9;
          transition: all 0.3s ease;
        }

        .file-input-container:hover .file-custom {
          border-color: #667eea;
          background-color: #f0f4ff;
        }

        .submit-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 16px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 7px 14px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-btn.loading {
          background: linear-gradient(135deg, #a7a7a7 0%, #7a7a7a 100%);
        }

        .message {
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-weight: 500;
          text-align: center;
        }

        .message.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .message.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .login-redirect {
          text-align: center;
          margin-top: 25px;
          color: #666;
          font-size: 14px;
        }

        .login-redirect a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }

        .login-redirect a:hover {
          text-decoration: underline;
        }

        @media (max-width: 576px) {
          .register-card {
            padding: 25px;
          }

          .register-header h2 {
            font-size: 24px;
          }

          .form-row {
            flex-direction: column;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
