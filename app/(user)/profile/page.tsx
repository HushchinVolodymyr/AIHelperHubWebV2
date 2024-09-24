"use client";
import React, { useEffect, useState } from 'react';
import IUser from "@/interfaces/iUser";
import { redirect } from "next/navigation";

const Page = () => {
  const [user, setUser] = useState<IUser | null>(null); // Инициализируем как null

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const userData: IUser = JSON.parse(storedUser);
      setUser(userData);
    } else {
      redirect("/not-found");
    }
  }, []);
  
  if (!user) {
    return null;
  }

  return (
    <div className={'mt-[8vh]'}>
      <h1>Id: {user.id}</h1>
      <h1>Username: {user.username}</h1>
      <h1>Email: {user.email}</h1>
    </div>
  );
};

export default Page;