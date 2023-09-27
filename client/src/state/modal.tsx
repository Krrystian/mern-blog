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
    data: {},
    newPostIsOpen: false,
    searchBy: "",
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
} = modalSlice.actions;
export default modalSlice.reducer;
