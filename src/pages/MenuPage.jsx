import React, { useState } from "react";
import SearchFilter from "../components/SearchFilter";
import { MOCK_MENU } from "../data/mockMenu";
import "./MenuPage.css";

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
        <main className="menu-page">
            <h1>Menu</h1>
            <SearchFilter onFilter={handleFilter} />
            <div className="menu-grid">
                {filtered.map(item => (
                    <div key={item.id} className="menu-card">
                        <h3>
                            {item.name}{' '}
                            <span className="menu-price">
                                (${item.price.toFixed(2)})
                            </span>
                        </h3>
                        <p className="menu-desc">{item.description}</p>
                        <p className="menu-meta">
                            Category: {item.category} • {item.dietary.join(', ') || '—'}
                        </p>
                        <div className="menu-actions">
                            <button onClick={() => onAddToCart(item)} className="btn-primary">
                                Add
                            </button>
                            <button className="btn-secondary">Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
