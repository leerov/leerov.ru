import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import crypto from 'crypto';
import os from 'os';
import { readData } from '@/service/dbmanager';

const COOKIE_NAME = 'avatarUrl';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 1 неделя

// Функция для получения аватарки пользователя по Telegram ID
async function getUserAvatar(telegramId: string): Promise<Buffer | null> {
	try {
		const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getUserProfilePhotos?user_id=${telegramId}`);
		const data = await response.json();

		if (data.ok && data.result?.photos?.length > 0) {
			const photoArray = data.result.photos[0];
			const fileId = photoArray[photoArray.length - 1]?.file_id; // Берем последнюю (самую большую) версию фото

			if (fileId) {
				// Получаем URL для скачивания файла
				const fileResponse = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`);
				const fileData = await fileResponse.json();

				if (fileData.ok && fileData.result?.file_path) {
					const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${fileData.result.file_path}`;
					const imageResponse = await fetch(fileUrl);
					const imageBuffer = await imageResponse.buffer(); // Получаем изображение в виде буфера
					return imageBuffer;
				}
			}
		}

		return null;
	} catch (error) {
		console.error('Ошибка при получении аватарки:', error);
		return null;
	}
}

// API Route handler
export async function GET(request: Request) {
	try {
		const computerInfo = os.hostname() + os.platform();
		const parameter = crypto.createHash('sha256').update(computerInfo).digest('hex');

		const telegramId = await readData(parameter);
		if (!telegramId) {
			return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
		}

		const cookies = request.headers.get('cookie') ?? '';
		const avatarUrlMatch = cookies.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
		let avatarUrl = avatarUrlMatch ? avatarUrlMatch[1] : null;

		if (!avatarUrl) {
			const avatarBuffer = await getUserAvatar(telegramId);

			if (!avatarBuffer) {
				return NextResponse.json({ error: 'Аватарка не найдена' }, { status: 404 });
			}

			const response = NextResponse.json({});
			response.headers.append('Set-Cookie', `${COOKIE_NAME}=${avatarBuffer.toString('base64')}; Max-Age=${COOKIE_MAX_AGE}; HttpOnly`);
			return response;
		}

		const avatarBuffer = Buffer.from(avatarUrl, 'base64'); // Декодируем base64 в Buffer

		return new NextResponse(avatarBuffer, {
			headers: { 'Content-Type': 'image/jpeg' } // Или другой тип, соответствующий вашему изображению
		});
	} catch (error) {
		console.error('Ошибка при получении аватарки:', error);
		return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
	}
}
