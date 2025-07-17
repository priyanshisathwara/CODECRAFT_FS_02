import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Department.css';

const DepartmentForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const fetchDepartment = async (id) => {
        const res = await axios.get(`http://localhost:8000/api/auth/get-department/${id}`);
        const dept = res.data;
        setFormData({
            name: dept.name,
            description: dept.description
        });
    };

    useEffect(() => {
        if (id) {
            fetchDepartment(id);
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (id) {
            await axios.put(`http://localhost:8000/api/auth/update-departments/${id}`, formData);
        } else {
            await axios.post('http://localhost:8000/api/auth/create-departments', formData);
        }
        navigate('/department-list');
    };

    return (
        <div className="department-form-container">
            <h2>{id ? 'Update' : 'Create'} Department</h2>
            <div className="department-form-group">
                <label>Department Name:</label>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Department Name" />
            </div>
            <div className="department-form-group">
                <label>Description:</label>
                <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
            </div>
            <button className="department-btn-primary" onClick={handleSubmit}>
                {id ? 'Update' : 'Create'}
            </button>
        </div>
    );
};

export default DepartmentForm;
