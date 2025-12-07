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

      <h1 className="text-2xl pb-4 font-semibold pt-4 w-full">My Flashcards</h1>

      <div className="w-full text-md">
        <p>Every subject mastered begins with curiosity.</p>
        <p>Manage your flashcard sets</p>
      </div>

      <div className="w-full text-md rounded-lg p-16 bg-[#cddfd1] flex flex-col gap-4">

        {sets.length === 0 && <p className="text-center">No sets yet.</p>}

        {sets.map((set) => (
          <div
            key={set.id}
            className="w-full bg-white rounded-3xl p-3 border pr-6 border-gray-300 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            
            <h2 className="font-bold text-lg pl-3">{set.title}</h2>

            
            <p className="text-sm text-gray-500 font-inter pl-3">
              {set.created_by ?? "Unknown"} |{" "}
              {set.date_created
                ? new Date(set.date_created).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "Unknown"}
            </p>

            {/* FLASHCARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">

              {set.flashcards.map((card: Flashcard) => (
                <div
                  key={card.id}
                  className="p-3 border rounded hover:shadow transition bg-gray-50"
                >
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
