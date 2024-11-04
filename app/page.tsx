"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
interface User {
  id: string;
  username: string;
}
export default function Home() {
  const [userToSearch, setUserToSearch] = useState("");
  const [foundUser, setFoundUser] = useState("");
  const [searchingState, setSearchingState] = useState("");
  const router = useRouter();
  const token = window.localStorage.getItem("token");
  if (!token) {
    router.push("/v1/signin");
    return;
  }
  const handleSearchUser = async () => {
    try {
      setSearchingState("Searching for the user, please wait!");
      const user: any = await axios.post("/api/user/", {
        username: userToSearch,
      });
      console.log(user);
      if (!user?.data.user) {
        setSearchingState("no user were found");
      }
      else{
        setSearchingState("")
        setFoundUser(user?.data.user.username as string);
      }
    } catch (error) {
      console.log(error);
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
        const { data } = await axios.post("/api/isUserLoggedIn", { token });
        console.log("isLoggedIn response:", data);
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
    <div className="p-8">
      <button
        className="px-2 py-1 bg-white text-black cursor-pointer hover:bg-gray-300"
        onClick={handleLogOut}
      >
        Logout
      </button>
      <div className="my-2">
        <input
          value={userToSearch}
          onChange={(e) => setUserToSearch(e.target.value)}
          className="text-black rounded-md mr-2 my-2 px-2 py-1 font-medium"
          type="text"
          placeholder="Find User here"
        />
        <button
          onClick={handleSearchUser}
          className="bg-blue-700 cursor-pointer px-2 py-1 text-white rounded-md"
        >
          Search
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {searchingState}
        {foundUser && (
          <div className="flex  space-x-2 items-center ">
            <div className="w-44 overflow-hidden  bg-black text-white px-2 py-1 border rounded-md border-gray-500">
              {foundUser}
            </div>
            <button
              onClick={() => {
                localStorage.setItem("to", foundUser);
                router.push("/v1/message/");
              }}
              className="bg-blue-700 cursor-pointer text-white px-2 py-1 rounded-md"
            >
              Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
