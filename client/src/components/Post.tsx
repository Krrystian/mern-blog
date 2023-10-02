import { useDispatch, useSelector } from "react-redux";
import User from "./user/User";
import { BiBone, BiSolidBone, BiCommentDetail } from "react-icons/bi";
import { setFriends, setPost } from "../state";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData, postOpen, setSearchBy } from "../state/modal";
interface PostProps {
  id: string;
  postId?: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  desc?: string;
  image?: string;
  location?: string;
  likeAmount?: number;
  liked?: boolean;
  commentsAmount?: number;
  profile?: boolean;
  clickable?: boolean;
  comments?: any;
}
const Post: React.FC<PostProps> = ({
  id,
  postId,
  firstName,
  lastName,
  profilePicture,
  desc,
  image,
  location,
  liked = false,
  likeAmount = 0,
  commentsAmount = 0,
  profile,
  clickable = true,
  comments,
}) => {
  const userFriends = useSelector((state: any) => state.auth.user.friends);
  const token = useSelector((state: any) => state.auth.token);
  const userId = useSelector((state: any) => state.auth.user._id);
  const [like, setLike] = useState<boolean>(liked);
  const [likeValue, setLikeValue] = useState<number>(likeAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const fetchFriends = async () => {
    const friendList = await fetch(`${url}/users/${userId}/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (friendList.ok) {
      const data = await friendList.json();
      dispatch(setFriends({ friends: data }));
    }
  };

  // Update friends list
  const handleAction = async (id: string) => {
    const res = await fetch(`${url}/users/${userId}/${id}/`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      fetchFriends();
    }
  };

  // Like post
  const handleLike = async (e: any) => {
    const res = await fetch(`${url}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(setPost({ post: data }));
      setLike((prev) => !prev);
      setLikeValue((prev) => (like ? prev - 1 : prev + 1));
    }
  };
  return (
    <div
      className={
        (clickable ? "hover:bg-white/[0.08] p-6 " : null) +
        "w-full min-h-[150px]  overflow-hidden duration-500"
      }
    >
      <User
        firstName={firstName}
        lastName={lastName}
        image={profilePicture}
        location={location}
        friend={
          profile ? false : userFriends.some((friend: any) => friend._id === id)
        }
        isUser={profile ? true : id === userId}
        onClickUnfollow={() => handleAction(id)}
        onClickProfile={() => {
          window.scrollTo(0, 0);
          navigate(`/profile/${id}`);
          dispatch(setSearchBy({ searchBy: firstName + " " + lastName }));
        }}
      />
      <div
        className={
          clickable ? "max-h-[800px] cursor-pointer" : "max-h-[800px] "
        }
        onClick={() => {
          if (clickable) {
            dispatch(postOpen());
            dispatch(
              postData({
                data: {
                  id,
                  postId,
                  firstName,
                  lastName,
                  profilePicture,
                  desc,
                  image,
                  location,
                  liked,
                  likeAmount,
                  commentsAmount,
                },
                comments: comments,
              })
            );
          }
        }}
      >
        <p className="text-white/80 text-md">{desc}</p>
        {image && (
          <img
            className="object-cover w-full h-[500px] mt-3"
            src={image}
            alt=""
          />
        )}
      </div>
      <div className="mt-3 flex gap-1">
        {!like ? (
          <BiBone size={25} className="cursor-pointer" onClick={handleLike} />
        ) : (
          <BiSolidBone
            size={25}
            className="cursor-pointer"
            color="#DC6A00"
            onClick={handleLike}
          />
        )}
        <p className="text-white/80 cursor-default">{likeValue}</p>
        <BiCommentDetail size={25} className="cursor-pointer ml-3" />
        {commentsAmount > 0 && (
          <p className="text-white/80 cursor-default">{commentsAmount}</p>
        )}
      </div>
    </div>
  );
};

export default Post;
