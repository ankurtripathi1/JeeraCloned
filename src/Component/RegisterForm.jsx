import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import "./Style.css"; 


const RegisterForm = ({ onRegister }) => {

  const [formData, setFormData] = useState({
	id:'',
    username: '',
    email: '',
    password: '',
    role: 'User', // Default role is User
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage('All fields are required');
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const isUserExist = existingUsers.some((user) => user.email === formData.email);

    if (isUserExist) {
      setErrorMessage('User with this email or user already exists');
      return;
    }

    // Save the new user to local storage
	let myuuid = uuidv4();
    const newUser = {
	  id: myuuid,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

    setSuccessMessage('Registration successful');
    setErrorMessage(null);
	alert('Registration successful');
    setFormData({ username: '', email: '', password: '', role: 'User' });
    onRegister(newUser);
  };

  return (
    <div>
      <h1>Register User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
	  <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default RegisterForm;
