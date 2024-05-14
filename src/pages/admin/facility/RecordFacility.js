import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/FacilityManagementSidebar';
import { useParams, useNavigate } from 'react-router-dom';

export default function RecordFacility() {
    const [facility, setFacility] = useState(null);
    const [editing, setEditing] = useState(false); // New state for toggling edit mode
    const [formData, setFormData] = useState({
        room_number: '',
        occupancy_status: '',
        reservation_length: '',
        date_reserved: '',
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFacility = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/facility/${id}`);
                setFacility(response.data);
                setFormData({
                    room_number: response.data.room_number,
                    occupancy_status: response.data.occupancy_status,
                    reservation_length: response.data.reservation_length,
                    date_reserved: response.data.date_reserved || ''
                });
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

    const deleteFacility = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/facility/${id}`);
            alert('Facility deleted successfully!');
            navigate('/admin/facility-list');
        } catch (error) {
            console.error('Error deleting facility:', error);
            alert('Failed to delete facility. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/facility/${id}`, {
                room_number: formData.room_number,
                occupancy_status: formData.occupancy_status,
                reservation_length: formData.reservation_length,
                date_reserved: formData.date_reserved
            });
            alert('Facility updated successfully!');
            setEditing(false); // Exit editing mode
            navigate('/admin/facility-list'); // Optionally navigate away
        } catch (error) {
            console.error('Error updating facility:', error);
            alert('Failed to update facility.');
        }
    };

    if (!facility) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AdminNavbar />
            <div className='adminhub-content'>
                <AdminSidebar />
                <div className="create-user-container">
                    <div className='create-user-container-top-div'>
                    <h2>Facility Details</h2>
                    <button className='back-button' onClick={() => editing ? setEditing(false) : navigate("/admin/facility-list")}>Back</button>

                    </div>
                    {!editing ? (
                        <>
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
                            <div className='edit-button-div' >
                                <button onClick={() => setEditing(true)} >Edit Facility</button>
                                <button onClick={deleteFacility} >Delete Facility</button>
                            </div>
                            
                        </>
                        
                    ) : (
                        <form onSubmit={handleSubmit} className='create-user-form'>
                            <label>Room Number:</label>
                            <input type="text" name="room_number" value={formData.room_number} onChange={handleInputChange} />
                            <label>Occupancy Status:</label>
                            <input type="text" name="occupancy_status" value={formData.occupancy_status} onChange={handleInputChange} />
                            <label>Reservation Length:</label>
                            <input type="text" name="reservation_length" value={formData.reservation_length} onChange={handleInputChange} />
                            <label>Date Reserved:</label>
                            <input type="date" name="date_reserved" value={formData.date_reserved} onChange={handleInputChange} />
                            <button className='confirm-btn' type="submit">Confirm Update</button>
                            <button className='cancel-btn' onClick={() => setEditing(false)}>Cancel</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
