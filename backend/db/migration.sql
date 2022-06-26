DROP DATABASE IF EXISTS mcsp_resources;

CREATE DATABASE mcsp_resources;
\c mcsp_resources
DROP TABLE IF EXISTS post;

CREATE TABLE post(
    id SERIAL UNIQUE PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    link TEXT,
    cohort TEXT NOT NULL,
    username TEXT NOT NULL
);

\i seed.sql