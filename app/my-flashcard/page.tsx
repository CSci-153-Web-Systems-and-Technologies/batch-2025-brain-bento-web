"use client";

import AppSideBar from '@/components/Sidebar';
import MyFlashcardList from '@/components/MyFlashcardList';

export default function MyFlashcardPage(){
    return (
        <div>
            <AppSideBar/>
            <main className="p-6">
              <MyFlashcardList/>
            </main>
        </div>
        
        
    );
}