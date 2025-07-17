import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    if (!user) {
        navigate("/login");
        return null;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>Welcome</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}
