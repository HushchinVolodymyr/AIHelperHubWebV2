import type {Metadata} from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import Header from "@/components/header/header";
import {Toaster} from "@/components/ui/toaster";
import {Montserrat} from 'next/font/google';
import StoreProvider from "@/store/StoreProvider";
import {GoogleOAuthProvider} from '@react-oauth/google';
import dynamic from "next/dynamic";

const montserrat = Montserrat({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "AiHelperHub",
  description: "Generated by create next app",
};

const GoogleAnalytics = dynamic(() => import('@/components/GoogleAnalytics'), { ssr: false });

const GoogleClientID = process.env.NEXT_GOOGLE_OAUTH;

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (

    <html lang="en">
    <body
      className={`${montserrat.variable}`}
      suppressHydrationWarning
    >
    <GoogleOAuthProvider clientId={`${GoogleClientID}`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <StoreProvider>
          <Header/>
          {children}
          <Toaster/>
          
        </StoreProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
    <GoogleAnalytics/>
    </body>
    </html>
  );
}
