import React, { useState } from "react";
import "./Chatbot.css";

export default function Chatbot() {
    const [messages, setMessages] = useState([
        { from: 'bot', text: 'Hi! I can recommend dishes or answer questions like dietary info or specials.' }
    ]);
    const [input, setInput] = useState("");

    function send() {
        if (!input.trim()) return;
        const userMsg = { from: 'user', text: input };
        setMessages(m => [...m, userMsg]);

        setTimeout(() => {
            setMessages(m => [...m, { from: 'bot', text: `I recommend the Apple — it's popular today. (mock reply to: "${input}")` }]);
        }, 700);

        setInput("");
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
                    placeholder="Ask about specials or recommendations"
                />
                <button onClick={send}>Send</button>
            </div>
        </div>
    );
}