import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../../components/admin/StaffManagementSidebar';

export default function AdminList() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  return (  
    <div>
      <AdminNavbar />
      <div className='adminhub-content'>
        <AdminSidebar />
        <div className="list-table-div">
          <h2>Admin List</h2>
          <table className="list-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Edit</th>
              </tr>
            </thead>
            {admins.length === 0 ? (
                <div className='loading' ></div>
            ) : (
                <tbody>
              {admins.map(admin => (
                <tr key={admin.admin_id}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    <Link className="edit-link" to={`/admin/record-admin/${admin.admin_id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
              
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
