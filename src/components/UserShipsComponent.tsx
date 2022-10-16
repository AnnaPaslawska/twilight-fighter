import React from 'react';
import { UserShipComponent } from 'components/UserShipComponent';
import { UserShip } from 'domain/interfaces';

import './UserShipsComponent.css';

interface UserShipsComponentProps {
	userShips: UserShip[];
}

export const UserShipsComponent: React.FC<UserShipsComponentProps> = ({ userShips }) => {
	return (
		<table className="user-ships">
			<thead>
				<tr>
					<th className="user-ships-header">Ship type</th>
					<th className="user-ships-header">Health</th>
					<th className="user-ships-header">Damage</th>
				</tr>
			</thead>
			<tbody>
			{userShips.map((ship: UserShip, userShipIndex: number) => (
				<UserShipComponent key={userShipIndex} ship={ship} />
			))}
			</tbody>
		</table>
	);
};