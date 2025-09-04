import { getChipStyle } from "../styles/common";

export const PlayerChip = ({
	player,
	onDeletePlayer,
}: {
	player: string;
	onDeletePlayer?: (player: string) => void;
}) => {
	return (
		<span
			onClick={() => onDeletePlayer?.(player)}
			style={{ ...getChipStyle(player), position: "relative" }}
		>
			{player}
		</span>
	);
};
