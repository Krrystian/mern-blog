import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { postClose } from "../../state/modal";
import Post from "../Post";
interface PostModalProps {
  open: boolean;
}
const PostModal: React.FC<PostModalProps> = ({ open }) => {
  const userId = useSelector((state: any) => state.auth.user._id);
  const data = useSelector((state: any) => state.modal.post.data) || {
    postId: "",
    userId: "",
    firstName: "",
    lastName: "",
    location: "",
    userPicturePath: "",
    description: "",
    picturePath: "",
    likes: {},
    comments: [],
  };
  const dispatch = useDispatch();
  const body = (
    <div className="flex flex-col mx-3 border-t-2 border-[#DC6A00] py-3">
      <Post
        postId={data.data.postId}
        id={data.data.id}
        firstName={data.data.firstName}
        lastName={data.data.lastName}
        location={data.data.location}
        profilePicture={data.data.profilePicture}
        desc={data.data.desc}
        image={data.data.image}
        likeAmount={data.data.likeAmount}
        liked={data.data.liked}
        commentsAmount={data.data.commentsAmount}
      />
    </div>
  );
  return (
    <div
      className={`fixed z-[50] w-full h-full ${
        open ? "translate-y-0 ease-out" : "translate-y-full ease-in"
      } duration-1000 bg-black/80 overflow-y-hidden flex justify-center items-center`}
    >
      <Modal
        heading="Post"
        body={body}
        close={() => {
          dispatch(postClose());
        }}
      />
    </div>
  );
};

export default PostModal;
