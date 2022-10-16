import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'domain/store';
import { User } from 'domain/interfaces';

const initialState: User[] = [];

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUser: (state, action: PayloadAction<User>) => {
			state.push(action.payload);
		},
		updateUser: (state, action: PayloadAction<{user: User, index: number}>) => {
			const { index, user } = action.payload;
			state.splice(index, 1, user);
		}
	}
});

export const { addUser, updateUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;
export const selectUserId = (state: User[], id: number) => id;
export const selectUserById = createSelector(
	[selectUsers, selectUserId],
	(users, userId) => users[userId]
);

export default usersSlice.reducer;