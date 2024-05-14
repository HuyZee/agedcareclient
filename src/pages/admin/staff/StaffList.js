import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/StaffManagementSidebar';
import { Link } from 'react-router-dom';

export default function StaffList() {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/staff');
      setStaffList(response.data);
    } catch (error) {
      console.error('Error fetching staff list:', error);
    }
  };

  // Function to convert SQL datetime format to a readable date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};


  return (
    <div>
      <AdminNavbar />
      <div className='adminhub-content'>
        <AdminSidebar />
        <div className="list-table-div">
          <h2>Staff List</h2>
          <table className="list-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Phone Number</th>
                <th>Mailing Address</th>
                <th>Email</th>
                <th>Qualifications</th>
                <th>Availability</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map(staff => (
                <tr key={staff.staff_id}>
                  <td>{staff.name}</td>
                  <td>{staff.lname}</td>
                  <td>{staff.gender}</td>
                  <td>{formatDate(staff.date_of_birth)}</td>
                  <td>{staff.phoneNo}</td>
                  <td>{staff.mailing_address}</td>
                  <td>{staff.email}</td>
                  <td>{staff.qualifications}</td>
                  <td>{staff.availability}</td> 
                  <td>
                    <Link className="edit-link" to={`/admin/record-staff/${staff.staff_id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
