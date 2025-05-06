const express = require('express');
const router = express.Router();
const { verificarCodigo } = require('../controllers/userController');

router.get('/', verificarCodigo);

module.exports = router;
