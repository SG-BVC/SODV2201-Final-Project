import React, { useState } from "react";
import SearchFilter from "../components/SearchFilter";
import { MOCK_MENU } from "../data/mockMenu";
import "../index.css";

export default function MenuPage({ onAddToCart }) {
  const [menu] = useState(MOCK_MENU);
  const [filtered, setFiltered] = useState(MOCK_MENU);

  function handleFilter({ query, category, dietary }) {
    const q = query.trim().toLowerCase();
    const res = menu.filter(item => {
      if (category !== "All" && item.category !== category) return false;
      if (dietary !== "Any" && !item.dietary.includes(dietary)) return false;
      if (q && !(item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q))) return false;
      return true;
    });
    setFiltered(res);
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Menu</h1>
      <SearchFilter onFilter={handleFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="border rounded p-4 bg-white shadow">
            <h3 className="font-semibold">
              {item.name} <span className="text-sm text-gray-500">(${item.price.toFixed(2)})</span>
            </h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-xs mt-2">Category: {item.category} • {item.dietary.join(', ') || '—'}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => onAddToCart(item)} className="px-3 py-1 bg-red-600 text-white rounded">Add</button>
              <button className="px-3 py-1 border rounded">Details</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
