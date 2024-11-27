import React from 'react';
import CaptchaV3Wrapper from "@/components/captcha-v3-wrapper";

export default function ContactsLayout({children}: { children: React.ReactNode }) {
  return (
    <div className="w-full mt-16">
      <main className="w-full flex justify-center">
        <CaptchaV3Wrapper>
          {children}
        </CaptchaV3Wrapper>
      </main>
    </div>
  );
}