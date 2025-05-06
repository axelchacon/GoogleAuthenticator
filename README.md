# Google Authenticator

Una implementación de autenticación de dos factores basada en Node.js y MongoDB.

## Requisitos previos

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (instalado localmente)

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/axelchacon/GoogleAuthenticator.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd GoogleAuthenticator
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución

1. Asegúrate que MongoDB esté corriendo localmente

2. Crea un archivo `.env` en la carpeta `Back` con el siguiente contenido:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/usuarios
   ```

3. Navega a la carpeta `Back`:
   ```bash
   cd Back
   ```

4. Inicia el servidor:
   ```bash
   node server.js
   ```

## Base de datos

El proyecto utiliza MongoDB con una colección llamada `usuarios`.

