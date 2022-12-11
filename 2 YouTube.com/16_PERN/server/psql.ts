import * as dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "pern_todo",
  user: process.env.user,
  password: process.env.password,
});

export default pool;

//* Configuring DB connection on Heroku:
// const devConfig = `postgresql://${process.env.user}:${process.env.password}@localhost:5432/per_todo`;

// const proConfig = process.env.DATABASE_URL; // Heroku addons

// export const pool2 = new Pool({
//   connectionString: process.env.NODE_ENV === "production" ? proConfig : devConfig,
// });
