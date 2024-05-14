import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/ServiceManagementSidebar';

export default function RecordService() {
    const [service, setService] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        service_type: '',
        duration: '',
        description: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/services/${id}`);
                setService(response.data);
                setFormData({
                    service_type: response.data.service_type,
                    duration: response.data.duration,
                    description: response.data.description
                });
            } catch (error) {
                console.error('Error fetching service details:', error);
            }
        };
        fetchService();
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/api/services/${id}`, formData);
            alert('Service updated successfully!');
            setEditing(false);
            navigate('/admin/service-list');
        } catch (error) {
            console.error('Error updating service:', error);
            alert('Failed to update service.');
        }
    };

    const deleteService = async () => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            try {
                await axios.delete(`http://localhost:5000/api/services/${id}`);
                alert('Service deleted successfully!');
                navigate('/admin/service-list');
            } catch (error) {
                console.error('Error deleting service:', error);
                alert('Failed to delete service. Please try again.');
            }
        }
    };

    if (!service) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AdminNavbar />
            <div className='adminhub-content'>
                <AdminSidebar />
                <div className="create-user-container">
                    <div className='create-user-container-top-div'>
                        <h2>Service Details</h2>
                        <button className='back-button' onClick={() => editing ? setEditing(false) : navigate("/admin/service-list")}>Back</button>
                    </div>
                    {!editing ? (
                        <>
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
                            <div className='edit-button-div' >
                                <button onClick={() => setEditing(true)}>Edit Service</button>
                                <button onClick={deleteService}>Delete Service</button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} className='create-user-form'>
                            <label>Service Type:</label>
                            <input type="text" name="service_type" value={formData.service_type} onChange={handleInputChange} />
                            <label>Duration:</label>
                            <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} />
                            <label>Description:</label>
                            <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
                            <button className='confirm-btn' type="submit">Confirm Update</button>
                            <button className='cancel-btn' onClick={() => setEditing(false)}>Cancel</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
