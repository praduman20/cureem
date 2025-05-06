"use client";

import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { live } from "@electric-sql/pglite/live";
import { PGliteProvider } from "@electric-sql/pglite-react";
import { PGliteWorker } from "@electric-sql/pglite/worker";

const db = new PGliteWorker(
  new Worker(new URL("./my-pglite-worker.js", import.meta.url), {
    type: "module",
  }),
  {
    extensions: {
      live,
    },
    dataDir: "idb://my-pgdata",
  }
);

await db.exec(`CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  userId TEXT NOT NULL,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  dateofbirth TEXT NOT NULL,
  gender TEXT NOT NULL,
  phonenumber TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  age INT NOT NULL,
  symptons TEXT NOT NULL,
  notes TEXT
)`);

export default function RootLayout({ children }) {
  return (
    <PGliteProvider db={db}>
      <ClerkProvider>
        <html lang="en">
          <body className="min-h-screen flex">{children}</body>
        </html>
      </ClerkProvider>
    </PGliteProvider>
  );
}
