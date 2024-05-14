import React from 'react'
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className='admin-hub-sidebar' >
                <Link to='/admin/admin-list'>
                    <button>
                        Admin List
                    </button>
                </Link>
                <Link to='/admin/staff-list'>
                    <button>
                        Staff List
                    </button>
                </Link>
                <Link to='/admin/create-admin'>
                    <button>
                        New Admin
                    </button>
                </Link>
                <Link to='/admin/create-staff'>
                    <button>
                        New Staff
                    </button>
                </Link>
                
</div>
  )
}
