"use client";

import { updatePostAction } from "@/lib/actions/post";
import { PostUpdateState } from "@/lib/schemas/post";
import { useActionState } from "react";

const initialState: PostUpdateState = {
    error: undefined,
    fieldErrors: undefined,
    formData: undefined,
    success: undefined
  };

export default function PostUpdateForm({id} : {id: number}) {
    const [state, formAction, isPending] = useActionState(
        async (prevState: PostUpdateState, formData: FormData) => {
            return await updatePostAction(id, prevState, formData)
        }, initialState);

    return (
        <form action={formAction} className="flex flex-col gap-4">
            {state?.error && (
                <div className="p-3 bg-red-50 text-red-600 rounded text-sm">
                    {state.error}
                </div>
            )}

            {/* 제목 입력 */}
            <div>
                <input
                    type="text"
                    name="title"
                    defaultValue={state?.formData?.title}
                    className={`border rounded p-2 w-full ${state?.fieldErrors?.title ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="제목을 입력해주세요 (2-10 자)"
                />
                {state?.fieldErrors?.title && (
                    <p className="text-red-500 text-xs mt-1">{state.fieldErrors.title}</p>
                )}
            </div>

            {/* 내용 입력 */}
            <div>
                <textarea
                    rows={10}
                    name="content"
                    defaultValue={state?.formData?.content}
                    className={`border rounded p-2 w-full ${state?.fieldErrors?.content ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="내용을 입력해주세요 (2-100 자)"
                />
                {state?.fieldErrors?.content && (
                    <p className="text-red-500 text-xs mt-1">{state.fieldErrors.content}</p>
                )}
            </div>

            {/* 제출 버튼 */}
            <button
                type="submit"
                disabled={isPending}
                className="border rounded p-2 bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            >
                {isPending ? '작성 중...' : '작성'}
            </button>
        </form>
    );
}