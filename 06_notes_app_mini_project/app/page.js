
"use client";

import { useEffect, useState } from "react";

export default function Home() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [notes, setNotes] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const fetchNotes = async () => {
        try {
            setIsFetching(true);

            const res = await fetch("/api/notes");
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch notes");
            }

            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
            alert(error.message || "Failed to fetch notes");
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert("Please fill in all fields");
            return;
        }

        try {
            setIsLoading(true);

            const url = editingId
                ? `/api/notes/${editingId}`
                : "/api/notes";

            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            await fetchNotes();

            alert(
                editingId
                    ? "Note updated successfully"
                    : "Note created successfully"
            );

            setTitle("");
            setContent("");
            setEditingId(null);
        } catch (error) {
            console.error("Error saving note:", error);
            alert(error.message || "Error saving note");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (note) => {
        setEditingId(note._id);
        setTitle(note.title);
        setContent(note.content);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        const confirmed = confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmed) return;

        try {
            const res = await fetch(`/api/notes/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to delete note");
            }

            await fetchNotes();

            alert("Note deleted successfully");
        } catch (error) {
            console.error("Error deleting note:", error);
            alert(error.message || "Error deleting note");
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setTitle("");
        setContent("");
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white">
          
            <div className="fixed inset-0 z-0 overflow-hidden">
                <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />
                <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-14">

                
                <header className="mb-10">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-medium text-yellow-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                                Personal Workspace
                            </div>

                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                                My Notes
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                                Capture your ideas, thoughts and important
                                information in one simple place.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/4] px-5 py-4 backdrop-blur">
                            <p className="text-xs uppercase tracking-wider text-slate-500">
                                Total Notes
                            </p>

                            <p className="mt-1 text-2xl font-bold text-yellow-400">
                                {notes.length}
                            </p>
                        </div>
                    </div>
                </header>

                
                <section className="mb-12">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/4] shadow-2xl backdrop-blur-xl">

                        {/* Form Header */}
                        <div className="border-b border-white/10 px-6 py-5 sm:px-7">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10 text-lg">
                                    {editingId ? "✎" : "+"}
                                </div>

                                <div>
                                    <h2 className="font-semibold text-white">
                                        {editingId
                                            ? "Edit Note"
                                            : "Create a New Note"}
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        {editingId
                                            ? "Update your note details"
                                            : "Write down something worth remembering"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        
                        <form
                            onSubmit={onSubmit}
                            className="space-y-5 p-6 sm:p-7"
                        >
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                    placeholder="Give your note a title..."
                                    className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-yellow-400/50 focus:ring-4 focus:ring-yellow-400/10"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Content
                                </label>

                                <textarea
                                    rows={5}
                                    value={content}
                                    onChange={(e) =>
                                        setContent(e.target.value)
                                    }
                                    placeholder="Start writing your note..."
                                    className="w-full resize-none rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-yellow-400/50 focus:ring-4 focus:ring-yellow-400/10"
                                />
                            </div>

                            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                                            {editingId
                                                ? "Updating..."
                                                : "Creating..."}
                                        </>
                                    ) : (
                                        <>
                                            {editingId ? "Save Changes" : "Create Note"}
                                        </>
                                    )}
                                </button>

                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </section>

               
                <section>
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">
                                Your Notes
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                {notes.length === 0
                                    ? "No notes yet"
                                    : `${notes.length} ${
                                          notes.length === 1
                                              ? "note"
                                              : "notes"
                                      } saved`}
                            </p>
                        </div>
                    </div>

                    
                    {isFetching ? (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="h-56 animate-pulse rounded-2xl border border-white/10 bg-white/4]"
                                />
                            ))}
                        </div>
                    ) : notes.length > 0 ? (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                            {notes.map((note) => (
                                <article
                                    key={note._id}
                                    className="group flex min-h-56 flex-col justify-between rounded-2xl border border-white/10 bg-white/4] p-5 shadow-xl backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-yellow-400/20 hover:bg-white/6]"
                                >
                                    <div>
                                        <div className="mb-4 flex items-start justify-between gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-yellow-400/10 text-sm">
                                                📝
                                            </div>

                                            <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                                                Note
                                            </span>
                                        </div>

                                        <h3 className="line-clamp-2 text-lg font-bold leading-7 text-yellow-300">
                                            {note.title}
                                        </h3>

                                        <p className="mt-3 line-clamp-5 whitespace-pre-wrap text-sm leading-6 text-slate-400">
                                            {note.content}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex gap-2 border-t border-white/10 pt-4">
                                        <button
                                            onClick={() =>
                                                handleEdit(note)
                                            }
                                            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-blue-500/10 hover:text-blue-300"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(note._id)
                                            }
                                            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-red-500/10 hover:text-red-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </article>
                            ))}

                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-white/10 bg-white/2] px-6 py-16 text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-2xl">
                                📝
                            </div>

                            <h3 className="text-lg font-semibold text-white">
                                No notes yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                                Create your first note using the form above.
                                Your notes will appear here.
                            </p>
                        </div>
                    )}
                </section>

                
                <footer className="mt-14 border-t border-white/10 pt-6 text-center">
                    <p className="text-xs text-slate-600">
                        Simple Notes App • Built with Next.js & MongoDB
                    </p>
                </footer>
            </div>
        </main>
    );
}

