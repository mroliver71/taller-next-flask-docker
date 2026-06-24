CREATE TABLE IF NOT EXISTS tasks (
 id SERIAL PRIMARY KEY,
 title VARCHAR(150) NOT NULL,
 description TEXT,
 status VARCHAR(30) DEFAULT 'PENDIENTE'
);

INSERT INTO tasks (title, description, status)
VALUES
('Investigar Next.js', 'Revisar conceptos principales del framework', 'PENDIENTE'),
('Crear backend Flask', 'Implementar Web Service REST con Python y Flask', 'EN PROCESO'),
('Dockerizar proyecto', 'Configurar frontend, backend y base de datos', 'PENDIENTE');