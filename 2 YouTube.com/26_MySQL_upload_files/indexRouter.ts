import express, { Request, Response } from "express";
import fileUpload from "express-fileupload";

// Import DB settings
import pool from "./dbConfig";
pool.getConnection((error, connection) => {
  if (error) {
    console.log({ error });
    throw error;
  }
  console.log(`Connected as ID: ${connection.threadId}`);
});

const indexRouter: express.Router = express.Router();

indexRouter.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  pool.getConnection((error, connection) => {
    if (error) {
      console.log({ error });
      throw error;
    }
    console.log(`Connected as ID: ${connection.threadId}`);

    connection.query('SELECT * FROM user WHERE id = "1"', (error, rows) => {
      // Once done, release connection
      connection.release();
      if (!error) {
        res.render("index", { rows });
      }
    });
  });
});

indexRouter.post("/", (req: Request, res: Response) => {
  let sampleFile: fileUpload.UploadedFile;
  let uploadPath: string;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  // Name of the input is sampleFile
  sampleFile = req.files.sampleFile as fileUpload.UploadedFile;
  uploadPath = __dirname + "/upload/" + sampleFile.name;

  console.log({ sampleFile });
  console.log({ uploadPath });

  // Use mv() to place file on the server
  sampleFile.mv(uploadPath, function (error: string) {
    if (error) {
      console.log({ error });
      return res.status(500).send(error);
    }
    pool.getConnection((error, connection) => {
      if (error) {
        console.log({ error });
        throw error;
      }
      console.log(`Connected as ID: ${connection.threadId}`);

      connection.query('UPDATE user SET profile_image = ? WHERE id ="1"', [sampleFile.name], (error, _rows) => {
        // Once done, release connection
        connection.release();

        if (!error) {
          res.redirect("/");
        } else {
          console.log({ error });
        }
      });
    });
    // res.send('File uploaded!');
  });
});

export default indexRouter;
