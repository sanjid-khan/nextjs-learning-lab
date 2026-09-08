

// Read the Header
// export async function GET(request){
//     const reqHeaders = new Headers(request.headers);

//     console.log(reqHeaders.get("Authorization"));
//     return new Response("Hello World")
// }



import {headers} from "next/headers"

export async function GET(request){
    const reqHeaders = await headers();

    console.log(reqHeaders.get("user-agent"));
    return new Response("Hello World")
}



import { headers } from "next/headers";

export async function GET(request) {
    const reqHeaders = await headers();   
    console.log(reqHeaders.get("user-agent"));

    return new Response("<h1>Hello World</h1>", {
        headers: {
            "content-type": "text/html",
        }
    });
}






import { cookies } from "next/headers";

export async function POST() {

    const cookieStore = await cookies();

    cookieStore.set("accessToken", "abc123");

    return Response.json({
        success: true,
        message: "Login successful"
    });
}



import { cookies } from "next/headers";

export async function GET() {

    const cookieStore = await cookies();

    const token =
        cookieStore.get("accessToken");

    console.log(token);

    return Response.json({
        success: true
    });
}



import { cookies } from "next/headers";

export async function POST() {

    const cookieStore = await cookies();

    cookieStore.delete("accessToken");

    return Response.json({
        success: true,
        message: "Logout successful"
    });
}