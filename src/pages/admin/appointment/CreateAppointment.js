import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/AppointmentManagementSidebar';
// Import CSS file if needed

export default function CreateAppointment() {
  const [formData, setFormData] = useState({
    memberId: '',
    staffId: '',
    serviceId: '',
    facilityId: '',
    appointmentDate: '',
    appointmentTime: '',
    notes: '',
  });
  const [members, setMembers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [services, setServices] = useState([]);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/members');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/staff');
        setStaff(response.data);
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    const fetchFacilities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/facility');
        setFacilities(response.data);
      } catch (error) {
        console.error('Error fetching facilities:', error);
      }
    };

    fetchMembers();
    fetchStaff();
    fetchServices();
    fetchFacilities();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/appointments', formData);
      alert('Appointment created successfully!');
      console.log('Appointment created:', formData);
      setFormData({
        memberId: '',
        staffId: '',
        serviceId: '',
        facilityId: '',
        appointmentDate: '',
        appointmentTime: '',
        notes: '',
      });
      // Optionally, redirect to another page after successful creation
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Failed to create appointment. Please try again.');
    }
  };

  return (
    <div className='CreateAppointment'>
      <AdminNavbar />
      <div className='adminhub-content' >
        <AdminSidebar />
      <div className="create-user-container">
        <h2>Create Appointment</h2>
        <form className="create-user-form" onSubmit={handleSubmit}>
          <select name="memberId" value={formData.memberId} onChange={handleChange} required>
            <option value="">Select Member</option>
            {members.map(member => (
              <option key={member.member_id} value={member.member_id}>{member.name}</option>
            ))}
          </select>
          <select name="staffId" value={formData.staffId} onChange={handleChange} required>
            <option value="">Select Staff</option>
            {staff.map(staffMember => (
              <option key={staffMember.staff_id} value={staffMember.staff_id}>{staffMember.name}</option>
            ))}
          </select>
          <select name="serviceId" value={formData.serviceId} onChange={handleChange} required>
            <option value="">Select Service</option>
            {services.map(service => (
              <option key={service.service_id} value={service.service_id}>{service.service_type}</option>
            ))}
          </select>
          <select name="facilityId" value={formData.facilityId} onChange={handleChange} required>
            <option value="">Select Facility</option>
            {facilities.map(facility => (
              <option key={facility.facility_id} value={facility.facility_id}>{facility.room_number}</option>
            ))}
          </select>
          <input type="date" name="appointmentDate" placeholder="Appointment Date" value={formData.appointmentDate} onChange={handleChange} required />
          <input type="time" name="appointmentTime" placeholder="Appointment Time" value={formData.appointmentTime} onChange={handleChange} required />
          <input type="text" name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />
          <button type="submit">Create Appointment</button>
        </form>
      </div>
      </div>
    </div>
  );
}
