import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";


const RoutesWithNavbar = () => {
    const location = useLocation();
    const excludePaths = ["/login", "/register"];

    return (
        <div>

            {!excludePaths.includes(location.pathname) && <NavBar />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product" element={<Products />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
};

export default RoutesWithNavbar;

