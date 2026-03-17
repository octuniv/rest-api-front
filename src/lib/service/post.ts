'use server';

import { postResponseSchema, type Post } from '@/lib/schemas/post';
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
  
  return z.array(postResponseSchema).parse(data);
}

export async function getPostDetail(id: string): Promise<Post> {
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid post ID');
  }

  const res = await fetch(`${API_URL}/posts/${id}`, {
    next: { revalidate: 60 },
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    if (res.status === 404) throw new Error('Post not found');
    throw new Error(`Failed to fetch post: ${res.status}`);
  }

  const data = await res.json();
  
  return postResponseSchema.parse(data);
}