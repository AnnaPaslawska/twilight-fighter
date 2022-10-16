import React from 'react';
import { UserShipsComponent } from 'components/UserShipsComponent';
import { User } from 'domain/interfaces';

import './UserComponent.css';

interface UserComponentProps {
	user: User;
	onEditUser: (user: User) => void;
}

export const UserComponent: React.FC<UserComponentProps> = ({ user, onEditUser }) => {
	return (
		<div className="user">
			<div className={`user-name user-color-${user.color}`}>
				<p>{user.name}</p>
				<button onClick={() => onEditUser(user)}>Edit</button>
			</div>
			<UserShipsComponent userShips={user.ships} />
		</div>
	);
};