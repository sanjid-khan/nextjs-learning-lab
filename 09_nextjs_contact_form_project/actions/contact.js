"use server";

import connectDB from "@/app/lib/db";
import Contact from "@/app/lib/models/Contact";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createContact(formData) {
  await connectDB();

  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    throw new Error("All fields are required");
  }

  await Contact.create({
    name,
    email,
    message,
  });

  redirect("/dashboard");
}

export async function updateStatus(id) {
  await connectDB();

  await Contact.findByIdAndUpdate(id, {
    status: "resolved",
  });

  revalidatePath("/dashboard");
}