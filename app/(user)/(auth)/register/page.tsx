"use client"
import React from 'react';
import styles from "./page.module.scss"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
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
import {useRouter} from 'next/navigation'
import {useAuth} from "@/hooks/use-auth";
import useRecaptcha from "@/hooks/use-recaptcha";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";
import googleIcon from "@/public/google-icon.png";
import {useGoogleLogin} from "@react-oauth/google";
import IGoogleAuthDto from "@/DTOs/iGoogleAuthDto";

// Register form schema (username, email, password, confirm password)
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

// Register page function
export default function Page() {
  const router = useRouter()
  // Authentication register hook 
  const {register, loginViaGoogle} = useAuth();
  // Captcha token state
  const {capchaToken, recaptchaRef, handleRecaptcha} = useRecaptcha();

  // Register form base text
  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });

  // Google OAuthHook
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const googleAuthDto: IGoogleAuthDto = {accessToken: tokenResponse.access_token}
      const response = await loginViaGoogle(googleAuthDto);

      if (response && response.status === 200) router.push("/")
    },
    onError: () => console.error('Помилка входу'),
  });

  // Register submit
  async function submitRegister(values: z.infer<typeof registerFormSchema>) {
    // Check captcha token
    if (!capchaToken) {
      toast({variant: "destructive", description: "Press I`m not robot!"});
      return;
    }

    // Check that password and confirm password the same
    if (values.password !== values.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password and confirm password do not match",
      });
      return;
    }

    // Register data object
    const registerDto: IRegisterDto = {
      username: values.username,
      email: values.email,
      password: values.password,
      captchaToken: capchaToken
    };

    //Request to server (POST method)
    if (await register(registerDto)) router.push("/")
  }

  return (
    <div className={styles.registerPageContainer}>
      <Card className={styles.cardContainer}>
        <CardHeader className={'flex items-center '}>
          <CardTitle><span className={"text-2xl"}>Register</span></CardTitle>
        </CardHeader>
        <Separator className={'my-2'}/>
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
              <div className={'mt-4 w-full'}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`}
                  onChange={handleRecaptcha}
                />
              </div>
              <div className={`flex flex-col mt-6 gap-4`}>
                <Button type="submit" className={styles.registerFormSubmitButton}>Submit</Button>
                <button
                  onClick={() => googleLogin()}
                  className={'flex gap-2 w-full items-center justify-center bg-white text-black p-2 rounded-md text-l border hover:bg-gray-100'}
                >
                  Sign up with google<span><Image src={googleIcon} alt="google-icon" height={20}/></span>
                </button>
              </div>
            </form>
          </Form>
        </CardContent>
        <Separator/>
        <CardFooter className={'flex flex-col gap-2 w-full py-4 px-6'}>
          <h3 className={"text-center"}>Already have account?</h3>
          <Button variant="outline" asChild className={"w-full"}>
            <Link href={"/login"}>Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};