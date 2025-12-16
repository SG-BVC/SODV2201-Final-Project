import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("customer"); // <-- role state
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function register(e) {
        e.preventDefault();
        setError(null);

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: username,
                    email,
                    password,
                    role
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Registration failed");
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role);
            localStorage.setItem("username", data.user.username);

            navigate("/menu");
            window.location.reload(); // refresh header after login
        } catch (err) {
            setError("Server error");
        }
    }

    return (
        <main className="register-page">
            <h1>Register</h1>
            <form onSubmit={register}>
                <input
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <select value={role} onChange={e => setRole(e.target.value)}>
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Register</button>
                {error && <p className="error">{error}</p>}
            </form>
        </main>
    );
}
