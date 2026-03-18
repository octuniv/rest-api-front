import { Post } from "@/lib/schemas/post";
import PostDeleteButton from "./post-delete";

export default function PostDetail({post} : {post : Post}) {
      return <div className="flex flex-col gap-8 items-center">
      <h1>{post.id}번 글 상세페이지</h1>
      <div>
          <h1>{post.title}</h1>
          <div>{post.content}</div>
          <PostDeleteButton id={post.id}/>
      </div>
  </div>;
}