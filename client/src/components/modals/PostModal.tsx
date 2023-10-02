import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { openComment, postClose, setSearchBy } from "../../state/modal";
import Post from "../Post";
import User from "../user/User";
import { useNavigate } from "react-router-dom";
interface PostModalProps {
  open: boolean;
}
const PostModal: React.FC<PostModalProps> = ({ open }) => {
  const navigate = useNavigate();
  const data = useSelector((state: any) => state.modal.post.data) || {
    data: {
      postId: "",
      id: "",
      firstName: "",
      lastName: "",
      location: "",
      profilePicture: "",
      desc: "",
      image: "",
      likes: {},
    },
    comments: [],
  };
  const dispatch = useDispatch();
  if (open) document.body.style.overflow = "hidden";
  const body = (
    <div className="flex flex-col mx-3 border-t-2 border-[#DC6A00] py-3">
      <Post
        postId={data.data?.postId || ""}
        id={data.data?.id || ""}
        firstName={data.data?.firstName || ""}
        lastName={data.data?.lastName || ""}
        location={data.data?.location || ""}
        profilePicture={data.data?.profilePicture || ""}
        desc={data.data?.desc || ""}
        image={data.data?.image || ""}
        likeAmount={data.data?.likeAmount || ""}
        liked={data.data?.liked || ""}
        commentsAmount={data.data?.commentsAmount || ""}
        clickable={false}
      />
      <div>
        <p className="text-xl text-[#DC6A00] w-full text-center my-6">
          Comments
        </p>
        <button
          className="w-full p-3 text-center text-white/80 bg-[#DC6A00] hover:bg-[#DC6A00]/60 duration-500 mb-6"
          onClick={() => dispatch(openComment())}
        >
          Add Comment
        </button>
        {data.comments.map((comment: any, index: number) => (
          <div className="mb-6" key={index}>
            <User
              firstName={comment.firstName}
              lastName={comment.lastName}
              image={comment.userPicturePath}
              settings={false}
              friend={false}
              isUser={true}
              onClickProfile={() => {
                navigate(`/profile/${comment.userId}`);
                dispatch(postClose());
              }}
            />
            <p className="text-white/80">{comment.comment}</p>
          </div>
        ))}
      </div>
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
