import { createSlice } from "@reduxjs/toolkit";
interface CounterState {
  settings: {
    isOpen: boolean;
  };
  post: {
    isOpen: boolean;
    newPostIsOpen: boolean;
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
    newPostIsOpen: false,
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
      state.settings.isOpen = false;
    },
    postOpen: (state) => {
      document.body.style.overflow = "hidden";
      state.post.isOpen = true;
    },
    postClose: (state) => {
      state.post.isOpen = false;
    },
    newPostOpen: (state) => {
      document.body.style.overflow = "hidden";
      state.post.newPostIsOpen = true;
    },
    newPostClose: (state) => {
      document.body.style.overflow = "auto";
      state.post.newPostIsOpen = false;
    },
    followerOpen: (state) => {
      document.body.style.overflow = "hidden";
      state.follower.isOpen = true;
    },
    followerClose: (state) => {
      state.follower.isOpen = false;
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
} = modalSlice.actions;
export default modalSlice.reducer;
