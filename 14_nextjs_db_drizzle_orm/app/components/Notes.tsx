"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createNote,
  updateNote,
  deleteNote,
} from "@/actions/note-actions";

interface Note {
  id: number | string;
  title: string;
  content: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

interface NotesProps {
  initialNotes: Note[];
}

export default function Notes({ initialNotes }: NotesProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    startTransition(async () => {
      let result;
      if (editingId !== null) {
        result = await updateNote(editingId as any, formData);
      } else {
        result = await createNote(formData);
      }

      if (result?.success ?? true) {
        setTitle("");
        setContent("");
        setEditingId(null);
        router.refresh();
      } else if (result?.message) {
        alert(result.message);
      }
    });
  }

  function handleEdit(note: Note) {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id: number | string) {
    const confirmDelete = confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    startTransition(async () => {
      const result = await deleteNote(id as any);
      if (result?.success ?? true) {
        router.refresh();
      } else if (result?.message) {
        alert(result.message);
      }
    });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setTitle("");
    setContent("");
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 p-4 md:p-6">
    
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            {editingId !== null ? "Edit Note" : "Create New Note"}
          </h2>
          {editingId !== null && (
            <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full font-medium">
              Editing Mode
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition duration-200"
            />
          </div>

          <div>
            <textarea
              placeholder="Write your note details here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition duration-200 resize-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-xl transition duration-200 shadow-lg shadow-blue-600/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isPending && (
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {isPending
                ? "Processing..."
                : editingId !== null
                ? "Update Note"
                : "Create Note"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-5 py-2.5 rounded-xl border border-slate-700 transition duration-200 active:scale-[0.98]"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

     
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-white tracking-tight">
            All Notes
          </h2>
          <span className="text-xs bg-slate-800 text-slate-400 border border-slate-700 px-3 py-1 rounded-full font-medium">
            Total: {initialNotes.length}
          </span>
        </div>

        {initialNotes.length === 0 ? (
          <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl p-12 text-center">
            <div className="w-12 h-12 bg-slate-800 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-3">
              📝
            </div>
            <p className="text-slate-400 text-sm font-medium">
              No notes found. Create your first note above!
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {initialNotes.map((note) => (
              <div
                key={note.id}
                className="group bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 shadow-lg transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-100 mb-2 line-clamp-1 group-hover:text-blue-400 transition duration-200">
                    {note.title}
                  </h3>
                  <p className="text-slate-400 text-sm whitespace-pre-wrap line-clamp-4 leading-relaxed mb-6">
                    {note.content || "No details provided."}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : ""}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(note)}
                      disabled={isPending}
                      className="text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 px-3 me-1 py-1.5 rounded-lg font-medium transition duration-200 disabled:opacity-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(note.id)}
                      disabled={isPending}
                      className="text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-lg font-medium transition duration-200 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}