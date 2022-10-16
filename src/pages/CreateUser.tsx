import React from 'react';
import { Modal } from '../components/modal/Modal';
import { UserShipType } from '../domain/interfaces';
import { useAppDispatch, useAppSelector } from '../domain/hooks';
import { setName, setColor, setStat, clearState, UserState, selectCurrentUser } from '../domain/createUserSlice';
import { USER_COLORS } from '../domain/constants';

import './CreateUser.css';

interface CreateUserProps {
	isOpen: boolean;
	onConfirm: (userData: UserState) => void;
	onCancel: () => void;
}

export const CreateUser: React.FC<CreateUserProps> = ({
	isOpen,
	onConfirm,
	onCancel
}) => {
	const dispatch = useAppDispatch();
	const data = useAppSelector(selectCurrentUser);

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		dispatch(setName(event.target.value));
	};

	const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		dispatch(setColor(event.target.value));
	};

	const handleStatChange = (event: React.ChangeEvent<HTMLInputElement>, id: number): void => {
		dispatch(setStat({
			id,
			field: event.target.name,
			value: parseInt(event.target.value, 10)
		}));
	};

	const handleConfirm = () => {
		onConfirm(data);
		dispatch(clearState());
	};

	return (
		<Modal
			title="User"
			isOpen={isOpen}
			onConfirm={handleConfirm}
			onCancel={onCancel}
		>
			<form className="user-form" autoComplete="off">
				<input type="hidden" name="id" value={data.userId} />
				<div className="user-data">
					<label>User name</label>
					<input
						type="text"
						name="name"
						value={data.name}
						required
						onChange={handleNameChange}
					/>
					<label>User color</label>
					<select
						name="name"
						value={data.color}
						required
						onChange={handleColorChange}
					>
						<option value="transparent"></option>
						{USER_COLORS.map((color: string, i: number) => (
							<option key={i} value={color}>{color}</option>
						))}
					</select>
				</div>
				<hr />
				<div className="ship-header">
					<p>Ship type</p><p>Amount</p><p>Health</p><p>Damage</p>
				</div>
				{data.shipTypes.map((shipType: UserShipType, index: number) => (
					<div key={index} className="ship-container">
						<p>{shipType.name}</p>
						<input
							type="number"
							name="amount"
							value={shipType.amount}
							onChange={(e) => handleStatChange(e, shipType.id)}
							min={0}
						/>
						<input
							type="number"
							name="health"
							value={shipType.health}
							onChange={(e) => handleStatChange(e, shipType.id)}
							min={1}
						/>
						<input
							type="number"
							name="damage"
							value={shipType.damage}
							onChange={(e) => handleStatChange(e, shipType.id)}
						/>
					</div>
				))}
			</form>
		</Modal>
	);
};