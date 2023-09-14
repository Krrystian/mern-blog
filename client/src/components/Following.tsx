import { useEffect } from "react";
import User from "./user/User";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state";

const Following = () => {
  const userId = useSelector((state: any) => state.auth.user._id);
  const token = useSelector((state: any) => state.auth.token);
  const friends = useSelector((state: any) => state.auth.user.friends);
  const dispatch = useDispatch();

  const handleFollow = async (id: string) => {
    const res = await fetch(`http://localhost:3001/users/${userId}/${id}/`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      window.scrollTo(0, 0); // Scroll to top to prevent infinite scroll from triggering
      window.location.reload();
    }
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
    <div className="fixed w-[30%] right-0 top-[100px] text-[#DC6A00] flex justify-center">
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
