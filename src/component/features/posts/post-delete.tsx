"use client";

import { deletePostAction } from "@/lib/actions/post";
import { PostDeleteState } from "@/lib/schemas/post";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";

export default function PostDeleteButton({ id }: { id: number }) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string>();
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("정말 삭제하시겠습니까?")) return;

        startTransition(async () => {
            
            const result = await deletePostAction(id, {});

            if (result.success) {
                router.push("/posts");
            } else {
                setError(result.error ?? "삭제에 실패했습니다.");
            }
        });
    };

    return (
        <>
            <button 
                onClick={handleDelete}
                disabled={isPending}
                className="border border-black rounded p-2 bg-red-500 w-full disabled:bg-gray-400">
                {isPending ? "삭제 진행중..." : "삭제"}
            </button>
            {error && <p className="mt-2 text-sm text-white/90">{error}</p>}
        </>
    );
}