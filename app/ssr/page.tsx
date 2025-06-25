async function PostList() {
  const posts = await fetch("https://api.github.com/repos/vercel/next.js");
  const data = await posts.json();
  console.log("⭐ data", data);
  return (
    <div className="space-y-4">
      {(data || []).topics.map((post: any) => (
        <article key={post.id} className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-2 text-xl font-bold">{post.title}</h2>
          <p className="mb-4 text-gray-600">{post.content}</p>
          <div className="text-sm text-gray-500">
            <span>By {post.author}</span>
            <span className="mx-2">•</span>
            <time>{new Date(post.created_at).toLocaleDateString()}</time>
          </div>
        </article>
      ))}
    </div>
  );
}

export default PostList;
