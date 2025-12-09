"use client";
import { useState } from "react";

interface FlashcardFlipProps {
  term: string;
  definition: string;
}

export default function FlashcardFlip({ term, definition }: FlashcardFlipProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{ perspective: "1000px" }}
      className="w-[1000px] h-[440px] cursor-pointer"
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute w-full h-full bg-[#c9e4ce] rounded-xl shadow-lg flex items-center justify-center p-6 text-3xl overflow-auto"
        >
          {term}
        </div>

        
        <div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          className="absolute w-full h-full bg-[#cddfd1] rounded-xl shadow-lg flex items-center justify-center p-6 text-3xl overflow-auto"
        >
          {definition}
        </div>
      </div>
    </div>
  );
}
