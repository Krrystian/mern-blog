import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Following from "../../components/Following";
import { Profile } from "../../components/Profile";
import Posts from "../../components/Posts";
import NewPost from "../../components/modals/NewPost";
import Settings from "../../components/modals/Settings";
import PostModal from "../../components/modals/PostModal";
import CommentModal from "../../components/modals/CommentModal";
import LoadingModal from "../../components/modals/LoadingModal";

const HomePage = () => {
  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();
  const openSettings = useSelector((state: any) => state.modal.settings.isOpen);
  const loading = useSelector((state: any) => state.modal.loading.isOpen);
  const openNewPost = useSelector(
    (state: any) => state.modal.post.newPostIsOpen
  );
  const commentOpen = useSelector(
    (state: any) => state.modal.post.isCommentOpen
  );
  const openPost = useSelector((state: any) => state.modal.post.isOpen);
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
          <PostModal open={openPost} />
          <Settings open={openSettings} />
          <CommentModal open={commentOpen} />
          <LoadingModal open={loading} />
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
