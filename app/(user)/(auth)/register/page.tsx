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
import IRegisterDto from "@/DTOs/IRegisterDto";
import Link from "next/link";
import {register as registerUser} from '@/services/auth'
import {useRouter} from 'next/navigation'

const registerFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters long",
  }).max(30, {
    message: "Username must be no more than 30 characters long",
  }),
  email: z.string().min(1, {
    message: "Email must be filled",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export default function Page() {
  const router = useRouter()
  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  async function submitRegister(values: z.infer<typeof registerFormSchema>) {
    if (values.username.trim() === "" || values.email.trim() === "" || values.password.trim() === "" || values.confirmPassword.trim() === "") {
      toast({
        variant: "destructive",
        title: "Empty Fields",
        description: "Please fill all fields",
      });
      return;
    }
    
    if (values.password !== values.confirmPassword){
      toast({
        variant: "destructive",
        title: "Password and confirm password do not match",
      });
      return;
    }
    
    const registerDto: IRegisterDto = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    
    try {
      const response = await registerUser(registerDto)
      
      if (response && response.status === 201){
        router.push("/");
      }
      
    } catch (error){
      console.log(error)
    }
  }

  return (
    <div className={styles.registerPageContainer}>
      <Card className={styles.cardContainer}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Enter your login, email, password and confirm password
          </CardDescription>
        </CardHeader>
        <Separator className={styles.separator}/>
        <CardContent>
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(submitRegister)}>
              <FormField
                control={registerForm.control}
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
                control={registerForm.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
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
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Confirmation password</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm password" {...field} type="password"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <div className={styles.loginFormButtons}>
                <Button type="submit" className={styles.registerFormSubmitButton}>Submit</Button>
                <Button variant="outline" asChild>
                  <Link href={"/login"}>Login</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};