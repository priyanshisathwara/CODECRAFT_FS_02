import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.post("http://localhost:8000/api/auth/login", {
                email,
                password,
            });
            console.log("Response Data:", response.data);

            if (response.data.Login) {
                const token = response.data.token;
                const user = response.data.user;

                if (token && user) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    console.log('Token and user stored:', token, user);
                } else {
                    console.log('Token or user data is missing in the response');
                }

                toast.success("Login Successful");
                setTimeout(() => navigate("/admin-dashboard"), 3000);
            } else {
                toast.error("No record found");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error occurred. Try again.");
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="login-form-group">
                        <label htmlFor="email" className="login-label"><strong>Email</strong></label>
                        <input
                            type="text"
                            placeholder="Enter email"
                            autoComplete="off"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input"
                        />
                    </div>

                    <div className="login-form-group">
                        <label htmlFor="password" className="login-label"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            autoComplete="off"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                        />
                    </div>

                    <button type="submit" className="login-submit-btn">Login</button>
                </form>
            </div>
            <ToastContainer />
        </div>

    );
}

export default Login;
