import React from "react";
import "./CartPage.css";

export default function CartPage({ cart, onUpdateQuantity, onCheckout }) {
  const mergedCart = cart.reduce((acc, item) => {
    const itemId = item._id || item.id || item.fallbackId;
    const found = acc.find((x) => (x._id || x.id || x.fallbackId) === itemId);
    if (found) {
      found.qty += item.qty;
    } else {
      acc.push({ ...item, qty: item.qty });
    }
    return acc;
  }, []);

  const total = mergedCart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {mergedCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {mergedCart.map((item) => (
              <li
                key={item._id || item.id || item.fallbackId}
                className="cart-item"
              >
                <span>{item.name}</span>
                <span>${item.price} each</span>
                <div className="qty-controls">
                  <button
                    onClick={() =>
                      onUpdateQuantity(
                        item._id || item.id || item.fallbackId,
                        item.qty - 1
                      )
                    }
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() =>
                      onUpdateQuantity(
                        item._id || item.id || item.fallbackId,
                        item.qty + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <strong>
              Subtotal: ${total.toFixed(2)} (Total items:{" "}
              {mergedCart.reduce((sum, item) => sum + item.qty, 0)})
            </strong>
          </div>
          <button onClick={onCheckout} className="checkout-btn">
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
