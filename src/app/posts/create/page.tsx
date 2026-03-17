import PostCreateForm from "@/component/features/posts/post-create";

export default async function Write() {
    return (
        <>
            <h1>글 작성</h1>
            <PostCreateForm />
        </>
    );
}