import { useSelector, useDispatch } from "react-redux";
import User from "./user/User";
import { Details } from "./user/Details";
import { settingsOpen } from "../state/modal";
import { useEffect, useState } from "react";
import { setFriends } from "../state";
interface ProfileProps {
  profile?: boolean;
}
export const Profile: React.FC<ProfileProps> = ({ profile }) => {
  const loggedUser = useSelector((state: any) => state.auth.user);
  const [user, setUser] = useState<any>(loggedUser);
  const userId = useSelector((state: any) => state.auth.user._id);
  const token = useSelector((state: any) => state.auth.token);
  const userFriends = useSelector((state: any) => state.auth.user.friends);
  const searchBy = useSelector((state: any) => state.modal.post.searchBy);
  const dispatch = useDispatch();
  const url = import.meta.env.VITE_API_URL;
  const fetchProfile = async () => {
    let res: Response;
    if (profile) {
      res = await fetch(
        `${url}/users/${window.location.pathname.split("/")[2]}`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Authorization: "Bearer " + token,
          },
        }
      );
    } else {
      res = await fetch(`${url}/users/${userId}`, {
        headers: {
          "Cache-Control": "no-cache",
          Authorization: "Bearer " + token,
        },
      });
    }
    const response = await res.json();
    setUser(response);
  };

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
  const handleAction = async (id: string) => {
    const res = await fetch(`${url}/users/${userId}/${id}/`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      fetchFriends();
    }
  };
  useEffect(() => {
    fetchProfile();
    console.log("ok");
  }, [searchBy, loggedUser]);
  return (
    <div
      className={
        profile
          ? "w-full md:w-[30%] top-[100px] pt-[120px] md:pt-0 right-0 md:my-6 py-5 px-4 md:px-8 md:fixed flex flex-col md:border-none border-b-2 border-[#DC6A00]"
          : "hidden w-[30%] top-[100px] my-6 px-8 fixed md:flex flex-col"
      }
    >
      <User
        firstName={user.firstName}
        lastName={user.lastName}
        image={user.picturePath}
        bigger
        settings={profile ? false : true}
        onClickSettings={() => {
          dispatch(settingsOpen());
        }}
        isUser={user._id === userId}
        friend={userFriends.some((friend: any) => friend._id === user._id)}
        onClickUnfollow={() => handleAction(user._id)}
      />
      <Details
        location={user.location}
        occupation={user.occupation}
        visits={user.viewedProfile}
        food={user.impressions}
      />
    </div>
  );
};
