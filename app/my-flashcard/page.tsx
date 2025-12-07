"use client";

import AppSideBar from '@/components/Sidebar';
import MyFlashcardList from '@/components/MyFlashcardList';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { FlashcardSet } from '@/lib/flashcards';

export default function MyFlashcardPage() {
  const [sets, setSets] = useState<FlashcardSet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSets = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return setLoading(false);

      // 1️⃣ Fetch sets from Supabase
      const { data: setsData, error } = await supabase
        .from("sets")
        .select("id, title, date_created, user_id, flashcards(id, term, definition)")
        .eq("user_id", user.id);

      if (error) {
        console.error(error.message);
        setLoading(false);
        return;
      }

      // 2️⃣ Fetch creator name (or email without @gmail.com)
      const setsWithCreator = [];

      for (const s of setsData ?? []) {
        const { data: creator } = await supabase
          .from("users")
          .select("name, email")
          .eq("auth_id", s.user_id)
          .single();

        const creatorName = creator?.name
          ? creator.name
          : creator?.email
          ? creator.email.split("@")[0]
          : "Unknown";

        setsWithCreator.push({
          ...s,
          created_by: creatorName,
        });
      }

      setSets(setsWithCreator);
      setLoading(false);
    };

    fetchSets();
  }, []);

  return (
    <div className="flex">
      <AppSideBar />
      <main className="p-6 flex-1">
        <MyFlashcardList sets={sets} loading={loading} />
      </main>
    </div>
  );
}
