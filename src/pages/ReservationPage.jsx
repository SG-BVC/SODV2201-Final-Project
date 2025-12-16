import React, { useState, useEffect } from "react";
import "./ReservationPage.css";

export default function ReservationPage() {
    const [datetime, setDatetime] = useState("");
    const [party, setParty] = useState(2);
    const [status, setStatus] = useState(null);
    const [reservations, setReservations] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;

        async function fetchReservations() {
            try {
                const res = await fetch("http://localhost:5000/api/reservations/my", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    setReservations(data);
                }
            } catch (err) {
                console.error("Failed to fetch reservations", err);
            }
        }

        fetchReservations();
    }, [token]);

    async function submit(e) {
        e.preventDefault();
        setStatus(null);

        if (!token) {
            setStatus({ ok: false, message: "You must be logged in to reserve." });
            return;
        }

        const [datePart, timePart] = datetime.split("T");

        try {
            const res = await fetch("http://localhost:5000/api/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    date: datePart,
                    time: timePart,
                    guests: party,
                    eventType: "dining",
                    specialNotes: "",
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus({ ok: false, message: data.msg || "Failed to create reservation" });
                return;
            }

            setStatus({
                ok: true,
                message: `Reservation confirmed for ${data.user.name} on ${datePart} at ${timePart} (party of ${party})`,
            });

            setReservations(prev => [...prev, data]);

            setDatetime("");
            setParty(2);
        } catch (err) {
            setStatus({ ok: false, message: "Server error" });
        }
    }

    return (
        <main className="reservation-page">
            <h1>Book a Table</h1>

            <form onSubmit={submit} className="reservation-form">
                <input
                    required
                    type="datetime-local"
                    value={datetime}
                    onChange={e => setDatetime(e.target.value)}
                />
                <input
                    type="number"
                    min={1}
                    value={party}
                    onChange={e => setParty(Number(e.target.value))}
                    placeholder="Party size"
                />
                <button type="submit">Confirm Reservation</button>

                {status && (
                    <div className={`status ${status.ok ? "success" : "error"}`}>
                        {status.message}
                    </div>
                )}
            </form>

            {reservations.length > 0 && (
                <section className="reservation-list">
                    <h2>Your Reservations</h2>
                    <ul>
                        {reservations.map((r, index) => {
                            // Convert date to JS Date object safely
                            const dateObj = r.date ? new Date(r.date) : null;
                            const datetimeStr = dateObj && r.time
                                ? new Date(`${dateObj.toISOString().split('T')[0]}T${r.time}`).toLocaleString()
                                : "Invalid Date";

                            return (
                                <li key={index} className="reservation-item">
                                    <p><strong>Name:</strong> {r.user?.name || "—"}</p>
                                    <p><strong>Email:</strong> {r.user?.email || "—"}</p>
                                    <p><strong>Date & Time:</strong> {datetimeStr}</p>
                                    <p><strong>Party Size:</strong> {r.guests}</p>
                                    <p><strong>Status:</strong> {r.status}</p>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            )}
        </main>
    );
}
