import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import { setPosts } from "../state";
import InfiniteScroll from "react-infinite-scroll-component";
const Posts = () => {
  const dispatch = useDispatch();
  const userId: string = useSelector((state: any) => state.auth.user._id);
  const token = useSelector((state: any) => state.auth.token);
  const posts = useSelector((state: any) => state.auth.posts);
  const [page, setPage] = useState<number>(-1);
  // FETCH POSTS ON MOUNT
  const fetchPosts = async () => {
    dispatch(setPosts({ posts: [] }));
    const res = await fetch(`http://localhost:3001/posts`, {
      headers: {
        "Cache-Control": "no-cache",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    dispatch(setPosts({ posts: data }));
  };
  // INFINITE SCROLL FETCH
  const fetchMorePosts = async () => {
    const newPage = page + 1;
    setPage(newPage);
    const res = await fetch(`http://localhost:3001/posts?page=${newPage}`, {
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
    }
  };
  useEffect(() => {
    setPage(0);
    fetchPosts();
  }, []);
  console.log(posts);
  return (
    <div className="w-[40%] border-x-2 border-[#DC6A00] min-h-screen text-white">
      <InfiniteScroll
        dataLength={posts?.length}
        next={fetchMorePosts}
        hasMore={posts?.length % 5 > 0 ? false : true}
        loader={
          <div className="w-full flex justify-center items-center text-3xl p-4 pb-8">
            Loading...
          </div>
        }
        endMessage={
          <div className="w-full flex justify-center items-center text-3xl p-4 pb-8">
            Sorry, no more posts!
          </div>
        }
      >
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
      </InfiniteScroll>
    </div>
  );
};

export default Posts;