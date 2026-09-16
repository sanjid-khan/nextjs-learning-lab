import connectDB from "../lib/db";
import Contact from "../lib/models/Contact";
import StatusButton from "../components/status-button";

export default async function Dashboard() {
  await connectDB();

  const contacts = await Contact.find()
    .sort({ createdAt: -1 })
    .lean();

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-400">
            ADMIN DASHBOARD
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Contact Messages
          </h1>

          <p className="mt-2 text-slate-400">
            Manage messages submitted through your contact form.
          </p>
        </div>

        <div className="space-y-5">
          {contacts.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
              <p className="text-slate-400">
                No contact messages yet.
              </p>
            </div>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact._id.toString()}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {contact.name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      {contact.email}
                    </p>
                  </div>

                  <span
                    className={`h-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      contact.status === "resolved"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {contact.status}
                  </span>
                </div>

                <div className="my-5 h-px bg-slate-800" />

                <p className="whitespace-pre-wrap leading-7 text-slate-300">
                  {contact.message}
                </p>

                {contact.status === "pending" && (
                  <div className="mt-6">
                    <StatusButton
                      id={contact._id.toString()}
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}