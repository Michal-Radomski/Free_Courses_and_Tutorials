import { Request, RequestHandler, Response } from "express";

// Import DB settings
import pool from "./dbConfig";
pool.getConnection((error, connection) => {
  if (error) {
    console.log({ error });
    throw error;
  }
  console.log(`Connected as ID: ${connection.threadId}`);
});

export const getHomePage: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);
  await res.render("home", {});
};
