import { Comment } from "@/lib/schemas/comment";
import CommentDeleteButton from "./comment-delete";

export default function CommentDetail({ comment, postId 
}: { comment: Comment, postId: number}) {
    return (
        <li className="flex flex-col gap-2">
            <span>{comment.id} : </span>
            <span>{comment.content}</span>
            <CommentDeleteButton postId={postId} commentId={comment.id} />
        </li>
    );
}