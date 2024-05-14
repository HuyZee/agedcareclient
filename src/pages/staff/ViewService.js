import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/staff/StaffNavbar';

export default function RecordService() {
    const [service, setService] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/services/${id}`);
                setService(response.data);
            } catch (error) {
                console.error('Error fetching service details:', error);
            }
        };
        fetchService();
    }, [id]);

    if (!service) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AdminNavbar />
            <div className='adminhub-content'>
                <div className="create-user-container">
                    <div className='create-user-container-top-div'>
                        <h2>Service Details</h2>
                        <button className='back-button' onClick={() => navigate("/staff/staff-appointment-list")}>Back</button>
                    </div>
                    <table className="list-table">
                        <thead>
                            <tr>
                                <th>Service Type</th>
                                <th>Duration</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{service.service_type}</td>
                                <td>{service.duration}</td>
                                <td>{service.description}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
