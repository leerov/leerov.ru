
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import crypto from 'crypto';
import os from 'os';
import { readData } from '@/service/dbmanager';

// Функция для получения аватарки пользователя по Telegram ID
async function getUserAvatar(telegramId: string): Promise<string | null> {
	const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getUserProfilePhotos?user_id=${telegramId}`);
	const data = await response.json();
	console.log(telegramId)
	if (data.ok && data.result.photos.length > 0) {
		const photoArray = data.result.photos[0];
		const fileId = photoArray[photoArray.length - 1].file_id; // Берем последнюю (самую большую) версию фото

		// Получаем URL для скачивания файла
		const fileResponse = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`);
		const fileData = await fileResponse.json();
		if (fileData.ok) {
			const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${fileData.result.file_path}`;
			return fileUrl;
		}
	}

	return null;
}

// API Route handler
export async function GET(request: Request) {
	try {
		const url = new URL(request.url);
		const computerInfo = os.hostname() + os.platform();
		const parameter = crypto.createHash('sha256').update(computerInfo).digest('hex');

		if (!parameter) {
			return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
		}

		const telegramId = readData(parameter);
		const avatarUrl = await getUserAvatar(telegramId);

		if (!avatarUrl) {
			return NextResponse.json({ error: 'Аватарка не найдена' }, { status: 404 });
		}

		return NextResponse.json({ photoUrl: avatarUrl });
	} catch (error) {
		console.error('Ошибка при получении аватарки:', error);
		return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
	}
}
