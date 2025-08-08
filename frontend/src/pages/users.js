import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchUsers, addUser } from "../api/users";
import { Link } from "react-router-dom";
import '../styles/users.css'; // تأكد أن هذا الملف يحتوي على نفس CSS تبع login

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: '', lastName: '', email: '', password: '', phone: '', address: '',
    active: true, emailVerified: false
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(err => console.error("Failed to fetch users:", err));
  }, []);

  const validateInput = () => {
    const err = {};
    if (!newUser.firstName.trim()) err.firstName = "First name is required";
    if (!newUser.lastName.trim()) err.lastName = "Last name is required";
    if (!newUser.email.trim()) {
      err.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      err.email = "Invalid email format";
    }
    if (!newUser.password.trim()) err.password = "Password is required";
    if (!file) err.file = "Profile photo is required";
    return err;
  };

  const handleAdd = async () => {
    const validationErrors = validateInput();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const createdUser = await addUser(newUser, file);
      setUsers([...users, createdUser]);
      resetForm();
    } catch (err) {
      console.error("Failed to add user:", err);
      setErrors({ submit: "An error occurred while creating user." });
    }
  };

  const resetForm = () => {
    setNewUser({
      firstName: '', lastName: '', email: '', password: '', phone: '', address: '',
      active: true, emailVerified: false
    });
    setFile(null);
    setErrors({});
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <h2>Create Your Account</h2>
        <div className="form-group">
          <input className="form-control mb-2" placeholder="First Name" value={newUser.firstName}
            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
          {errors.firstName && <small className="text-danger">{errors.firstName}</small>}

          <input className="form-control mb-2" placeholder="Last Name" value={newUser.lastName}
            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
          {errors.lastName && <small className="text-danger">{errors.lastName}</small>}

          <input className="form-control mb-2" placeholder="Email" type="email" value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          {errors.email && <small className="text-danger">{errors.email}</small>}

          <input className="form-control mb-2" placeholder="Password" type="password" value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
          {errors.password && <small className="text-danger">{errors.password}</small>}

          <input className="form-control mb-2" placeholder="Phone" value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />

          <input className="form-control mb-2" placeholder="Address" value={newUser.address}
            onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />

          <label htmlFor="file">Profile Picture</label>
           <input
             id="file"
             className="form-control"
             type="file"
             onChange={(e) => setFile(e.target.files[0])}
           />
           {errors.file && <small className="text-danger">{errors.file}</small>}
        </div>

        {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}

        <button className="btn btn-primary w-100 mt-2" onClick={handleAdd}>Register</button>

        <div className="text-center mt-3">
          <Link to="/" className="text-decoration-none">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Users;
