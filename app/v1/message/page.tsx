"use client";

import db from "@/db";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Message() {
  const [to, setTo] = useState<string | null>(null);
  const [from, setFrom] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = async () => {

    try {
      const res = await axios.post('/api/message/',{
        from,to,message
      })
      console.log(res);
      setMessage("")

    } catch (error) {
      console.log(error);
    }
 
  };

  useEffect(() => {
    const To = localStorage.getItem("to");
    const From = localStorage.getItem("from");
    setTo(To);
    setFrom(From);
  }, []);

  return (
    <div className="p-8 border h-screen">
      <div>{(!to || !from) && `Loading...`}</div>
      <div>{to && from && `From ${from} To ${to}`}</div>
      <input
        type="text"
        placeholder="Write a message"
        className="px-2 py-1 text-black mt-4 rounded-md mr-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="bg-blue-700 cursor-pointer px-2 py-1 rounded-md text-white"
        onClick={handleSendMessage}
      >
        Send
      </button>
    </div>
  );
}
