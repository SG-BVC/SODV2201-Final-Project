import React, { useState, useEffect } from "react";
import SearchFilter from "../components/SearchFilter";
import "./MenuPage.css"; 
export default function MenuPage({ onAddToCart }) {
  const [menuItems, setMenuItems] = useState([]);
  const [filter, setFilter] = useState({ query: "", category: "All", dietary: "Any" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/menu')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch menu');
        return res.json();
      })
      .then(items => {
        setMenuItems(items);
        setLoading(false);
      })
      .catch(err => {
        console.error('Menu fetch error:', err);
        setLoading(false);
        
        setMenuItems([
          { _id: "mock1", id: "1", name: "Apple", category: "desserts", price: 2.5, description: "Fresh apple", available: true },
          { _id: "mock2", id: "2", name: "Broccoli", category: "starters", price: 5, description: "Steamed broccoli", available: true }
        ]);
      });
  }, []);

  const filteredItems = menuItems.filter(item => {
    if (filter.query && !item.name.toLowerCase().includes(filter.query.toLowerCase())) return false;
    if (filter.category !== "All" && item.category !== filter.category) return false;
    if (filter.dietary !== "Any" && !item.dietary?.includes(filter.dietary)) return false;
    return true;
  });

  if (loading) return <div className="loading">Loading menu...</div>;

  return (
    <div className="menu-page">
      <h1>Menu</h1>
      <SearchFilter onFilter={setFilter} />
      <div className="menu-grid">
        {filteredItems.map(item => (
          <div key={item._id} className="menu-item">
            <h3>{item.name} ({item.category})</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Dietary: {item.dietary?.join(', ') || 'None'}</p>
            <button onClick={() => onAddToCart({ ...item, id: item._id, qty: 1 })}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}