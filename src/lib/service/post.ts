'use server';

import { CreatePostInput, createPostSchema, postModifyResSchema, postSchema, PostUpdateState, postWriteResSchema, UpdatePostInput, updatePostSchema, type Post } from '@/lib/schemas/post';
import { z } from 'zod';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPostList(): Promise<Post[]> {
    const res = await fetch(`${API_URL}/posts`, {
        next: { revalidate: 60 },
        headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.status}`);
    }

    const data = await res.json();

    return z.array(postSchema).parse(data);
}

export async function getPostDetail(id: number): Promise<Post> {
    const res = await fetch(`${API_URL}/posts/${id}`, {
        next: { revalidate: 60 },
        headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
        if (res.status === 404) throw new Error('Post not found');
        throw new Error(`Failed to fetch post: ${res.status}`);
    }

    const data = await res.json();

    return postSchema.parse(data);
}

export async function createPost(input: CreatePostInput): Promise<{ success: boolean; data?: Post; error?: string; fieldErrors?: Record<string, string> }> {
    // 1. 입력값 검증 (safeParse 사용)
    const validated = createPostSchema.safeParse(input);

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
        // 2. 외부 API 호출
        const res = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validated.data),
        });

        if (!res.ok) {
            throw new Error(`Failed to create post: ${res.status}`);
        }

        const response = await res.json();

        // 3. 응답 데이터 검증
        const parsed = postWriteResSchema.parse(response);
        if (!parsed.data?.postDto) throw new Error('Invalid response format');

        return { success: true, data: postSchema.parse(parsed.data.postDto) };
    } catch (error) {
        console.error('[PostService] createPost error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : '게시글 생성에 실패했습니다'
        };
    }
}


export async function updatePost(id: number, input: UpdatePostInput
): Promise<{ success: boolean; data?: Post; error?: string; fieldErrors?: Record<string, string> }> {
    const validated = updatePostSchema.safeParse(input);

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
        const res = await fetch(`${API_URL}/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validated.data),
        });
    
        if (!res.ok) {
            throw new Error(`Failed to update post: ${res.status}`);
        }
    
        const response = await res.json();
    
        const parsed = postModifyResSchema.parse(response);
        if (!parsed.data?.postDto) throw new Error('Invalid response format');
    
        return { success: true, data: postSchema.parse(parsed.data.postDto) };
    } catch (error) {
        console.error('[PostService] updatePost error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : '게시글 수정에 실패했습니다'
        };
    }
}

export async function deletePost(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error(`Failed to delete post: ${res.status}`);
    }
}