"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";


export default function CreateSetForm() {
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [flashcards, setFlashcards] = useState([{ term: "", definition: "" }]);

  // Update term/definition
  const handleInputChange = (index: number, field: "term" | "definition", value: string) => {
    const newFlashcards = [...flashcards];
    newFlashcards[index][field] = value;
    setFlashcards(newFlashcards);
  };

  
  const handleAddFlashcardInput = () => {
    setFlashcards([...flashcards, { term: "", definition: "" }]);
  };

  
  const handleCreateSet = async () => {
    if (!title.trim()) return alert("Enter a set title");
    if (flashcards.some((c) => !c.term || !c.definition)) return alert("Fill in all flashcards");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("You must be logged in");

    
    const { data: setData, error: setError } = await supabase
      .from("sets")
      .insert([{ title, user_id: user.id }])
      .select()
      .single();

    if (setError || !setData) return alert(setError?.message || "Failed to create set");

    const setId = setData.id;

   
    const { error: cardsError } = await supabase
      .from("flashcards")
      .insert(
        flashcards.map((c) => ({ term: c.term, definition: c.definition, set_id: setId }))
      );

    if (cardsError) return alert(cardsError.message);

 
    setTitle("");
    setFlashcards([{ term: "", definition: "" }]);
    alert("Flashcard set created successfully!");
  };

  return (
    <div className="absolute top-0 left-64 right-0 p-6 pl-14 pr-14 flex flex-col gap-6 items-center font-kaisei text-[#3a3c4e]">
      <h1 className="text-2xl pb-4 font-semibold pt-4 w-full">Create New Flashcard Set</h1>

      <div className="w-full rounded-xl p-8 bg-[#cddfd1] shadow-md flex flex-col gap-4">
        <p className="font-semibold">Flashcard Set Title</p>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-sm text-gray-700 font-inter w-full p-3 rounded-lg bg-[#f4f5e1] border border-black"
        />
      </div>

      {flashcards.map((card, index) => (
        <div key={index} className="w-full rounded-xl p-6 bg-[#cddfd1] shadow-md flex flex-col gap-4 mt-2">
          <h2 className="font-semibold text-lg">Term / Front Side</h2>
          <input
            type="text"
            placeholder="Enter the Term"
            value={card.term}
            onChange={(e) => handleInputChange(index, "term", e.target.value)}
            className="text-sm text-gray-700 font-inter w-full p-3 rounded-lg border bg-[#f4f5e1] border-black"
          />
          <h2 className="font-semibold text-lg">Definition / Back Side</h2>
          <input
            type="text"
            placeholder="Enter the Definition"
            value={card.definition}
            onChange={(e) => handleInputChange(index, "definition", e.target.value)}
            className="text-sm text-gray-700 font-inter w-full p-3 rounded-lg border bg-[#f4f5e1] border-black"
          />
        </div>
      ))}

      <div className="flex flex-col gap-4 font-semibold w-full pt-4">
        <button
          onClick={handleAddFlashcardInput}
          className="bg-[#f4f5e1] text-[#3a3c4e] px-4 py-2 rounded border border-black hover:bg-[#dedfbc] transition self-center"
        >
          Add Another Flashcard +
        </button>
        <button
          onClick={handleCreateSet}
          className="w-full bg-[#aad3eb] text-[#3a3c4e] px-4 py-2 rounded hover:bg-[#7da3b8] transition border border-blue-950"
        >
          Create Flashcard Set
        </button>
      </div>
    </div>
  );
}
