import React from "react";
import "./CartPage.css";

export default function CartPage({ cart, onUpdateQuantity, onCheckout }) {
    const subtotal = cart.reduce((s, x) => s + x.price * x.qty, 0);

    return (
        <main className="cart-page">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p className="empty-cart">Cart is empty — add something delicious!</p>
            ) : (
                <div className="cart-items">
                    {cart.map(ci => (
                        <div key={ci.id} className="cart-item">
                            <div className="cart-item-info">
                                <div className="cart-item-name">{ci.name}</div>
                                <div className="cart-item-price">${ci.price.toFixed(2)} each</div>
                            </div>
                            <div className="cart-item-controls">
                                <input
                                    type="number"
                                    min={1}
                                    value={ci.qty}
                                    onChange={e => onUpdateQuantity(ci.id, Math.max(1, Number(e.target.value)))}
                                />
                                <div className="cart-item-total">
                                    ${(ci.price * ci.qty).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="cart-subtotal">Subtotal: ${subtotal.toFixed(2)}</div>
                    <div className="cart-checkout">
                        <button onClick={onCheckout}>Checkout</button>
                    </div>
                </div>
            )}
        </main>
    );
}
