import React from "react";
import "../index.css";

export default function CartPage({ cart, onUpdateQuantity, onCheckout }) {
  const subtotal = cart.reduce((s, x) => s + x.price * x.qty, 0);

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Your Cart</h1>
      {cart.length === 0 ? <p>Cart is empty — add something delicious!</p> : (
        <div className="space-y-4">
          {cart.map(ci => (
            <div key={ci.id} className="flex items-center justify-between border p-3 rounded bg-white">
              <div>
                <div className="font-medium">{ci.name}</div>
                <div className="text-sm text-gray-600">${ci.price.toFixed(2)} each</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={ci.qty}
                  onChange={e => onUpdateQuantity(ci.id, Math.max(1, Number(e.target.value)))}
                  className="w-20 border p-1 rounded"
                />
                <div className="w-24 text-right">${(ci.price * ci.qty).toFixed(2)}</div>
              </div>
            </div>
          ))}
          <div className="text-right font-semibold">Subtotal: ${subtotal.toFixed(2)}</div>
          <div className="flex justify-end">
            <button onClick={onCheckout} className="px-4 py-2 bg-green-600 text-white rounded">Checkout</button>
          </div>
        </div>
      )}
    </main>
  );
}
