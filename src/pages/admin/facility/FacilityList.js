import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/FacilityManagementSidebar';
import { Link } from 'react-router-dom';

export default function FacilityList() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/facility');
      setFacilities(response.data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div>
      <AdminNavbar />
      <div className='adminhub-content' >
        <AdminSidebar />
        <div className="list-table-div">
          <h2>Facility List</h2>
          <table className="list-table">
            <thead>
              <tr>
                <th>Room Number</th>
                <th>Occupancy Status</th>
                <th>Reservation Length</th>
                <th>Date Reserved</th>
                <th>Edit</th>
              </tr>
            </thead>
            {facilities.length === 0 ? (
                <div className='loading' ></div>
            ) : (
            <tbody>
              {facilities.map(facility => (
                <tr key={facility.facility_id}>
                  <td>{facility.room_number}</td>
                  <td>{facility.occupancy_status}</td>
                  <td>{facility.reservation_length}</td>
                  <td>{facility.date_reserved ? formatDate(facility.date_reserved) : 'N/A'}</td>
                  <td>
                  <Link className="edit-link" to={`/admin/record-facility/${facility.facility_id}`}>Edit</Link>
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
