import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EmployeeForm.css';

const EmployeeForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();  // for editing
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        gender: '',
        department_id: '',
        joining_date: ''
    });

    const fetchDepartments = async () => {
        const res = await axios.get('http://localhost:8000/api/auth/departments');
        setDepartments(res.data);
    };

    const fetchEmployee = async (id) => {
        const res = await axios.get(`http://localhost:8000/api/auth/get-employee/${id}`);
        const emp = res.data;
        setFormData({
            name: emp.name,
            email: emp.email,
            mobile: emp.mobile,
            gender: emp.gender,
            department_id: emp.department_id,
            joining_date: emp.joining_date ? emp.joining_date.split('T')[0] : ''
        });
    };

    useEffect(() => {
        fetchDepartments();
        if (id) {
            fetchEmployee(id);
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (id) {
            await axios.put(`http://localhost:8000/api/auth/update-employees/${id}`, formData);
        } else {
            await axios.post('http://localhost:8000/api/auth/create-employees', formData);
        }
        navigate('/employee-list');
    };

    return (
        <div className="employee-container">
            <h2>{id ? 'Update' : 'Create'} Employee</h2>
            <div className="form-group"><label>Name:</label><input name="name" value={formData.name} onChange={handleChange} /></div>
            <div className="form-group"><label>Email:</label><input name="email" value={formData.email} onChange={handleChange} /></div>
            <div className="form-group"><label>Mobile:</label><input name="mobile" value={formData.mobile} onChange={handleChange} /></div>
            <div className="form-group">
                <label>Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label>Department:</label>
                <select name="department_id" value={formData.department_id} onChange={handleChange}>
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group"><label>Joining Date:</label><input name="joining_date" type="date" value={formData.joining_date} onChange={handleChange} /></div>
            <button className="btn-primary" onClick={handleSubmit}>{id ? 'Update' : 'Create'}</button>
        </div>
    );
};

export default EmployeeForm;
