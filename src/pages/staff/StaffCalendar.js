import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

import Calendar from 'react-calendar';
import StaffNavbar from '../../components/staff/StaffNavbar';

function StaffCalender() {
  const { logout, user } = useAuth();
  const [value, onChange] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch appointments for the selected date
  const fetchAppointments = async (selectedDate) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/staffAppointment?staff_id=${user.staff_id}&date=${selectedDate}`);
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
      console.log(selectedDate, value.toDateString());
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
      setAppointments([]);
    }
  };

  function convertToFormattedDate(inputDate) {
    // Parse the input date string
    const date = new Date(inputDate);

    // Extract components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Construct the formatted date
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  // Function to handle date change on the calendar
  const handleDateChange = (selectedDate) => {
    setLoading(true);
    onChange(selectedDate);
    fetchAppointments(convertToFormattedDate(selectedDate));
    console.log(convertToFormattedDate(selectedDate));
  };

  return (
    <div className="AdminHub">
      <StaffNavbar />
      <div className='adminhub-content-calender'>
        <h1 className='adminhub-heading'>Calendar</h1>
        <div className='calendar-container'>
          <Calendar
            className='calendar'
            onChange={handleDateChange}
            value={value}
          />
        </div>
        <div className="list-table-div">
          <h2>Appointments for {value.toDateString()}</h2>
          <table className='list-table' >
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Member</th>
                <th>Staff</th>
                <th>Service</th>
                <th>Facility</th>
                <th>Appointment Time</th>
                {/* <th>Notes</th> */}
              </tr>
            </thead>
            { loading ? (
                <div className='loading' ></div>
            ) : (
              appointments.length === 0 ? (
                <p>No appointments on this day</p>
            ) : (
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment.appointment_id}>
                  <td>{appointment.appointment_id}</td>
                  <td>{appointment.member_name}</td>
                  <td>{appointment.staff_name}</td>
                  <td>{appointment.service_name}</td>
                  <td>{appointment.facility_name}</td>
                  <td>{appointment.appointment_time}</td>
                  {/* <td>{appointment.notes}</td> */}
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

export default StaffCalender;
