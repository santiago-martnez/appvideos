CREATE DATABASE appdevideos

CREATE TABLE creador(
    id SERIAL PRIMARY KEY,
    username VARCHAR(10) UNIQUE,
    password VARCHAR(8)
);

CREATE TABLE video(
    id SERIAL PRIMARY KEY,
    creador_id INTEGER REFERENCES creador(id),
    titulo VARCHAR(100), 
    descripcion TEXT,
    urlvideo TEXT,
    publicado BOOLEAN
);
CREATE TABLE user_like(
    id serial PRIMARY KEY,
    video_id INTEGER REFERENCES video(id),
    creador_id INTEGER REFERENCES creador(id)
);