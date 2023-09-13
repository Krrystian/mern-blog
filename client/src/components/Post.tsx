import { useSelector } from "react-redux";
import User from "./user/User";
import { BiBone, BiSolidBone, BiCommentDetail } from "react-icons/bi";
interface PostProps {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  desc?: string;
  image?: string;
  location?: string;
  liked?: boolean;
  likeAmount?: number;
  commentsAmount?: number;
}
const Post: React.FC<PostProps> = ({
  id,
  firstName,
  lastName,
  profilePicture,
  desc,
  image,
  location,
  liked,
  likeAmount = 0,
  commentsAmount = 0,
}) => {
  const userFriends = useSelector((state: any) => state.user.friends);

  return (
    <div className="w-full min-h-[300px] p-6 overflow-hidden">
      <User
        firstName={firstName}
        lastName={lastName}
        image={profilePicture}
        location={location}
        friend={userFriends.some((friend: any) => friend._id === id)}
      />
      <div className="max-h-[800px]">
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
        {!liked ? (
          <BiBone size={25} className="cursor-pointer" />
        ) : (
          <BiSolidBone size={25} className="cursor-pointer" color="#DC6A00" />
        )}
        {likeAmount > 0 && (
          <p className="text-white/80 cursor-default">{likeAmount}</p>
        )}
        <BiCommentDetail size={25} className="cursor-pointer ml-3" />
        {commentsAmount > 0 && (
          <p className="text-white/80 cursor-default">{commentsAmount}</p>
        )}
      </div>
    </div>
  );
};

export default Post;
