'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
const router = useRouter();

useEffect(() => {
  (async () => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      router.push('/v1/signin');
      return;
    }

    try {
      const { data } = await axios.post('/api/isUserLoggedIn', { token });

      console.log("isLoggedIn response: ", data);

      if (data.message !== "User is logged in") {
        router.push('/v1/signin');
      }
    } catch (err) {
      console.error("Error during login check:", err);
      router.push('/v1/signin'); 
    }
  })();
}, [router]);

  return (
    <div>
      Hello world
    </div>
  );
}
