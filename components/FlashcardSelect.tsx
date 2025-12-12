"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface QuizSetSelectorProps {
  onSelect: (setId: string, count: number) => void; 
}

interface FlashcardSet {
  id: string;
  title: string;
}

export default function QuizSetSelector({ onSelect }: QuizSetSelectorProps) {
  const supabase = createClient();

  const [sets, setSets] = useState<FlashcardSet[]>([]);
  const [selectedSet, setSelectedSet] = useState<string>("");
  const [flashcardCount, setFlashcardCount] = useState<number | null>(null);

 
  useEffect(() => {
    async function loadSets() {
      const { data, error } = await supabase
        .from("sets")
        .select("id, title");

      if (!error) setSets(data || []);
    }

    loadSets();
  }, [supabase]);

  
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
  }, [selectedSet, supabase, onSelect]);

  return (
    <div className="max-w-md w-full p-6">
      <label className="font-semibold pb-2 block">Flashcard Title</label>

      <select
        value={selectedSet}
        onChange={(e) => setSelectedSet(e.target.value)}
        className="w-[400px] rounded-lg p-4 text-sm font-semibold bg-[#f1f2eb] border border-black"
      >
        <option value="">Select a Flashcard Set</option>
        {sets.map((set) => (
          <option key={set.id} value={set.id}>
            {set.title}
          </option>
        ))}
      </select>

      <p className="pt-3 pb-2 font-semibold">Number of cards selected</p>
      <div className="p-4 rounded-xl bg-[#f1f2eb] border border-black">
        <p className="font-semibold text-sm">
          <span className="text-[#3a3c4e]">{flashcardCount ?? 0}</span> cards selected
        </p>
      </div>
    </div>
  );
}
