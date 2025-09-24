/** biome-ignore-all lint/correctness/useUniqueElementIds: Docusaurus requires static IDs for translation system */

import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
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
					<Translate
						id="homepage.hero.badge"
						description="The badge text in the hero section"
					/>
				</div>
				<Heading as="h1" className="hero__title">
					<Translate
						id="homepage.hero.title"
						description="The main title of the homepage"
						values={{
							specifications: <span className="cute">спецификаций</span>,
						}}
					/>
				</Heading>
				<p className="hero__subtitle">
					<Translate
						id="homepage.hero.subtitle"
						description="The subtitle of the homepage"
					/>
				</p>
				<div className={styles.buttons}>
					<Link
						className="button button--secondary button--lg"
						to="/documents/standards"
					>
						<Translate
							id="homepage.hero.documentationButton"
							description="The documentation button text"
						/>
					</Link>
					<Link className="button button--outline button--lg" to="/prompts/">
						<Translate
							id="homepage.hero.promptsButton"
							description="The prompts button text"
						/>
					</Link>
				</div>
			</div>
		</header>
	);
}

export default function Home(): ReactNode {
	return (
		<Layout
			title={translate({
				id: "homepage.meta.title",
				description: "The page title for the homepage",
			})}
			description={translate({
				id: "homepage.meta.description",
				description: "The page description for the homepage",
			})}
		>
			<HomepageHeader />
			<main>
				<HomepageFeatures />
			</main>
		</Layout>
	);
}
