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
