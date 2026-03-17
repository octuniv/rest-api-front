// lib/actions/post.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createPost, deletePost, updatePost } from '../service/post';
import { PostCreateState } from '../schemas/post';

export async function createPostAction(prevState: PostCreateState, formData: FormData

): Promise<PostCreateState> {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
  
    const result = await createPost({ title, content });
  
    if (!result.success) {
      return {
        error: result.error,
        fieldErrors: result.fieldErrors,
        formData: { title, content }
      };
    }
  
    // 성공 시 캐시 무효화 및 리다이렉트
    revalidatePath('/posts');
    redirect(`/posts/${result.data!.id}`);
  }

export async function updatePostAction(id: number, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    console.log(title);
    console.log(content);

    await updatePost(id, { title, content });

    revalidatePath('/posts');
    revalidatePath(`/posts/${id}`);
    redirect(`/posts/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function deletePostAction(id: number) {
  try {
    await deletePost(id);
    revalidatePath('/posts');
    revalidatePath(`/posts/${id}`);
  } catch (error) {
    throw error;
  }
}