import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import StaffNavbar from '../../components/staff/StaffNavbar';

export default function StaffAccount() {
  const [staffDetails, setStaffDetails] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [changingPassword, setChangingPassword] = useState(false);

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
  }, [user.staff_id]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match');
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:5000/api/staff/${user.staff_id}/change-password`, {
        oldPassword,
        newPassword,
      });

      if (response.data.success) {
        alert('Password changed successfully');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError(null);
        setChangingPassword(false);
      } else {
        setPasswordError(response.data.message);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordError('Failed to change password. Please try again later.');
    }
  };

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
        <h1>{staffDetails.name}'s Account</h1>
        <div className="staff-details">
          <div className="staff-card">
            <p><strong>Email:</strong> {staffDetails.email}</p>
            <p><strong>Contact Information:</strong> {staffDetails.contact_information}</p>
            <p><strong>Qualifications:</strong> {staffDetails.qualifications}</p>
            <p><strong>Role:</strong> {staffDetails.role}</p>
            <p><strong>Availability:</strong> {staffDetails.availability}</p>
          </div>
        </div>
        <div className="edit-button-div">
          <button onClick={() => setChangingPassword(!changingPassword)}>
            {changingPassword ? 'Cancel' : 'Change Password'}
          </button>
          {changingPassword && (
            <form onSubmit={handleChangePassword} className="create-user-form">
              <div>
              <label>Old Password:</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              </div>
              <div>
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              </div>
              <div>
              <label>Confirm New Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              </div>
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
              <button type="submit">Confirm Change</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
