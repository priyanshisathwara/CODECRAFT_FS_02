import react from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import EmployeeList from './components/EmployeeList';
import DepartmentList from './components/DepartmentList';
import SalaryList from './components/SalaryList';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="/department-list" element={<DepartmentList />} />
          <Route path="/salary-list" element={<SalaryList />} />

   
          

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
