import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import StaffNavbar from '../../components/staff/StaffNavbar';

export default function StaffAccount() {
    const [staffDetails, setStaffDetails] = useState(null);
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchStaffDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/staff/${user.staff_id}`);
          setStaffDetails(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching staff details:', error);
          setError('Failed to fetch staff details. Please try again later.');
          setLoading(false);
        }
      };
  
      fetchStaffDetails();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div>
        <StaffNavbar />
        <div className="staff-account-page">
        <h1>{staffDetails.name}'s account</h1>
        <div className="staff-details">
          <div className="staff-card">
          
            <p><strong>Email:</strong> {staffDetails.email}</p>
            <p><strong>Contact Information:</strong> {staffDetails.contact_information}</p>
            <p><strong>Qualifications:</strong> {staffDetails.qualifications}</p>
            <p><strong>Role:</strong> {staffDetails.role}</p>
            <p><strong>Availability:</strong> {staffDetails.availability}</p>
          </div>
        </div>
        </div>
      </div>
    );
  }