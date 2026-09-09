import mongoose from "mongoose";
import { connectDB } from "@/app/lib/db";
import { Note } from "@/app/lib/models/Note";



export async function GET(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return Response.json(
                {
                    message: "Invalid note ID",
                },
                {
                    status: 400,
                }
            );
        }

        const note = await Note.findById(id);

        if (!note) {
            return Response.json(
                {
                    message: "Note not found",
                },
                {
                    status: 404,
                }
            );
        }

        return Response.json(note, {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching note:", error);

        return Response.json(
            {
                message: "Failed to fetch note",
            },
            {
                status: 500,
            }
        );
    }
}



export async function PUT(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return Response.json(
                {
                    message: "Invalid note ID",
                },
                {
                    status: 400,
                }
            );
        }

        const body = await req.json();

        const { title, content } = body;

        
        if (!title?.trim() || !content?.trim()) {
            return Response.json(
                {
                    message: "Title and content are required",
                },
                {
                    status: 400,
                }
            );
        }

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            {
                title: title.trim(),
                content: content.trim(),
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedNote) {
            return Response.json(
                {
                    message: "Note not found",
                },
                {
                    status: 404,
                }
            );
        }

        return Response.json(updatedNote, {
            status: 200,
        });
    } catch (error) {
        console.error("Error updating note:", error);

        return Response.json(
            {
                message: "Failed to update note",
            },
            {
                status: 500,
            }
        );
    }
}



export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return Response.json(
                {
                    message: "Invalid note ID",
                },
                {
                    status: 400,
                }
            );
        }

        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return Response.json(
                {
                    message: "Note not found",
                },
                {
                    status: 404,
                }
            );
        }

        return Response.json(
            {
                message: "Note deleted successfully",
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error deleting note:", error);

        return Response.json(
            {
                message: "Failed to delete note",
            },
            {
                status: 500,
            }
        );
    }
}