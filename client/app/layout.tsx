"use client";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Providers } from "./Provider"; // Ensure this path is correct
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import React, { useEffect } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "../app/components/loader";
import socketId from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVICE_URI || "";
const socket = socketId(ENDPOINT, {transports: ['websocket']});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin_Sans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin_Sans.variable} !bg-[#f8f9f5] bg-no-repeat dark:bg-gradient-to-b dark:from-black dark:to-black duration-300`}
      >
        <Providers> {/* Wrap children with Providers */}
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Custom>{children}</Custom>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});

  useEffect(() => {
    socket.on('connection', () => {
      console.log('socket connected');
    });
  },[])

  if (isLoading) {
    return <div className="w-full h-screen items-center flex flex-col justify-center absolute"><Loader /></div>; 
  }

  return (
    <>
      {children}
    </>
  ); 
};
