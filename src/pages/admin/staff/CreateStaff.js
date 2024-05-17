import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/StaffManagementSidebar';

export default function CreateStaff() {
  const [formData, setFormData] = useState({
    name: '',
    lname: '',
    email: '',
    password: 'default', // Set default password here
    contact_information: '',
    phoneNo: '',
    mailing_address: '',
    date_of_birth: '',
    gender: '',
    qualifications: '',
    availability: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/staff', formData);
      alert('Staff created successfully!');
      setFormData({
        name: '',
        lname: '',
        email: '',
        password: 'default', // Reset default password here
        contact_information: '',
        phoneNo: '',
        mailing_address: '',
        date_of_birth: '',
        gender: '',
        qualifications: '',
        availability: ''
      });
    } catch (error) {
      console.error('Error creating staff:', error);
      alert('Failed to create staff. Please try again.');
    }
  };

  return (
    <div className='createUser'>
      <AdminNavbar />
      <div className='adminhub-content'>
        <AdminSidebar />
        <div className="create-user-container">
          <h2>Create Staff</h2>
          <form className="create-user-form" onSubmit={handleSubmit}>
            <h3>Personal Information</h3>
            <label>Name:</label>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <label>Last Name:</label>
            <input type="text" name="lname" placeholder="Last Name" value={formData.lname} onChange={handleChange} />
            <label>Gender:</label>
            <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} />
            <label>Date of Birth:</label>
            <input type="date" name="date_of_birth" placeholder="Date of Birth" value={formData.date_of_birth} onChange={handleChange} />
            <label>Phone Number:</label>
            <input type="text" name="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} />
            <label>Mailing Address:</label>
            <input type="text" name="mailing_address" placeholder="Mailing Address" value={formData.mailing_address} onChange={handleChange} />
            <h3>Account Information</h3>
            <label>Email:</label>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            
            <h3>Other Information</h3>
            <label>Qualifications:</label>
            <input type="text" name="qualifications" placeholder="Qualifications" value={formData.qualifications} onChange={handleChange} required />
            <label>Availability:</label>
            <input type="text" name="availability" placeholder="Availability" value={formData.availability} onChange={handleChange} required />
            <button type="submit">Create Staff</button>
          </form>
        </div>
      </div>
    </div>
  );
}
