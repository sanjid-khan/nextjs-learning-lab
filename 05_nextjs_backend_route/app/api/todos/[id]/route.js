export async function PUT(request, { params }) {
    const { id } = await params;

    const data = await request.json();

    const updatedTodo = {
        id,
        ...data
    };

    return Response.json({
        success: true,
        message: "Todo updated successfully",
        todo: updatedTodo
    });
}


export async function PATCH(request, { params }) {
    const { id } = await params;

    const data = await request.json();

    const updatedTodo = {
        id,
        ...data
    };

    return Response.json({
        success: true,
        message: "Todo partially updated successfully",
        todo: updatedTodo
    });
}


export async function DELETE(_request, { params }) {
    const { id } = await params;

    // await Todo.findByIdAndDelete(id);

    return Response.json({
        success: true,
        message: "Todo deleted successfully",
        deletedId: id
    });
}