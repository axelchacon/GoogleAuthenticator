const express = require('express');
const router = express.Router();
const { loginUsuario } = require('../controllers/userController');

router.get('/', loginUsuario);

module.exports = router;
