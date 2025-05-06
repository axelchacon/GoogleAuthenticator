import { User } from "../models/user.js";
import * as twoFAService from "../services/twoFAService.js";
import bcrypt from "bcrypt";
import speakeasy from "speakeasy";

export const registrarUsuario = async (req, res) => {
	try {
		const { usuario, contrasena } = req.query;
		if (!usuario || !contrasena)
			return res.status(400).send("Datos incompletos");

		const existingUser = await User.findByUsername(usuario);
		if (existingUser) return res.status(400).send("El usuario ya existe");

		const hashedPassword = await bcrypt.hash(contrasena, 10);
		const { otpauth_url, secret } = twoFAService.generateSecret(usuario);

		await User.create({ usuario, contrasena: hashedPassword, secret });

		const qrImage = await twoFAService.generateQRCode(otpauth_url);

		res.setHeader("Content-Type", "image/png");
		qrImage.pipe(res);
	} catch (err) {
		console.error(err);
		res.status(500).send("Error interno del servidor");
	}
};

export const loginUsuario = async (req, res) => {
	try {
		const { usuario, contrasena } = req.query;
		if (!usuario || !contrasena)
			return res.status(400).send("Datos incompletos");

		const user = await User.findByUsername(usuario);
		if (!user) return res.status(401).send("Usuario o contraseña incorrectos");

		const match = await bcrypt.compare(contrasena, user.contrasena);
		if (!match) return res.status(401).send("Usuario o contraseña incorrectos");

		res.json({
			usuario: user.usuario,
			secret: user.secret,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send("Error interno del servidor");
	}
};

export const verificarCodigo = async (req, res) => {
	try {
		const { usuario, codigo } = req.query;
		if (!usuario || !codigo) return res.status(400).send("Datos incompletos");

		const user = await User.findByUsername(usuario);
		if (!user) return res.status(401).send("Usuario no encontrado");

		const verified = speakeasy.totp.verify({
			secret: user.secret,
			encoding: "base32",
			token: codigo,
			window: 1,
		});

		if (!verified) return res.status(401).send("Código incorrecto o expirado");

		res.status(200).json({ mensaje: "Código verificado con éxito" });
	} catch (err) {
		console.error(err);
		res.status(500).send("Error interno del servidor");
	}
};
