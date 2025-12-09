"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { FlashcardSet } from "@/lib/flashcards";
import FlashcardModal from "@/components/FlashcardModal";

interface RecentFlashcardSetsProps {
  limit?: number;
}

export default function RecentFlashcardSets({ limit = 5 }: RecentFlashcardSetsProps) {
  const [recentSets, setRecentSets] = useState<FlashcardSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSet, setSelectedSet] = useState<FlashcardSet | null>(null);

  useEffect(() => {
    async function fetchRecentSets() {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("sets")
        .select("*, flashcards(*)") // include related flashcards
        .order("date_created", { ascending: false })
        .limit(limit);

      if (error) {
        console.error("Error fetching recent sets:", error);
        setRecentSets([]);
      } else {
        setRecentSets(data as FlashcardSet[]);
      }
      setLoading(false);
    }

    fetchRecentSets();
  }, [limit]);

  if (loading) return <p>Loading recent sets...</p>;
  if (recentSets.length === 0)
    return <p className="w-full text-md rounded-lg p-7 bg-[#cddfd1] flex flex-col gap-4 justify-center items-center">
        No flashcard sets found.</p>;

  return (
    <div className="w-full text-md rounded-lg p-7 bg-[#cddfd1] flex flex-col gap-3 ">
        <h2 className="text-xl font-bold">Recents</h2>
      {recentSets.map((set) => (
        <div
          key={set.id}
          onClick={() => setSelectedSet(set)}
          className="w-full bg-white rounded-3xl p-6 border border-gray-300 shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <h2 className="font-bold text-lg">{set.title}</h2>
          <p className="text-sm text-gray-500 font-inter mt-1">
            {set.created_by ?? "Unknown"} |{" "}
            {set.date_created
              ? new Date(set.date_created).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "Unknown"}
          </p>
        </div>
      ))}

      {selectedSet && (
        <FlashcardModal set={selectedSet} onClose={() => setSelectedSet(null)} />
      )}
    </div>
  );
}
