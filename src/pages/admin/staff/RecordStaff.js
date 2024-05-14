import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/StaffManagementSidebar';

export default function RecordStaff() {
    const [staff, setStaff] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        lname: '',
        email: '',
        phoneNo: '',
        mailing_address: '',
        date_of_birth: '',
        gender: '',
        qualifications: '',
        availability: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/staff/${id}`);
                setStaff(response.data);
                setFormData({
                    name: response.data.name,
                    lname: response.data.lname,
                    email: response.data.email,
                    phoneNo: response.data.phoneNo,
                    mailing_address: response.data.mailing_address,
                    date_of_birth: response.data.date_of_birth ? response.data.date_of_birth.substring(0, 10) : '',
                    gender: response.data.gender,
                    qualifications: response.data.qualifications,
                    availability: response.data.availability
                });
            } catch (error) {
                console.error('Error fetching staff details:', error);
            }
        };
        fetchStaff();
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/api/staff/${id}`, formData);
            alert('Staff updated successfully!');
            setEditing(false);
            navigate('/admin/staff-list');
        } catch (error) {
            console.error('Error updating staff:', error);
            alert('Failed to update staff.');
        }
    };

    const deleteStaff = async () => {
        if (window.confirm("Are you sure you want to delete this staff record?")) {
            try {
                await axios.delete(`http://localhost:5000/api/staff/${id}`);
                alert('Staff deleted successfully!');
                navigate('/admin/staff-list');
            } catch (error) {
                console.error('Error deleting staff:', error);
                alert('Failed to delete staff. Please try again.');
            }
        }
    };

    if (!staff) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AdminNavbar />
            <div className='adminhub-content'>
                <div className="create-user-container">
                    <div className='create-user-container-top-div'>
                        <h2>Staff Details</h2>
                        <button className='back-button' onClick={() => editing ? setEditing(false) : navigate("/admin/staff-list")}>Back</button>
                    </div>
                    {!editing ? (
                        <>
                            <table className="list-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Mailing Address</th>
                                        <th>Date of Birth</th>
                                        <th>Gender</th>
                                        <th>Qualifications</th>
                                        <th>Availability</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{staff.name}</td>
                                        <td>{staff.lname}</td>
                                        <td>{staff.email}</td>
                                        <td>{staff.phoneNo}</td>
                                        <td>{staff.mailing_address}</td>
                                        <td>{staff.date_of_birth ? new Date(staff.date_of_birth).toLocaleDateString() : 'N/A'}</td>
                                        <td>{staff.gender}</td>
                                        <td>{staff.qualifications}</td>
                                        <td>{staff.availability}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='edit-button-div'>
                                <button onClick={() => setEditing(true)}>Edit Staff</button>
                                <button onClick={deleteStaff}>Delete Staff</button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} className='create-user-form'>
                            <h3>Personal Information</h3>
                            <label>Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                            <label>Last Name:</label>
                            <input type="text" name="lname" value={formData.lname} onChange={handleInputChange} />
                            <label>Gender:</label>
                            <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} />
                            <label>Date of Birth:</label>
                            <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} />
                            <label>Phone Number:</label>
                            <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange} />
                            <label>Mailing Address:</label>
                            <input type="text" name="mailing_address" value={formData.mailing_address} onChange={handleInputChange} />
                        
                            <h3>Account Information</h3>
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                            
                            <h3>Other Information</h3>
                            <label>Qualifications:</label>
                            <input type="text" name="qualifications" value={formData.qualifications} onChange={handleInputChange} />
                            <label>Availability:</label>
                            <input type="text" name="availability" value={formData.availability} onChange={handleInputChange} />
                            <button className='confirm-btn' type="submit">Confirm Update</button>
                            <button className='cancel-btn' onClick={() => setEditing(false)}>Cancel</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
