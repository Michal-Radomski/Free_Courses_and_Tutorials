CREATE DATABASE pern_auth_todo_jwt;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

select
  *
from
  pg_extension;

-- Users
CREATE TABLE users(
  user_id UUID DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);

-- List_Todo
CREATE TABLE todos(
  todo_id SERIAL,
  user_id UUID,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Email and Password are fake!
INSERT INTO
  users (user_name, user_email, user_password)
VALUES
  ('Michal', 'michal@op.pl', 'qawsed123');

INSERT INTO
  users (user_name, user_email, user_password)
VALUES
  ('Michal2', 'michal2@op.pl', 'qawsed123');

SELECT
  *
FROM
  users;

-- Fake todos data
insert into
  todos (user_id, description)
values
  (
    'd3578573-6f29-4e0c-8187-324a7cb8f0bd',
    'Clean up the room'
  );

insert into
  todos (user_id, description)
values
  (
    '4e3e10a6-cf2c-4ae3-b2bd-15348a3b5911',
    'Hello world!'
  );

SELECT
  *
FROM
  todos;

select
  *
from
  users
  INNER JOIN todos ON users.user_id = todos.user_id;

SELECT
  u.user_name,
  t.todo_id,
  t.description
FROM
  users AS u
  LEFT JOIN todos AS t ON u.user_id = t.user_id
WHERE
  u.user_id = 'd3578573-6f29-4e0c-8187-324a7cb8f0bd';