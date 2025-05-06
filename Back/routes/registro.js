import express from "express";
import { registrarUsuario } from "../controllers/userController.js";

const router = express.Router();
router.get("/", registrarUsuario);

export default router;
