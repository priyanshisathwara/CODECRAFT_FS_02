import bcrypt from "bcrypt";
import db from "../config/db.js";
import jwt from "jsonwebtoken";


export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM admin WHERE email = ?";

  db.query(sql, [email], async (err, data) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (data.length > 0) {
      const isPasswordCorrect = await bcrypt.compare(password, data[0]?.password);

      if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            id: data[0].id,
            name: data[0].name,
            email: data[0].email,
          },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );

        res.status(200).json({
          Login: true,
          user: {
            name: data[0].name,
            email: data[0].email,
          },
          token
        });
      } else {
        res.json({ Login: false, message: "Invalid email or password" });
      }
    } else {
      res.json({ Login: false, message: "User not found" });
    }
  });
};

export const getDashboardData = (req, res) => {
  const sql = `
        SELECT 
            (SELECT COUNT(*) FROM employee) AS totalEmployees,
            (SELECT COUNT(*) FROM department) AS totalDepartments,
            (SELECT IFNULL(AVG(total_salary), 0) FROM salary) AS totalSalary,
            (SELECT COUNT(*) FROM employee WHERE gender = 'Male') AS maleCount,
            (SELECT COUNT(*) FROM employee WHERE gender = 'Female') AS femaleCount,
            (SELECT COUNT(*) FROM employee WHERE gender = 'Other') AS otherCount;
          `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};