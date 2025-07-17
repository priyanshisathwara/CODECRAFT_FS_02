import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SalaryList.css';

const SalaryList = () => {
    const [salaries, setSalaries] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        employee_id: '',
        base_salary: '',
        bonus: '',
        deductions: '',
        total_salary: '',
        pay_date: ''
    });
    const [editingId, setEditingId] = useState(null);

    const fetchSalaries = async () => {
        const res = await axios.get('http://localhost:8000/api/auth/get-salary');
        setSalaries(res.data);
    };

    const fetchEmployees = async () => {
        const res = await axios.get('http://localhost:8000/api/auth/get-employees');
        setEmployees(res.data);
    };

    useEffect(() => {
        fetchSalaries();
        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTotalSalary = () => {
        const total = parseFloat(formData.base_salary || 0) + parseFloat(formData.bonus || 0) - parseFloat(formData.deductions || 0);
        return total.toFixed(2);
    };

    const handleCreate = async () => {
        await axios.post('http://localhost:8000/api/auth/create-salary', { ...formData, total_salary: handleTotalSalary() });
        fetchSalaries();
        resetForm();
    };

    const handleUpdate = async (id) => {
        await axios.put(`http://localhost:8000/api/auth/update-salary/${id}`, { ...formData, total_salary: handleTotalSalary() });
        fetchSalaries();
        setEditingId(null);
        resetForm();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/auth/delete-salary/${id}`);
        fetchSalaries();
    };

    const resetForm = () => {
        setFormData({
            employee_id: '',
            base_salary: '',
            bonus: '',
            deductions: '',
            total_salary: '',
            pay_date: ''
        });
    };

    return (
    <div className="salary-container">
        <h2>Salary Management</h2>
        <div className="salary-form-wrapper">
            <div className="salary-form-group">
                <label>Select Employee:</label>
                <select name="employee_id" value={formData.employee_id} onChange={handleChange}>
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                </select>
            </div>

            <div className="salary-form-group">
                <label>Base Salary:</label>
                <input name="base_salary" value={formData.base_salary} onChange={handleChange} placeholder="Base Salary" />
            </div>

            <div className="salary-form-group">
                <label>Bonus:</label>
                <input name="bonus" value={formData.bonus} onChange={handleChange} placeholder="Bonus" />
            </div>

            <div className="salary-form-group">
                <label>Deductions:</label>
                <input name="deductions" value={formData.deductions} onChange={handleChange} placeholder="Deductions" />
            </div>

            <div className="salary-form-group">
                <label>Pay Date:</label>
                <input name="pay_date" type="date" value={formData.pay_date} onChange={handleChange} />
            </div>

            <button className="salary-btn-primary" onClick={() => editingId ? handleUpdate(editingId) : handleCreate()}>
                {editingId ? 'Update' : 'Create'}
            </button>
        </div>

        <table className="salary-table">
            <thead>
                <tr>
                    <th>Employee</th><th>Base</th><th>Bonus</th><th>Deductions</th><th>Total</th><th>Pay Date</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {salaries.map((sal) => (
                    <tr key={sal.id}>
                        <td>{sal.employee_name}</td>
                        <td>₹{sal.base_salary}</td>
                        <td>₹{sal.bonus}</td>
                        <td>₹{sal.deductions}</td>
                        <td>₹{sal.total_salary}</td>
                        <td>{sal.pay_date ? sal.pay_date.split('T')[0] : ''}</td>
                        <td>
                            <button className="salary-btn-secondary" onClick={() => {
                                setEditingId(sal.id);
                                setFormData({
                                    employee_id: sal.employee_id,
                                    base_salary: sal.base_salary,
                                    bonus: sal.bonus,
                                    deductions: sal.deductions,
                                    total_salary: sal.total_salary,
                                    pay_date: sal.pay_date ? sal.pay_date.split('T')[0] : ''
                                });
                            }}>Edit</button>
                            <button className="salary-btn-delete" onClick={() => handleDelete(sal.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

};

export default SalaryList;
