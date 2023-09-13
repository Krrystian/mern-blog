import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Following from "../../components/Following";
import { Profile } from "../../components/Profile";
import Posts from "../../components/Posts";
const HomePage = () => {
  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();
  // Prevents user from accessing this page if not logged in
  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
  }, []);

  return (
    token && (
      <div className="max-w-screen">
        <Navbar />
        <Profile />
        <Following />
        <div className="flex justify-center flex-row pt-[100px]">
          <Posts />
        </div>
      </div>
    )
  );
};

export default HomePage;
