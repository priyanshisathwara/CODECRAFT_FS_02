import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Department.css';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [editingId, setEditingId] = useState(null);

    const fetchDepartments = async () => {
        const res = await axios.get('http://localhost:8000/api/auth/departments');
        setDepartments(res.data);
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        await axios.post('http://localhost:8000/api/auth/create-departments', formData);
        fetchDepartments();
        resetForm();
    };

    const handleUpdate = async (id) => {
        await axios.put(`http://localhost:8000/api/auth/update-departments/${id}`, formData);
        fetchDepartments();
        setEditingId(null);
        resetForm();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/auth/delete-departments/${id}`);
        fetchDepartments();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: ''
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Department List</h2>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Department Name" />
            <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
            <button onClick={() => editingId ? handleUpdate(editingId) : handleCreate()}>
                {editingId ? 'Update' : 'Create'}
            </button>

            <table border="1" style={{ marginTop: '20px', width: '100%' }}>
                <thead>
                    <tr>
                        <th>Name</th><th>Description</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((dept) => (
                        <tr key={dept.id}>
                            <td>{dept.name}</td>
                            <td>{dept.description}</td>
                            <td>
                                <button onClick={() => {
                                    setEditingId(dept.id);
                                    setFormData({
                                        name: dept.name,
                                        description: dept.description
                                    });
                                }}>Edit</button>
                                <button onClick={() => handleDelete(dept.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DepartmentList;
