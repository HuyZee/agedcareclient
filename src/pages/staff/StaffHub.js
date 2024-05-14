import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffNavbar from '../../components/staff/StaffNavbar';
import { useAuth } from '../../hooks/useAuth';

function StaffHub() {
    const [staffDetails, setStaffDetails] = useState(null);
    const { user } = useAuth();
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
    }, [user.staff_id]); // Dependency array includes user.staff_id to refetch when it changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="StaffHub">
            <StaffNavbar />
            <div className='adminhub-content'>
                <h1 className='staffhub-heading'>Staff Hub</h1>
                <div className="staff-account-page">
                    <p><strong>Welcome {staffDetails.name}</strong></p>
                    <p><strong>Email:</strong> {staffDetails.email}</p>
                </div>
            </div>
        </div>
    );
}

export default StaffHub;
