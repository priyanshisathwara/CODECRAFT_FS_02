import react from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import EmployeeList from './components/EmployeeList';
import DepartmentList from './components/DepartmentList';
import SalaryList from './components/SalaryList';
import Profile from './components/Profile';
import EmployeeForm from './components/EmployeeForm';
import DepartmentForm from './components/DepartmentForm';



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
                <Route path="/employee-form/:id" element={<EmployeeForm />} />
          <Route path="/department-list" element={<DepartmentList />} />
          <Route path="/salary-list" element={<SalaryList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/department-form" element={<DepartmentForm />} />
          <Route path="/department-form/:id" element={<DepartmentForm />} />
          {/* Add more routes as needed */}
  

   
          

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
