import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const res = await axios.post(`https://ligand-software-solutions-workshop-2.onrender.com/api/users/forgotpassword`, { email });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.error || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ 
            minHeight: "100vh", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <div style={{ 
                backgroundColor: "white", 
                padding: "2rem", 
                borderRadius: "10px", 
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                width: "100%",
                maxWidth: "400px"
            }}>
                <h2 style={{ 
                    textAlign: "center", 
                    color: "#333", 
                    marginBottom: "1.5rem",
                    fontWeight: "600"
                }}>
                    Forgot Password
                </h2>
                
                {message && (
                    <div style={{ 
                        padding: "12px", 
                        borderRadius: "6px", 
                        marginBottom: "1.5rem",
                        backgroundColor: message.includes("Something went wrong") || message.includes("error") ? "#ffebee" : "#e8f5e9",
                        color: message.includes("Something went wrong") || message.includes("error") ? "#c62828" : "#2e7d32",
                        textAlign: "center",
                        fontSize: "14px"
                    }}>
                        {message}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "1.5rem" }}>
                        <input
                            type="email"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "12px 15px",
                                border: "1px solid #ddd",
                                borderRadius: "6px",
                                fontSize: "16px",
                                boxSizing: "border-box",
                                transition: "border-color 0.3s",
                                outline: "none"
                            }}
                            onFocus={(e) => e.target.style.borderColor = "#667eea"}
                            onBlur={(e) => e.target.style.borderColor = "#ddd"}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        style={{
                            width: "100%",
                            padding: "12px",
                            backgroundColor: isLoading ? "#b2b2b2" : "#667eea",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: isLoading ? "not-allowed" : "pointer",
                            transition: "background-color 0.3s, transform 0.2s",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                        }}
                        onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = "#5a6fd5")}
                        onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = "#667eea")}
                    >
                        {isLoading ? "Sending..." : "Send Temporary Password"}
                    </button>
                </form>
                
                <p style={{ 
                    textAlign: "center", 
                    marginTop: "1.5rem", 
                    color: "#666",
                    fontSize: "14px"
                }}>
                    Remember your password? <a href="/login" style={{ color: "#667eea", textDecoration: "none" }}>Login here</a>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;