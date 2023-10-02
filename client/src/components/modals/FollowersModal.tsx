import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { followerClose, setSearchBy } from "../../state/modal";
import { useEffect } from "react";
import { setFriends } from "../../state";
import User from "../user/User";
import { useNavigate } from "react-router-dom";
interface FollowersModalProps {
  open: boolean;
}

const FollowersModal: React.FC<FollowersModalProps> = ({ open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state: any) => state.auth.user._id);
  const token = useSelector((state: any) => state.auth.token);
  const friends = useSelector((state: any) => state.auth.user.friends);
  const url = import.meta.env.VITE_API_URL;

  type Friend = {
    _id: string;
    firstName: string;
    lastName: string;
    picturePath?: string;
  };
  useEffect(() => {
    fetchFriends();
  }, []);

  const handleFollow = async (id: string) => {
    await fetch(`${url}/users/${userId}/${id}/`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchFriends();
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
  const body = (
    <div className=" text-[#DC6A00] flex justify-center mx-3 py-6 border-t-2 border-[#DC6A00]">
      <div className="w-full">
        <div className="flex flex-col gap-4">
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
                    onClickProfile={() => {
                      window.scrollTo(0, 0);
                      navigate(`/profile/${_id}`);
                      dispatch(
                        setSearchBy({ searchBy: firstName + " " + lastName })
                      );
                      dispatch(followerClose());
                    }}
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

  return (
    <div
      className={`fixed z-50 w-full h-full ${
        open ? "translate-y-0 ease-out" : "translate-y-full ease-in"
      } duration-1000 bg-black/80 overflow-y-hidden flex justify-center items-center`}
    >
      <Modal
        heading="Your followers"
        body={body}
        close={() => {
          dispatch(followerClose());
        }}
      />
    </div>
  );
};

export default FollowersModal;
