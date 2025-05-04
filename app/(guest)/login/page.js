import { SignIn } from "@clerk/nextjs";
import React from "react";

function LoginPage() {
  return (
    <div className="flex py-10 md:py-10 flex-col flex-1 justify-center items-center bg-[#F4A261]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col items-center justify-center space-y-6 text-white pr-10">
          <div className="text-center">
            <h1 className="text-8xl italic font-semibold text-white tracking-tight font-serif drop-shadow-sm">
              Cure'em
            </h1>
            <h2 className="text-lg font-medium text-white/90 tracking-wide">
              Smart, Swift & Seamless Patient Onboarding
            </h2>
            <h3 className="my-4 text-md font-bold mt-5 text-white/80">
              Sign in to get started
            </h3>
          </div>
        </div>

        <SignIn routing="hash" fallbackRedirectUrl="/" />
      </div>
    </div>
  );
}

export default LoginPage;
