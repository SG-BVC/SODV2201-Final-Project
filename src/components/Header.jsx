import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header({ cartCount }) {
    return (
        <header className="header">
            <Link to="/" className="header-title">NorthSkies — Smart Restaurant</Link>
            <nav className="header-nav">
                <Link to="/menu">Menu</Link>
                <Link to="/reservations">Reservations</Link>
                <Link to="/admin">Admin</Link>
                <Link to="/cart" className="cart-link">Cart ({cartCount})</Link>
            </nav>
        </header>
    );
}
