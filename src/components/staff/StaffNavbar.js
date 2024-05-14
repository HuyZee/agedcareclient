import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';

function StaffNavbar() {
    const { logout, user } = useAuth();
    const handleLogout = () => {
        logout();
    }
    return (
        <div className="AdminNavbar">
            <div className='headings' >
                <h1>Aged Care</h1>
                <h3>User - {user.name}</h3>
                <nav role='navigation' >
                <div id='menuToggle' >
                    <input type='checkbox' />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id='menu' >
                    <li>
                        <Link to={'/staff'}>
                            <button>
                                Staff Hub
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/staff/staff-calendar">
                            <button>
                                Appointment Calendar
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/staff/staff-appointment-list">
                            <button>
                                Appointment List
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/staff/staff-patient-list">
                            <button>
                                Patient
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/staff/account">
                            <button>
                                Account
                            </button>
                        </Link>
                    </li>
                    <li>
                        <button id='logout-button' onClick={handleLogout} >
                            Logout
                        </button>
                    </li>
                    </ul>
                </div>
                </nav>
            </div>

            <nav role='navigation' className='desktop-nav'>
                <ul>
                    <li>
                        <Link to={'/staff'}>
                            <button>
                                Staff Hub
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/staff/staff-calendar">
                            <button>
                                Appointment Calendar
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/staff/staff-appointment-list">
                            <button>
                                Appointment List
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/staff/staff-inventory-list">
                            <button>
                                Inventory 
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/staff/account">
                            <button>
                                Account
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
  
  export default StaffNavbar;