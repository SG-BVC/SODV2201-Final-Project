import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (role !== "admin") return; // don't fetch if not admin

        const fetchReservations = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/reservations/all", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error("Failed to fetch reservations");
                const data = await res.json();
                setReservations(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [token, role]);

    if (role !== "admin") {
        return <main className="admin-dashboard"><h1>Unauthorized</h1></main>;
    }

    return (
        <main className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="admin-grid">
                <div className="admin-card">
                    <h2>Reservations</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Guests</th>
                                    <th>Event</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map(r => (
                                    <tr key={r._id}>
                                        <td>{r.user.name}</td>
                                        <td>{r.user.email}</td>
                                        <td>{new Date(r.date).toLocaleDateString()}</td>
                                        <td>{r.time}</td>
                                        <td>{r.guests}</td>
                                        <td>{r.eventType}</td>
                                        <td>{r.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </main>
    );
}
