
import {
  createPost,
  getAllPosts,
  deletePostById,
  updatePost,
} from "@/actions/post-action";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="border-b border-slate-800 pb-5">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Post Management Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Create, update, view, and manage your posts stored in Neon PostgreSQL.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl sticky top-6">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Create New Post
            </h2>

            <form
              action={async (formData: FormData) => {
                "use server";
                await createPost(formData);
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="Post title..."
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={4}
                  placeholder="Write your content here..."
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition shadow-lg shadow-blue-600/30 cursor-pointer active:scale-[0.98]"
              >
                Publish Post
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">
              All Posts ({posts.length})
            </h2>

            {posts.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl text-slate-400">
                No posts found. Create your first post from the form!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-md hover:border-slate-700 transition"
                  >
                    <div>
                      <h3 className="font-bold text-lg text-white mb-2 line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                        {post.content || "No content provided."}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-slate-800/80">
                      <details className="text-xs text-slate-400">
                        <summary className="cursor-pointer text-blue-400 hover:underline font-medium mb-2">
                          Edit Post
                        </summary>
                        <form
                          action={async (formData: FormData) => {
                            "use server";
                            await updatePost(post.id, formData);
                          }}
                          className="space-y-2 mt-2 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50"
                        >
                          <input
                            type="text"
                            name="title"
                            defaultValue={post.title}
                            required
                            className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <textarea
                            name="content"
                            defaultValue={post.content || ""}
                            rows={2}
                            className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-1.5 rounded-lg transition text-xs"
                          >
                            Save Changes
                          </button>
                        </form>
                      </details>

                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>
                          {new Date(post.updatedAt).toLocaleDateString()}
                        </span>

                        <form
                          action={async () => {
                            "use server";
                            await deletePostById(post.id);
                          }}
                        >
                          <button
                            type="submit"
                            className="text-red-400 hover:text-red-300 font-medium cursor-pointer transition"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}