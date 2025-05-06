import express from "express";
import { verificarCodigo } from "../controllers/userController.js";

const router = express.Router();
router.get("/", verificarCodigo);

export default router;
