"use client";

import React, { useState } from "react";
import { FlashcardSet } from "@/lib/flashcards";
import FlashcardModal from "@/components/FlashcardModal";

interface MyFlashcardListProps {
  sets: FlashcardSet[];
  loading?: boolean;
}

export default function MyFlashcardList({ sets, loading = false }: MyFlashcardListProps) {
  const [selectedSet, setSelectedSet] = useState<FlashcardSet | null>(null);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-6 items-center font-kaisei text-[#3a3c4e] pl-64">
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
            onClick={() => setSelectedSet(set)}
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

          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedSet && (
        <FlashcardModal set={selectedSet} onClose={() => setSelectedSet(null)} />
      )}
    </div>
  );
}
