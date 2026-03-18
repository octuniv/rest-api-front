'use server';

import { Comment, commentSchema } from "../schemas/comment";
import { z } from 'zod';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCommentList(postId : number): Promise<Comment[]> {
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