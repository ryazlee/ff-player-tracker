import React, { useState } from "react";
import { UserInputForm } from "./UserInputForm";
import { RedditPostsList } from "./RedditPostsList";

export const Main = () => {
	const [players, setPlayers] = useState<string[]>([]);

	return (
		<>
			<h1>Hello World</h1>
			<UserInputForm players={players} setPlayers={setPlayers} />
			{players && <RedditPostsList players={players} />}
		</>
	);
};
