"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function StudyStreakCard() {
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreak = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }


      await updateStudyStreak(user.email!);

      const { data: userRow, error } = await supabase
        .from("users")
        .select("streak")
        .eq("email", user.email)
        .single();

      if (error || !userRow) {
        console.error("Error fetching streak:", error);
        setLoading(false);
        return;
      }

      setStreak(userRow.streak ?? 0);
      setLoading(false);
    };

    fetchStreak();
  }, []);

  return (
    <div className="p-6 rounded-3xl gap-3 h-[180px] w-[185px] bg-[#cddfd1] shadow-md flex flex-col items-center justify-center">
      <h3 className="font-kaisei text-md text-[#3a3c4e] font-semibold self-start">Study Streak</h3>
      <p className="text-3xl font-inter font-semibold mt-2 self-start">{loading ? "..." : streak}</p>
    </div>
  );
}


import { updateStudyStreak } from "@/lib/streak";
