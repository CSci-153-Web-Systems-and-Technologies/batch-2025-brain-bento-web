"use client";

import AppSideBar from '@/components/Sidebar';
import MyFlashcardList from '@/components/MyFlashcardList';
import { useEffect, useState } from 'react';
import { getUserSetsWithFlashcards, FlashcardSet } from '@/lib/flashcards';
import { createClient } from '@/lib/supabase/client';

export default function MyFlashcardPage() {
  const [sets, setSets] = useState<FlashcardSet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSets = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // ✅ Use single query to fetch sets with flashcards
      const setsWithFlashcards = await getUserSetsWithFlashcards(user.email!);
      setSets(setsWithFlashcards);
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
