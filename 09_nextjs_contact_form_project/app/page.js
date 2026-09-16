import ContactForm from "./components/contact-form";
import { createContact } from "../actions/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full border border-slate-700 bg-slate-900 px-4 py-1 text-sm text-slate-300">
            Get in touch
          </span>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Have a question or want to work together? Send us a message and
            we'll get back to you soon.
          </p>
        </div>

        <ContactForm action={createContact} />
      </div>
    </main>
  );
}