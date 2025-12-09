"use client";

import React, { useEffect, useState } from "react";
import TotalFlashcard from "@/components/TotalFlashcard";
import AppSideBar from "@/components/Sidebar";
import StudyStreakCard from "./StudyStreak";
import { createClient } from "@/lib/supabase/client";

export default function Dashboard() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch user info from 'users' table
      const { data: userRow, error } = await supabase
        .from("users")
        .select("username, email")
        .eq("email", user.email)
        .single();

      if (error) {
        console.error("Error fetching user info:", error);
        return;
      }

      setUserName(userRow?.username ?? user.email?.split("@")[0]);
    };

    fetchUser();
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center font-kaisei text-[#3a3c4e] pl-80 pt-11">
      <AppSideBar />

      <main className="flex-1 p-30">
        <h1 className="text-2xl font-semibold font-kaisei text-[#3a3c4a] mb-6">
          Hi, {userName ?? "there"} 
        </h1>
        <div className="flex flex-col pb-10">
            <p>A calm mind is the strongest tool for learning.</p>
            <p>Ready to continue your journey?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <TotalFlashcard />
          <StudyStreakCard/>
        </div>
      </main>
    </div>
  );
}
