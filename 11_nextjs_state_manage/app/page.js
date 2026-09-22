
// "use client";

// import { useQuery } from "@tanstack/react-query";

// export default function Home() {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["user-data"],
//     queryFn: () =>
//       fetch(
//         "https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10"
//       ).then((res) => res.json()),
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error.message}</div>;
//   }

//   return <div>{JSON.stringify(data, null, 2)}</div>;
// }




// import PostList from "@/components/post-list";

// export default function Home() {
//   return (
//     <main>
//       <h1>Posts</h1>

//       <PostList />
//     </main>
//   );
// }



import AddPost from "@/components/add-post";
import PostList from "@/components/post-list";

export default function Home(){
     return(
      <div>
        <h1>Posts</h1>
        <PostList/>
        <AddPost/>
      </div>
     )
}