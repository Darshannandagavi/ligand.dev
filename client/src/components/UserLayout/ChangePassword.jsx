import React, { useState } from "react";
import axios from "axios";


const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false
    });

    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate passwords match
        if (newPassword !== confirmPassword) {
            setMessage("New passwords don't match");
            return;
        }
        
        // Validate password strength (optional)
        if (newPassword.length < 6) {
            setMessage("Password should be at least 6 characters long");
            return;
        }

        setIsLoading(true);

        try {
            const res = await axios.put(
                "https://ligand-software-solutions-workshop-2.onrender.com/api/users/change-password",
                { oldPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage(res.data.message);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setMessage(err.response?.data?.error || "Password change failed");
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <div className="change-password-container">
            <div className="change-password-card">
                <div className="change-password-header">
                    <h2>Change Your Password</h2>
                    <p>Update your password to keep your account secure</p>
                </div>
                
                {message && (
                    <div className={`message ${message.includes("failed") || message.includes("don't match") ? "error" : "success"}`}>
                        {message}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="change-password-form">
                    <div className="input-group">
                        <label htmlFor="oldPassword">Current Password</label>
                        <div className="password-input-container">
                            <input
                                id="oldPassword"
                                type={showPassword.old ? "text" : "password"}
                                placeholder="Enter your current password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                            <button 
                                type="button" 
                                className="toggle-password"
                                onClick={() => togglePasswordVisibility("old")}
                            >
                                {showPassword.old ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="newPassword">New Password</label>
                        <div className="password-input-container">
                            <input
                                id="newPassword"
                                type={showPassword.new ? "text" : "password"}
                                placeholder="Create a new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <button 
                                type="button" 
                                className="toggle-password"
                                onClick={() => togglePasswordVisibility("new")}
                            >
                                {showPassword.new ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <div className="password-input-container">
                            <input
                                id="confirmPassword"
                                type={showPassword.confirm ? "text" : "password"}
                                placeholder="Confirm your new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button 
                                type="button" 
                                className="toggle-password"
                                onClick={() => togglePasswordVisibility("confirm")}
                            >
                                {showPassword.confirm ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        className={`submit-btn ${isLoading ? "loading" : ""}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Updating...
                            </>
                        ) : (
                            "Change Password"
                        )}
                    </button>
                </form>
            </div>
            <style>
                {`
                /* ChangePassword.css */

.change-password-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.change-password-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 100%;
    max-width: 450px;
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.change-password-header {
    text-align: center;
    margin-bottom: 30px;
}

.change-password-header h2 {
    color: #333;
    margin-bottom: 10px;
    font-weight: 600;
}

.change-password-header p {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.5;
}

.input-group {
    margin-bottom: 25px;
}

.input-group label {
    display: block;
    margin-bottom: 8px;
    color: #555;
    font-weight: 500;
    font-size: 0.9rem;
}

.password-input-container {
    position: relative;
}

.password-input-container input {
    width: 100%;
    padding: 14px 45px 14px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s;
    box-sizing: border-box;
}

.password-input-container input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.toggle-password {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 5px;
    border-radius: 4px;
    transition: background 0.2s;
}

.toggle-password:hover {
    background: rgba(102, 126, 234, 0.1);
}

.submit-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.submit-btn:active {
    transform: translateY(0);
}

.submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.submit-btn.loading {
    opacity: 0.8;
}

.spinner {
    width: 18px;
    height: 18px;
    border: 2px solid transparent;
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.message {
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 0.9rem;
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

/* Password strength indicator (optional enhancement) */
.password-strength {
    margin-top: 5px;
    height: 5px;
    border-radius: 3px;
    background: #eee;
    overflow: hidden;
}

.strength-meter {
    height: 100%;
    width: 0;
    transition: all 0.3s;
}

.strength-weak {
    background: #e74c3c;
    width: 33%;
}

.strength-medium {
    background: #f39c12;
    width: 66%;
}

.strength-strong {
    background: #2ecc71;
    width: 100%;
}

/* Responsive design */
@media (max-width: 480px) {
    .change-password-card {
        padding: 30px 20px;
    }
    
    .change-password-header h2 {
        font-size: 1.5rem;
    }
}
                `}
            </style>
        </div>
    );
};

export default ChangePassword;