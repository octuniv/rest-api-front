'use server';

import { Comment, commentSchema, commentUpdateResSchema, commentWriteResSchema, CreateCommentInput, createCommentSchema, UpdateCommentInput, updateCommentSchema } from "../schemas/comment";
import { z } from 'zod';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCommentList(postId: number): Promise<Comment[]> {
    const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
        next: { revalidate: 20 },
        headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch comments: ${res.status}`);
    }

    const data = await res.json();

    return z.array(commentSchema).parse(data);
}

export async function deleteComment(postId: number, commentId: number) {
    const res = await fetch(`${API_URL}/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error(`Failed to delete comment: ${res.status}`);
    }
}

export async function updateComment(postId: number, commentId: number, input: UpdateCommentInput
): Promise<{ success: boolean;  error?: string; fieldErrors?: Record<string, string> }> {
    const validated = updateCommentSchema.safeParse(input);

    if (!validated.success) {
        const fieldErrors = validated.error.issues.reduce((acc, issue) => {
            const field = issue.path.join('.');
            acc[field] = issue.message;
            return acc;
        }, {} as Record<string, string>);

        return {
            success: false,
            error: '입력값을 확인해주세요',
            fieldErrors
        };
    }

    try {
        const res = await fetch(`${API_URL}/posts/${postId}/comments/${commentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validated.data),
        });

        if (!res.ok) {
            throw new Error(`Failed to update comment: ${res.status}`);
        }

        const response = await res.json();

        const parsed = commentUpdateResSchema.parse(response);
        if (!parsed.msg) throw new Error('Invalid response format');
        return {success:true};
    } catch (error) {
        console.error('[CommentService] updateComment error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : '댓글 수정에 실패했습니다'
        };
    }
}

export async function createComment(postId: number, input: CreateCommentInput
): Promise<{ success: boolean; data?: Comment; error?: string; fieldErrors?: Record<string, string> }> {
    const validated = createCommentSchema.safeParse(input);

    if (!validated.success) {
        const fieldErrors = validated.error.issues.reduce((acc, issue) => {
            const field = issue.path.join('.');
            acc[field] = issue.message;
            return acc;
        }, {} as Record<string, string>);

        return {
            success: false,
            error: '입력값을 확인해주세요',
            fieldErrors
        };
    }

    try {
        const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validated.data),
        });

        if (!res.ok) {
            throw new Error(`Failed to create comment: ${res.status}`);
        }

        const response = await res.json();
        const parsed = commentWriteResSchema.parse(response);
        if (!parsed.data?.commentDto) throw new Error('Invalid response format');
        return {success:true, data: commentSchema.parse(parsed.data.commentDto)};
    } catch (error) {
        console.error('[CommentService] createComment error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : '댓글 생성에 실패했습니다'
        };
    }
}