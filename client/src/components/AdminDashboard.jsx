import React from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <aside className="sidebar">
                <h2 className="brand">Employee MS</h2>
                <ul className="menu">
                    <li><Link to="#">Dashboard</Link></li>
                    <li><Link to="/employee-list">Employee</Link></li>
                    <li><Link to="/department-list">Department</Link></li>
                    <li><Link to="/salary-list">Salary</Link></li>
                    <li><Link to="#">Settings</Link></li>
                </ul>
            </aside>

            <main className="dashboard-content">
                <header className="header">
                    <span>Welcome Admin</span>
                    <button className="logout-btn">Logout</button>
                </header>

                <section className="overview">
                    <h2>Dashboard Overview</h2>
                    <div className="overview-cards">
                        <div className="card">
                            <h3>Total Employees</h3>
                            <p>13</p>
                        </div>
                        <div className="card">
                            <h3>Total Departments</h3>
                            <p>5</p>
                        </div>
                        <div className="card">
                            <h3>Monthly Salary</h3>
                            <p>$654</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
