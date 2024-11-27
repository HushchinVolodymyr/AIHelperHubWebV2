"use client";
import React from 'react';
import styles from "./page.module.scss"
import {BadgePlus, BotMessageSquare, UserPen} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateAssistant from "@/components/profile/create-assistant/create-assistant";
import EditProfile from "@/components/profile/edit-profile/edit-profile";
import Assistants from "@/components/profile/assistants/assistants";
import { useSelector } from 'react-redux';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';


const Page = () => {
  // User state (Redux)
  const user = useSelector((state: RootState) => state.user);
  // Router for redirecting
  const router = useRouter();
  
  // Temporary redirect to main page
  router.push("/");


  // If no user redirect to main page
  if (!user.isAuthenticated) {
    // Rise error to user
    toast({variant: "destructive", title: "User not authenticated", description: "Login please!"})

    // Redirect user to login page
    router.push("/login");

    return true;
  }

  return (
    <div className={styles.pageContainer}>
      <Tabs defaultValue="edit_assistant" className="w-full mt-2 flex flex-col items-center">
        <TabsList>
          <TabsTrigger value="create_assistant" className={'flex gap-2'}>
            <BadgePlus/>
            <h1>Create Assistant</h1>
          </TabsTrigger>
          <TabsTrigger value="assistants" className={'flex gap-2'}>
            <BotMessageSquare/>
            <h1>Assistant</h1>
          </TabsTrigger>
          <TabsTrigger value="edit_assistant" className={'flex gap-2'}>
            <UserPen/>
            <h1>Edit assistant</h1>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="create_assistant" className={'w-full h-full p-4'}>
          <CreateAssistant/>
        </TabsContent>
        <TabsContent value="assistants" className={'w-full h-full p-4'}>
          <Assistants/>
        </TabsContent>
        <TabsContent value="edit_assistant" className={'w-full h-full p-4'}>
          <EditProfile/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;