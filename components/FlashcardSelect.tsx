"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface QuizSetSelectorProps {
  onSelect: (setId: string, count: number) => void; 
}

export default function QuizSetSelector({ onSelect }: QuizSetSelectorProps) {
  const supabase = createClient();

  const [sets, setSets] = useState<any[]>([]);
  const [selectedSet, setSelectedSet] = useState<string>("");
  const [flashcardCount, setFlashcardCount] = useState<number | null>(null);

  // Fetch sets
  useEffect(() => {
    async function loadSets() {
      const { data, error } = await supabase
        .from("sets")
        .select("id, title");

      if (!error) setSets(data || []);
    }

    loadSets();
  }, []);

  // Fetch count when set changes
  useEffect(() => {
    async function fetchCount() {
      if (!selectedSet) return;

      const { count } = await supabase
        .from("flashcards")
        .select("*", { count: "exact", head: true })
        .eq("set_id", selectedSet);

      setFlashcardCount(count ?? 0);
      onSelect(selectedSet, count ?? 0);
    }

    fetchCount();
  }, [selectedSet]);

  return (
    <div className="p-6 max-w-md mx-auto">
    <label className="font-semibold pb-2 block">Flashcard Title</label>

    <select
        value={selectedSet}
        onChange={(e) => setSelectedSet(e.target.value)}
        className="w-full rounded-lg p-4 text-sm font-semibold bg-[#f1f2eb] border border-black">
        <option value="">Select a Flashcard Set</option>
        {sets.map((set) => (
        <option key={set.id} value={set.id}>
            {set.title}
        </option>
        ))}
    </select>

     <p className="pt-3 pb-2 font-semibold">Number of  cards selected</p>
    <div className=" p-4 rounded-xl bg-[#f1f2eb]  border border-black">
       
        <p className="font-semibold text-sm">
        {" "} <span className="text-[#3a3c4e]">{flashcardCount ?? 0}</span>  cards  selected
        
        </p>
    </div>
    </div>

  );
}
