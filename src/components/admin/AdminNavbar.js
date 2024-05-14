import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';

function AdminNavbar() {
    const { logout, user } = useAuth();
    const handleLogout = () => {
        logout();
    }
    return (
        <div className="AdminNavbar">
            <div className='headings' >
                <h3>Username - {user.name}</h3>
                <h1>Aged Care Management</h1>
                <nav role='navigation' >
                <div id='menuToggle' >
                    <input type='checkbox' />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id='menu' >
                    <li>
                        <Link to={'/admin'}>
                            <button>
                                Admin Hub
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/staff-management">
                            <button>
                                Staff Management
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/member-management">
                            <button>
                                Member Management
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/appointment-management">
                            <button>
                                Appointment Management
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/inventory-management">
                            <button>
                                Inventory Management
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/facility-management">
                            <button>
                                Facility Management
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/service-management">
                            <button>
                                Service Management
                            </button>
                        </Link>
                    </li>
                    <li>
                        <button className='logout-button' onClick={handleLogout} >
                            Logout
                        </button>
                    </li>
                    </ul>
                </div>
                </nav>
            </div>

            <nav role='navigation' className='desktop-nav' >
                 <ul>
                 <li>
                        <Link to={'/admin'}>
                            <button>
                                Admin Hub
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/staff-management">
                            <button>
                                Staff Management
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/member-management">
                            <button>
                                Member Management
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/appointment-management">
                            <button>
                                Appointment Management
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/inventory-management">
                            <button>
                                Inventory Management
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/facility-management">
                            <button>
                                Facility Management
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/service-management">
                            <button>
                                Service Management
                            </button>
                        </Link>
                    </li>
                    <li>
                        <button id='logout-button' onClick={handleLogout} >
                            Logout
                        </button>
                    </li>
                </ul> 
            </nav>
        </div>
    );
  }
  
  export default AdminNavbar;