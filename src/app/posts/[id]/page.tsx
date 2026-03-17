import PostDetail from "@/component/features/posts/post-detail";
import { getPostDetail } from "@/lib/service/post";

export default async function Detail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    try {
        const { id } = await params;
        const post = await getPostDetail(id);
        return <PostDetail post={post} />;
    } catch (error) {
        return (
            <div className="p-4 text-red-500">
                <p>게시글을 찾을 수 없습니다.</p>
                <p className="text-sm">{error instanceof Error ? error.message : 'Unknown error'}</p>
            </div>
        );
    }
}