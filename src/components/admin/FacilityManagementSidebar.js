import React from 'react'
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className='admin-hub-sidebar' >
     <Link to='/admin/facility-list'>
                    <button>
                        Facility List
                    </button>
                </Link>
                <Link to='/admin/create-facility'>
                    <button>
                        Create Facility
                    </button>
                </Link>
</div>
  )
}
