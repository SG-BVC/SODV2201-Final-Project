import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Chatbot from "./components/Chatbot";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import ReservationPage from "./pages/ReservationPage";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

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

   async function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty! Add items to order.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const orderData = {
        items: cart.map(item => ({
            menuItem: item._id || item.id,
            quantity: item.qty
        })),
        total,
        type: 'pickup' 
    };

    try {
        const response = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || 'Failed to place order');
        }

        const order = await response.json();
        alert(`Guest order placed successfully! 🎉\nOrder ID: ${order._id}\nTotal: $${total.toFixed(2)}\nStatus: ${order.status} (preparing)\nSave this ID for reference—no account history.`);
        
        setCart([]);
        console.log('Guest order created:', order);
    } catch (error) {
        alert(`Order failed: ${error.message}\nTry again or add more details.`);
        console.error('Checkout error:', error);
    }
}

    return (
        <Router>
            <div className="app-container">
                <Header cartCount={cart.length} />
                <Routes>
                    <Route path="/"
                        element={
                            <div className="page home-page">
                                <h1>Welcome to NorthSkies</h1>
                                <p>Fast, friendly, and smart restaurant experience.</p>
                            </div>
                        }
                    />
                    <Route path="/menu" element={<MenuPage onAddToCart={addToCart} />} />
                    <Route path="/cart"
                        element={
                            <CartPage
                                cart={cart}
                                onUpdateQuantity={updateQuantity}
                                onCheckout={checkout}
                            />
                        }
                    />
                    <Route path="/reservations" element={<ReservationPage />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="*" element={<div className="page not-found">Page not found</div>} />
                </Routes>
                <Chatbot />
            </div>
        </Router>
    );
}
