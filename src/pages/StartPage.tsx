import React, { useState } from 'react';
import { CreateUser } from 'pages/CreateUser';
import { UserState, setId, setName, setColor, setStat, selectCurrentUser } from 'domain/createUserSlice';
import { selectUsers, selectUserById, addUser, updateUser } from 'domain/usersSlice';
import { useAppDispatch, useAppSelector } from 'domain/hooks';
import { UserShipType, User, UserShip } from 'domain/interfaces';
import { UserComponent } from 'components/UserComponent';

import './StartPage.css';

export const StartPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(selectCurrentUser);
	const users = useAppSelector(selectUsers);
	const [isOpen, setOpen] = useState(false);

	const openModal = () => {
		setOpen(true);
	};

	const createShip = (ship: UserShipType): UserShip => {
		return {
			shipTypeId: ship.id,
			name: ship.name,
			health: ship.health,
			damage: ship.damage
		};
	};

	const createShips = (shipTypes: UserShipType[]) => {
		let ships: UserShip[] = [];

		shipTypes.forEach((shipType: UserShipType) => {
			ships.push(...Array(shipType.amount).fill(createShip(shipType)));
		});

		return ships;
	};

	const createUser = (userData: UserState) => {
		const user = {
			id: userData.userId ?? users.length,
			name: userData.name,
			color: userData.color,
			ships: createShips(userData.shipTypes)
		};

		return user;
	};

	const editUser = (data: User) => {
		dispatch(setId(data.id));
		dispatch(setName(data.name));
		dispatch(setColor(data.color));
		currentUser.shipTypes.forEach((shipType: UserShipType) => {
			const ships = data.ships.filter((ship: UserShip) => ship.shipTypeId === shipType.id);
			if (!!ships.length) {
				dispatch(setStat({ id: shipType.id, field: 'amount', value: ships.length }));
				dispatch(setStat({ id: shipType.id, field: 'health', value: ships[0].health }));
				dispatch(setStat({ id: shipType.id, field: 'damage', value: ships[0].damage }));
			}
		});
		openModal();
	};

	const handleConfirm = (userData: UserState) => {
		const user = createUser(userData);
		const index = users.findIndex(existingUser: User => existingUser.id === user.id);

		if (index !== -1) {
			dispatch(updateUser({user, index}));
		} else {
			dispatch(addUser(user));
		}
		setOpen(false);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	return (
		<>
			<h1>Welcome to The Game!</h1>
			<button onClick={openModal}>Add Player</button>
			<button>Play</button>
			<CreateUser 
				isOpen={isOpen}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
			{!!users.length && (
				<>
					<h3>Current users:</h3>
					<div className="users">
						{users.map((user: User, userIndex: number) => (
							<UserComponent key={userIndex} user={user} onEditUser={editUser} />
						))}
					</div>
				</>
			)}
		</>
	);
};