import { useQuery } from "@tanstack/react-query";
import {
	getPlayerTitleQuery,
	findMatchingPlayers,
	getTimeSince,
} from "./utils";
import { getChipStyle } from "../styles/common";
import { useMemo } from "react";

export const RedditPostsList = ({ players }: { players: string[] }) => {
	const fetchPostsFromReddit = async ({
		subReddit,
	}: {
		subReddit: string;
	}) => {
		const proxyUrl = "https://corsproxy.io/?";
		const targetUrl = `https://www.reddit.com/r/${subReddit}/search.json?q=${encodeURIComponent(
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

	const {
		data: fantasyFootballData,
		isLoading: isLoadingFantasyFootball,
		error: errorFantasyFootball,
	} = useQuery({
		queryKey: ["fantasyfootballRedditPosts", players],
		queryFn: () => fetchPostsFromReddit({ subReddit: "fantasyfootball" }),
	});

	const {
		data: dynastyFFData,
		isLoading: isLoadingDynasty,
		error: errorDynasty,
	} = useQuery({
		queryKey: ["DynastyFFRedditPosts", players],
		queryFn: () => fetchPostsFromReddit({ subReddit: "DynastyFF" }),
	});

	const isLoading = useMemo(() => {
		return isLoadingFantasyFootball || isLoadingDynasty;
	}, [isLoadingFantasyFootball, isLoadingDynasty]);

	const subredditData = useMemo(() => {
		const data = [];
		if (fantasyFootballData) {
			data.push(...fantasyFootballData.data.children);
		}
		if (dynastyFFData) {
			data.push(...dynastyFFData.data.children);
		}
		return data.sort((a, b) => b.data.created_utc - a.data.created_utc);
	}, [fantasyFootballData, dynastyFFData]);

	const error = useMemo(() => {
		return errorFantasyFootball || errorDynasty;
	}, [errorFantasyFootball, errorDynasty]);

	return (
		<div>
			{isLoading && <p>Loading...</p>}
			{error && <p>Error: {(error as Error).message}</p>}
			{fantasyFootballData &&
				fantasyFootballData.data.children.length === 0 && (
					<p>No posts found.</p>
				)}
			{subredditData && subredditData.length > 0 && (
				<ul>
					{subredditData.map((child: any) => {
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
