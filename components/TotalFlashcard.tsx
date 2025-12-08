"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getTotalFlashcards } from "@/lib/flashcards";

export default function TotalFlashcardsCard() {
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotal = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const count = await getTotalFlashcards(user.email!);
      setTotal(count);
      setLoading(false);
    };

    fetchTotal();
  }, []);

  return (
    <div className="p-6 rounded-3xl gap-3 h-[180px] w-[185px] bg-[#cddfd1] shadow-md flex flex-col items-center justify-center">
      <h3 className="font-kaisei text-md text-[#3a3c4e] font-semibold self-start">Total Flashcards</h3>
      <p className="text-3xl font-inter font-semibold mt-2 self-start">{loading ? "..." : total}</p>
      
    </div>
  );
}
