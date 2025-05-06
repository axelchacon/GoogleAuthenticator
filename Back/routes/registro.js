const express = require('express');
const router = express.Router();
const { registrarUsuario } = require('../controllers/userController');

router.get('/', registrarUsuario);

module.exports = router;

// services/twoFAService.js
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const { Readable } = require('stream');

exports.generateSecret = (usuario) => {
    const secret = speakeasy.generateSecret({ name: `2FA-${usuario}` });
    return { otpauth_url: secret.otpauth_url, secret: secret.base32 };
};

exports.generateQRCode = async (otpauth_url) => {
    const dataUrl = await qrcode.toDataURL(otpauth_url);
    const imageBuffer = Buffer.from(dataUrl.split(",")[1], 'base64');
    return Readable.from(imageBuffer);
};