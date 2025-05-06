import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import registroRoute from "./routes/registro.js";
import loginRoute from "./routes/login.js";
import verificarCodigoRoute from "./routes/verificarCodigo.js";
import pool from "./db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/verificar-codigo", verificarCodigoRoute);
app.use("/api/registro", registroRoute);
app.use("/api/login", loginRoute);

// Verificar conexión a PostgreSQL
pool.query("SELECT NOW()", (err) => {
	if (err) {
		console.error("Error al conectar con PostgreSQL:", err);
	} else {
		console.log("PostgreSQL conectado");
		app.listen(process.env.PORT, () =>
			console.log(`Servidor en puerto ${process.env.PORT}`)
		);
	}
});
