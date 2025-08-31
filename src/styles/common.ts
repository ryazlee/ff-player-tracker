import { CSSProperties } from "react";

export const getPlayerColor = (playerName: string): string => {
	// Simple hash function to generate consistent colors
	let hash = 0;
	for (let i = 0; i < playerName.length; i++) {
		hash = playerName.charCodeAt(i) + ((hash << 5) - hash);
	}

	// Convert hash to HSL color with good saturation and lightness for readability
	const hue = Math.abs(hash) % 360;
	return `hsl(${hue}, 70%, 85%)`;
};

export const getPlayerColorDark = (playerName: string): string => {
	// Same hash function but darker version for borders/text
	let hash = 0;
	for (let i = 0; i < playerName.length; i++) {
		hash = playerName.charCodeAt(i) + ((hash << 5) - hash);
	}

	const hue = Math.abs(hash) % 360;
	return `hsl(${hue}, 70%, 60%)`;
};

export const getChipStyle = (playerName: string): CSSProperties => ({
	display: "inline-block",
	padding: "2px 6px",
	margin: "2px",
	backgroundColor: getPlayerColor(playerName),
	border: `1px solid ${getPlayerColorDark(playerName)}`,
	borderRadius: "3px",
	fontSize: "12px",
});

export const getColorSquareStyle = (playerName: string): CSSProperties => ({
	display: "inline-block",
	width: "8px",
	height: "8px",
	backgroundColor: getPlayerColor(playerName),
	border: `1px solid ${getPlayerColorDark(playerName)}`,
	borderRadius: "2px",
	marginRight: "4px",
	marginLeft: "2px",
});
