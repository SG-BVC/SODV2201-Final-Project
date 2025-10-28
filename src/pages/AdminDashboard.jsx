import React from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
    return (
        <main className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="admin-grid">
                <div className="admin-card">
                    Menu Management (CRUD) — implement forms and API calls here
                </div>
                <div className="admin-card">
                    Orders & Reservations — live-updating list and status controls
                </div>
            </div>
        </main>
    );
}
