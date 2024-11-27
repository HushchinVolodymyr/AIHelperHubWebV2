"use client"
import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function CaptchaV3Wrapper({ children }: {children: React.ReactNode}) {
  const recaptchaKey: string | undefined = process.env.NEXT_PUBLIC_RECAPTCHA_V3_KEY;
  
  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}>
      {children}
    </GoogleReCaptchaProvider>
  );
}