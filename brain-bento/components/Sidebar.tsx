"use client";

import React,{ useState, useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./logout-button";
import { createClient } from "@/lib/supabase/client";
import { SettingsIcon, LayoutDashboardIcon, BookAIcon, BookPlusIcon, BookCheckIcon } from "lucide-react";


export default function AppSideBar() {

    const [user, setUser] = useState<{ email: string | null; user_metadata?: { name?: string } } | null>(null);
    const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser({
            email: data.user.email ?? null,
            user_metadata: { name: data.user.user_metadata?.name },
        });
}

    };

    fetchUser();
  }, []);

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-[#f4f5e1] text-[#3a3c4e] border-r font-kaisei shadow flex flex-col justify-between p-6">
      <div>
        <div className="pb-8 flex flex-row gap-1 items-center">
          <div className="h-[35px] w-[45px] bg-[#b2d3be] rounded-3xl flex items-center justify-center text-xl font-bold">B</div>
          <div className="h-[30px] w-[2px] bg-[#3a3c4e]"></div>
          <h2 className="text-md p-2 font-semibold ">BrainBento</h2>
        </div>

        <nav className="flex flex-col items-center p-5 justify-center mt-10">
            <Link className="pb-4" href="/dashboard">
                <Button variant="ghost" 
                    className={`w-[220px] text-lg font-semibold p-2 pl-6 flex items-center justify-start gap-2  ${pathname === "/dashboard" ? "bg-[#2d3be] text-[3a3c4e]": "hover:bg-[#e4e5d6]"}`}>
                        <LayoutDashboardIcon className="w-5 h-5 "/>
                        Dashboard</Button>
            </Link>
          
          <Link className="pb-4" href="/my-flashcard">
            <Button variant="ghost" 
                className={`w-[220px] text-lg font-semibold p-2 pl-6 flex items-center justify-start gap-2 ${pathname === "/dashboard" ? "bg-[#2d3be] text-[3a3c4e]": "hover:bg-[#e4e5d6]"}`}>
                    <BookAIcon className="w-5 h-5 "/>
                    My Flashcards</Button>
          </Link>
          <Link className="pb-4" href="/create-flashcard">
            <Button variant="ghost" 
                className={`w-[220px] text-lg font-semibold p-2 pl-6 flex items-center justify-start gap-2  ${pathname === "/dashboard" ? "bg-[#2d3be] text-[3a3c4e]": "hover:bg-[#e4e5d6]"}`}>
                    <BookPlusIcon className="w-5 h-5 "/>
                    Create Flashcard</Button>
          </Link>
          <Link className="pb-4" href="/quiz-mode">
            <Button variant="ghost" 
                className={`w-[220px] text-lg font-semibold p-2 pl-6 flex items-center justify-start gap-2  ${pathname === "/dashboard" ? "bg-[#2d3be] text-[3a3c4e]": "hover:bg-[#e4e5d6]"}`}>
                    <BookCheckIcon className="w-5 h-5 "/>
                    Quiz Mode</Button>
          </Link>
        </nav>
      </div>

      
      <div>
        <div className="flex flex-col items-start">
          <div className="w-full h-[1px] bg-[#3a3c4e] opacity-50 mb-2"></div>
          <div className="flex items-center mb-3">
            <div className="h-11 w-11 bg-[#b2d3be] rounded-full flex items-center justify-center text-xl font-semibold">
                {user?.user_metadata?.name?.charAt(0).toUpperCase() ||
                 user?.email?.charAt(0)?.toUpperCase()}
            </div>

            <div className="flex flex-row  items-center gap-2">
                <div className="flex flex-col leading-tight max-w-[130px]">
                    <span className="text-lg pl-3 truncate">{user?.user_metadata?.name|| "Set username"}</span>
                    <span className="text-xs pl-3 opacity-80 truncate font-inter">{user?.email || "123@example.com"}</span>
                </div>
                <Link href="/user-settings" className="hover:opacity-80 transition hover:cursor-pointer">
                    <SettingsIcon className="w-5 h-5 text-gray-700 hover:text-gray-900" />
                </Link>
            </div>
           
          </div>
        </div>

        <LogoutButton />
      </div>
    </aside>
  );
}
