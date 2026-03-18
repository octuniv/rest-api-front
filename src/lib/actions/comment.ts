'use server';

import { revalidatePath } from "next/cache";
import { CommentDeleteState } from "../schemas/comment";
import { deleteComment } from "../service/comment";

export async function deleteCommentAction(
    postId: number,
    commentId: number,
    prevState: CommentDeleteState
): Promise<CommentDeleteState> {
    try {
        await deleteComment(postId, commentId);
        revalidatePath(`/posts/${postId}`);
        return { success: true, error: undefined, fieldErrors: undefined, formData: undefined };
    } catch (error) {
        return {
            ...prevState,
            success: false,
            error: error instanceof Error ? error.message : "삭제 중 오류가 발생했습니다.",
        };
    }
}