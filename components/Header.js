import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <header className="bg-white shadow-sm text-gray-800 flex justify-between p-5">
      <Link href="/" className="flex items-center text-4xl font-thin">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-7xl italic font-semibold text-[#F4A261] tracking-tight font-serif drop-shadow-sm">
            Cure'em
          </h1>
          <h2 className="text-xs md:text-sm ">
            Smart, Swift & Seamless Patient Onboarding
          </h2>
        </div>
      </Link>

      <div className="flex items-center">
        <SignedIn>
          <UserButton showName />
        </SignedIn>

        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
