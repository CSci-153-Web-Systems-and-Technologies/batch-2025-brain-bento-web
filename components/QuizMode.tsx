"use client";

import { useState } from "react";
import FlashcardSelect from "./FlashcardSelect";
import ShuffleFlashcards from "@/components/ShuffleFlashcard";
import SideBar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Flashcard = {
  id: string;
  term: string;
  definition: string;
};

export default function QuizMode() {
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [flashcardCount, setFlashcardCount] = useState<number | null>(null);
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([]);
  const [isShuffled, setIsShuffled] = useState(false);
  const router = useRouter();

  const handleSelect = (setId: string, count: number) => {
    setSelectedSet(setId);
    setFlashcardCount(count);
    setIsShuffled(false); // reset shuffle when user selects a new set
  };

  const handleShuffle = (cards: Flashcard[]) => {
    setShuffledCards(cards);
    setIsShuffled(true);
  };

  const startQuiz = async () => {
    if (!selectedSet) return;

    let cardsToUse = shuffledCards;

    // If no shuffle was done, fetch the cards in original order
    if (cardsToUse.length === 0) {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("flashcards")
        .select("*")
        .eq("set_id", selectedSet);

      if (error || !data) {
        console.error("Error fetching flashcards:", error);
        return;
      }

      cardsToUse = data;
    }

    // Save set title as the setId for now (replace with actual title if available)
    sessionStorage.setItem("setTitle", selectedSet);
    sessionStorage.setItem("shuffledCards", JSON.stringify(cardsToUse));

    router.push("/quiz-preview");
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="p-6 flex-1">
        <div className="flex flex-col items-center pl-40 font-kaisei">
          <h1 className="text-3xl font-semibold pb-4">Quiz Mode</h1>
          <p>Test your knowledge and trust your mind</p>
        </div>

        <div className="pt-10 pl-72">
          <div className="p-7 w-full font-kaisei text-[#3a3c4e] rounded-lg bg-[#cddfd1] shadow-lg">
            <h1 className="text-3xl font-bold mb-2">Custom Quiz Session</h1>
            <p className="pb-3">Configure your quiz session settings</p>

            <div className="flex gap-2">
              <div className="flex-col">
                <FlashcardSelect onSelect={handleSelect} />
              </div>
              <div className="pt-6 flex-shrink-0">
                <p className="font-semibold pb-2">Options</p>
                <ShuffleFlashcards
                  selectedSet={selectedSet}
                  onShuffle={handleShuffle}
                  isActive={isShuffled} // show active state
                />
              </div>
            </div>

            {/* Start Quiz Button */}
            <div className="mt-6">
              <button
                onClick={startQuiz}
                className="px-6 py-3 bg-[#669E7B] text-white font-semibold rounded-lg hover:bg-[#5a8f6b]"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
