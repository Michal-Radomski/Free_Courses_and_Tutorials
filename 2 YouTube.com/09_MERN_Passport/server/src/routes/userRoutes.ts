import express, { NextFunction, Request, Response } from "express";
import passport from "passport";

import { deleteUser, getAllUsers, registerUser } from "../controllers/userControllers";
import { isAdministratorMiddleware } from "../middleware/middleware";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", passport.authenticate("local"), async (_req: Request, res: Response) => {
  res.send("Success");
});

router.get("/user", async (req: Request, res: Response) => {
  // res.send(req.user);
  res.status(200).json(req.user);
});

router.get("/logout", async (req: Request, res: Response, next: NextFunction) => {
  req.logout(async function (error) {
    if (error) {
      console.log({ error });
      return next(error);
    }
    await res.clearCookie("connect.sid"); //* It doesn't work
    await res.send("Success");
  });
});

router.post("/deleteuser", isAdministratorMiddleware, deleteUser);

router.get("/getallusers", isAdministratorMiddleware, getAllUsers);

export default router;
