import { Comment } from "@/lib/schemas/comment";
import CommentDetail from "./comment-detail";

export default function CommentList({ comments, postId

}: { comments: Comment[], postId: number }) {
    return (
        <>
            <h2 className="p-2">댓글 목록</h2>

            {comments.length === 0 && <div>댓글이 없습니다.</div>}

            {comments.length > 0 && (
                <ul className="flex flex-col gap-2">
                    {comments.map((comment) => (
                        <CommentDetail key={comment.id} comment={comment} postId={postId} />
                    ))}
                </ul>
            )}
        </>
    );
}