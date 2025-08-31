import React, { useState } from "react";
import { getChipStyle } from "../styles/common";

export const UserInputForm = ({
	players,
	setPlayers,
}: {
	players: string[];
	setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
	const [inputValue, setInputValue] = useState("");

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (inputValue) {
						setPlayers((prev) => {
							const updatedPlayers = [...prev, inputValue];
							localStorage.setItem(
								"players",
								JSON.stringify(updatedPlayers)
							);
							return updatedPlayers;
						});
					}
					setInputValue("");
				}}
			>
				<label htmlFor="userInput">Track players: </label>
				<input
					type="text"
					id="userInput"
					name="userInput"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<button type="submit">Add</button>
				<button
					type="button"
					onClick={() => {
						setPlayers([]);
					}}
				>
					Clear
				</button>
			</form>
			<div>
				{players.map((player, index) => (
					<span key={index} style={getChipStyle(player)}>
						{player}
					</span>
				))}
			</div>
		</>
	);
};
