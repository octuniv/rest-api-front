import { z } from 'zod';
import { ActionState } from './common';

export const postSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1, '제목은 필수입니다'),
  content: z.string().min(1, '내용은 필수입니다'),
  createDate: z.coerce.date(),
  modifyDate: z.coerce.date(),
});

export const postWriteResSchema = z.object({
  msg: z.string(),
  resultCode: z.string(),
  data: z.object({
    postDto: postSchema,
    postsCount: z.number(),
  }).optional().nullable(),
});


export const postModifyResSchema =  z.object({
  msg: z.string(),
  resultCode: z.string(),
  data: z.object({
    postDto: postSchema,
  }).optional().nullable(),
});

export const postDeleteResSchema = z.object({
  msg: z.string(),
  resultCode: z.string(),
  data: z.unknown().optional().nullable(),
});

export const createPostSchema = z.object({
  title: z
    .string()
    .min(2, '제목은 2 자 이상이어야 합니다')
    .max(10, '제목은 10 자 이하여야 합니다'),
  content: z
    .string()
    .min(2, '내용은 2 자 이상이어야 합니다')
    .max(100, '내용은 100 자 이하여야 합니다'),
});

export const updatePostSchema = createPostSchema;

export type Post = z.infer<typeof postSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type PostWriteRes = z.infer<typeof postWriteResSchema>;
export type PostModifyRes = z.infer<typeof postModifyResSchema>;
export type PostDeleteRes = z.infer<typeof postDeleteResSchema>;

export type PostCreateState = ActionState<{ title: string; content: string }>;
export type PostDeleteState = ActionState<undefined>;
export type PostUpdateState = ActionState<{ title: string; content: string }>;