# 🧑‍💼 Employee Management System

## 📌 Overview

This project is a **web-based application** that allows **administrators** to perform **CRUD (Create, Read, Update, Delete)** operations on employee records. The system is secured with **authentication mechanisms** to ensure that only authorized users can access and manage sensitive employee data.

---

## 🚀 Features

➣ Admin authentication (login required to access employee records)  
➣ Add new employees with complete validation  
➣ View all employee records in a dynamic and responsive table  
➣ Edit existing employee information  
➣ Delete employee records permanently  
➣ Input validation and structured error handling  
➣ Protected routes accessible only after login  
➣ Token/session-based security and logout functionality  

---

## 🛠️ Tech Stack

| Layer     | Tech Stack             |
|-----------|------------------------|
| Frontend  | React / HTML-CSS-JS    |
| Backend   | Node.js + Express      |
| Database  | MySQL                  |
| Auth      | JWT / Express-Session  |
| Security  | bcrypt (Password Hashing) |

---

## 🔐 Security Measures

- Admin credentials are **securely hashed using bcrypt** before storing  
- JWT tokens or sessions are used to **authenticate admin users**  
- **Middleware** guards protect all employee-related routes  
- **Input validation** is applied on both frontend and backend to prevent injection or malformed data  
- Sessions/tokens include **expiry time** for enhanced security  
- **Unauthorized access** is restricted and redirected to login  

---

## 📸 Screenshots

### 🏠 Admin Login Page

Only authenticated admins can access the dashboard.

<img width="753" height="530" alt="image" src="https://github.com/user-attachments/assets/cb8533de-42c5-4548-9ef1-0395684a14a0" />

After successfully login it will navigate to this page 

<img width="2500" height="1912" alt="Screenshot 2025-07-26 at 12 21 46 PM" src="https://github.com/user-attachments/assets/4c01e8dc-0e34-416e-ab4e-14d6055d6881" />


---

### 📋 Employee List

Displays all employee records with options to edit or delete.

<img width="1200" height="1000" alt="image" src="https://github.com/user-attachments/assets/f66933f5-d363-467e-8395-5ff14433a147" />

---

### ➕ Add Employee

Admins can add new employees with real-time validation.

<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/01517032-5d5e-41ea-a819-16841f4c9ad3" />


---

### 📝 Update Employee

Edit employee information through a secure form.

<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/995c12a9-08fc-4d82-94c0-e0efe751baf3" />


---

### 🗑️ Delete Confirmation

Admin can remove an employee record permanently after confirmation.

<img width="1033" height="106" alt="image" src="https://github.com/user-attachments/assets/cd90161e-96a9-4d1a-ab3f-acc7328b1446" />

Here when you click on delete button the employee data will be deleted.


---

### 🔐 Protected Routes

All employee-related operations are accessible only after successful admin login.



---

### 🚪 Logout

Admin can securely log out, destroying the session or token.

<img width="483" height="291" alt="image" src="https://github.com/user-attachments/assets/694bae1c-2565-4efb-8a06-b2b3ea13f0b4" />



---
