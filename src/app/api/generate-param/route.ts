// app/api/generate-param/route.ts
import crypto from 'crypto';
import os from 'os';

export async function GET() {
	const computerInfo = os.hostname() + os.platform();
	const parameter = crypto.createHash('sha256').update(computerInfo).digest('hex');
	return new Response(JSON.stringify({ parameter }), { status: 200 });
}
