"use client";

import db from "@/db";
import axios from "axios";
import { useEffect, useState } from "react";

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  fromUsername: string;
  toUsername: string;
  content: string;
  timestamp: string;
}

export default function Message() {
  const [to, setTo] = useState<string | null>(null);
  const [from, setFrom] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  const fetchAllMessages = async (from: string, to: string) => {
    try {
      const msgs: any = await axios.post("/api/messages", { from, to });
      setAllMessages([...msgs.data.msgs]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const res = await axios.post("/api/message/", {
        from,
        to,
        message,
      });
      setMessage("");
      // Refresh messages after sending
      fetchAllMessages(from!, to!);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const To = localStorage.getItem("to");
    const From = localStorage.getItem("from");
    if (!From || !To) return;
    setTo(To);
    setFrom(From);
    fetchAllMessages(From, To);
  }, []);

  // Format the timestamp
  const getTimeStamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="lg:px-80 p-6 h-screen bg-gray-900 text-white flex flex-col">
      <div className="text-center text-gray-300 mb-4">
        {(!to || !from) && `Loading...`}
        {to && from && (
          <div className="font-semibold text-lg">{`Chatting with ${to}`}</div>
        )}
      </div>

      {/* Messages container */}
      <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-gray-800 rounded-lg shadow-inner">
        {allMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.fromUsername === from ? "justify-end" : "justify-start"}`}
          >
            <div className="flex flex-col space-y-1 max-w-xs">
              <div
                className={`p-3 rounded-lg shadow-md ${
                  msg.fromUsername === from
                    ? "bg-blue-600 text-right rounded-br-none"
                    : "bg-gray-700 text-left rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
              <div
                className={`text-xs text-gray-400 ${
                  msg.fromUsername === from ? "text-right" : "text-left"
                }`}
              >
                {getTimeStamp(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="mt-4 flex items-center space-x-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full text-black outline-none focus:ring-2 focus:ring-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full shadow-md transition"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
