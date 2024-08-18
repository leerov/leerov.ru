'use client';
import { useState, useEffect } from 'react';
import styles from './LoginButton.module.scss';

export default function LoginButton() {
	const [link, setLink] = useState<string | null>(null);
	const [photoUrl, setPhotoUrl] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const linkResponse = await fetch('/api/generate-link');
				if (!linkResponse.ok) throw new Error('Ошибка при генерации ссылки');
				const linkData = await linkResponse.json();
				setLink(linkData.link);

				const storedPhotoUrl = localStorage.getItem('photoUrl');
				if (storedPhotoUrl) {
					setPhotoUrl(storedPhotoUrl);
				} else {
					const photoResponse = await fetch('/api/get-photo');
					if (!photoResponse.ok) throw new Error('Ошибка при получении фото');
					const photoData = await photoResponse.json();
					setPhotoUrl(photoData.photoUrl);
					localStorage.setItem('photoUrl', photoData.photoUrl);
				}
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error);
			}
		};

		fetchData();
	}, []);


	return <>
		{
			photoUrl ? (
				<img src={photoUrl} alt="User Avatar" className={styles.avatar} />
			) : (
				< a href={link || ''
				} className={styles.admin} target="_blank" rel="noopener noreferrer" >
					<div className={styles.admin_border_wrap}>
						<div className={styles.admin_center}>
							{ }
						</div>
					</div>
				</a >
			)
		}


	</>
}
