import { auth } from "@clerk/nextjs/server";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import React from "react";

async function AdminLayout({ children }) {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex flex-col lg:flex-row bg-gray-100 flex-1">
        <Sidebar />
        <div className="flex flex-1 justify-center lg:justify-start items-start max-w-5xl mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
