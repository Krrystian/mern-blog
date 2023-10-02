import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import { setPosts } from "../state";
import InfiniteScroll from "react-infinite-scroll-component";
interface PostsProps {
  profile?: boolean;
}
const Posts: React.FC<PostsProps> = ({ profile }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);
  const posts = useSelector((state: any) => state.auth.posts);
  const userId: string = useSelector((state: any) => state.auth.user._id);
  const filter = useSelector((state: any) => state.modal.post.searchBy);
  const [page, setPage] = useState<number>(-1);
  const [newData, setNewData] = useState<any>();
  const url = import.meta.env.VITE_API_URL;

  // FETCH POSTS ON MOUNT
  const fetchPosts = async () => {
    const link = profile
      ? `${url}/posts/${window.location.pathname.split("/")[2]}/posts`
      : `${url}/posts?filter=${filter}`;
    dispatch(setPosts({ posts: [] }));
    const res = await fetch(link, {
      headers: {
        "Cache-Control": "no-cache",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    dispatch(setPosts({ posts: data }));
    setNewData(data);
  };
  // INFINITE SCROLL FETCH
  const fetchMorePosts = async () => {
    const newPage = page + 1;
    setPage(newPage);
    const res = await fetch(`${url}/posts?page=${newPage}&filter=${filter}`, {
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
      setNewData(newData);
    }
  };
  useEffect(() => {
    setPage(0);
    fetchPosts();
  }, [filter]);
  return (
    <>
      <div className="w-full md:w-[40%] md:border-x-2 border-[#DC6A00] min-h-screen text-white">
        <InfiniteScroll
          dataLength={posts?.length || 0}
          next={fetchMorePosts}
          hasMore={newData?.length > 0}
          loader={
            <div className="w-full flex justify-center items-center text-3xl p-4 pb-8">
              Loading...
            </div>
          }
          endMessage={
            <div className="w-full flex justify-center items-center text-3xl p-4 pb-[100px] md:pb-8">
              Sorry, no more posts!
            </div>
          }
        >
          {posts?.length > 0 &&
            posts.map((post: any) => {
              console.log("POST" + post);
              return (
                <Post
                  key={post._id}
                  postId={post._id}
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
                  profile={profile}
                  comments={post.comments}
                />
              );
            })}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Posts;
