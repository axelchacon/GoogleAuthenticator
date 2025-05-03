import express from "express";
import bcrypt from "bcrypt";
import speakeasy from "speakeasy";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Usuario simulado (ya registrado)
const usuario = {
	email: "user@example.com",
	passwordHash: "$2b$10$e7pK5XQl1zV9i4tu5RWrPevEcGZXLVbGHimkX4sykBxlZu79i4rQK", // miclave123
	twoFactorSecret: "KZLWK5DFNZTSA4TF",
};

app.post("/login", async (req, res) => {
	const { email, password, token2fa } = req.body;

	if (email !== usuario.email) {
		return res.status(401).json({ msg: "Email incorrecto" });
	}

	const validPass = await bcrypt.compare(password, usuario.passwordHash);
	if (!validPass) {
		return res.status(401).json({ msg: "Contraseña incorrecta" });
	}

	const validToken = speakeasy.totp.verify({
		secret: usuario.twoFactorSecret,
		encoding: "base32",
		token: token2fa,
	});

	if (!validToken) {
		return res.status(401).json({ msg: "Código 2FA inválido" });
	}

	res.json({ msg: "✅ Autenticación exitosa" });
});

app.listen(3000, () => {
	console.log("Servidor en http://localhost:3000");
});
