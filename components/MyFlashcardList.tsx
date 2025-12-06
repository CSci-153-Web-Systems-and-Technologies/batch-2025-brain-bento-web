"use client";

import React from "react";
import { FlashcardSet, Flashcard } from "@/lib/flashcards";

interface MyFlashcardListProps {
  sets: FlashcardSet[]; 
  loading?: boolean;    
}

export default function MyFlashcardList({ sets, loading = false }: MyFlashcardListProps) {
  if (loading) return <p>Loading...</p>;

  return (
    <div className="absolute top-0 left-64 right-0 p-6 pl-14 pr-14 flex flex-col gap-6 items-center font-kaisei text-[#3a3c4e]">
      {/* Page heading */}
      <h1 className="text-2xl pb-4 font-semibold pt-4 text-left w-full">My Flashcards</h1>
      <div className="text-md text-left w-full">
        <p>Every subject mastered begins with curiosity.</p>
        <p>Manage your flashcard sets</p>
      </div>

      <div className="w-full h-full rounded-lg p-7 bg-[#cddfd1]">
        {/* Show if no sets exist */}
        {sets.length === 0 && <p className="text-center">No sets yet.</p>}

        {sets.map((set) => (
          <div key={set.id} className="w-full max-w-3xl bg-white rounded-lg p-6 pb-3">
            <h2 className="font-bold text-lg mb-3 text-center">{set.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Show if no flashcards in this set */}
              {set.flashcards.length === 0 && (
                <p className="col-span-full text-center">No flashcards in this set.</p>
              )}
              {set.flashcards.map((card: Flashcard) => (
                <div key={card.id} className="p-3 border rounded hover:shadow transition">
                  <h3 className="font-semibold">{card.term}</h3>
                  <p className="text-gray-600">{card.definition}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
