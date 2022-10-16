import { configureStore } from '@reduxjs/toolkit';
import createUser from 'domain/createUserSlice';
import users from 'domain/usersSlice';

export const store = configureStore({
  reducer: {
    users,
    createUser
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;