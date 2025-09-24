import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";

interface DocumentConfig {
	id: string;
	title: string;
	description: string;
	documents: string[];
}

const promptConfigs: DocumentConfig[] = [
	{
		id: "context",
		title: "📋 Контекст для работы со спецификацией",
		description: "Полный контекст для работы с полными спецификациями",
		documents: [
			"01.standards.md",
			"02.methodology.md",
			"03.requirements_phase.md",
			"04.design_phase.md",
			"05.tasks_phase.md",
			"08.steering_documents.md",
		],
	},
	{
		id: "micro_context",
		title: "⚡ Контекст для работы с микро-спецификацией",
		description: "Облегченный контекст для микро-спецификаций",
		documents: [
			"01.standards.md",
			"02.methodology.md",
			"06.micro_specification.md",
			"08.steering_documents.md",
		],
	},
	{
		id: "quick_context",
		title: "🚀 Контекст для работы с быстрой спецификацией",
		description: "Контекст для быстрых спецификаций",
		documents: [
			"01.standards.md",
			"02.methodology.md",
			"07.quick_specification.md",
			"08.steering_documents.md",
		],
	},
	{
		id: "steering",
		title: "🎯 Контекст для генерации направляющей",
		description: "Контекст для создания направляющих документов",
		documents: [
			"01.standards.md",
			"02.methodology.md",
			"03.requirements_phase.md",
			"04.design_phase.md",
			"05.tasks_phase.md",
			"08.steering_documents.md",
		],
	},
];

export default function PromptGenerator() {
	const [selectedConfig, setSelectedConfig] = useState<DocumentConfig>(
		promptConfigs[0],
	);
	const [generatedContent, setGeneratedContent] = useState<string>("");
	const [isGenerating, setIsGenerating] = useState(false);

	const fetchPromptContent = useCallback(
		async (config: DocumentConfig): Promise<string> => {
			try {
				// Загружаем исходные документы из папки docs/
				const documents = await Promise.all(
					config.documents.map(async (docName) => {
						try {
							const response = await fetch(`/docs/${docName}`);
							if (response.ok) {
								const content = await response.text();
								// Проверяем, что это не HTML страница
								if (
									!content.includes("<!DOCTYPE html>") &&
									!content.includes("<html")
								) {
									return `# ${docName}\n\n${content}`;
								}
							}
							return `# ${docName}\n\n⚠️ Документ не найден или недоступен`;
						} catch (error) {
							console.error(`Ошибка загрузки документа ${docName}:`, error);
							return `# ${docName}\n\n⚠️ Ошибка загрузки документа`;
						}
					}),
				);

				const combinedContent = documents.join("\n\n---\n\n");
				return `# ${config.title}\n\n\`\`\`\`\`\`md\n${combinedContent}\n\`\`\`\`\`\``;
			} catch (error) {
				console.error("Ошибка генерации промта:", error);
				return `# ${config.title}\n\n\`\`\`\`\`\`md\n${config.description}\n\nДокументы, включенные в этот промт:\n${config.documents.map((doc) => `- ${doc}`).join("\n")}\n\n⚠️ Ошибка генерации промта\n\`\`\`\`\`\``;
			}
		},
		[],
	);

	const generatePrompt = useCallback(
		async (config: DocumentConfig) => {
			setIsGenerating(true);
			try {
				// В реальной реализации здесь будет логика чтения файлов из docs/
				// и их объединения в один промт
				const content = await fetchPromptContent(config);
				setGeneratedContent(content);
			} catch (error) {
				console.error("Ошибка генерации промта:", error);
			} finally {
				setIsGenerating(false);
			}
		},
		[fetchPromptContent],
	);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(generatedContent);
			alert("Промт скопирован в буфер обмена!");
		} catch (error) {
			console.error("Ошибка копирования:", error);
		}
	};

	const downloadPrompt = () => {
		const blob = new Blob([generatedContent], { type: "text/markdown" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${selectedConfig.id}.md`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	useEffect(() => {
		generatePrompt(selectedConfig);
	}, [selectedConfig, generatePrompt]);

	return (
		<div className={styles.promptGenerator}>
			<div className={styles.configSelector}>
				<h3>Выберите тип промта:</h3>
				<div className={styles.configOptions}>
					{promptConfigs.map((config) => (
						<button
							key={config.id}
							type="button"
							className={`${styles.configOption} ${selectedConfig.id === config.id ? styles.active : ""}`}
							onClick={() => setSelectedConfig(config)}
						>
							<div className={styles.configTitle}>{config.title}</div>
							<div className={styles.configDescription}>
								{config.description}
							</div>
						</button>
					))}
				</div>
			</div>

			<div className={styles.selectedDocuments}>
				<h4>Включенные документы:</h4>
				<ul>
					{selectedConfig.documents.map((doc) => (
						<li key={doc}>{doc}</li>
					))}
				</ul>
			</div>

			<div className={styles.generatedContent}>
				<div className={styles.contentHeader}>
					<h4>Сгенерированный промт:</h4>
					<div className={styles.contentActions}>
						<button
							type="button"
							onClick={copyToClipboard}
							disabled={!generatedContent}
						>
							📋 Копировать
						</button>
						<button
							type="button"
							onClick={downloadPrompt}
							disabled={!generatedContent}
						>
							💾 Скачать
						</button>
						<button
							type="button"
							onClick={() => generatePrompt(selectedConfig)}
							disabled={isGenerating}
						>
							{isGenerating ? "⏳ Генерирую..." : "🔄 Обновить"}
						</button>
					</div>
				</div>

				<div className={styles.contentPreview}>
					<pre>{generatedContent}</pre>
				</div>
			</div>
		</div>
	);
}
