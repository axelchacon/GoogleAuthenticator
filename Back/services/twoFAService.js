import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { PassThrough } from "stream";

export const generateSecret = (username) => {
	const secret = speakeasy.generateSecret({ name: `2FA-App (${username})` });
	return {
		secret: secret.base32,
		otpauth_url: secret.otpauth_url,
	};
};

export const generateQRCode = async (otpauth_url) => {
	const stream = new PassThrough();
	await qrcode.toFileStream(stream, otpauth_url);
	return stream;
};
