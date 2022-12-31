import { Request, RequestHandler, Response } from "express";

// Import DB settings
import pool, { MySQL_Connection } from "./dbConfig";

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
  //* Connection V1
  // await pool.getConnection((error, connection) => {
  //   if (error) {
  //     console.log({ error });
  //     throw error;
  //   }
  //   console.log(`Connected as ID: ${connection.threadId}`);
  //   connection.query("SELECT * FROM user WHERE status = 'active'", (err, rows) => {
  //     connection.release();
  //     if (!err) {
  //       // console.log({ rows });
  //       const removedUser = req.query.removed;
  //       res.render("home", { rows, removedUser });
  //     } else {
  //       console.log({ err });
  //     }
  //   });
  // });

  //* Connection V2 -> Pool
  MySQL_Connection.query("SELECT * FROM user WHERE status = 'active'", (err, rows) => {
    if (!err) {
      // console.log({ rows });
      const removedUser = req.query.removed;
      res.render("home", { rows, removedUser });
    } else {
      console.log({ err });
    }
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

// Add new User - POST
export const addUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);

  const { first_name, last_name, email, phone, comments } = req.body;

  await pool.getConnection((error, connection) => {
    if (error) {
      console.log({ error });
      throw error;
    }
    console.log(`Connected as ID: ${connection.threadId}`);

    // Connection query
    connection.query(
      "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
      [first_name, last_name, email, phone, comments],
      (err, rows) => {
        connection.release();
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

// Edit user
export const editUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);
  await pool.getConnection((error, connection) => {
    if (error) {
      console.log({ error });
      throw error;
    }
    console.log(`Connected as ID: ${connection.threadId}`);

    // Connection query
    connection.query("SELECT * FROM user WHERE id = ?", [req.params.id], (err, rows) => {
      connection.release();
      if (!err) {
        res.render("edit-user", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    });
  });
};

// Update user
export const updateUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);

  const { first_name, last_name, email, phone, comments } = req.body;

  await pool.getConnection((error, connection) => {
    if (error) {
      console.log({ error });
      throw error;
    }
    console.log(`Connected as ID: ${connection.threadId}`);

    // Connection query
    connection.query(
      "UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?",
      [first_name, last_name, email, phone, comments, req.params.id],
      (err, rows) => {
        connection.release();
        if (!err) {
          connection.query("SELECT * FROM user WHERE id = ?", [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
              res.render("edit-user", { rows, alert: `${first_name} has been updated.` });
            } else {
              console.log(err);
            }
            console.log("The data from user table: \n", rows);
          });
        } else {
          console.log(err);
        }
        console.log("The data from user table: \n", rows);
      }
    );
  });
};

// Delete user
export const deleteUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);
  await pool.getConnection((error, connection) => {
    if (error) {
      console.log({ error });
      throw error;
    }
    console.log(`Connected as ID: ${connection.threadId}`);

    //* Connection query V1
    // connection.query("DELETE FROM user WHERE id = ?", [req.params.id], (err, rows) => {
    //   connection.release();
    //   if (!err) {
    //     res.redirect("/");
    //   } else {
    //     console.log(err);
    //   }
    //   console.log("The data from user table: \n", rows);
    // });
    //* Connection query V2
    connection.query("UPDATE user SET status = ? WHERE id = ?", ["removed", req.params.id], (err, rows) => {
      if (!err) {
        const removedUser = encodeURIComponent("User-successfully-removed");
        res.redirect("/?removed=" + removedUser);
      } else {
        console.log(err);
      }
      console.log("The data from beer table are: \n", rows);
    });
  });
};

// View user
export const viewUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);
  await pool.getConnection((error, connection) => {
    if (error) {
      console.log({ error });
      throw error;
    }
    console.log(`Connected as ID: ${connection.threadId}`);

    // Connection query
    connection.query("SELECT * FROM user WHERE id = ?", [req.params.id], (err, rows) => {
      connection.release();
      if (!err) {
        res.render("view-user", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    });
  });
};
