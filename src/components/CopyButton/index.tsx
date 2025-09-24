import type React from "react";

interface CopyButtonProps {
	className?: string;
	style?: React.CSSProperties;
}

const CopyButton: React.FC<CopyButtonProps> = ({
	className = "button button--primary button--sm",
	style = {
		height: "28px",
		fontSize: "12px",
		marginTop: "-8px",
		float: "right",
	},
}) => {
	const handleCopy = async () => {};

	return (
		<button onClick={handleCopy} className={className} style={style}>
			Copy
		</button>
	);
};

export default CopyButton;
