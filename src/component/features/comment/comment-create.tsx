'use client';

import { CommentCreateState } from '@/lib/schemas/comment';
import { createCommentAction } from '@/lib/actions/comment';
import { useActionState, useCallback } from 'react';

interface Props {
    postId: number;
}

const initialState: CommentCreateState = {
    success: false,
    error: undefined,
    fieldErrors: undefined,
    formData: undefined,
};

export default function CommentCreateForm({ postId }: Props) {
    const boundAction = useCallback(
        (prevState: CommentCreateState, formData: FormData) => 
            createCommentAction(postId, prevState, formData),
        [postId]
    );
    
    const [state, formAction, isPending] = useActionState(
        boundAction,
        initialState
    );

    return (
        <form action={formAction} className="mt-4 flex flex-col gap-2 border-t pt-4">
            <textarea
                name="content"
                placeholder="댓글을 입력하세요..."
                className="w-full rounded border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                defaultValue={state.formData?.content}
            />
            
            {state.error && (
                <p className="text-sm text-red-500">{state.error}</p>
            )}
            
            {state.fieldErrors?.content && (
                <p className="text-sm text-red-500">{state.fieldErrors.content}</p>
            )}

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    disabled={isPending}
                >
                    {isPending ? "등록 중..." : "작성하기"}
                </button>
            </div>
        </form>
    );
}