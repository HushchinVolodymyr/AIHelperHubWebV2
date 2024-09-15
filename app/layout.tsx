import type { Metadata } from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import Header from "@/components/header/header";
import {Toaster} from "@/components/ui/toaster";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['100', '300', '400', '700', '900'], 
  subsets: ['latin'],
  variable: '--font-montserrat',
});
export const metadata: Metadata = {
  title: "AiHelperHub",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header/>
        {children}
        <Toaster/>
      </ThemeProvider>
      </body>
    </html>
  );
}
