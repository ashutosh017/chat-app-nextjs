'use client'

import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Page() {
  const [users, setUsers] = useState<string[]>([]);

  const router = useRouter();
  useEffect(() => {
    (async () => {
      const username = localStorage.getItem('from');
      if (!username) return;

      try {
        const response = await axios.post('/api/fetchUniqueUsers', { username: username });
        if (response.data) {
          setUsers(response.data.map((user: any) => user.fromUsername));
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    })();
  }, []);

  return (
    <div className="w-full lg:px-96 p-6  bg-gray-900 text-white rounded-lg shadow-lg h-screen mx-auto ">
      <h2 className="text-lg font-semibold text-center mb-4">Direct Messages</h2>
      <div className="space-y-2">
        {users.map((username, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-700 transition duration-200 cursor-pointer"
          >
            <div className="flex-grow font-medium text-sm">{username}</div>
            <button onClick={()=>{
                localStorage.setItem('to',username)
                router.push('/v1/message')
            }} className="text-xs text-blue-400 hover:text-blue-500 transition">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
