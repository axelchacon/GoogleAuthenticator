const qrcode = require('qrcode');
const speakeasy = require('speakeasy');
const { PassThrough } = require('stream');

exports.generateSecret = (username) => {
    const secret = speakeasy.generateSecret({ name: `2FA-App (${username})` });
    return {
        secret: secret.base32,
        otpauth_url: secret.otpauth_url
    };
};

exports.generateQRCode = async (otpauth_url) => {
    const stream = new PassThrough();
    await qrcode.toFileStream(stream, otpauth_url);
    return stream;
};
