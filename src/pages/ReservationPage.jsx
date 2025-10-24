import React, { useState } from "react";
import "../index.css";

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
    <main className="p-6">
      <h1 className="text-2xl mb-4">Book a Table</h1>
      <form onSubmit={submit} className="max-w-md bg-white p-4 rounded shadow space-y-3">
        <input required value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="w-full border p-2 rounded" />
        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded" />
        <input required type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)} className="w-full border p-2 rounded" />
        <input type="number" min={1} value={party} onChange={e => setParty(Number(e.target.value))} className="w-full border p-2 rounded" />
        <button className="w-full bg-red-600 text-white py-2 rounded">Confirm Reservation</button>
        {status && <div className={`p-2 rounded ${status.ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{status.message}</div>}
      </form>
    </main>
  );
}
