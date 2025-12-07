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
    .select("id, title, date_created, user_id, flashcards(id, term, definition)")
    .eq("user_id", userAuthId);

  if (setsError) {
    console.error("Error fetching sets:", setsError);
    return [];
  }

  const sets: FlashcardSet[] = [];

  // 3️⃣ For each set, fetch the creator info from users table
  for (const row of setsData ?? []) {
    let creatorName = "Unknown";

    try {
      const { data: creatorRow, error: creatorError } = await supabase
        .from("users")
        .select("name, email")
        .eq("auth_id", row.user_id)
        .single();

      if (!creatorError && creatorRow) {
        creatorName = creatorRow.name
          ? creatorRow.name
          : creatorRow.email
          ? creatorRow.email.split("@")[0]
          : "Unknown";
      }
    } catch (err) {
      console.error("Error fetching creator info:", err);
    }

    sets.push({
      id: String(row.id),
      title: row.title,
      date_created: row.date_created,
      created_by: creatorName,
      flashcards: (row.flashcards ?? []).map((fc: any) => ({
        id: String(fc.id),
        term: fc.term,
        definition: fc.definition,
      })),
    });
  }

  return sets;
}
