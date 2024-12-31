"use client";
import React from 'react';
import styles from "./page.module.scss"
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
      
    </div>
  );
};

export default Page;