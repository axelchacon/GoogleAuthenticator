#### postgres=# psql -U user_postgresql -d user_database

#### CREATE TABLE users (

id SERIAL PRIMARY KEY,
usuario VARCHAR(255) NOT NULL UNIQUE,
contrasena VARCHAR(255) NOT NULL,
secret VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
