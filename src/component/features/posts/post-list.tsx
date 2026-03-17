"use client";

import Link from "next/link";
import { Post } from "./post-detail";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {posts && posts.length > 0 ? posts.map((post) => (
        <li key={post.id} className="p-2">
          <Link href={`posts/${post.id}`}>{post.id}. {post.title}</Link>
        </li>
      )) : <li>EMPTY</li>}
    </ul>
  );
}