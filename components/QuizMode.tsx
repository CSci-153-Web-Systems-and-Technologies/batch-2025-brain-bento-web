"use client";

import { useState } from "react";
import FlashcardSelect from "./FlashcardSelect";
import ShuffleFlashcards from "@/components/ShuffleFlashcard";
import SideBar from "@/components/Sidebar";

export default function QuizMode() {
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [flashcardCount, setFlashcardCount] = useState<number | null>(null);
  const [shuffledCards, setShuffledCards] = useState<any[]>([]);

  const handleSelect = (setId: string, count: number) => {
    setSelectedSet(setId);
    setFlashcardCount(count);
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

            {/* Flex container to place components side by side */}
            <div className="flex gap-2">
            <div className=" flex-col">
                <FlashcardSelect onSelect={handleSelect} />
            </div>
            <div className="pt-6 flex-shrink-0">
                <p  className="font-semibold pb-2">Options</p>
                <ShuffleFlashcards
                    selectedSet={selectedSet}
                    onShuffle={(shuffled: any[]) => setShuffledCards(shuffled)}/>
            </div>
            </div>
        </div>
        </div>

      </div>
    </div>
  );
}
