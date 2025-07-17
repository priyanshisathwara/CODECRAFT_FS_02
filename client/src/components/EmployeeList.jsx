import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EmployeeList.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        const res = await axios.get('http://localhost:8000/api/auth/get-employees');
        setEmployees(res.data);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/auth/delete-employees/${id}`);
        fetchEmployees();
    };

    return (
        <div className="employee-list-container">
            <h2>Employee List</h2>
            <Link to="/employee-form" className="btn-primary-list">Add New Employee</Link>

            <table className="employee-list-table">
                <thead>
                    <tr>
                        <th>Name</th><th>Email</th><th>Mobile</th><th>Gender</th><th>Department</th><th>Total Salary</th><th>Joining Date</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.mobile}</td>
                            <td>{emp.gender}</td>
                            <td>{emp.department_name || 'N/A'}</td>
                            <td>₹{emp.total_salary || 0}</td>
                            <td>{emp.joining_date ? emp.joining_date.split('T')[0] : ''}</td>
                            <td>
                                <Link className="btn-secondary-list" to={`/employee-form/${emp.id}`}>Edit</Link>
                                <button className="btn-delete-list" onClick={() => handleDelete(emp.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
