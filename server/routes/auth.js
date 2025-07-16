import express from "express";
import { loginAdmin } from "../controller/authController.js";
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from "../controller/employeeController.js";
import { createDepartment, deleteDepartment, getDepartments, updateDepartment } from "../controller/departmentController.js";
import { createSalary, deleteSalary, getSalaries, updateSalary } from "../controller/salaryController.js";

const router = express.Router();

router.post("/login", loginAdmin);

//employee routes
router.get('/get-employees', getEmployees);
router.post('/create-employees', createEmployee);
router.put('/update-employees/:id', updateEmployee);
router.delete('/delete-employees/:id', deleteEmployee);

//department routes
router.get('/departments', getDepartments);
router.post('/create-departments', createDepartment);
router.put('/update-departments/:id', updateDepartment);
router.delete('/delete-departments/:id', deleteDepartment);

//salary routes
router.get('/get-salary', getSalaries);
router.post('/create-salary', createSalary);
router.put('/update-salary/:id', updateSalary);
router.delete('/delete-salary/:id', deleteSalary);

export default router;