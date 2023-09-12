import { useSelector } from "react-redux";
import User from "./user/User";
import { Details } from "./user/Details";
export const Profile = () => {
  const user = useSelector((state: any) => state.user);
  return (
    <div className="w-[30%] top-[100px] my-6 px-8 fixed">
      <div className="w-full min-h-[10%]"></div>
      <User
        firstName={user.firstName}
        lastName={user.lastName}
        image={user.picturePath}
        bigger
        settings
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
