import React from 'react'
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className='admin-hub-sidebar' >
    <Link to='/admin/inventory-list'>
                    <button>
                        Inventory List
                    </button>
                </Link>
                <Link to='/admin/create-inventory'>
                    <button>
                        Create Inventory
                    </button>
                </Link>
</div>
  )
}
