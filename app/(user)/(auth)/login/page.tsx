"use client"
import React from 'react';
import styles from "./page.module.scss"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {Separator} from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {toast} from "@/hooks/use-toast";
import ILoginDto from "@/DTOs/iLoginDto";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useAuth} from "@/services/auth";

// Login form schema (username, password)
const loginFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters long",
  }).max(30, {
    message: "Username must be no more than 30 characters long",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
})

// Login page function
export default function Page() {
  const router = useRouter()
  // Authentication login hook 
  const { login } = useAuth();
  
  // Login form base text
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  });
  
  // Login submit
  async function submitLogin(values: z.infer<typeof loginFormSchema>) {
    // Check for empty inputs
    if (values.username.trim() === "" || values.password.trim() === "") {
      toast({
        variant: "destructive",
        title: "Empty Fields",
        description: "Please fill all fields",
      })
      return
    }

    // Login data object
    const LoginDto: ILoginDto = {
      username: values.username,
      password: values.password
    }

    try {
      //Request to server (POST method)
      const response = await login(LoginDto)

      // Redirect if to home page if status code 201
      if (response && response.status === 200){
        router.push("/");
      }

    } catch (error){
      // Log errors
      console.log(error)
    }
  }

  return (
    <div className={styles.loginPageContainer}>
      <Card className={styles.cardContainer}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your login and password
          </CardDescription>
        </CardHeader>
        <Separator className={styles.separator}/>
        <CardContent>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(submitLogin)}>
              <FormField
                control={loginForm.control}
                name="username"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} type="password"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <div className={styles.loginFormButtons}>
                <Button type="submit" className={styles.loginFormSubmitButton}>Submit</Button>
                <Button variant="outline" asChild>
                  <Link href={"/register"}>Register</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};