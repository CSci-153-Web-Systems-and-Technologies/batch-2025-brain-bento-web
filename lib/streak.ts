import { createClient } from "./supabase/client";

export async function updateStudyStreak(userEmail: string) {
  const supabase = createClient();

  // 1️⃣ Fetch the user row
  const { data: userRow, error } = await supabase
    .from("users")
    .select("streak, last_login_date")
    .eq("email", userEmail)
    .single();

  if (error || !userRow) {
    console.error("Error fetching user for streak:", error);
    return;
  }

  const today = new Date();
  const lastLogin = userRow.last_login_date ? new Date(userRow.last_login_date) : null;
  let newStreak = 1; 

  if (lastLogin) {
    const diffTime = today.getTime() - lastLogin.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      
      newStreak = userRow.streak + 1;
    } else if (diffDays === 0) {
      
      newStreak = userRow.streak;
    } else {

      newStreak = 1;
    }
  }

  
  const { error: updateError } = await supabase
    .from("users")
    .update({
      streak: newStreak,
      last_login_date: today.toISOString(),
    })
    .eq("email", userEmail);

  if (updateError) {
    console.error("Error updating streak:", updateError);
  }
}
