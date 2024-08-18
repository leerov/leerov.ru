import { NextResponse } from 'next/server';
import crypto from 'crypto';
import os from 'os';

export async function GET() {
	const computerInfo = os.hostname() + os.platform();
	const parameter = crypto.createHash('sha256').update(computerInfo).digest('hex');
	const link = `https://t.me/${process.env.BOT_NAME}?start=${parameter}`;
	return NextResponse.json({ link, parameter });
}
