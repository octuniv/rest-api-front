import { getPageDetail } from "@/lib/actions/post-service";
import PostDetail from "@/component/features/posts/post-detail";

export default async function PostPage({
    params
} : { 
    params: Promise<{id: string}>
}) {
    const { id } = await params;
    const post = await getPageDetail(id);


    
    return <PostDetail post={post} />;
}