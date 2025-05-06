const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    usuario: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true },
    secret: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);