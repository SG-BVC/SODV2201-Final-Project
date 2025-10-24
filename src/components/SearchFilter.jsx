import React, { useState, useEffect } from "react";
import "../index.css";

export default function SearchFilter({ onFilter }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [dietary, setDietary] = useState("Any");

  useEffect(() => {
    onFilter({ query, category, dietary });
  }, [query, category, dietary]);

  return (
    <div className="p-4 bg-white shadow rounded mb-4 flex gap-3 flex-wrap">
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search menu..." className="border p-2 rounded" />
      <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 rounded">
        <option>All</option>
        <option>Starters</option>
        <option>Mains</option>
        <option>Desserts</option>
        <option>Beverages</option>
      </select>
      <select value={dietary} onChange={e => setDietary(e.target.value)} className="border p-2 rounded">
        <option>Any</option>
        <option>Vegetarian</option>
        <option>Vegan</option>
        <option>Gluten-Free</option>
        <option>Pescatarian</option>
      </select>
    </div>
  );
}
