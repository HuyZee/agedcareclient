import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/FacilityManagementSidebar';

export default function CreateFacility() {
  const [formData, setFormData] = useState({
    roomNumber: '',
    occupancyStatus: '',
    reservationLength: '',
    dateReserved: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/facility', formData);
      alert('Facility created successfully!');
      // Reset the form correctly using the right state keys
      setFormData({
        roomNumber: '',
        occupancyStatus: '',
        reservationLength: '',
        dateReserved: '',
      });
    } catch (error) {
      console.error('Error creating facility:', error);
      alert('Failed to create facility. Please try again.');
    }
  };

  return (
    <div className='CreateMember'>  
      <AdminNavbar />
      <div className='adminhub-content'>
        <AdminSidebar />
        <div className="create-user-container">
          <h2>Create Facility</h2>
          <form className="create-user-form" onSubmit={handleSubmit}>
            <input type="text" name="roomNumber" placeholder="Room Number" value={formData.roomNumber} onChange={handleChange} required />
            <select name="occupancyStatus" value={formData.occupancyStatus} onChange={handleChange} required>
              <option value="">Select Occupancy Status</option>
              <option value="Occupied">Occupied</option>
              <option value="Available">Available</option>
            </select>
            <input type="text" name="reservationLength" placeholder="Reservation Length" value={formData.reservationLength} onChange={handleChange} />
            <input type="date" name="dateReserved" placeholder="Date Reserved" value={formData.dateReserved} onChange={handleChange} />
            <button type="submit">Add Facility</button>
          </form>
        </div>
      </div>
    </div>
  );
}
