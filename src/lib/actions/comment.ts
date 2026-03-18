'use server';

import { revalidatePath } from "next/cache";
import { CommentCreateState, CommentDeleteState, CommentUpdateState } from "../schemas/comment";
import { createComment, deleteComment, updateComment } from "../service/comment";
import { redirect } from 'next/navigation';

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

export async function updateCommentAction(
    postId: number,
    commentId: number,
    prevState: CommentUpdateState,
    formData: FormData
): Promise<CommentUpdateState> {
    try {
        const content = formData.get('content') as string;
        const result = await updateComment(postId, commentId, { content });
        if (!result.success) {
            return {
                error: result.error,
                fieldErrors: result.fieldErrors,
                formData: { content },
                success: false
            };
        }
    } catch (error) {
        return {
            ...prevState,
            success: false,
            error: error instanceof Error ? error.message : "수정 중 오류가 발생했습니다.",
        }
    }

    revalidatePath(`/posts/${postId}`);
    return { 
        success: true, 
        error: undefined, 
        fieldErrors: undefined, 
        formData: undefined 
    };
}

export async function createCommentAction(postId: number, prevState: CommentCreateState, formData: FormData

): Promise<CommentCreateState> {
    const content = formData.get('content') as string;

    const result = await createComment(postId, { content });
    if (!result.success) {
        return {
            error: result.error,
            fieldErrors: result.fieldErrors,
            formData: { content }
        };
    }

    revalidatePath(`/posts/${postId}`);
    redirect(`/posts/${postId}`);
}