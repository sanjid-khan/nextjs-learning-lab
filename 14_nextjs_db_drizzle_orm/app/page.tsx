import { getNotes } from "@/actions/note-actions";
import Notes from "@/app/components/Notes";

export default async function Home() {
  const result = await getNotes();
  const notes = result.success ? result.data ?? [] : [];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
      
        <header className="text-center space-y-3 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
            <span>⚡ Next.js 16 + Drizzle ORM</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            My Notes
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
            Organize your everyday thoughts and tasks with real-time Server Actions and Neon PostgreSQL.
          </p>
        </header>

        <Notes initialNotes={notes} />
      </div>
    </main>
  );
}