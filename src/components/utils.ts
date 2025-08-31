export const getPlayerTitleAndDescriptionQuery = (players: string[]) => {
	return players.map((player) => `"${player}"`).join(" OR ");
};

export const getPlayerTitleQuery = (players: string[]) => {
	return players.map((player) => `title:"${player}"`).join(" OR ");
};

export const formatPostDate = (timestamp: number): string => {
	const date = new Date(timestamp * 1000); // Reddit timestamps are in seconds
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

export const getTimeSince = (timestamp: number): string => {
	const now = Date.now();
	const timeDiff = now - timestamp * 1000;
	const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);

	if (days > 0) {
		return `${days} days ${hours} hours ago`;
	} else {
		return `${hours} hours ago`;
	}
};

export const findMatchingPlayers = (
	postTitle: string,
	postText: string,
	players: string[]
): string[] => {
	const matchingPlayers: string[] = [];
	const combinedText = `${postTitle} ${postText}`.toLowerCase();

	players.forEach((player) => {
		const playerLower = player.toLowerCase();
		// Check if player name appears in title or text
		if (combinedText.includes(playerLower)) {
			matchingPlayers.push(player);
		}
	});

	return matchingPlayers;
};
