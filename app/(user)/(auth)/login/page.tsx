"use client"
import React from 'react';
import styles from "./page.module.scss"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

import Image from 'next/image'
import googleIcon from '@/public/google-icon.png'

import {useGoogleLogin} from '@react-oauth/google';
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
import ILoginDto from "@/DTOs/iLoginDto";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useAuth} from "@/hooks/use-auth";
import IGoogleAuthDto from "@/DTOs/iGoogleAuthDto";
import ReCAPTCHA from 'react-google-recaptcha';
import useRecaptcha from "@/hooks/use-recaptcha";
import {toast} from "@/hooks/use-toast";

// Login form schema (username, password)
const loginFormSchema = z.object({
  username: z.string()
    .min(2, {message: "Username must be at least 2 characters long",})
    .max(30, {message: "Username must be no more than 30 characters long",}),
  password: z.string()
    .min(8, {message: "Password must be at least 8 characters long",}),
})

// Login page function
export default function Page() {
  const router = useRouter()
  // Authentication login hook 
  const {login, loginViaGoogle} = useAuth();
  // Captcha token state
  const {capchaToken, recaptchaRef, handleRecaptcha} = useRecaptcha();
  
  // Login form base text
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema)
  });

  // Google OAuthHook
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const googleAuthDto: IGoogleAuthDto = { accessToken: tokenResponse.access_token }
      const response = await loginViaGoogle(googleAuthDto);

      if (response && response.status === 200) router.push("/")
    },
    onError: () => console.error('Помилка входу'),
  });
  
  // Login submit
  async function submitLogin(values: z.infer<typeof loginFormSchema>) {
    // Check captcha token
    if (!capchaToken) {
      toast({variant: "destructive", description: "Press I`m not robot!"});
      return;
    }

    // Login data object
    const LoginDto: ILoginDto = {
      username: values.username,
      password: values.password,
      captchaToken: capchaToken
    }
    
    //Request to server (POST method)
    if (await login(LoginDto)) router.push("/")
  }

  return (
    <div className={styles.loginPageContainer}>
      <Card className={styles.cardContainer}>
        <CardHeader className={'flex items-center '}>
          <CardTitle><span className={"text-2xl"}>Login</span></CardTitle>
        </CardHeader>
        <Separator className={'my-2'}/>
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
              <div className={'mt-4 w-full'}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`}
                  onChange={handleRecaptcha}
                />
              </div>
              <div className={`flex flex-col mt-6`}>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>

        </CardContent>
        <Separator />
        <CardFooter className={'flex flex-col gap-2 w-full py-4 px-6'}>
          <h3 className={"text-center"}>Don`t have account?</h3>
          <button
            onClick={() => googleLogin()}
            className={'flex gap-2 w-full items-center justify-center bg-white text-black p-2 rounded-md text-l border hover:bg-gray-100'}
          >
            Sign up with google<span><Image src={googleIcon} alt="google-icon" height={20}/></span>
          </button>
          <Button variant="outline" asChild className={"w-full"}>
            <Link href={"/register"}>Register</Link>
          </Button>

        </CardFooter>
      </Card>
    </div>
  )
};