import PostList from "@/component/features/posts/post-list";
import { getPostList } from "@/lib/service/post";

export default async function PostsPage() {
  try {
    const posts = await getPostList();
    return <PostList posts={posts} />;
  } catch (error) {
    return (
      <div className="p-4 text-red-500">
        <p>게시글 목록을 불러올 수 없습니다.</p>
        <p className="text-sm">{error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }
}
