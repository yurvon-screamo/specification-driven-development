import Heading from "@theme/Heading";
import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

type FeatureItem = {
	title: string;
	Svg: React.ComponentType<React.ComponentProps<"svg">>;
	description: ReactNode;
};

const FeatureList: FeatureItem[] = [
	{
		title: "Для разработчика",
		Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
		description: (
			<>
				<strong>Четкое ТЗ:</strong> Понимание что нужно сделать, а не почему,
				прежде чем писать код
				<br />
				<strong>Готовый план:</strong> Технический дизайн с архитектурой,
				данными и обработкой ошибок
				<br />
				<strong>Меньше стресса:</strong> Проблемы выявляются на этапе
				планирования, а не в production
			</>
		),
	},
	{
		title: "Для менеджера/тимлида",
		Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
		description: (
			<>
				<strong>Точные оценки:</strong> Реалистичные сроки и эффективное
				распределение ресурсов
				<br />
				<strong>Прозрачность:</strong> Полная картина сложности задачи и
				прогресса команды
				<br />
				<strong>Управление рисками:</strong> Технические проблемы выявляются до
				начала работ
			</>
		),
	},
	{
		title: "Для заказчика/продуктового менеджера",
		Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
		description: (
			<>
				<strong>Гарантия результата:</strong> Будет построено именно то, что
				нужно бизнесу
				<br />
				<strong>Ясная коммуникация:</strong> Спецификации как единый язык
				обсуждения функциональности
				<br />
				<strong>AI-ready:</strong> Спецификации и направляющие - идеальный
				контекст AI-агента
			</>
		),
	},
];

function Feature({ title, Svg, description }: FeatureItem) {
	return (
		<div className={clsx("col col--4")}>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img" />
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
					{FeatureList.map((props) => (
						<Feature key={props.title} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
