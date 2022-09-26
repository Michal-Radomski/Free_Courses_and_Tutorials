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
  res.send(req.user);
});

router.get("/logout", async (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (error) {
    if (error) {
      console.log({ error });
      return next(error);
    }
    res.send("Success");
  });
});

router.post("/deleteuser", isAdministratorMiddleware, deleteUser);

router.get("/getallusers", isAdministratorMiddleware, getAllUsers);

export default router;
