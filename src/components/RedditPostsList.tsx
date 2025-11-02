import { useQuery } from "@tanstack/react-query";
import {
	getPlayerTitleQuery,
	findMatchingPlayers,
	getTimeSince,
	getPlayerTitleAndDescriptionQuery,
} from "./utils";
import { useMemo } from "react";
import { PlayerChip } from "./PlayerChip";

export const RedditPostsList = ({ players }: { players: string[] }) => {
	const fetchPostsFromReddit = async ({
		subReddit,
	}: {
		subReddit: string;
	}) => {
		const proxyUrl = "https://corsproxy.io/?";
		const targetUrl = `https://www.reddit.com/r/${subReddit}/search.json?q=${encodeURIComponent(
			getPlayerTitleAndDescriptionQuery(players)
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

	const {
		data: fantasy_footballData,
		isLoading: isLoadingFantasy_Football,
		error: errorFantasy_Football,
	} = useQuery({
		queryKey: ["fantasy_footballRedditPosts", players],
		queryFn: () => fetchPostsFromReddit({ subReddit: "fantasy_football" }),
	});

	const isLoading = useMemo(() => {
		return (
			isLoadingFantasyFootball ||
			isLoadingDynasty ||
			isLoadingFantasy_Football
		);
	}, [isLoadingFantasyFootball, isLoadingDynasty, isLoadingFantasy_Football]);

	const subredditData = useMemo(() => {
		const data = [];
		if (fantasyFootballData) {
			data.push(...fantasyFootballData.data.children);
		}
		if (dynastyFFData) {
			data.push(...dynastyFFData.data.children);
		}
		if (fantasy_footballData) {
			data.push(...fantasy_footballData.data.children);
		}
		return data.sort((a, b) => b.data.created_utc - a.data.created_utc);
	}, [fantasyFootballData, dynastyFFData]);

	const error = useMemo(() => {
		return errorFantasyFootball || errorDynasty || errorFantasy_Football;
	}, [errorFantasyFootball, errorDynasty, errorFantasy_Football]);

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
						console.log("Post:", post, post.selftext);
						const matchingPlayers = findMatchingPlayers(
							post.title,
							post.selftext || "",
							players
						);

						return (
							<li key={post.id}>
								{matchingPlayers.map((player) => (
									<PlayerChip key={player} player={player} />
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
