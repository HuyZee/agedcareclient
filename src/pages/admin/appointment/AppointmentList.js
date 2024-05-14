import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/AppointmentManagementSidebar';

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments');
      const appointmentsData = await Promise.all(response.data.map(async appointment => {
        const memberResponse = await axios.get(`http://localhost:5000/api/members/${appointment.member_id}`);
        const staffResponse = await axios.get(`http://localhost:5000/api/staff/${appointment.staff_id}`);
        const serviceResponse = await axios.get(`http://localhost:5000/api/services/${appointment.service_id}`);
        const facilityResponse = await axios.get(`http://localhost:5000/api/facility/${appointment.facility_id}`);
        return {
          ...appointment,
          member_name: memberResponse.data.name,
          staff_name: staffResponse.data.name,
          service_name: serviceResponse.data.service_type,
          facility_name: facilityResponse.data.room_number,
        };
      }));
      setAppointments(appointmentsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`);
        alert('Appointment deleted successfully!');
        fetchAppointments();
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Failed to delete appointment. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div>
      <AdminNavbar />
      <div className='adminhub-content'>
        <AdminSidebar />
        <div className="list-table-div">
          <h2>Appointment List</h2>
          <table className="list-table">
            <thead>
              <tr>
                <th>Member Name</th>
                <th>Staff Name</th>
                <th>Service Type</th>
                <th>Facility Room Number</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
                <th>Notes</th>
                <th>Delete</th>
              </tr>
            </thead>
            {loading ? (
              <div className='loading'></div>
            ) : (appointments.length === 0 ? (
              <p>No appointments</p>
            ) : (
              <tbody>
                {appointments.map(appointment => (
                  <tr key={appointment.appointment_id}>
                    <td>{appointment.member_name}</td>
                    <td>{appointment.staff_name}</td>
                    <td>{appointment.service_name}</td>
                    <td>{appointment.facility_name}</td>
                    <td>{formatDate(appointment.appointment_date)}</td>
                    <td>{appointment.appointment_time}</td>
                    <td>{appointment.notes}</td>
                    <td>
                      <a className="delete-link" href="#" onClick={() => deleteAppointment(appointment.appointment_id)}>Delete</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
