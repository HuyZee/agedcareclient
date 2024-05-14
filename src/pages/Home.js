import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/styles.css'

function Home() {
return (
    <div className='Home'>
        <h1>Aged Care</h1>
        <Link to="/login/admin">
            <button>Admin</button>
        </Link>
        <Link to="/login/staff">
            <button>Staff</button>
        </Link>
    </div>
)
}

export default Home
