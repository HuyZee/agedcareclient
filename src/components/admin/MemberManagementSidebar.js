import React from 'react'
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className='admin-hub-sidebar' >
     <Link to='/admin/patient-list'>
                    <button>
                        Member List
                    </button>
                </Link>
                <Link to='/admin/create-member'>
                    <button>
                        Create new member
                    </button>
                </Link>
</div>
  )
}
