"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { signIn } from "@/app/functions/client/functions";
import axios from "axios";

export async function signIn(username: string, password: string) {
  try {
    const response = await axios.post("/api/signin", { username, password });
    console.log("rsponse: ", response);
    if (response.data === "user does not exist") {
      throw new Error(response.data);
    }
    const token = response.data.token;
    localStorage.setItem("token", token);
  } catch (err: any) {
    console.log("error coming from signin function: ", err);
    return err;
  }
}

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(username,password);
      router.push("/");
    } catch (err: any) {
      console.log("error coming from signin function: ", err);
      return err;
    }
  };

  return (
    <div className="flex justify-center items-center sm:w-screen h-screen text-black">
      <form
        onSubmit={handleSubmit}
        className=" bg-white p-8 shadow-md rounded-md w-4/5 sm:w-3/5 md:w-1/2 lg:w-1/3"
      >
        <h1 className="text-2xl text-gray-700 font-bold mb-6">Sign In</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Sign In
        </button>
        <div className="text-center py-2">OR</div>
        <button
          onClick={() => router.push("/v1/signup")}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Don't have an account?
        </button>
      </form>
    </div>
  );
}
