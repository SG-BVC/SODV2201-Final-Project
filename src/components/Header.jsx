import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function Header({ cartCount }) {
  return (
    <header className="bg-red-600 text-white p-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold">NorthSkies — Smart Restaurant</Link>
      <nav className="space-x-4">
        <Link to="/menu" className="hover:underline">Menu</Link>
        <Link to="/reservations" className="hover:underline">Reservations</Link>
        <Link to="/admin" className="hover:underline">Admin</Link>
        <Link to="/cart" className="ml-4 bg-white text-red-600 px-3 py-1 rounded">Cart ({cartCount})</Link>
      </nav>
    </header>
  );
}
