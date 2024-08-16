// CircleMenu.tsx
"use client";

import Image from "next/image";
import styles from "./CircleMenu.module.scss";
import { Yanone_Kaffeesatz } from "next/font/google";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { UrlObject } from "url";

// Определяем интерфейс для элемента меню
interface MenuItem {
	href: string | UrlObject;
	label: string;
	icon: string; // или можно использовать StaticImport, если у вас есть импортированные изображения
}

// Определяем интерфейс для пропсов компонента CircleMenu
interface CircleMenuProps {
	menuItems: MenuItem[];
}

const yanone_Kaffeesatz = Yanone_Kaffeesatz({ subsets: ["latin"], weight: "400" });

export default function CircleMenu({ menuItems }: CircleMenuProps) {
	const router = useRouter();
	const buttonsRef = useRef<HTMLDivElement[]>([]); // Массив ссылок на кнопки

	useEffect(() => {
		// Функция для расстановки кнопок по кругу
		const positionButtons = () => {
			const numberOfButtons = menuItems.length;
			const angleStep = 360 / numberOfButtons;

			buttonsRef.current.forEach((button, index) => {
				const angle = angleStep * index;
				button.style.transform = `rotate(calc(${angle}deg - 180deg)) translate(270%) rotate(calc(-${angle}deg + 180deg)) translateX(-50%) translateY(-50%)`;
			});
		};

		positionButtons();

		const keyDownHandler = (event: { key: string; }) => {
			if (event.key === 'Escape') {
				router.back();
				if (!window.history.length) {
					router.push("/");
				}
			}
		};

		document.addEventListener('keydown', keyDownHandler);

		return () => {
			document.removeEventListener('keydown', keyDownHandler);
		};
	}, [menuItems, router]);

	return (
		<div className={styles.circle}>
			<div className={styles.circle_border_wrap}>
				<div className={styles.circle_center}></div>
			</div>
			<div className={styles.buttons}>
				{menuItems.map((item, index) => (
					<div
						className={styles.button}
						key={index}
						ref={(el) => {
							buttonsRef.current[index] = el!;
						}}
					>
						<Link className={styles.page_links} href={item.href}>
							<Image
								src={item.icon}
								alt={item.label}
								layout="responsive"
								width={100}
								height={100}
								style={{ maxWidth: '50%', height: 'auto' }}
							/>
							<h4 className={`${yanone_Kaffeesatz.className} ${styles.buttonText}`}>{item.label}</h4>

						</Link>
					</div>
				))}
			</div>
		</div>
	);


}