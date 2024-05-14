import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../components/admin/AdminNavbar';

export default function RecordAdmin() {
    const [admin, setAdmin] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/${id}`);
                setAdmin(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                });
            } catch (error) {
                console.error('Error fetching admin details:', error);
            }
        };
        fetchAdmin();
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Using PATCH request for partial updates
            await axios.patch(`http://localhost:5000/api/admin/${id}`, formData);
            alert('Admin updated successfully!');
            setEditing(false);
            navigate('/admin/admin-list');
        } catch (error) {
            console.error('Error updating admin:', error);
            alert('Failed to update admin.');
        }
    };
    

    const deleteAdmin = async () => {
        if (window.confirm("Are you sure you want to delete this admin?")) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/${id}`);
                alert('Admin deleted successfully!');
                navigate('/admin/admin-list');
            } catch (error) {
                console.error('Error deleting admin:', error);
                alert('Failed to delete admin. Please try again.');
            }
        }
    };

    if (!admin) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AdminNavbar />
            <div className='adminhub-content'>
                <div className="create-user-container">
                    <div className='create-user-container-top-div'>
                        <h2>Admin Details</h2>
                        <button className='back-button' onClick={() => editing ? setEditing(false) : navigate("/admin/admin-list")}>Back</button>
                    </div>
                    {!editing ? (
                        <>
                            <table className="list-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{admin.name}</td>
                                        <td>{admin.email}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='edit-button-div'>
                                <button onClick={() => setEditing(true)}>Edit Admin</button>
                                <button onClick={deleteAdmin}>Delete Admin</button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} className='create-user-form'>
                            <label>Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                            <button className='confirm-btn' type="submit">Confirm Update</button>
                            <button className='cancel-btn' onClick={() => setEditing(false)}>Cancel</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
