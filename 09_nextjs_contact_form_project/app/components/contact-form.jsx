"use client";

export default function ContactForm({ action }) {
  return (
    <form
      action={action}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Write your message..."
            required
            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 active:scale-[0.99]"
      >
        Send Message
      </button>
    </form>
  );
}