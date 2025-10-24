import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Chatbot from "./components/Chatbot";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import ReservationPage from "./pages/ReservationPage";
import AdminDashboard from "./pages/AdminDashboard";
import "./index.css";

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart(c => {
      const found = c.find(x => x.id === item.id);
      if (found) return c.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { ...item, qty: 1 }];
    });
  }

  function updateQuantity(id, qty) {
    setCart(c => c.map(x => x.id === id ? { ...x, qty } : x));
  }

  function checkout() {
    alert(`Checkout: ${cart.length} items — (this would call backend / payments).`);
    setCart([]);
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header cartCount={cart.length} />
        <Routes>
          <Route path="/" element={<div className="p-6"><h1 className="text-3xl">Welcome to NorthSkies</h1><p className="mt-3 text-gray-700">Fast, friendly, and smart restaurant experience.</p></div>} />
          <Route path="/menu" element={<MenuPage onAddToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} onUpdateQuantity={updateQuantity} onCheckout={checkout} />} />
          <Route path="/reservations" element={<ReservationPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<div className="p-6">Page not found</div>} />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}
