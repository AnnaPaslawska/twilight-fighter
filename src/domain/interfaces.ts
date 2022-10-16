export interface ShipType {
	name: string;
	health: number;
	damage: number;
};

export interface UserShipType {
	id: number;
	name: string;
	amount: number;
	health: number;
	damage: number;
	[shipProperty: string]: string | number;
};

export interface UserShip {
	shipTypeId: number;
	name: string;
	health: number;
	damage: number;
}

export interface User {
	id: number;
	name: string;
	color: string;
	ships: UserShip[];
}