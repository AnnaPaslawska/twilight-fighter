import { ShipType } from '../domain/interfaces';
import { SHIP_TYPE } from '../domain/enums';

export const SHIP_TYPES: ShipType[] = [{
	name: SHIP_TYPE.fighter,
	health: 1,
	damage: 1
}, {
	name: SHIP_TYPE.destroyer,
	health: 1,
	damage: 2
}, {
	name: SHIP_TYPE.warsun,
	health: 2,
	damage: 3
}];

export const USER_COLORS: string[] = ['red', 'green', 'blue', 'black', 'yellow'];