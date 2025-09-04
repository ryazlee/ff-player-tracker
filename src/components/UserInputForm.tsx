import React, { useState } from "react";
import { PlayerChip } from "./PlayerChip";

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
							let newPlayers: string[] = [];
							if (inputValue.includes(",")) {
								newPlayers = inputValue.split(",");
							} else {
								newPlayers = [inputValue];
							}

							newPlayers = newPlayers.map((p) =>
								p.trim().toLocaleLowerCase()
							);

							const newlyAddedPlayers = newPlayers.filter(
								(p) => !prev.includes(p) && p !== ""
							);
							const updatedPlayers = [
								...prev,
								...newlyAddedPlayers,
							];
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
						localStorage.removeItem("players");
						setPlayers([]);
					}}
				>
					Clear
				</button>
			</form>
			<div>
				{players.map((player, index) => (
					<PlayerChip
						key={index}
						player={player}
						onDeletePlayer={(p) => {
							const updatedPlayers = players.filter(
								(pl) => pl !== p
							);
							setPlayers(updatedPlayers);
							localStorage.setItem(
								"players",
								JSON.stringify(updatedPlayers)
							);
						}}
					/>
				))}
			</div>
		</>
	);
};
