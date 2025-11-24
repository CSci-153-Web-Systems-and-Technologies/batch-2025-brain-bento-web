import { createClient } from "./supabase/client";

export type Flashcard = {
  id: string;
  term: string;
  definition: string;
};

export type FlashcardSet = {
  id: string;
  title: string;
  flashcards: Flashcard[];
};

export async function getUserSetsWithFlashcards(userId: string): Promise<FlashcardSet[]> {
  

  // Preferred: single nested select (one request)
  const supabase=createClient();
  const { data, error } = await supabase
    .from("sets")
    .select("id, title, flashcards(id, term, definition)")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching sets with flashcards:", error);
    return [];
  }

  
  const rows = (data ?? []) as any[];

  return rows.map((row) => ({
    id: String(row.id),
    title: row.title,
    flashcards: (row.flashcards ?? []).map((fc: any) => ({
      id: String(fc.id),
      term: fc.term,
      definition: fc.definition,
    })),
  }));
}