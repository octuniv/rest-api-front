import { z } from 'zod';
import { ActionState } from './common';

export const commentSchema = z.object({
    id: z.number().int().positive(),
    content: z.string().min(1, '내용은 필수입니다'),
    createDate: z.coerce.date(),
    modifyDate: z.coerce.date(),
});

export const commentDeleteResSchema = z.object({
    msg: z.string(),
    resultCode: z.string(),
    data: z.unknown().optional().nullable(),
});

export const commentUpdateResSchema = z.object({
    msg: z.string(),
    resultCode: z.string(),
    data: z.null(),
});

export const commentWriteResSchema = z.object({
    msg: z.string(),
    resultCode: z.string(),
    data: z.object({
        commentDto: commentSchema
    }).optional().nullable()
});

export const createCommentSchema = z.object({
    content: z
        .string()
        .min(2, '내용은 2 자 이상이어야 합니다')
        .max(100, '내용은 100 자 이하여야 합니다'),
});

export const updateCommentSchema = createCommentSchema;

export type Comment = z.infer<typeof commentSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;

export type CommentDeleteState = ActionState<undefined>;
export type CommentCreateState = ActionState<{ content: string }>;
export type CommentUpdateState = ActionState<{ content: string }>;