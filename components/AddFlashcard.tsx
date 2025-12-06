"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Flashcard } from "@/lib/flashcards";

interface AddFlashcardFormProps {
  setId: string;
  onFlashcardAdded: (card: Flashcard) => void;
}

export default function AddFlashcardForm({ setId, onFlashcardAdded }: AddFlashcardFormProps) {
  const supabase = createClient();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAdd = async () => {
    if (!question || !answer) return alert("Fill out both fields");

    const { data, error } = await supabase
      .from("flashcards")
      .insert([{ set_id: setId, term: question, definition: answer }])
      .select()
      .single();

    if (error) return alert(error.message);

    onFlashcardAdded(data);
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Add Flashcard</h2>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Flashcard
      </button>
    </div>
  );
}
