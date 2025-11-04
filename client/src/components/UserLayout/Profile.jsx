import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [profilePic, setProfilePic] = useState(null);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    // Fetch logged-in user's data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const decodedToken = JSON.parse(atob(token.split(".")[1])); // decode JWT
                const userId = decodedToken.id;

                const res = await axios.get(`https://ligand-software-solutions-workshop-2.onrender.com/api/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUser(res.data);
                setFormData(res.data);
            } catch (err) {
                setMessage("Error fetching profile");
            }
        };

        if (token) fetchProfile();
    }, [token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    const handleUpdate = async () => {
        try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const userId = decodedToken.id;

            const data = new FormData();
            for (let key in formData) {
                if (typeof formData[key] === "object") {
                    for (let subKey in formData[key]) {
                        data.append(`${key}[${subKey}]`, formData[key][subKey]);
                    }
                } else {
                    data.append(key, formData[key]);
                }
            }
            if (profilePic) data.append("profilePic", profilePic);

            const res = await axios.put(`https://ligand-software-solutions-workshop-2.onrender.com/api/users/${userId}`, data, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            setMessage(res.data.message);
            setUser(res.data.user);
            setEditMode(false);
        } catch (err) {
            setMessage(err.response?.data?.error || "Update failed");
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div style={{ maxWidth: "500px", margin: "auto" }}>
            <h2>My Profile</h2>
            {message && <p>{message}</p>}

            <img
                src={`https://ligand-software-solutions-workshop-2.onrender.com/uploads/${user.profilePic}`}
                alt="Profile"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />

            {editMode ? (
                <div>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
                    
                    <input type="text" name="bankName" value={formData.bankDetails?.bankName || ""} onChange={(e) => setFormData({
                        ...formData,
                        bankDetails: { ...formData.bankDetails, bankName: e.target.value }
                    })} />
                    <input type="text" name="bankNumber" value={formData.bankDetails?.bankNumber || ""} onChange={(e) => setFormData({
                        ...formData,
                        bankDetails: { ...formData.bankDetails, bankNumber: e.target.value }
                    })} />
                    <input type="text" name="ifscCode" value={formData.bankDetails?.ifscCode || ""} onChange={(e) => setFormData({
                        ...formData,
                        bankDetails: { ...formData.bankDetails, ifscCode: e.target.value }
                    })} />
                    <input type="text" name="upiId" value={formData.bankDetails?.upiId || ""} onChange={(e) => setFormData({
                        ...formData,
                        bankDetails: { ...formData.bankDetails, upiId: e.target.value }
                    })} />

                    <input type="file" name="profilePic" onChange={handleFileChange} />

                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Contact:</strong> {user.contact}</p>
                    <p><strong>Bank Name:</strong> {user.bankDetails?.bankName}</p>
                    <p><strong>Account Number:</strong> {user.bankDetails?.bankNumber}</p>
                    <p><strong>IFSC Code:</strong> {user.bankDetails?.ifscCode}</p>
                    <p><strong>UPI ID:</strong> {user.bankDetails?.upiId}</p>

                    <button onClick={() => setEditMode(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
