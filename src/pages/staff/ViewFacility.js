import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/staff/StaffNavbar';

export default function ViewFacility() {
    const [facility, setFacility] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFacility = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/facility/${id}`);
                setFacility(response.data);
            } catch (error) {
                console.error('Error fetching facility details:', error);
            }
        };
        fetchFacility();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    if (!facility) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AdminNavbar />
            <div className='adminhub-content'>
                <div className="create-user-container">
                    <div className='create-user-container-top-div'>
                        <h2>Facility Details</h2>
                        <button className='back-button' onClick={() => navigate("/staff/staff-appointment-list")}>Back</button>
                    </div>
                    <table className="list-table">
                        <thead>
                            <tr>
                                <th>Room Number</th>
                                <th>Occupancy Status</th>
                                <th>Reservation Length</th>
                                <th>Date Reserved</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{facility.room_number}</td>
                                <td>{facility.occupancy_status}</td>
                                <td>{facility.reservation_length}</td>
                                <td>{facility.date_reserved ? formatDate(facility.date_reserved) : 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
