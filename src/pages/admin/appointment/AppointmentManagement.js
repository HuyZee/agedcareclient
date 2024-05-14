import React from 'react'
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/AppointmentManagementSidebar';
import { Link } from 'react-router-dom';

export default function AppointmentManagement() {
  return (
    <div>
        <AdminNavbar />
        <div className='adminhub-content' >
            <AdminSidebar />
            <div>
                <h1 className='adminhub-heading' >Appointment Management</h1>
                
            </div>
        </div>
    </div>
  )
}
 