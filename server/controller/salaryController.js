import db from "../config/db.js";

// GET all salary records with employee name
export const getSalaries = (req, res) => {
    const query = `
        SELECT salary.*, employee.name as employee_name 
        FROM salary 
        JOIN employee ON salary.employee_id = employee.id
    `;
    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

// POST new salary record
export const createSalary = (req, res) => {
    const { employee_id, base_salary, bonus, deductions, total_salary, pay_date } = req.body;
    const query = "INSERT INTO salary (employee_id, base_salary, bonus, deductions, total_salary, pay_date) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [employee_id, base_salary, bonus, deductions, total_salary, pay_date], (err) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Salary record created successfully" });
    });
};

// PUT update salary record
export const updateSalary = (req, res) => {
    const { id } = req.params;
    const { employee_id, base_salary, bonus, deductions, total_salary, pay_date } = req.body;
    const query = "UPDATE salary SET employee_id = ?, base_salary = ?, bonus = ?, deductions = ?, total_salary = ?, pay_date = ? WHERE id = ?";
    db.query(query, [employee_id, base_salary, bonus, deductions, total_salary, pay_date, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Salary record updated successfully" });
    });
};

// DELETE salary record
export const deleteSalary = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM salary WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Salary record deleted successfully" });
    });
};
