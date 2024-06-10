"use client";
import { useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Actors from "./actor/Actor";
import { InternetIdentityProvider } from "ic-use-internet-identity";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    document.title = "NFID+ICP Playground";
  }, []);
  return (
    <html lang="en">
      <InternetIdentityProvider>
        <Actors>
          <body className={inter.className}>{children}</body>
        </Actors>
      </InternetIdentityProvider>
    </html>
  );
}
