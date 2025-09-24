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
			// Try multiple selectors to find the content container
			let contentContainer = null;

			// First try: look for tab panels (for tabbed interfaces)
			contentContainer = document.querySelector(
				'[role="tabpanel"]:not([hidden])',
			);

			// Second try: look for main content area (common in Docusaurus)
			if (!contentContainer) {
				contentContainer =
					document.querySelector("main article") ||
					document.querySelector("main .markdown") ||
					document.querySelector("main .container") ||
					document.querySelector("main");
			}

			// Third try: look for any content area with MDX components
			if (!contentContainer) {
				contentContainer =
					document.querySelector("[data-mdx-component]")?.closest("main") ||
					document.querySelector("main");
			}

			// Final fallback: use the entire document body
			if (!contentContainer) {
				contentContainer = document.body;
			}

			let content = "";

			// Get all the imported document components in the content container
			const documentComponents = contentContainer.querySelectorAll(
				"[data-mdx-component]",
			);

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
				// Fallback: get all text content from the content container
				content =
					contentContainer.textContent ||
					(contentContainer as HTMLElement).innerText ||
					"";
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
