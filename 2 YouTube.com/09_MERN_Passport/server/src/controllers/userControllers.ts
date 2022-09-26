import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcryptjs";

import User, { UserInterface } from "../models/User";

export const registerUser: RequestHandler = async (req: Request, res: Response) => {
  const { username, password } = req?.body;
  if (!username || !password || typeof username !== "string" || typeof password !== "string") {
    res.send("Improper Values");
    return;
  }
  User.findOne({ username }, async (error: Error, doc: UserInterface) => {
    if (error) {
      console.log({ error });
      throw error;
    }
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username: username,
        password: hashedPassword,
      });
      await newUser.save();
      // res.send("success");
      res.status(201).json({ newUser });
    }
  });
};

// const isAdministratorMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const { user }: any = req;
//   if (user) {
//     User.findOne({ username: user.username }, (err, doc: DatabaseUserInterface) => {
//       if (err) throw err;
//       if (doc?.isAdmin) {
//         next();
//       }
//       else {
//         res.send("Sorry, only admin's can perform this.")
//       }
//     })
//   }
//   else {
//     res.send("Sorry, you arent logged in.")
//   }
// }

// app.post("/login", passport.authenticate("local"), (req, res) => {
//   res.send("success")
// });

// app.get("/user", (req, res) => {
//   res.send(req.user);
// });

// app.get("/logout", (req, res) => {
//   req.logout();
//   res.send("success")
// });

// app.post("/deleteuser", isAdministratorMiddleware, async (req, res) => {
//   const { id } = req?.body;
//   await User.findByIdAndDelete(id, (err) => {
//     if (err) throw err;
//   });
//   res.send("success");
// });

// app.get("/getallusers", isAdministratorMiddleware, async (req, res) => {
//   await User.find({}, (err, data: DatabaseUserInterface[]) => {
//     if (err) throw err;
//     const filteredUsers: UserInterface[] = [];
//     data.forEach((item: DatabaseUserInterface) => {
//       const userInformation = {
//         id: item._id,
//         username: item.username,
//         isAdmin: item.isAdmin
//       }
//       filteredUsers.push(userInformation);
//     });
//     res.send(filteredUsers);
//   })
// });
