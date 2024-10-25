'use client'
import {  FormEvent, useState } from 'react';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import { signIn } from '@/app/functions/client/functions';

export default function   
   page() {
const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
       const response = await axios.post('/api/signup', { username, password });
        await signIn(username,password);
        router.push('/')

    } catch (err: any) {
        console.log("req failed: ",err)
    }
    
  };

  return (
    <div className="flex justify-center items-center h-screen text-black w-screen">
      <form onSubmit={handleSubmit} className="w-4/5 sm:w-3/5 md:w-1/2 lg:w-1/3 bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl text-gray-700 font-bold mb-6">Sign Up</h1>
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
          className="w-full bg-blue-500 text-white   
 p-2 rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>   

  );
}