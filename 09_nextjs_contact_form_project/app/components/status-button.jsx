"use client";

import { updateStatus } from "@/actions/contact";

export default function StatusButton({ id }) {
  const action = updateStatus.bind(null, id);

  return (
    <form action={action}>
      <button
        type="submit"
        className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-400"
      >
        Mark Resolved
      </button>
    </form>
  );
}