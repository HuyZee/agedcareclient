import React from 'react'
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className='admin-hub-sidebar' >
    <Link to='/admin/service-list'>
                    <button>
                        Service List
                    </button>
                </Link>
                <Link to='/admin/create-service'>
                    <button>
                        Create Service
                    </button>
                </Link>
</div>
  )
}
