import { useState } from "react";
import { UserInputForm } from "./UserInputForm";
import { RedditPostsList } from "./RedditPostsList";

export const Main = () => {
	const [players, setPlayers] = useState<string[]>([]);

	const helpMessage =
		"This is a tool for you to use to keep track of you fantasy football players!  Just enter the names of the player in the input and it will fetch the most recent Reddit posts about them.";

	return (
		<>
			<h1>Fantasy Football Player Tracker</h1>
			<UserInputForm players={players} setPlayers={setPlayers} />
			{players.length == 0 && (
				<p style={{ fontStyle: "italic", color: "gray" }}>
					{helpMessage}
				</p>
			)}
			{players.length > 0 && <RedditPostsList players={players} />}
		</>
	);
};
