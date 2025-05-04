"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Animation from "@/public/images/animate.json";
import Lottie from "lottie-react";

export default function Home() {
  return (
    <main className="p-10 bg-white m-10 rounded-md w-full">
      <h1 className="text-4xl font-light">
        Welcome to <span className="text-[#F4A261] font-semibold">Cure'em</span>
      </h1>

      <h2 className="mt-2 mb-8">
        Effortlessly manage patient registrations with a user-friendly,
        streamlined process.
      </h2>

      <Link href="/create-patient">
        <Button className="bg-[#F4A261] hover:opacity-60">
          Ready to register a patient? Let&apos;s begin.
        </Button>
      </Link>

      <Lottie animationData={Animation} className="h-80" />
    </main>
  );
}
