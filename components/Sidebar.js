import { Users, View, SearchIcon } from "lucide-react";
import Link from "next/link";

function Sidebar() {
  return (
    <div className="bg-white text-white p-5">
      <ul className="gap-5 flex lg:flex-col">
        <li className="flex-1">
          <Link
            href="/create-patient"
            className="flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 
            rounded-md bg-[#F4A261]/90 hover:opacity-50"
          >
            <Users className="h-6 w-6 lg:h-8 lg:w-8" />
            <div className="hidden md:inline">
              <p className="text-xl">Register</p>
              <p className="text-xm font-extralight"> a new patient</p>
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="/view-patients"
            className="flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 
            rounded-md bg-[#F4A261] hover:opacity-50"
          >
            <View className="h-6 w-6 lg:h-8 lg:w-8" />
            <div className="hidden md:inline">
              <p className="text-xl">View</p>
              <p className="text-xm font-extralight">Patients</p>
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="/about-us"
            className="flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 
          rounded-md bg-[#F4A261] hover:opacity-50"
          >
            <SearchIcon className="h-6 w-6 lg:h-8 lg:w-8" />
            <div className="hidden md:inline">
              <p className="text-xl">About</p>
              <p className="text-xm font-extralight">Us</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
