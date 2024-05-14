import React from 'react'
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/ServiceManagementSidebar';
import { Link } from 'react-router-dom';
export default function ServiceManagement() {
  return (
    <div>
        <AdminNavbar />
        <div className='adminhub-content' >
            <AdminSidebar />
            <div>
                <h1 className='adminhub-heading' >Service Management</h1>
            </div>
        </div>
    </div>
  )
}
 