import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth';
import AdminNavbar from '../../../components/admin/AdminNavbar';

export default function AdminHub() {
    const [adminDetails, setAdminDetails] = useState(null);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/${user.admin_id}`);
                setAdminDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching admin details:', error);
                setError('Failed to fetch admin details. Please try again later.');
                setLoading(false);
            }
        };

        fetchAdminDetails();
    }, [user.admin_id]); // Dependency array includes user.admin_id to refetch when it changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="AdminHub">
            <AdminNavbar />
            <div className='adminhub-content'>
                <h1>Admin Hub</h1>
                <div className="staff-account-page">
                  <p><strong>Welcome {adminDetails.name}</strong></p>
                  <p><strong>Email:</strong> {adminDetails.email}</p>
                </div>
            </div>
        </div>
    );
}
