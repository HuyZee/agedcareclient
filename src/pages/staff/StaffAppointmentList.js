import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import StaffNavbar from '../../components/staff/StaffNavbar';
import { useAuth } from '../../hooks/useAuth';

export default function AppointmentList() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/staffAppointment?staff_id=${user.staff_id}`);
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
            member_id: memberResponse.data.member_id,
            service_id: serviceResponse.data.service_id,
            facility_id: facilityResponse.data.facility_id,
          };
        }));
        setAppointments(appointmentsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user.staff_id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div>
      <StaffNavbar />
      <div className='adminhub-content'>
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
                    <td><Link to={`/staff/view-member/${appointment.member_id}`} style={{ color: 'Blue', textDecoration: 'none' }}>{appointment.member_name}</Link></td>
                    <td>{appointment.staff_name}</td>
                    <td><Link to={`/staff/view-service/${appointment.service_id}`} style={{ color: 'Blue', textDecoration: 'none' }}>{appointment.service_name}</Link></td>
                    <td><Link to={`/staff/view-facility/${appointment.facility_id}`} style={{ color: 'Blue', textDecoration: 'none' }}>{appointment.facility_name}</Link></td>
                    <td>{formatDate(appointment.appointment_date)}</td>
                    <td>{appointment.appointment_time}</td>
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
