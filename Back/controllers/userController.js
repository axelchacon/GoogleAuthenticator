const User = require('../models/user');
const twoFAService = require('../services/twoFAService');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');

exports.registrarUsuario = async (req, res) => {
    try {
        const { usuario, contrasena } = req.query;
        if (!usuario || !contrasena) return res.status(400).send('Datos incompletos');

        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const { otpauth_url, secret } = twoFAService.generateSecret(usuario);

        const user = new User({ usuario, contrasena: hashedPassword, secret });
        await user.save();

        const qrImage = await twoFAService.generateQRCode(otpauth_url);

        res.setHeader('Content-Type', 'image/png');
        qrImage.pipe(res);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
    }
};

exports.loginUsuario = async (req, res) => {
    try {
        const { usuario, contrasena } = req.query;
        if (!usuario || !contrasena) return res.status(400).send('Datos incompletos');

        const user = await User.findOne({ usuario });
        if (!user) return res.status(401).send('Usuario o contraseña incorrectos');

        const match = await bcrypt.compare(contrasena, user.contrasena);
        if (!match) return res.status(401).send('Usuario o contraseña incorrectos');

        // Éxito, devolvemos datos necesarios (sin contraseña)
        res.json({
            usuario: user.usuario,
            secret: user.secret
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
    }
};


exports.verificarCodigo = async (req, res) => {
    try {
        const { usuario, codigo } = req.query;
        if (!usuario || !codigo) return res.status(400).send('Datos incompletos');

        const user = await User.findOne({ usuario });
        if (!user) return res.status(401).send('Usuario no encontrado');

        const verified = speakeasy.totp.verify({
            secret: user.secret,
            encoding: 'base32',
            token: codigo,
            window: 1 // tolerancia de ±1 intervalo (30s por defecto)
        });

        if (!verified) return res.status(401).send('Código incorrecto o expirado');

        res.status(200).json({ mensaje: 'Código verificado con éxito' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
    }
};
