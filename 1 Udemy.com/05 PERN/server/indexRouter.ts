import express, { Router, Request, Response, NextFunction } from "express";

import pool from "./db";

const indexRouter: Router = express.Router();

// // Test Route
// indexRouter.get("/hello", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.status(200).json({ msg: "hello" });
// });

/*
    POSTS ROUTES SECTION
*/

indexRouter.get("/get/allposts", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  pool.query("SELECT * FROM posts ORDER BY date_created DESC", (_q_err, q_res) => {
    res.json(q_res.rows);
  });
});

// indexRouter.post("/post/posttodb", (req: Request, res: Response, next: NextFunction) => {
//   const values = [req.body.title, req.body.body, req.body.uid, req.body.username];
//   pool.query(
//     `INSERT INTO posts(title, body, user_id, author, date_created)
//               VALUES($1, $2, $3, $4, NOW() )`,
//     values,
//     (q_err, q_res) => {
//       if (q_err) return next(q_err);
//       res.json(q_res.rows);
//     }
//   );
// });

indexRouter.put("/put/post", (req: Request, _res: Response) => {
  const values = [req.body.title, req.body.body, req.body.uid, req.body.pid, req.body.username];
  pool.query(
    `UPDATE posts SET title= $1, body=$2, user_id=$3, author=$5, date_created=NOW()
              WHERE pid = $4`,
    values,
    (q_err, q_res) => {
      console.log({ q_res });
      console.log({ q_err });
    }
  );
});

indexRouter.delete("/delete/postcomments", (req: Request, res: Response) => {
  const post_id = req.body.post_id;
  pool.query(
    `DELETE FROM comments
              WHERE post_id = $1`,
    [post_id],
    (q_err, q_res) => {
      res.json(q_res.rows);
      console.log({ q_err });
    }
  );
});

indexRouter.delete("/delete/post", (req: Request, res: Response) => {
  const post_id = req.body.post_id;
  pool.query(`DELETE FROM posts WHERE pid = $1`, [post_id], (q_err, q_res) => {
    res.json(q_res.rows);
    console.log({ q_err });
  });
});

/*
    COMMENTS ROUTES SECTION
*/

indexRouter.post("/post/commenttodb", (req: Request, res: Response) => {
  const values = [req.body.comment, req.body.user_id, req.body.username, req.body.post_id];

  pool.query(
    `INSERT INTO comments(comment, user_id, author, post_id, date_created)
              VALUES($1, $2, $3, $4, NOW())`,
    values,
    (q_err, q_res) => {
      res.json(q_res.rows);
      console.log({ q_err });
    }
  );
});

indexRouter.put("/put/commenttodb", (req: Request, res: Response) => {
  const values = [req.body.comment, req.body.user_id, req.body.post_id, req.body.username, req.body.cid];

  pool.query(
    `UPDATE comments SET
              comment = $1, user_id = $2, post_id = $3, author = $4, date_created=NOW()
              WHERE cid=$5`,
    values,
    (q_err, q_res) => {
      res.json(q_res.rows);
      console.log({ q_err });
    }
  );
});

indexRouter.delete("/delete/comment", (req: Request, res: Response) => {
  const cid = req.body.cid;

  pool.query(
    `DELETE FROM comments
              WHERE cid=$1`,
    [cid],
    (q_err, q_res) => {
      res.json(q_res.rows);
      console.log({ q_err });
    }
  );
});

indexRouter.get("/get/allpostcomments", (req: Request, res: Response) => {
  const post_id = String(req.query.post_id);
  console.log({ post_id });
  pool.query(
    `SELECT * FROM comments
              WHERE post_id=$1`,
    [post_id],
    (q_err, q_res) => {
      console.log(q_res);
      res.json(q_res.rows);
      console.log({ q_err });
    }
  );
});

/*
  USER PROFILE SECTION
*/

indexRouter.post("/posts/userprofiletodb", (req: Request, res: Response) => {
  const values = [req.body.profile.nickname, req.body.profile.email, req.body.profile.email_verified];
  pool.query(
    `INSERT INTO users(username, email, email_verified, date_created)
              VALUES($1, $2, $3, NOW())
              ON CONFLICT DO NOTHING`,
    values,
    (_q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

indexRouter.get("/get/userprofilefromdb", (req: Request, res: Response) => {
  const email = req.query.email;
  console.log({ email });
  pool.query(
    `SELECT * FROM users
              WHERE email=$1`,
    [email],
    (_q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

indexRouter.get("/get/userposts", (req: Request, res: Response) => {
  const user_id = req.query.user_id;
  console.log({ user_id });
  pool.query(
    `SELECT * FROM posts
              WHERE user_id=$1`,
    [user_id],
    (_q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

indexRouter.put("/put/likes", (req: Request, res: Response, next: NextFunction) => {
  const uid = [req.body.uid];
  const post_id = String(req.body.post_id);

  const values = [uid, post_id];
  console.log({ values });
  pool.query(
    `UPDATE posts
              SET like_user_id = like_user_id || $1, likes = likes + 1
              WHERE NOT (like_user_id @> $1)
              AND pid = ($2)`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      console.log({ q_res });
      res.json(q_res.rows);
    }
  );
});

//Search Posts
indexRouter.get("/get/searchpost", (req: Request, res: Response, next: NextFunction) => {
  const search_query = String(req.query.search_query);
  console.log(search_query);
  pool.query(
    `SELECT * FROM posts
              WHERE search_vector @@ to_tsquery($1)`,
    [search_query],
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

//Save posts to db
indexRouter.post("/post/posttodb", (req: Request, res: Response, next: NextFunction) => {
  const body_vector = String(req.body.body);
  const title_vector = String(req.body.title);
  const username_vector = String(req.body.username);

  const search_vector = [title_vector, body_vector, username_vector];
  const values = [req.body.title, req.body.body, search_vector, req.body.uid, req.body.username];
  pool.query(
    `INSERT INTO
              posts(title, body, search_vector, user_id, author, date_created)
              VALUES($1, $2, to_tsvector($3), $4, $5, NOW())`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

/* Retrieve another users profile from db based on username */
indexRouter.get("/get/otheruserprofilefromdb", (req: Request, res: Response) => {
  // const email = [ "%" + req.query.email + "%"]
  const username = String(req.query.username);
  pool.query(
    `SELECT * FROM users
              WHERE username = $1`,
    [username],
    (_q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

//Get another user's posts based on username
indexRouter.get("/get/otheruserposts", (req: Request, res: Response) => {
  const username = String(req.query.username);
  pool.query(
    `SELECT * FROM posts
              WHERE author = $1`,
    [username],
    (_q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

//Send Message to db
indexRouter.post("/post/messagetodb", (req: Request, res: Response, next: NextFunction) => {
  const from_username = String(req.body.message_sender);
  const to_username = String(req.body.message_to);
  const title = String(req.body.title);
  const body = String(req.body.body);

  const values = [from_username, to_username, title, body];
  pool.query(
    `INSERT INTO messages(message_sender, message_to, message_title, message_body, date_created)
              VALUES($1, $2, $3, $4, NOW())`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      console.log({ q_res });
      res.json(q_res.rows);
    }
  );
});

//Get another user's posts based on username
indexRouter.get("/get/usermessages", (req: Request, res: Response) => {
  const username = String(req.query.username);
  console.log(username);
  pool.query(
    `SELECT * FROM messages
              WHERE message_to = $1`,
    [username],
    (_q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

//Delete a message with the message id
indexRouter.delete("/delete/usermessage", (req: Request, res: Response, next: NextFunction) => {
  const mid = req.body.mid;
  pool.query(
    `DELETE FROM messages
              WHERE mid = $1`,
    [mid],
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      console.log(q_res);
      res.json(q_res.rows);
    }
  );
});

export default indexRouter;
