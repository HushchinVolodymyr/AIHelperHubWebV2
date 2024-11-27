import React from 'react';
import CaptchaV3Wrapper from "@/components/captcha-v3-wrapper";
import {GoogleOAuthProvider} from '@react-oauth/google';

const GoogleClientID = process.env.NEXT_GOOGLE_OAUTH;

export default function ContactsLayout({children}: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={`${GoogleClientID}`}>
    <div className="mt-14 w-full">
      <main className=" w-full flex justify-center">
        <CaptchaV3Wrapper>
          {children}
        </CaptchaV3Wrapper>
      </main>
    </div>
    </GoogleOAuthProvider>
  );
}