import { useState } from "react";
import { UserInputForm } from "./UserInputForm";
import { RedditPostsList } from "./RedditPostsList";

export const Main = () => {
	const [players, setPlayers] = useState<string[]>([]);

	return (
		<>
			<h1>Fantasy Football Player Tracker</h1>
			<UserInputForm players={players} setPlayers={setPlayers} />
			{players.length > 0 && <RedditPostsList players={players} />}
		</>
	);
};
