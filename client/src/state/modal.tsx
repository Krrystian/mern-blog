import { createSlice } from "@reduxjs/toolkit";
interface CounterState {
  settings: {
    isOpen: boolean;
  };
  post: {
    isOpen: boolean;
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
      state.settings.isOpen = true;
    },
    settingsClose: (state) => {
      state.settings.isOpen = false;
    },
    postOpen: (state) => {
      state.post.isOpen = true;
    },
    postClose: (state) => {
      state.post.isOpen = false;
    },
    followerOpen: (state) => {
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
} = modalSlice.actions;
export default modalSlice.reducer;
