import { BiUserMinus } from "react-icons/bi";
interface UserProps {
  firstName: string;
  lastName: string;
  location?: string;
  image?: string;
  post?: boolean;
  onClickUnfollow?: () => void;
  onClickProfile?: () => void;
}
const User: React.FC<UserProps> = ({
  firstName,
  lastName,
  location,
  image,
  post,
  onClickProfile,
  onClickUnfollow,
}) => {
  if (!post) {
    return (
      <div className="flex items-center justify-between text-white/80 text-xl pb-3">
        <div
          className="flex gap-2 cursor-pointer hover:text-white"
          onClick={onClickProfile}
        >
          <img src={image} className="w-[30px] rounded-full h-[30px]" alt="" />
          <p>{firstName + " " + lastName}</p>
        </div>
        <BiUserMinus
          className="cursor-pointer"
          size={25}
          onClick={onClickUnfollow}
        />
      </div>
    );
  }
};

export default User;
