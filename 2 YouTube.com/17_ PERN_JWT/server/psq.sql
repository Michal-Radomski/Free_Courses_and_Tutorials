CREATE DATABASE pern_auth_todo;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);

-- //* This is unnecessary!
CREATE TABLE todo(
  todo_id SERIAL,
  user_id UUID,
  description VARCHAR(255),
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Email and Password are fake!
INSERT INTO
  users (user_name, user_email, user_password)
VALUES
  ('Michal', 'michal@op.pl', 'qawsed123');

select
  *
from
  users;

select
  *
from
  pg_extension;

select
  *
from
  pg_available_extensions;