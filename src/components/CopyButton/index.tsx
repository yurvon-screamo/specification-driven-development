import type React from "react";
import { useState } from "react";

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
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = async () => {
		try {
			// Find the active tab content
			const activeTab = document.querySelector(
				'[role="tabpanel"]:not([hidden])',
			);
			if (!activeTab) {
				console.warn("No active tab found");
				return;
			}

			// Get all the imported document components in the active tab
			const documentComponents = activeTab.querySelectorAll(
				"[data-mdx-component]",
			);

			let content = "";

			// If we have MDX components, extract their text content
			if (documentComponents.length > 0) {
				documentComponents.forEach((component) => {
					const textContent =
						component.textContent || (component as HTMLElement).innerText;
					if (textContent) {
						content += textContent + "\n\n";
					}
				});
			} else {
				// Fallback: get all text content from the active tab
				content =
					activeTab.textContent || (activeTab as HTMLElement).innerText || "";
			}

			// Clean up the content
			content = content
				.replace(/\n\s*\n\s*\n/g, "\n\n") // Remove excessive line breaks
				.trim();

			if (content) {
				await navigator.clipboard.writeText(content);
				setIsCopied(true);
				setTimeout(() => setIsCopied(false), 2000);
			} else {
				console.warn("No content found to copy");
			}
		} catch (error) {
			console.error("Failed to copy content:", error);
		}
	};

	return (
		<button
			type="button"
			onClick={handleCopy}
			className={className}
			style={style}
		>
			{isCopied ? "Copied!" : "Copy"}
		</button>
	);
};

export default CopyButton;
