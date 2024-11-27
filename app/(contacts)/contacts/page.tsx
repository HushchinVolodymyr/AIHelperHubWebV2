"use client"
import {Separator} from '@radix-ui/react-dropdown-menu';
import React, {useState} from 'react';
import {z} from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel, FormMessage,
} from "@/components/ui/form";
import {Input} from '@/components/ui/input';
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Phone} from "lucide-react";
import validator from "validator";
import IContactDto from "@/DTOs/iContactDto";
import {contactService} from "@/services/contact-service";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import useRecaptcha from "@/hooks/use-recaptcha";
import {toast} from "@/hooks/use-toast";


// Contact form schema
const contactFormSchema = z.object({
  name: z.string(),
  message: z.string(),
  phoneNumber: z.string()
    .min(1, {message: "We need phone to contact you."})
    .refine(validator.isMobilePhone)
})


// Contact page
function Contacts() {
  // Google reCaptcha instance
  const { executeRecaptcha } = useGoogleReCaptcha();
  // Captcha token state
  const {capchaToken, recaptchaRef, handleRecaptcha} = useRecaptcha();
  // UI instances
  const [ recaptchaV2Visible, setRecaptchaV2Visible ] = useState<boolean>(false);
  
  
  // Contact form instance
  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      message: "",
      phoneNumber: ""
    }
  })

  // Submit contact form
  async function submitContactFrom(values: z.infer<typeof contactFormSchema>) {
    // Captcha variables
    let token: string = '';
    let captchaType: string = '';

    // Check reCaptcha type
    if (recaptchaV2Visible) {
      // Check captcha token
      if (!capchaToken) {
        toast({variant: "destructive", description: "Press I`m not robot!"});
        return;
      }

      token = capchaToken.toString();
      captchaType = "v2";
    } else {
      // Check if reCaptcha is available
      if (!executeRecaptcha) {
        console.log("Not available to execute reCaptcha");
        return;
      }

      // Execute reCaptcha
      token = await executeRecaptcha("inquirySubmit");
      captchaType = "v3";
    }
    
    // Create Dto to transfer data to server
    const ContactDto: IContactDto = {
      token: token,
      captchaType: captchaType,
      formData: {
        name: values.name,
        message: values.message,
        phoneNumber: values.phoneNumber,
      }
    }

    // Send request to server
    if (await contactService(ContactDto)) contactForm.reset()
    else {
      toast({variant: "destructive", description: "Error while sending message"})
      setRecaptchaV2Visible(true)
    }
  }


  return (
    <>
      <div className={`w-full h-full md:flex md:flex-row md:w-2/3`}>
        <section className={`p-4 h-full md:w-1/2 md:mt-20`}>
          <Form {...contactForm}>
            <form onSubmit={contactForm.handleSubmit(submitContactFrom)}>
              <FormField
                control={contactForm.control}
                name="phoneNumber"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone number (+38097*******)" {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={contactForm.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name (Alex, Peter)" {...field}/>
                    </FormControl>
                    <FormMessage/>
                    <FormDescription>
                      How to contact you?
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={contactForm.control}
                name="message"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Describe you purpose</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Message (I want to make an AI bot for my flower shop)" {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              {recaptchaV2Visible ? <div className={'mt-4 w-full'}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`}
                  onChange={handleRecaptcha}
                />
              </div> : null}
              
              <Button type="submit" variant={"default"} className={`mt-4 w-full`}>Submit</Button>
            </form>
          </Form>
        </section>
        <Separator className={`w-4`}/>
        <section className={`p-4 md:w-1/2 flex flex-col justify-start`}>
          <Link href={'tel:+380930860580'} className={`md:mt-20`}>
            <h1 className={`flex items-center`}><Phone className={`size-5 mr-1`}/>Phone: +380930860580</h1>
          </Link>
        </section>
      </div>
     
    </>
  );
}

export default Contacts;