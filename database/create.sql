/* CREATE DATABASE */
/* create database login_page;  */

/* CREATE TABLES */
CREATE TABLE clients (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    cpf VARCHAR(11)
);

CREATE TABLE passwords (
    id SERIAL PRIMARY KEY,
    password VARCHAR(50) NOT NULL,
    id_client integer NOT NULL,
    FOREIGN KEY (id_client) REFERENCES clients (id)
);
