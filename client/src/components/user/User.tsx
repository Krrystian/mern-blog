import { BiUserMinus, BiUserPlus } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
interface UserProps {
  firstName: string;
  lastName: string;
  location?: string;
  image?: string;
  settings?: boolean;
  bigger?: boolean;
  friend?: boolean;
  isUser?: boolean;
  onClickSettings?: () => void;
  onClickUnfollow?: () => void;
  onClickProfile?: () => void;
}
const User: React.FC<UserProps> = ({
  firstName,
  lastName,
  location,
  image,
  friend,
  settings,
  bigger,
  isUser,
  onClickSettings,
  onClickProfile,
  onClickUnfollow,
}) => {
  return (
    <div className="flex items-center justify-between text-white/80 text-xl pb-3">
      <div className="flex gap-2 cursor-pointer" onClick={onClickProfile}>
        <img
          src={image}
          className="w-[30px] rounded-full h-[30px] flex self-center"
          alt=""
        />
        <div className="flex flex-col">
          <p
            className={
              bigger ? "text-2xl hover:text-white" : " hover:text-white"
            }
          >
            {firstName + " " + lastName}
          </p>
          {location && <p className="text-xs">{location}</p>}
        </div>
      </div>
      {settings ? (
        <FiSettings
          className="cursor-pointer"
          size={25}
          onClick={onClickSettings}
        />
      ) : friend ? (
        <BiUserMinus
          className="cursor-pointer"
          size={25}
          onClick={onClickUnfollow}
        />
      ) : !isUser ? (
        <BiUserPlus
          className="cursor-pointer"
          size={25}
          onClick={onClickUnfollow}
        />
      ) : null}
    </div>
  );
};

export default User;
