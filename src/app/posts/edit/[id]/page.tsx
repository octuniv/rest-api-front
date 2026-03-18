import { notFound } from 'next/navigation';
import PostUpdateForm from "@/component/features/posts/post-update";
import { getPostDetail } from '@/lib/service/post';

export default async function ModifyPage({
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
        await getPostDetail(numericId);
    } catch (error) {
        notFound();
    }

    return (
        <>
            <h1>글 수정</h1>
            <PostUpdateForm id={numericId} />
        </>
    );
}