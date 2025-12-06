"use client";

import AppSideBar from "@/components/Sidebar";
import CreateSetForm from "@/components/create-set";

export default function CreateFlashcardsPage() {
  return (
    <div className="flex">
      <AppSideBar />
      <main className="p-6 flex-1">
        <CreateSetForm />
      </main>
    </div>
  );
}
