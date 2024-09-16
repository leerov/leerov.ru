'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image'; // Импортируем компонент Image
import styles from './LoginButton.module.scss';

export default function LoginButton() {
	const [photoBlobUrl, setPhotoBlobUrl] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const photoResponse = await fetch('/api/get-photo');
				if (!photoResponse.ok) throw new Error('Ошибка при получении фото');

				const blob = await photoResponse.blob();
				setPhotoBlobUrl(URL.createObjectURL(blob));
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error);
			}
		};

		fetchData();
	}, []);

	return (
		photoBlobUrl ? (
			<Image src={photoBlobUrl} alt="User Avatar" className={styles.avatar} width={100} height={100} />
		) : null
	);
}
