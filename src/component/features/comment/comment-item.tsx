'use client';

import { Comment, CommentUpdateState } from "@/lib/schemas/comment";
import CommentDeleteButton from "./comment-delete";
import { useActionState, useCallback, useEffect, useState } from "react";
import { updateCommentAction } from "@/lib/actions/comment";
import clsx from "clsx";

interface Props {
    comment: Comment;
    postId: number;
}

const initialState: CommentUpdateState = {
    success: false,
    error: undefined,
    fieldErrors: undefined,
    formData: undefined,
};

export default function CommentItem({ comment, postId }: Props) {
    const [isEditing, setIsEditing] = useState(false);

    const boundAction = useCallback(
        (prevState: CommentUpdateState, formData: FormData) => 
            updateCommentAction(postId, comment.id, prevState, formData),
        [postId, comment.id]
    );

    const [state, formAction, isPending] = useActionState(
        boundAction,
        initialState
    );

    useEffect(() => {
        if (state?.success === true) {
            setIsEditing(false);
        }
    }, [state?.success]);

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <li className="flex flex-col gap-2 rounded border p-3 bg-gray-50">
                <form action={formAction} className="flex flex-col gap-2">
                    <textarea
                        name="content"
                        defaultValue={state.formData?.content || comment.content}
                        className="w-full rounded border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    />

                    {state.error && <p className="text-xs text-red-500">{state.error}</p>}
                    {state.fieldErrors?.content && (
                        <p className="text-xs text-red-500">{state.fieldErrors.content}</p>
                    )}

                    <div className="flex gap-2 justify-end">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className={clsx(
                                "border-2 p-2 rounded text-sm font-medium",
                                "bg-gray-50 border-gray-200 text-gray-700",
                                "hover:bg-gray-100"
                            )}>
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                        >
                            {isPending ? "저장 중..." : "저장"}
                        </button>
                    </div>
                </form>
            </li>
        );
    }

    // 보기 모드
    return (
        <li className="flex flex-col gap-2 rounded border p-3">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500">ID: {comment.id}</span>
                    <span className="text-sm whitespace-pre-wrap">{comment.content}</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsEditing(true)}
                        className={clsx(
                            "border-2 p-2 rounded text-sm font-medium",
                            "bg-gray-50 border-gray-200 text-gray-700",
                            "hover:bg-gray-100"
                        )}
                    >
                        수정
                    </button>
                    <CommentDeleteButton postId={postId} commentId={comment.id} />
                </div>
            </div>
        </li>
    );
}