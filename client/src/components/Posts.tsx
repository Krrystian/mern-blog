import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import { setPosts } from "../state";
const Posts = () => {
  const dispatch = useDispatch();
  const userId: string = useSelector((state: any) => state.user._id);
  const token = useSelector((state: any) => state.token);
  const posts = useSelector((state: any) => state.posts);

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:3001/posts", {
      headers: {
        "Cache-Control": "no-cache",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    if (posts && Array.isArray(posts)) {
      const newData = data.filter((newPost: any) => {
        return !posts.some((p: any) => p._id === newPost._id);
      });
      if (newData.length > 0)
        dispatch(setPosts({ posts: [...posts, ...newData] }));
      //console.log(posts);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="w-[40%] border-x-2 border-[#DC6A00] min-h-screen text-white">
      {posts?.length > 0 &&
        posts.map((post: any) => {
          return (
            <Post
              key={post._id}
              id={post.userId}
              firstName={post.firstName}
              lastName={post.lastName}
              location={post.location}
              profilePicture={post.userPicturePath}
              desc={post.description}
              image={post.picturePath}
              likeAmount={Object.keys(post.likes).length}
              liked={post.likes[userId]}
              commentsAmount={post.comments.length}
            />
          );
        })}
    </div>
  );
};

export default Posts;
