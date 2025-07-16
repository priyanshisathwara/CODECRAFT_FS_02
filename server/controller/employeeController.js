import db from "../config/db.js";

export const getEmployees = (req, res) => {
    const sql = `
        SELECT e.*, d.name AS department_name, s.total_salary
        FROM employee e
        LEFT JOIN department d ON e.department_id = d.id
        LEFT JOIN salary s ON e.id = s.employee_id
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};




export const createEmployee = (req, res) => {
    const { name, email, mobile, department_id, salary, joining_date } = req.body;
    db.query(
        "INSERT INTO employee (name, email, mobile, department_id, joining_date) VALUES (?, ?, ?, ?, ?)",
        [name, email, mobile, department_id, salary, joining_date],
        (err) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: "Employee created successfully" });
        }
    );
};


export const updateEmployee = (req, res) => {
    const { id } = req.params;
    const { name, email, mobile, department_id, salary, joining_date } = req.body;
    db.query(
        "UPDATE employee SET name = ?, email = ?, mobile = ?, department_id = ?,  joining_date = ? WHERE id = ?",
        [name, email, mobile, department_id, joining_date, id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Employee updated successfully" });
        }
    );
};

export const deleteEmployee = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM employee WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Employee deleted successfully" });
    });
};
