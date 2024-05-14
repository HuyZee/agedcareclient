import React from 'react'
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/InventoryManagementSidebar';
import { Link } from 'react-router-dom';
export default function InventoryManagement() {
  return (
    <div>
        <AdminNavbar />
        <div className='adminhub-content' >
            <AdminSidebar />
            <div>
                <h1 className='adminhub-heading' >Inventory Management</h1>
            </div>
        </div>
    </div>
  )
}
 