import pool from "../db.js";

export class User {
	static async create({ usuario, contrasena, secret }) {
		const query = `
      INSERT INTO users (usuario, contrasena, secret)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
		const values = [usuario, contrasena, secret];
		const { rows } = await pool.query(query, values);
		return rows[0];
	}

	static async findByUsername(usuario) {
		const query = "SELECT * FROM users WHERE usuario = $1";
		const { rows } = await pool.query(query, [usuario]);
		return rows[0];
	}
}
