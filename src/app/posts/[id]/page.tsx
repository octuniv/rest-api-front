import PostDetail from "@/component/features/posts/post-detail";
import { getPostDetail } from "@/lib/service/post";
import { notFound } from "next/navigation";

export default async function Detail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    
    if (!id || !/^\d+$/.test(id) || Number(id) <= 0) {
        notFound();
    }

    const numericId = Number(id);
    
    try {
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