import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();
        setError(null);

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Login failed");
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("is_admin", data.user.is_admin);
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("role", data.user.role);
            localStorage.setItem("user_id", data.user.id);

            navigate("/Menu");
            window.location.reload();
        } catch (err) {
            setError("Server error");
        }
    }

    return (
        <main className="login-page">
            <h1>Login</h1>
            <form onSubmit={login}>
                <input
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
        </main>
    );
}
