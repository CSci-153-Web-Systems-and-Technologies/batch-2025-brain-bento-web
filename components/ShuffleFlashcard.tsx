"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Flashcard {
  id: string;
  term: string;
  definition: string;
  // add other fields if needed
}

interface ShuffleFlashcardsProps {
  selectedSet: string | null;
  onShuffle: (shuffled: Flashcard[]) => void; // callback to pass the shuffled array to QuizMode
}

export default function ShuffleFlashcards({ selectedSet, onShuffle }: ShuffleFlashcardsProps) {
  const supabase = createClient();

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);



  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  useEffect(() => {
    if (!selectedSet) return;

    const fetchFlashcards = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("flashcards")
        .select("*")
        .eq("set_id", selectedSet);

      if (error) {
        console.error("Error fetching flashcards:", error);
        setFlashcards([]);
      } else {
        setFlashcards(data || []);
      }
      setLoading(false);
    };

    fetchFlashcards();
  }, [selectedSet]);

  
  const handleShuffle = () => {
    if (flashcards.length === 0) return; 
    const shuffled = shuffleArray(flashcards);
    onShuffle(shuffled); 
  };

  return (
    <div className="">
    <button
        onClick={() => {
        handleShuffle();
        setIsActive((prev) => !prev);
        }}
        className={`px-4 py-4 rounded-lg font-semibold 
        ${isActive ? "bg-[#8fd0f9]" : "bg-[#aad3eb]"} 
        hover:bg-[#98cef0]`}
    >
        Shuffle Cards
    </button>

    {loading && <p className="text-gray-500 text-sm mt-2">Loading flashcards...</p>}
    </div>


  );
}
