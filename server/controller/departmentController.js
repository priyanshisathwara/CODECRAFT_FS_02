import db from "../config/db.js";

// Get all departments
export const getDepartments = (req, res) => {
    db.query("SELECT * FROM department", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

// Create a department
export const createDepartment = (req, res) => {
    const { name, description } = req.body;
    db.query(
        "INSERT INTO department (name, description) VALUES (?, ?)",
        [name, description],
        (err) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: "Department created successfully" });
        }
    );
};

// Update a department
export const updateDepartment = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    db.query(
        "UPDATE department SET name = ?, description = ? WHERE id = ?",
        [name, description, id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Department updated successfully" });
        }
    );
};

// Delete a department
export const deleteDepartment = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM department WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Department deleted successfully" });
    });
};
