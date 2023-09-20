import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  user: { friends: any } | null;
  userCopy: { friends: any } | null;
  token: string | null;
  posts: any;
}
const initialState: CounterState = {
  user: null,
  userCopy: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("user friends non-existant");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post: any) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setCopyUser: (state, action) => {
      state.userCopy = action.payload.user;
    },
    setUser: (state, action) => {
      state.user = state.userCopy;
    },
  },
});

export const {
  setFriends,
  setLogin,
  setLogout,
  setPost,
  setPosts,
  setCopyUser,
  setUser,
} = authSlice.actions;
export default authSlice.reducer;
