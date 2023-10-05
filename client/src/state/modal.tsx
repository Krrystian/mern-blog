import { createSlice } from "@reduxjs/toolkit";
interface CounterState {
  settings: {
    isOpen: boolean;
  };
  post: {
    isOpen: boolean;
    data: {
      postId: string;
      id: string;
      firstName: string;
      lastName: string;
      location: string;
      profilePicture: string;
      desc: string;
      image: string;
      likes: {};
      comments: [
        {
          id: string;
          firstName: string;
          lastName: string;
          userPicturePath: string;
          comment: string;
        }
      ];
    };
    newPostIsOpen: boolean;
    searchBy: string;
    isCommentOpen: boolean;
  };
  follower: {
    isOpen: boolean;
  };
  loading: {
    isOpen: boolean;
  };
}
const initialState: CounterState = {
  settings: {
    isOpen: false,
  },
  post: {
    isOpen: false,
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
      comments: [
        {
          id: "",
          firstName: "",
          lastName: "",
          userPicturePath: "",
          comment: "",
        },
      ],
    },
    newPostIsOpen: false,
    searchBy: "",
    isCommentOpen: false,
  },
  follower: {
    isOpen: false,
  },
  loading: {
    isOpen: false,
  },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    settingsOpen: (state) => {
      document.body.style.overflow = "hidden";
      state.settings.isOpen = true;
    },
    settingsClose: (state) => {
      document.body.style.overflow = "auto";
      state.settings.isOpen = false;
    },
    postOpen: (state) => {
      document.body.style.overflow = "hidden";
      state.post.isOpen = true;
    },
    postClose: (state) => {
      document.body.style.overflow = "auto";
      state.post.isOpen = false;
    },
    postData: (state, action) => {
      state.post.data = action.payload;
    },
    addPostData: (state, action) => {
      state.post.data.comments.push(action.payload);
    },
    newPostOpen: (state) => {
      document.body.style.overflow = "hidden";
      state.post.newPostIsOpen = true;
    },
    newPostClose: (state) => {
      document.body.style.overflow = "auto";
      state.post.newPostIsOpen = false;
    },
    openComment: (state) => {
      document.body.style.overflow = "hidden";
      state.post.isCommentOpen = true;
    },
    closeComment: (state) => {
      document.body.style.overflow = "auto";
      state.post.isCommentOpen = false;
    },
    followerOpen: (state) => {
      document.body.style.overflow = "hidden";
      state.follower.isOpen = true;
    },
    followerClose: (state) => {
      document.body.style.overflow = "auto";
      state.follower.isOpen = false;
    },
    setSearchBy: (state, action) => {
      state.post.searchBy = action.payload.searchBy;
    },
    loadingOpen: (state) => {
      state.loading.isOpen = true;
    },
    loadingClose: (state) => {
      state.loading.isOpen = false;
    },
  },
});

export const {
  settingsClose,
  settingsOpen,
  postClose,
  postOpen,
  followerClose,
  followerOpen,
  newPostOpen,
  newPostClose,
  setSearchBy,
  postData,
  openComment,
  closeComment,
  addPostData,
  loadingOpen,
  loadingClose,
} = modalSlice.actions;
export default modalSlice.reducer;
