import { createSlice } from '@reduxjs/toolkit';
import { SHIP_TYPES } from 'domain/constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'domain/store';
import type { ShipType, UserShipType } from 'domain/interfaces';

export interface UserState {
	userId: number | undefined;
	name: string;
	color: string;
	shipTypes: UserShipType[];
}

const initialState: UserState = {
	userId: undefined,
	name: '',
	color: 'transparent',
	shipTypes: SHIP_TYPES.map((shipType: ShipType, index: number) => ({
		id: index,
		...shipType,
		amount: 0
	}))
};

export const createUserSlice = createSlice({
	name: 'createUser',
	initialState,
	reducers: {
		setId: (state, action: PayloadAction<number>) => {
			state.userId = action.payload;
		},
		setName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		setColor: (state, action: PayloadAction<string>) => {
			state.color = action.payload;
		},
		setStat: (state, action: PayloadAction<{id: number, field: string, value: number}>) => {
			const { id, field, value } = action.payload;
			const shipType = state.shipTypes.find((shipType: UserShipType) => shipType.id === id);
			
			if (shipType) {
				shipType[field] = value;
			}
		},
		clearState: (state) => {
			state.userId = initialState.userId;
			state.name = initialState.name;
			state.color = initialState.color;
			state.shipTypes = initialState.shipTypes;
		}
	}
});

export const { setId, setName, setColor, setStat, clearState } = createUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.createUser;

export default createUserSlice.reducer;