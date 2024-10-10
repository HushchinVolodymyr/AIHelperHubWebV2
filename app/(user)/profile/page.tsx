"use client";
import React, { useEffect, useState } from 'react';
import IUser from "@/interfaces/iUser";
import { redirect } from "next/navigation";
import { getUser } from "@/services/userService";
import styles from "./page.module.scss"
import {BadgePlus, BotMessageSquare, UserPen} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateAssistant from "@/components/profile/create-assistant/create-assistant";
import EditProfile from "@/components/profile/edit-profile/edit-profile";
import Assistants from "@/components/profile/assistants/assistants";


const Page = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) redirect("/login");

    const fetchUser = async () => {
      const user = await getUser();
      setUser(user)
    }

    fetchUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.pageContainer}>
      <Tabs defaultValue="profile" className="mt-4 w-screen flex flex-col items-center ">
        <TabsList>
          <TabsTrigger value="profile" className={'flex gap-2'}>
            <UserPen/>
            <h1>Profile</h1>
          </TabsTrigger>
          <TabsTrigger value="create_assistant" className={'flex gap-2'}>
            <BadgePlus/>
            <h1>Create Assistant</h1>
          </TabsTrigger>
          <TabsTrigger value="assistants" className={'flex gap-2'}>
            <BotMessageSquare/>
            <h1>Assistant</h1>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className={'w-screen h-full p-4'}>
          <EditProfile/>
        </TabsContent>
        <TabsContent value="create_assistant" className={'w-screen h-full p-4'}>
          <CreateAssistant/>
        </TabsContent>
        <TabsContent value="assistants" className={'w-screen h-full p-4'}>
          <Assistants/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;