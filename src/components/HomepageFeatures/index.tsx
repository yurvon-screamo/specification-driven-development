/** biome-ignore-all lint/correctness/useUniqueElementIds: Docusaurus requires static IDs for translation system */

import Translate from "@docusaurus/Translate";
import Heading from "@theme/Heading";
import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

type FeatureItem = {
	title: ReactNode;
	image: string;
	description: ReactNode;
};

const FeatureList: FeatureItem[] = [
	{
		title: (
			<Translate
				id="homepage.features.developer.title"
				description="Title for developer features section"
			/>
		),
		image: "/img/reader_file.png",
		description: (
			<>
				<strong>
					<Translate
						id="homepage.features.developer.clearRequirements"
						description="Clear requirements feature for developers"
					/>
				</strong>{" "}
				<Translate
					id="homepage.features.developer.clearRequirementsDesc"
					description="Clear requirements description for developers"
				/>
				<br />
				<strong>
					<Translate
						id="homepage.features.developer.readyPlan"
						description="Ready plan feature for developers"
					/>
				</strong>{" "}
				<Translate
					id="homepage.features.developer.readyPlanDesc"
					description="Ready plan description for developers"
				/>
				<br />
				<strong>
					<Translate
						id="homepage.features.developer.lessStress"
						description="Less stress feature for developers"
					/>
				</strong>{" "}
				<Translate
					id="homepage.features.developer.lessStressDesc"
					description="Less stress description for developers"
				/>
			</>
		),
	},
	{
		title: (
			<Translate
				id="homepage.features.manager.title"
				description="Title for manager features section"
			/>
		),
		image: "/img/wait.png",
		description: (
			<>
				<strong>
					<Translate
						id="homepage.features.manager.accurateEstimates"
						description="Accurate estimates feature for managers"
					/>
				</strong>{" "}
				<Translate
					id="homepage.features.manager.accurateEstimatesDesc"
					description="Accurate estimates description for managers"
				/>
				<br />
				<strong>
					<Translate
						id="homepage.features.manager.transparency"
						description="Transparency feature for managers"
					/>
				</strong>{" "}
				<Translate
					id="homepage.features.manager.transparencyDesc"
					description="Transparency description for managers"
				/>
				<br />
				<strong>
					<Translate
						id="homepage.features.manager.riskManagement"
						description="Risk management feature for managers"
					/>
				</strong>{" "}
				<Translate
					id="homepage.features.manager.riskManagementDesc"
					description="Risk management description for managers"
				/>
			</>
		),
	},
	{
		title: (
			<Translate
				id="homepage.features.customer.title"
				description="Title for customer features section"
			/>
		),
		image: "/img/ask.png",
		description: (
			<>
				<strong>
					<Translate
						id="homepage.features.customer.resultGuarantee"
						description="Result guarantee feature for customers"
					/>
				</strong>{" "}
				<Translate
					id="homepage.features.customer.resultGuaranteeDesc"
					description="Result guarantee description for customers"
				/>
				<br />
				<strong>
					<Translate
						id="homepage.features.customer.clearCommunication"
						description="Clear communication feature for customers"
					/>
				</strong>{" "}
				<Translate
					id="homepage.features.customer.clearCommunicationDesc"
					description="Clear communication description for customers"
				/>
				<br />
				<strong>
					<Translate
						id="homepage.features.customer.aiReady"
						description="AI-ready feature for customers"
					/>
				</strong>{" "}
				<Translate
					id="homepage.features.customer.aiReadyDesc"
					description="AI-ready description for customers"
				/>
			</>
		),
	},
];

function Feature({ title, image, description }: FeatureItem) {
	return (
		<div className={clsx("col col--4")}>
			<div className="text--center">
				<img src={image} className={styles.featureImage} alt="" />
			</div>
			<div className="text--center padding-horiz--md">
				<Heading as="h3">{title}</Heading>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures(): ReactNode {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, index) => {
						const featureKeys = ["developer", "manager", "customer"];
						return (
							<Feature
								key={featureKeys[index] || `feature-${index}`}
								{...props}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}
