import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Функция для записи данных в базу данных
export async function writeData(parameter: string, telegramId: string): Promise<void> {
	try {
		await prisma.user.upsert({
			where: { parameter },
			update: { telegramId },
			create: { parameter, telegramId },
		});
	} catch (error) {
		console.error('Ошибка записи данных:', error);
	}
}

// Функция для чтения данных из базы данных
export async function readData(parameter: string): Promise<string | null> {
	try {
		const user = await prisma.user.findUnique({
			where: { parameter },
		});
		return user ? user.telegramId : null;
	} catch (error) {
		console.error('Ошибка чтения данных:', error);
		return null;
	}
}
