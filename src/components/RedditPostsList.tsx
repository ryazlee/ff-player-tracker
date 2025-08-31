import { useQuery } from "@tanstack/react-query";
import {
	getPlayerTitleQuery,
	formatPostDate,
	findMatchingPlayers,
	getTimeSince,
} from "./utils";
import { getChipStyle } from "../styles/common";

export const RedditPostsList = ({ players }: { players: string[] }) => {
	const fetchPostsFromReddit = async () => {
		const proxyUrl = "https://corsproxy.io/?";
		const targetUrl = `https://www.reddit.com/r/fantasyfootball/search.json?q=${encodeURIComponent(
			getPlayerTitleQuery(players)
		)}&restrict_sr=1&sort=new`;

		const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const contentType = response.headers.get("content-type");
		if (!contentType || !contentType.includes("application/json")) {
			const text = await response.text();
			throw new Error(
				`Expected JSON, but received: ${contentType}. Response: ${text.substring(
					0,
					100
				)}`
			);
		}

		return response.json();
	};

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["redditPosts", players],
		queryFn: fetchPostsFromReddit,
	});

	return (
		<div>
			{isLoading && <p>Loading...</p>}
			{error && <p>Error: {(error as Error).message}</p>}
			{data && data.data.children.length === 0 && <p>No posts found.</p>}
			{data && data.data.children.length > 0 && (
				<ul>
					{data.data.children.map((child: any) => {
						const post = child.data;
						const matchingPlayers = findMatchingPlayers(
							post.title,
							post.selftext || "",
							players
						);

						return (
							<li key={post.id}>
								{matchingPlayers.map((player) => (
									<span
										key={player}
										style={getChipStyle(player)}
									>
										{player}
									</span>
								))}
								<a
									href={`https://www.reddit.com${post.permalink}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									{post.title}
								</a>
								<ul>
									<li>{getTimeSince(post.created_utc)}</li>
									<li>
										{post.score} points •{" "}
										{post.num_comments} comments •{" "}
										{Math.round(post.upvote_ratio * 100)}%
										upvoted
									</li>
								</ul>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};
