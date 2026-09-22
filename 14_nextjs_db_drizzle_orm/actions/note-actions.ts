"use server";

import { db } from "@/lib/db/index";
import { notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";



export async function createNote(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !content) {
      return {
        success: false,
        message: "Title and content are required",
      };
    }

    const newNote = await db
      .insert(notes)
      .values({
        title,
        content,
      })
      .returning();

    return {
      success: true,
      message: "Note created successfully",
      data: newNote[0],
    };
  } catch (error) {
    console.error("CREATE NOTE ERROR:", error);

    return {
      success: false,
      message: "Failed to create note",
    };
  }
}



export async function getNotes() {
  try {
    const allNotes = await db
      .select()
      .from(notes);

    return {
      success: true,
      data: allNotes,
    };
  } catch (error) {
    console.error("GET NOTES ERROR:", error);

    return {
      success: false,
      message: "Failed to fetch notes",
      data: [],
    };
  }
}


export async function getNoteById(id: number) {
  try {
    const result = await db
      .select()
      .from(notes)
      .where(eq(notes.id, id));

    if (result.length === 0) {
      return {
        success: false,
        message: "Note not found",
      };
    }

    return {
      success: true,
      data: result[0],
    };
  } catch (error) {
    console.error("GET NOTE ERROR:", error);

    return {
      success: false,
      message: "Failed to fetch note",
    };
  }
}



export async function updateNote(
  id: number,
  formData: FormData
) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !content) {
      return {
        success: false,
        message: "Title and content are required",
      };
    }

    const updatedNote = await db
      .update(notes)
      .set({
        title,
        content,
        updatedAt: new Date(),
      })
      .where(eq(notes.id, id))
      .returning();

    if (updatedNote.length === 0) {
      return {
        success: false,
        message: "Note not found",
      };
    }

    return {
      success: true,
      message: "Note updated successfully",
      data: updatedNote[0],
    };
  } catch (error) {
    console.error("UPDATE NOTE ERROR:", error);

    return {
      success: false,
      message: "Failed to update note",
    };
  }
}



export async function deleteNote(id: number) {
  try {
    const deletedNote = await db
      .delete(notes)
      .where(eq(notes.id, id))
      .returning();

    if (deletedNote.length === 0) {
      return {
        success: false,
        message: "Note not found",
      };
    }

    return {
      success: true,
      message: "Note deleted successfully",
      data: deletedNote[0],
    };
  } catch (error) {
    console.error("DELETE NOTE ERROR:", error);

    return {
      success: false,
      message: "Failed to delete note",
    };
  }
}


