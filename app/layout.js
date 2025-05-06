"use client";

import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import dynamic from "next/dynamic";

const ClientDbProvider = dynamic(() => import("../components/DBContext"), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen flex">
          <ClientDbProvider>{children}</ClientDbProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
