import React, { useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Placeholder for Socket.IO integration
  // You'll need to import io from 'socket.io-client' and connect to your server
  // Example: const socket = io('http://localhost:3000');
  // Then, in useEffect: socket.on('message', (msg) => setMessages(prev => [...prev, msg]));

  const sendMessage = () => {
    if (input.trim()) {
      // socket.emit('message', input);
      setMessages((prev) => [...prev, { text: input, from: "me" }]);
      setInput("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          border: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              textAlign: msg.from === "me" ? "right" : "left",
            }}
          >
            <span
              style={{
                background: msg.from === "me" ? "#007bff" : "#e9ecef",
                color: msg.from === "me" ? "white" : "black",
                padding: "8px 12px",
                borderRadius: "18px",
                display: "inline-block",
                maxWidth: "70%",
                wordWrap: "break-word",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px",
          borderTop: "1px solid #ccc",
          backgroundColor: "#fff",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "20px",
            marginRight: "10px",
            outline: "none",
          }}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
