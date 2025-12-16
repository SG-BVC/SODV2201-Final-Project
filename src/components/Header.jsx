import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ cartCount }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    function handleLogout() {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    }

    return (
        <header className="header">
            <Link to="/" className="header-title">NorthSkies — Smart Restaurant</Link>
            <nav className="header-nav">
                <Link to="/menu">Menu</Link>
                <Link to="/reservations">Reservations</Link>
                <Link to="/admin">Admin</Link>
                <Link to="/cart" className="cart-link">Cart ({cartCount})</Link>

                {!token ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                )}
            </nav>
        </header>
    );
}
