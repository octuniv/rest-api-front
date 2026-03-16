"use client";
import { useEffect, useState } from "react";

interface Post {
    id: number;
    title: string;
}

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
      fetch("http://localhost:8080/api/v1/posts")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosts(data);
      })
      .catch(error => console.error(error));
    }, []);
    
      return (
        <ul className="flex flex-col gap-4">
          {posts && posts.length > 0 ? posts.map((post) => (
            <li key={post.id} className="p-2">{post.id}. {post.title}</li>
          )) : <li>EMPTY</li>}
        </ul>
      );
}