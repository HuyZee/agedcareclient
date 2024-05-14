import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/StaffManagementSidebar';

export default function CreateAdmin() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin', formData);
      alert('Admin created successfully!');
      // Optionally, redirect to another page after successful creation or reset the form
      setFormData({
        name: '',
        email: '',
        password: ''
      });
    } catch (error) {
      console.error('Error creating admin:', error);
      alert('Failed to create admin. Please try again.');
    }
  };

  return (
    <div className='createUser' >
      <AdminNavbar />
      <div className='adminhub-content' >
        <AdminSidebar />
        <div className="create-user-container">
          <h2>Create Admin</h2>
          <form className="create-user-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="submit">Create Admin</button>
          </form>
        </div>
      </div>
    </div>
  );
}
