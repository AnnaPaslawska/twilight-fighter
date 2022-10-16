import React, { useState } from 'react';
import { CreateUser } from './CreateUser';
import { UserState, setId, setName, setColor, setStat, selectCurrentUser } from '../domain/createUserSlice';
import { useAppDispatch, useAppSelector } from '../domain/hooks';
import { UserShipType, User, UserShip } from '../domain/interfaces';

import './StartPage.css';

export const StartPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(selectCurrentUser);
	const [isOpen, setOpen] = useState(false);
	const [users, setUser] = useState<User[]>([]);

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
			id: userData.userId || users.length,
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
		setUser(prevState => {
			const editedUserIndex = prevState.findIndex(user => user.id === userData.userId);
			const user = createUser(userData);

			if (editedUserIndex === -1) {
				return [...prevState, user];
			} else {
				const newState = [...prevState];
				newState.splice(editedUserIndex, 1, user);
				return newState;
			}
		});
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
							<div key={userIndex} className="user">
								<div className={`user-name user-color-${user.color}`}>
									<p>{user.name}</p>
									<button onClick={() => editUser(user)}>Edit</button>
								</div>
								<table className="user-ships">
									<thead>
										<tr>
											<th className="user-ships-header">Ship type</th>
											<th className="user-ships-header">Health</th>
											<th className="user-ships-header">Damage</th>
										</tr>
									</thead>
									<tbody>
									{user.ships.map((ship: UserShip, userShipIndex: number) => (
										<tr key={userShipIndex}>
											<td className="user-ships-cell">{ship.name}</td>
											<td className="user-ships-cell">{ship.health}</td>
											<td className="user-ships-cell">{ship.damage}</td>
										</tr>
									))}
									</tbody>
								</table>
							</div>
						))}
					</div>
				</>
			)}
		</>
	);
};