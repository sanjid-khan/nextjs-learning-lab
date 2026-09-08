export async function POST(request){

    // Parse the json body from the client
    const body = await request.json();

    const {title,completed} = body;

    // database logic here, etc

    return Response.json({
        success:true,
        message:"Todo Created Successfully",
        todo:{
            title,
            completed
        }
    })
}