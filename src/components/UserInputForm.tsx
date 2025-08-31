import React, { useState } from "react";
import { chipStyle } from "../styles/common";

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
						setPlayers((prev) => [...prev, inputValue]);
					}
					setInputValue("");
				}}
			>
				<label htmlFor="userInput">Enter player:</label>
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
					<span key={index} style={chipStyle}>
						{player}
					</span>
				))}
			</div>
		</>
	);
};
