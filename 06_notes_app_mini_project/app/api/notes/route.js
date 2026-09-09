import { connectDB } from "@/app/lib/db";
import { Note } from "@/app/lib/models/Note";

export async function GET() {
    try {
        await connectDB();

        const notes = await Note.find().sort({ createdAt: -1 });

        return Response.json(notes, {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching notes:", error);

        return Response.json(
            {
                message: "Failed to fetch notes",
            },
            {
                status: 500,
            }
        );
    }
}

export async function POST(req) {
    try {
        await connectDB();

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

        const note = await Note.create({
            title: title.trim(),
            content: content.trim(),
        });

        return Response.json(note, {
            status: 201,
        });
    } catch (error) {
        console.error("Error creating note:", error);

        return Response.json(
            {
                message: "Failed to create note",
            },
            {
                status: 500,
            }
        );
    }
}