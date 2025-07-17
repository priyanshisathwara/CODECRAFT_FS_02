import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Department.css';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    const fetchDepartments = async () => {
        const res = await axios.get('http://localhost:8000/api/auth/departments');
        setDepartments(res.data);
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/auth/delete-departments/${id}`);
        fetchDepartments();
    };

    return (
        <div className="department-list-container">
            <h2>Department List</h2>
            <Link to="/department-form" className="department-btn-primary">Add New Department</Link>

            <table className="department-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((dept) => (
                        <tr key={dept.id}>
                            <td>{dept.name}</td>
                            <td>{dept.description}</td>
                            <td>
                                <Link className="department-btn-secondary" to={`/department-form/${dept.id}`}>Edit</Link>
                                <button className="department-btn-delete" onClick={() => handleDelete(dept.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DepartmentList;
