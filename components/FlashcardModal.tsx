"use client";

import React from "react";
import { FlashcardSet } from "@/lib/flashcards";

interface FlashcardModalProps {
  set: FlashcardSet;
  onClose: () => void;
}

export default function FlashcardModal({ set, onClose }: FlashcardModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 overflow-auto p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">

        
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">{set.title}</h2>
        <p className="text-sm font-inter text-gray-500 mb-4">
          Created by {set.created_by ?? "Unknown"} |{" "}
          {set.date_created
            ? new Date(set.date_created).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Unknown"}
        </p>

       
        <div className="flex flex-col gap-4">
            {set.flashcards.length === 0 && (
                <p className="text-gray-500">No flashcards in this set.</p>
            )}
            {set.flashcards.map((card) => (
                <div
                key={card.id}
                className="p-3 border rounded bg-gray-50 shadow-sm flex items-center"
                >
                
                <h3 className="font-semibold w-1/4">{card.term}</h3>

                
                <span className="text-gray-400 mx-2">|    </span>

               
                <p className="text-gray-600 flex-1">{card.definition}</p>
                </div>
            ))}
            </div>


        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#3a3c4e] text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
