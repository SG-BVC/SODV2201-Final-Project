import React from "react";
import "../index.css";

export default function AdminDashboard() {
  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">Menu Management (CRUD) — implement forms and API calls here</div>
        <div className="bg-white p-4 rounded shadow">Orders & Reservations — live-updating list and status controls</div>
      </div>
    </main>
  );
}
