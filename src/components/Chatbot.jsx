import React, { useState } from "react";
import "./Chatbot.css";

export default function Chatbot() {
    const [messages, setMessages] = useState([
        { from: 'bot', text: 'Hi! I can recommend dishes or answer questions like dietary info or specials.' }
    ]);
    const [input, setInput] = useState("");

    async function send() {
        if (!input.trim()) return;

        const userMsg = { from: "user", text: input };
        setMessages(m => [...m, userMsg]);

        const userInput = input;
        setInput("");

        try {
            const res = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userInput }),
            });

            const data = await res.json();

            setMessages(m => [...m, { from: "bot", text: data.reply }]);
        } catch {
            setMessages(m => [...m, { from: "bot", text: "Sorry, something went wrong" }]);
        }
    }

    return (
        <div className="chatbot">
            <div className="chatbot-header">AI Assistant</div>
            <div className="chatbot-messages">
                {messages.map((m, i) => (
                    <div key={i} className={m.from === 'bot' ? 'bot-message' : 'user-message'}>
                        {m.text}
                    </div>
                ))}
            </div>
            <div className="chatbot-input">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && send()}
                    placeholder="Ask about specials or recommendations"
                />
                <button onClick={send}>Send</button>
            </div>
        </div>
    );
}