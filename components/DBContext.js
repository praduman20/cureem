"use client";

import { useEffect, useState } from "react";
import { PGlite } from "@electric-sql/pglite";
import { live } from "@electric-sql/pglite/live";
import { PGliteProvider } from "@electric-sql/pglite-react";

export default function ClientDbProvider({ children }) {
  const [db, setDb] = useState(null);

  useEffect(() => {
    async function initDB() {
      const dbInstance = await PGlite.create({
        extensions: { live },
        dataDir: "idb://my-pgdata",
      });

      await dbInstance.exec(`CREATE TABLE IF NOT EXISTS patients (
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

      setDb(dbInstance);
    }

    initDB();
  }, []);

  if (!db)
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F4A261] text-white">
        <h1 className="animate-pulse italic text-8xl font-serif font-semibold tracking-tight mb-6 drop-shadow-md">
          Cure'em
        </h1>
        <div className="w-32 h-1.5 bg-white/30 rounded-full overflow-hidden relative shadow-inner">
          <div className="absolute inset-0 bg-white animate-[loadbar_1.2s_ease-in-out_infinite] rounded-full"></div>
        </div>
      </div>
    );

  return <PGliteProvider db={db}>{children}</PGliteProvider>;
}
