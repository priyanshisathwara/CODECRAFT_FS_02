import React from 'react';
import "./Home.css";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/login");
    };

    return (
        <div className='home-page'>
      <div className="home-container">
                <h2 className="home-title">Welcome to Employee Management System</h2>
                <p className="home-subtitle">Manage your employees efficiently and effectively.</p>
                <div className="home-btn-container">
                    <button className="home-login-btn" onClick={handleNavigate}>Login</button>
                </div>
            </div>
        </div>
    );
}
