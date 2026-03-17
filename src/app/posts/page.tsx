import PostList from "@/component/features/posts/post-list";
import { getPageList } from "../../lib/actions/post-service";

export default async function Home() {
  const posts = await getPageList();
  return <PostList posts={posts} />;
}
