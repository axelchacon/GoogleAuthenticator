require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const registroRoute = require('./routes/registro');
const loginRoute = require('./routes/login');
const verificarCodigoRoute = require('./routes/verificarCodigo');

const cors = require('cors');

app.use(cors());


app.use(express.json());


app.use('/api/verificar-codigo', verificarCodigoRoute);
app.use('/api/registro', registroRoute);
app.use('/api/login', loginRoute);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB conectado');
    app.listen(process.env.PORT, () => console.log(`Servidor en puerto ${process.env.PORT}`));
}).catch(err => console.error(err));
