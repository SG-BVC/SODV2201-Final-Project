import React, { useState } from "react";
import "./ReservationPage.css";

export default function ReservationPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [datetime, setDatetime] = useState("");
    const [party, setParty] = useState(2);
    const [status, setStatus] = useState(null);

    function submit(e) {
        e.preventDefault();
        setStatus({ ok: true, message: `Reservation confirmed for ${name} on ${datetime} (party of ${party})` });
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
        </main>
    );
}
