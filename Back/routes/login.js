import express from "express";
import { loginUsuario } from "../controllers/userController.js";

const router = express.Router();
router.get("/", loginUsuario);

export default router;
