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

export type Comment = z.infer<typeof commentSchema>;
export type CommentDeleteState = ActionState<undefined>;