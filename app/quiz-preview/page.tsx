"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FlashcardFlip from "@/components/FlashcardFlip";

interface Flashcard {
  id: string;
  term: string;
  definition: string;
}

export default function QuizPreviewPage() {
  const router = useRouter();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load shuffled cards from sessionStorage
  useEffect(() => {
    const cardsData = sessionStorage.getItem("shuffledCards");

    if (!cardsData) {
      router.push("/quiz-mode"); // fallback if no data
      return;
    }

    setFlashcards(JSON.parse(cardsData));
  }, [router]);

  if (flashcards.length === 0)
    return <p className="text-center mt-10">Loading...</p>;

  const currentCard = flashcards[currentIndex];

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevCard = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const finishPreview = () => {
    router.push("/quiz-mode"); // go back to menu
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f1f2eb] p-6">
      {/* Card index */}
      <p className="pb-3 text-gray-600">
        Card {currentIndex + 1} of {flashcards.length}
      </p>

      {/* Flashcard */}
      <FlashcardFlip
        key={currentCard.id} // ensures proper re-render
        term={currentCard.term}
        definition={currentCard.definition}
      />

      
      <div className="flex gap-4 mt-6">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="px-6 py-3 bg-[#aad3eb] rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        {currentIndex < flashcards.length - 1 ? (
          <button
            onClick={nextCard}
            className="px-6 py-3 bg-[#aad3eb] text-white rounded-lg"
          >
            Next
          </button>
        ) : (
          <button
            onClick={finishPreview}
            className="px-6 py-3 bg-[#e07a5f] text-white rounded-lg"
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
