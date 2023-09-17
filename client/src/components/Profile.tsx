import { useSelector, useDispatch } from "react-redux";
import User from "./user/User";
import { Details } from "./user/Details";
import { settingsOpen } from "../state/modal";
export const Profile = () => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <div className="w-[30%] top-[100px] my-6 px-8 fixed">
      <User
        firstName={user.firstName}
        lastName={user.lastName}
        image={user.picturePath}
        bigger
        settings
        onClickSettings={() => {
          dispatch(settingsOpen());
        }}
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
