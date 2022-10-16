import React from 'react';
import { UserShip } from 'domain/interfaces';

interface UserShipComponentProps {
	ship: UserShip
}

export const UserShipComponent: React.FC<UserShipComponentProps> = ({ ship }) => {
	return (
		<tr>
			<td className="user-ship-cell">{ship.name}</td>
			<td className="user-ship-cell">{ship.health}</td>
			<td className="user-ship-cell">{ship.damage}</td>
		</tr>
	);
};