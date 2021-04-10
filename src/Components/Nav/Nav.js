import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

const Nav = () => {
    return (
        <nav>
            <Link to={'/'} className="link">
                <button>Home</button>
            </Link>
            <Link to={'/dashboard'} className="link">
                <button>Dashboard</button>
            </Link>
            <button>FAQ?</button>
        </nav>
    )
}

export default Nav;