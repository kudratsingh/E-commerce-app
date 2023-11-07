// frontend/src/components/NavBar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    return (
        <div className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-brand">E-Commerce App</h1>
                <ul className="navbar-links">
                    <li><NavLink exact='true' to="/" className="active-link">Home</NavLink></li>
                    <li><NavLink to="/product" className="active-link">Products</NavLink></li>
                    <li><NavLink to="/cart" className="active-link">Cart</NavLink></li>
                    <li><NavLink to="/admin" className="active-link">Admin</NavLink></li>
                    <li><NavLink to="/login" className="active-link">Login</NavLink></li>
                    <li><NavLink to="/register" className="active-link">Register</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default NavBar;

