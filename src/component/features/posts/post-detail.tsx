import { Post } from "@/lib/schemas/post";
import PostDeleteButton from "./post-delete";
import Link from "next/link";
import { Comment } from "@/lib/schemas/comment";
import CommentList from "../comment/comment-list";

export default function PostDetail({ 
    post, postComments 
}: { post: Post, postComments: Comment[] }) {
  return (
    <div className="flex flex-col gap-8 items-center max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{post.id}번 글 상세페이지</h1>
      
      <div className="w-full border rounded-lg p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
        <div className="text-gray-700 whitespace-pre-wrap">{post.content}</div>
        
        <div className="flex gap-4 mt-6 pt-4 border-t">
          <Link
            href={`/posts/edit/${post.id}`}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-center"
          >
            수정
          </Link>
          
          <div className="flex-1">
            <PostDeleteButton id={post.id} />
          </div>
        </div>
      </div>

      <CommentList comments={postComments} postId={post.id}/>
      
      <Link
        href="/posts"
        className="text-gray-500 hover:text-gray-700 underline text-sm"
      >
        ← 목록으로 돌아가기
      </Link>
    </div>
  );
}