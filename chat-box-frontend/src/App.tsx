import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState<
    { text: string; sender: "me" | "other" }[]
  >([{ text: "Hello from server!", sender: "other" }]);

  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      setMessages((m) => [
        ...m,
        { text: String(event.data), sender: "other" },
      ]);
    };

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: { roomId: "red" },
        })
      );
    };

    wsRef.current = ws;
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    const el = inputRef.current;
    if (!el) return;

    const message = el.value.trim();
    if (!message) return;

    setMessages((m) => [...m, { text: message, sender: "me" }]);

    wsRef.current?.send(
      JSON.stringify({
        type: "chat",
        payload: { message },
      })
    );

    el.value = "";
  };

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center p-4 space-y-6 margin-auto">
      {/* Heading above the chat box */}
      <h1 className="text-orange-500 text-3xl font-bold tracking-wide]">
        A Simple Chat Box using WebSockets 
      </h1>
      <br/>

      {/* Chat box container */}
      <div className="w-full max-w-2xl h-[90vh] bg-zinc-900 rounded-3xl shadow-[0_0_25px_rgba(255,115,0,0.7)] flex flex-col overflow-hidden">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-950">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm md:text-base shadow ${
                  msg.sender === "me"
                    ? "bg-orange-500 text-black font-semibold rounded-br-none shadow-[0_0_12px_rgba(255,115,0,0.8)]"
                    : "bg-zinc-800 text-gray-200 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="w-full bg-zinc-900 flex items-center p-3 border-t border-zinc-700">
          <input
            ref={inputRef}
            id="message"
            className="flex-1 p-3 rounded-xl bg-black text-orange-400 border border-zinc-700 outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button
            onClick={sendMessage}
            className="ml-3 bg-orange-500 text-black px-6 py-2 rounded-xl font-bold hover:bg-orange-600 transition shadow-[0_0_12px_rgba(255,115,0,0.9)]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
