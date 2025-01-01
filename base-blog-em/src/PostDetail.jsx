import { useQuery } from "react-query"

import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isError, error, isLoading } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id), 
    {
      staleTime: 2000,
    }
  );

  // TODO DRY
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>
      <p>Error happened!</p>
      <p>{error.toString()}</p>
    </div>;
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
