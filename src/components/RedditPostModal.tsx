interface RedditPostModalProps {
	url: string;
	onClose: () => void;
}

export const RedditPostModal = ({ url, onClose }: RedditPostModalProps) => {
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: "rgba(0, 0, 0, 0.7)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 1000,
			}}
			onClick={handleBackdropClick}
		>
			<div
				style={{
					position: "relative",
					width: "90%",
					height: "90%",
					backgroundColor: "white",
					borderRadius: "8px",
					boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
				}}
			>
				<button
					onClick={onClose}
					style={{
						position: "absolute",
						top: "10px",
						right: "10px",
						background: "none",
						border: "none",
						fontSize: "24px",
						cursor: "pointer",
						zIndex: 1001,
						width: "32px",
						height: "32px",
						borderRadius: "50%",
						backgroundColor: "rgba(0, 0, 0, 0.1)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					×
				</button>
				<iframe
					src={url}
					style={{
						width: "100%",
						height: "100%",
						border: "none",
						borderRadius: "8px",
					}}
					title="Reddit Post"
				/>
			</div>
		</div>
	);
};
