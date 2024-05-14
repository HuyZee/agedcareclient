import React from 'react';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/FacilityManagementSidebar';


function AdminHub() {
    return (
      <div className="AdminHub">
        <AdminNavbar />
        <div className='adminhub-content' >
          <AdminSidebar />
            <h1 className='adminhub-heading' >Facility Management</h1>
        </div>
      </div>
    );
  }
  
  export default AdminHub;