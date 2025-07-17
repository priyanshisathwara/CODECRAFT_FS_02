import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AdminDashboard = () => {
        const navigate = useNavigate();
    const [data, setData] = useState({
        totalEmployees: 0,
        totalDepartments: 0,
        totalSalary: 0,
        maleCount: 0,
        femaleCount: 0,
        otherCount: 0
    });

   useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
        } else {
            fetchDashboardData();
        }
    }, [navigate]);


    const fetchDashboardData = async () => {
        const res = await axios.get('http://localhost:8000/api/auth/dashboard-data');
        setData(res.data);
    };

    const pieData = [
        { name: 'Male', value: data.maleCount },
        { name: 'Female', value: data.femaleCount },
        { name: 'Other', value: data.otherCount }
    ];

const COLORS = ['#2C3E50', '#BDC3C7', '#3498DB'];  // Modern Neutral Theme


    const barData = [
        { name: 'Employees', Count: data.totalEmployees },
        { name: 'Departments', Count: data.totalDepartments },
    ];

    return (
        <div className="admin-dashboard">
            <aside className="sidebar">
                <h2 className="brand">StaffSync</h2>
                <ul className="menu">
                    <li><Link to="#">Dashboard</Link></li>
                    <li><Link to="/employee-list">Employee</Link></li>
                    <li><Link to="/department-list">Department</Link></li>
                    <li><Link to="/salary-list">Salary</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
            </aside>

            <main className="dashboard-content">
                <header className="header">
                    <span>Welcome to StaffSync — where managing your team becomes simple, smart, and stress-free.</span>
                </header>

                <section className="dashboard-overview">
                    <h2>Dashboard Overview</h2>
                    <div className="overview-cards">
                        <div className="card">
                            <h3>Total Employees</h3>
                            <p>{data.totalEmployees}</p>
                        </div>
                        <div className="card">
                            <h3>Total Departments</h3>
                            <p>{data.totalDepartments}</p>
                        </div>
                        <div className="card">
                            <h3>Monthly Average Salary</h3>
                            <p>₹{Math.round(data.totalSalary)}</p>
                        </div>
                        <div className="card">
                            <h3>Gender Ratio (Pie Chart)</h3>
                            <PieChart width={200} height={200}>
                                <Pie data={pieData} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" dataKey="value" label>
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </div>
                    </div>

                    <div className="overview-cards">
                        <div className="card">
                            <h3>Organization Overview (Bar Graph)</h3>
                            <BarChart width={300} height={200} data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Count" fill="#2C3E50" />
                            </BarChart>
                        </div>

                        <Link to="/employee-list" className="card clickable-card">
                            <h3>New Employee</h3>
                            <p>Add or View Employees</p>
                        </Link>

                        <Link to="/department-list" className="card clickable-card">
                            <h3>New Department</h3>
                            <p>Add or View Departments</p>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
