import { createSlice } from "@reduxjs/toolkit";
interface CounterState {
  settings: {
    isOpen: boolean;
  };
  post: {
    isOpen: boolean;
    data: any;
    newPostIsOpen: boolean;
    searchBy: string;
    isCommentOpen: boolean;
  };
  follower: {
    isOpen: boolean;
  };
}
const initialState: CounterState = {
  settings: {
    isOpen: false,
  },
  post: {
    isOpen: false,
    data: { comments: [] },
    newPostIsOpen: false,
    searchBy: "",
    isCommentOpen: false,
  },
  follower: {
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
} = modalSlice.actions;
export default modalSlice.reducer;
