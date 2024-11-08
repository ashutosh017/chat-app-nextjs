"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface User {
  id: string;
  username: string;
}

export default function Home() {
  const [from, setFrom] = useState<string | undefined>();
  const [userToSearch, setUserToSearch] = useState("");
  const [foundUser, setFoundUser] = useState("");
  const [searchingState, setSearchingState] = useState("");
  const router = useRouter();

  const getToken = () => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      router.push("/v1/signin");
      return;
    }
    return token;
  };

  const handleSearchUser = async () => {
    try {
      setFoundUser("");
      setSearchingState("Searching for the user, please wait...");
      const user: any = await axios.post("/api/user/", {
        username: userToSearch,
      });
      if (!user?.data.user) {
        setSearchingState("No user found");
      } else {
        setSearchingState("");
        setFoundUser(user?.data.user.username as string);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setSearchingState("");
      }, 3000);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    router.push("/v1/signin");
  };

  useEffect(() => {
    (async () => {
      try {
        const token = getToken();
        const { data } = await axios.post("/api/isUserLoggedIn", { token });
        setFrom(data.user);
        localStorage.setItem("from", data.user);
        if (data.message !== "User is logged in") {
          router.push("/v1/signin");
        }
      } catch (err) {
        console.error("Error during login check:", err);
        router.push("/v1/signin");
      }
    })();
  }, [router]);

  return (
    <div className="p-8 max-w-md mx-auto bg-gray-900 text-white rounded-lg shadow-lg flex flex-col items-center min-h-screen">
      {/* Header section with Logout and Inbox buttons */}
      <div className="flex  items-center mb-6 space-x-2 ">
        <button
          className="px-3 py-2 bg-red-600 hover:bg-red-500 rounded-md font-semibold"
          onClick={handleLogOut}
        >
          Logout
        </button>
        <div className="flex-1 text-gray-300 text-sm">Logged in as: <span className="font-semibold">{from}</span></div>
        <button
          onClick={() => router.push('/v1/inbox')}
          className="px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold"
        >
          Inbox
        </button>
      </div>

      {/* User search section */}
      <div className="mb-6">
        <label className="block text-sm mb-2 text-gray-300">Search for a User</label>
        <div className="flex">
          <input
            value={userToSearch}
            onChange={(e) => setUserToSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-l-md border-none focus:outline-none text-black"
            type="text"
            placeholder="Enter username..."
          />
          <button
            onClick={handleSearchUser}
            className="bg-blue-700 px-4 py-2 rounded-r-md font-semibold hover:bg-blue-600 text-white"
          >
            Search
          </button>
        </div>
        {searchingState && (
          <div className="mt-2 text-xs text-gray-400">{searchingState}</div>
        )}
      </div>

      {/* Search result and message button */}
      <div className="mt-4">
        {foundUser && (
          <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-md shadow-sm">
            <div className="flex-grow text-sm font-semibold text-gray-200 overflow-hidden">
              {foundUser}
            </div>
            <button
              onClick={() => {
                localStorage.setItem("to", foundUser);
                router.push("/v1/message/");
              }}
              className="bg-blue-600 px-3 py-1 text-xs font-semibold rounded-md text-white hover:bg-blue-500"
            >
              Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
