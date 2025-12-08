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
  date_created?: string | null;
  created_by?: string | null;
};


export async function getUserSetsWithFlashcards(currentUserEmail: string): Promise<FlashcardSet[]> {
  const supabase = createClient();

  
  const { data: userRow, error: userError } = await supabase
    .from("users")
    .select("auth_id, name, email")
    .eq("email", currentUserEmail)
    .single();

  if (userError || !userRow) {
    console.error("Error fetching user info:", userError);
    return [];
  }

  const userAuthId = userRow.auth_id;

  
  const { data: setsData, error: setsError } = await supabase
    .from("sets")
    .select("id, title, date_created, user_id")
    .eq("user_id", userAuthId);

  if (setsError || !setsData) {
    console.error("Error fetching sets:", setsError);
    return [];
  }

 
  const setsWithFlashcards: FlashcardSet[] = [];

  for (const set of setsData) {
    const { data: flashcardsData, error: flashcardsError } = await supabase
      .from("flashcards")
      .select("id, term, definition")
      .eq("set_id", set.id);

    if (flashcardsError) {
      console.error(`Error fetching flashcards for set ${set.id}:`, flashcardsError);
    }

    setsWithFlashcards.push({
      id: set.id,
      title: set.title,
      date_created: set.date_created,
      created_by: userRow.name ?? userRow.email.split("@")[0],
      flashcards: flashcardsData ?? [],
    });
  }

  return setsWithFlashcards;
}
