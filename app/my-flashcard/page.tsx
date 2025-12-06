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

      const { data, error } = await supabase
        .from('sets')
        .select('id, title, flashcards(id, term, definition)')
        .eq('user_id', user.id);

      if (error) {
        console.log(error.message);
      } else {
        setSets(data ?? []);
      }
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
