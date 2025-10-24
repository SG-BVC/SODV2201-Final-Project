import React, { useState } from "react";
import "../index.css";

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
      setMessages(m => [...m, { from: 'bot', text: `I recommend the Grilled Salmon — it's popular today. (mock reply to: "${input}")` }]);
    }, 700);

    setInput("");
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white shadow-lg rounded overflow-hidden">
      <div className="bg-red-600 text-white p-3">AI Assistant</div>
      <div className="p-3 h-48 overflow-auto space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={m.from === 'bot' ? 'text-sm text-gray-700' : 'text-sm text-right text-gray-900'}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="p-2 border-t flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 border p-1 rounded" placeholder="Ask about specials or recommendations" />
        <button onClick={send} className="px-3 py-1 bg-red-600 text-white rounded">Send</button>
      </div>
    </div>
  );
}
