"use client";

import { useTransition, useState } from "react";
import { deleteCommentAction } from "@/lib/actions/comment";

export default function CommentDeleteButton({ postId, commentId 
}: { postId: number, commentId: number }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    startTransition(async () => {
      const result = await deleteCommentAction(postId, commentId, {});

      if (!result.success) {
        setError(result.error ?? "삭제에 실패했습니다.");
      } 
    });
  };

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="border-2 p-2 rounded"
      >
        {isPending ? "삭제 진행중..." : "삭제"}
      </button>
      {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}
    </>
  );
}