import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../components/admin/AdminNavbar';

export default function RecordMember() {
    const [member, setMember] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date_of_birth: '',
        medicare_number: '',
        medicare_irn: '',
        medicare_expiry_date: '',
        gender: '',
        phoneNo: '',
        emergency_phoneNo: '',
        mailing_address: '',
        allergies: '',
        medical_conditions: '',
        dietary_restrictions: '',
        current_medications: '',
        general_practitioner: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/members/${id}`);
                setMember(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    date_of_birth: response.data.date_of_birth,
                    medicare_number: response.data.medicare_number,
                    medicare_irn: response.data.medicare_irn,
                    medicare_expiry_date: response.data.medicare_expiry_date,
                    gender: response.data.gender,
                    phoneNo: response.data.phoneNo,
                    emergency_phoneNo: response.data.emergency_phoneNo,
                    mailing_address: response.data.mailing_address,
                    allergies: response.data.allergies,
                    medical_conditions: response.data.medical_conditions,
                    dietary_restrictions: response.data.dietary_restrictions,
                    current_medications: response.data.current_medications,
                    general_practitioner: response.data.general_practitioner
                });
            } catch (error) {
                console.error('Error fetching member details:', error);
            }
        };
        fetchMember();
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/api/members/${id}`, formData);
            alert('Member updated successfully!');
            setEditing(false);
            navigate('/admin/patient-list');
        } catch (error) {
            console.error('Error updating member:', error);
            alert('Failed to update member.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const deleteMember = async () => {
        if (window.confirm("Are you sure you want to delete this member?")) {
            try {
                await axios.delete(`http://localhost:5000/api/members/${id}`);
                alert('Member deleted successfully!');
                navigate('/admin/patient-list');
            } catch (error) {
                console.error('Error deleting member:', error);
                alert('Failed to delete member. Please try again.');
            }
        }
    };

    if (!member) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AdminNavbar />
            <div className='adminhub-content'>
                <div className="create-user-container">
                    <div className='create-user-container-top-div'>
                        <h2>Member Details</h2>
                        <button className='back-button' onClick={() => editing ? setEditing(false) : navigate("/admin/patient-list")}>Back</button>
                    </div>
                    {!editing ? (
                        <>
                            <table className="list-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Date of Birth</th>
                                        <th>Gender</th>
                                        <th>Medicare Number</th>
                                        <th>Medicare IRN</th>
                                        <th>Medicare Expiry Date</th>
                                        <th>Phone Number</th>
                                        <th>Emergency Phone Number</th>
                                        <th>Mailing Address</th>
                                        <th>Allergies</th>
                                        <th>Medical Conditions</th>
                                        <th>Dietary Restrictions</th>
                                        <th>Current Medications</th>
                                        <th>General Practitioner</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{member.name}</td>
                                        <td>{member.email}</td>
                                        <td>{formatDate(member.date_of_birth)}</td>
                                        <td>{member.gender}</td>
                                        <td>{member.medicare_number}</td>
                                        <td>{member.medicare_irn}</td>
                                        <td>{formatDate(member.medicare_expiry_date)}</td>
                                        <td>{member.phoneNo}</td>
                                        <td>{member.emergency_phoneNo}</td>
                                        <td>{member.mailing_address}</td>
                                        <td>{member.allergies}</td>
                                        <td>{member.medical_conditions}</td>
                                        <td>{member.dietary_restrictions}</td>
                                        <td>{member.current_medications}</td>
                                        <td>{member.general_practitioner}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='edit-button-div'>
                                <button onClick={() => setEditing(true)}>Edit Member</button>
                                <button onClick={deleteMember}>Delete Member</button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} className='create-user-form'>
                            <h3>Personal Information</h3>
                            <label>Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                            <label>Date of Birth:</label>
                            <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} />
                            <label>Gender:</label>
                            <select name="gender" value={formData.gender} onChange={handleInputChange}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>

                            <h3>Contact Information</h3>
                            <label>Phone Number:</label>
                            <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange} />
                            <label>Emergency Phone Number:</label>
                            <input type="text" name="emergency_phoneNo" value={formData.emergency_phoneNo} onChange={handleInputChange} />
                            <label>Mailing Address:</label>
                            <input type="text" name="mailing_address" value={formData.mailing_address} onChange={handleInputChange} />

                            <h3>Medical Information</h3>
                            <label>Medicare Number:</label>
                            <input type="text" name="medicare_number" value={formData.medicare_number} onChange={handleInputChange} />
                            <label>Medicare IRN:</label>
                            <input type="text" name="medicare_irn" value={formData.medicare_irn} onChange={handleInputChange} />
                            <label>Medicare Expiry Date:</label>
                            <input type="date" name="medicare_expiry_date" value={formData.medicare_expiry_date} onChange={handleInputChange} />
                            <label>Allergies:</label>
                            <input type="text" name="allergies" value={formData.allergies} onChange={handleInputChange} />
                            <label>Medical Conditions:</label>
                            <input type="text" name="medical_conditions" value={formData.medical_conditions} onChange={handleInputChange} />
                            <label>Dietary Restrictions:</label>
                            <input type="text" name="dietary_restrictions" value={formData.dietary_restrictions} onChange={handleInputChange} />
                            <label>Current Medications:</label>
                            <input type="text" name="current_medications" value={formData.current_medications} onChange={handleInputChange} />
                            <label>General Practitioner:</label>
                            <input type="text" name="general_practitioner" value={formData.general_practitioner} onChange={handleInputChange} />
                            <button className='confirm-btn' type="submit">Confirm Update</button>
                            <button className='cancel-btn' onClick={() => setEditing(false)}>Cancel</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
