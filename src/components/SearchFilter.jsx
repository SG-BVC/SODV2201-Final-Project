import React, { useState, useEffect } from "react";
import "./SearchFilter.css";

export default function SearchFilter({ onFilter }) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All");
    const [dietary, setDietary] = useState("Any");

    useEffect(() => {
        onFilter({ query, category, dietary });
    }, [query, category, dietary]);

    return (
        <div className="menu-filters">
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search menu..."
            />
            <select value={category} onChange={e => setCategory(e.target.value)}>
                <option>All</option>
                <option>Starters</option>
                <option>Mains</option>
                <option>Desserts</option>
                <option>Beverages</option>
            </select>
            <select value={dietary} onChange={e => setDietary(e.target.value)}>
                <option>Any</option>
                <option>Vegetarian</option>
                <option>Vegan</option>
                <option>Gluten-Free</option>
                <option>Pescatarian</option>
            </select>
        </div>
    );
}
