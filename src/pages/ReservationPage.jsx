import React, { useState } from "react";
import "./ReservationPage.css";

export default function ReservationPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [datetime, setDatetime] = useState("");
    const [party, setParty] = useState(2);
    const [status, setStatus] = useState(null);
    const [reservations, setReservations] = useState([]); // <-- store all reservations

    function submit(e) {
        e.preventDefault();

        const newReservation = {
            name,
            email,
            datetime,
            party,
        };

        setReservations(prev => [...prev, newReservation]);

        setStatus({
            ok: true,
            message: `Reservation confirmed for ${name} on ${datetime} (party of ${party})`
        });

        // reset form
        setName("");
        setEmail("");
        setDatetime("");
        setParty(2);
    }

    return (
        <main className="reservation-page">
            <h1>Book a Table</h1>

            <form onSubmit={submit} className="reservation-form">
                <input
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Full name"
                />
                <input
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                />
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
                    <div className={`status ${status.ok ? 'success' : 'error'}`}>
                        {status.message}
                    </div>
                )}
            </form>

            {reservations.length > 0 && (
                <section className="reservation-list">
                    <h2>Your Reservations</h2>
                    <ul>
                        {reservations.map((r, index) => (
                            <li key={index} className="reservation-item">
                                <p><strong>Name:</strong> {r.name}</p>
                                <p><strong>Email:</strong> {r.email}</p>
                                <p><strong>Date & Time:</strong> {new Date(r.datetime).toLocaleString()}</p>
                                <p><strong>Party Size:</strong> {r.party}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </main>
    );
}