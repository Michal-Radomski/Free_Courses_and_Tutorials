import { Request, RequestHandler, Response } from "express";

// Import DB settings
import pool from "./dbConfig";

// pool.getConnection((error, connection) => {
//   if (error) {
//     console.log({ error });
//     throw error;
//   }
//   console.log(`Connected as ID: ${connection.threadId}`);
//   connection.query("SELECT * FROM user", (err, rows) => {
//     connection.release();
//     if (!err) {
//       console.log({ rows });
//     } else {
//       console.log({ err });
//     }
//   });
// });

// View all Users
export const viewUsers: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);
  await pool.getConnection((error, connection) => {
    if (error) {
      console.log({ error });
      throw error;
    }
    console.log(`Connected as ID: ${connection.threadId}`);
    connection.query("SELECT * FROM user WHERE status = 'active'", (err, rows) => {
      connection.release();
      if (!err) {
        // console.log({ rows });
        res.render("home", { rows });
      } else {
        console.log({ err });
      }
    });
  });
};

// Find User by Search
export const findUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);

  const searchTerm = req.body.search;

  await pool.getConnection((error, connection) => {
    if (error) {
      console.log({ error });
      throw error;
    }
    console.log(`Connected as ID: ${connection.threadId}`);
    connection.query(
      "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?",
      ["%" + searchTerm + "%", "%" + searchTerm + "%"],
      (err, rows) => {
        connection.release();
        if (!err) {
          // console.log("The data from user table: \n", rows);
          res.render("home", { rows });
        } else {
          console.log({ err });
        }
      }
    );
  });
};

// Add User - GET
export const formPage: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);
  res.render("add-user");
};

// Add new User
export const addUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);

  const { first_name, last_name, email, phone, comments } = req.body;

  await pool.getConnection((error, connection) => {
    if (error) {
      console.log({ error });
      throw error;
    }
    console.log(`Connected as ID: ${connection.threadId}`);

    connection.query(
      "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
      [first_name, last_name, email, phone, comments],
      (err, rows) => {
        if (!err) {
          res.render("add-user", { alert: "User added successfully." });
        } else {
          console.log({ err });
        }
        console.log("The data from user table: \n", rows);
      }
    );
  });
};
