import { z } from 'zod';

export const postResponseSchema = z.object({
    id: z.number().int().positive(),
    title: z.string().min(1, '제목은 필수입니다'),
    content: z.string().min(1, '내용은 필수입니다'),
    createDate: z.coerce.date(), 
    modifyDate: z.coerce.date(),
  });

export type Post = z.infer<typeof postResponseSchema>;