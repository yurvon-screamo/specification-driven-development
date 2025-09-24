import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./index.module.css";

function HomepageHeader() {
	return (
		<header className={clsx("hero hero--primary", styles.heroBanner)}>
			<div className="container">
				<div className={clsx("badge", styles.heroBadge)} aria-hidden="true">
					🚀 Specification Driven Development
				</div>
				<Heading as="h1" className="hero__title">
					Разработка на основе <span className="cute">спецификаций</span>
				</Heading>
				<p className="hero__subtitle">
					Единый, структурированный подход к разработке программного
					обеспечения, который гарантирует качество, поддерживаемость и
					соответствие бизнес-требованиям
				</p>
				<div className={styles.buttons}>
					<Link
						className="button button--secondary button--lg"
						to="/documents/standards"
					>
						📋 Документация
					</Link>
					<Link
						className="button button--outline button--lg"
						to="/prompts/context"
					>
						🤖 Промпты
					</Link>
				</div>
			</div>
		</header>
	);
}

export default function Home(): ReactNode {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title="Разработка на основе спецификаций"
			description="Единый, структурированный подход к разработке программного обеспечения с гарантией качества и соответствия бизнес-требованиям"
		>
			<HomepageHeader />
			<main>
				<HomepageFeatures />
			</main>
		</Layout>
	);
}
