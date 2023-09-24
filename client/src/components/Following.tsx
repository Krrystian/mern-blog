import { useEffect } from "react";
import User from "./user/User";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state";
import { useNavigate } from "react-router-dom";
import { setSearchBy } from "../state/modal";
interface FollowingProps {
  profile?: boolean;
}

const Following: React.FC<FollowingProps> = ({ profile }) => {
  const userId = useSelector((state: any) => state.auth.user._id);
  const token = useSelector((state: any) => state.auth.token);
  const friends = useSelector((state: any) => state.auth.user.friends);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFollow = async (id: string) => {
    await fetch(`http://localhost:3001/users/${userId}/${id}/`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchFriends();
  };

  const fetchFriends = async () => {
    const friendList = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (friendList.ok) {
      const data = await friendList.json();
      dispatch(setFriends({ friends: data }));
    }
  };
  useEffect(() => {
    fetchFriends();
  }, []);
  type Friend = {
    _id: string;
    firstName: string;
    lastName: string;
    picturePath?: string;
  };

  return (
    <div
      className={
        !profile
          ? "hidden fixed w-[30%] right-0 text-[#DC6A00] md:flex justify-center top-[100px]"
          : "hidden fixed w-[30%] right-0 text-[#DC6A00] md:flex justify-center top-[350px]"
      }
    >
      <div className="w-full min-h-[10%]">
        <h1 className="text-2xl font-bold text-center my-6">Your following</h1>
        <div className="flex flex-col gap-4 px-8">
          {friends.length > 0 ? (
            friends.map(
              (
                { firstName, lastName, picturePath, _id }: Friend,
                index: number
              ) => {
                return (
                  <User
                    key={index}
                    firstName={firstName}
                    lastName={lastName}
                    image={picturePath}
                    friend={true}
                    onClickUnfollow={() => handleFollow(_id)}
                    onClickProfile={() => {
                      window.scrollTo(0, 0);
                      navigate(`/profile/${_id}`);
                      dispatch(
                        setSearchBy({ searchBy: firstName + " " + lastName })
                      );
                    }}
                  />
                );
              }
            )
          ) : (
            <p className="text-center text-xl text-white/80">
              You are not following anyone yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Following;
