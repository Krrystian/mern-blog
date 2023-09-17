import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Following from "../../components/Following";
import { Profile } from "../../components/Profile";
import Posts from "../../components/Posts";
import NewPost from "../../components/modals/NewPost";
import Settings from "../../components/modals/Settings";

const HomePage = () => {
  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();
  const openSettings = useSelector((state: any) => state.modal.settings.isOpen);
  const openNewPost = useSelector(
    (state: any) => state.modal.post.newPostIsOpen
  );
  // Prevents user from accessing this page if not logged in
  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
  }, []);

  return (
    token && (
      <>
        <div className="max-w-screen min-h-screen overflow-x-hidden">
          <NewPost open={openNewPost} />
          <Settings open={openSettings} />
          <Navbar />
          <Profile />
          <Following />
          <div className="flex justify-center flex-row pt-[100px]">
            <Posts />
          </div>
        </div>
      </>
    )
  );
};

export default HomePage;
