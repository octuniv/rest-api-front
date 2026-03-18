import { Post } from "@/lib/schemas/post";
import Link from "next/link";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <>
      <div className="flex justify-end mb-2">
        <Link
          href="/posts/create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
        >
          새 글 작성
        </Link>
      </div>
      <ul className="flex flex-col gap-4">
        {posts && posts.length > 0 ? posts.map((post) => (
          <li key={post.id} className="p-2">
            <Link href={`posts/${post.id}`}>{post.id}. {post.title}</Link>
          </li>
        )) : <li>EMPTY</li>}
      </ul>
    </>
  );
}