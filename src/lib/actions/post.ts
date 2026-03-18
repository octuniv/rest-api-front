// lib/actions/post.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createPost, deletePost, updatePost } from '../service/post';
import { PostCreateState, PostDeleteState, PostUpdateState } from '../schemas/post';

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

export async function updatePostAction(id: number, prevState: PostUpdateState, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    const result = await updatePost(id, { title, content });

    if (!result.success) {
      return {
        error: result.error,
        fieldErrors: result.fieldErrors,
        formData: { title, content },
        success: false
      };
    }
  } catch (error) {
    return {
      ...prevState,
      success: false,
      error: error instanceof Error ? error.message : "삭제 중 오류가 발생했습니다.",
    };
  }

  revalidatePath('/posts');
  revalidatePath(`/posts/${id}`);
  redirect(`/posts/${id}`);
}

export async function deletePostAction(
  id: number,
  prevState: PostDeleteState
): Promise<PostDeleteState> {
  try {
    await deletePost(id);
    revalidatePath("/posts");
    revalidatePath(`/posts/${id}`);
    return { success: true, error: undefined, fieldErrors: undefined, formData: undefined };
  } catch (error) {
    return {
      ...prevState,
      success: false,
      error: error instanceof Error ? error.message : "삭제 중 오류가 발생했습니다.",
    };
  }
}