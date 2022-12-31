import express from "express";

import { addUser, deleteUser, editUser, findUser, formPage, updateUser, viewUser, viewUsers } from "./userController";

const indexRouter: express.Router = express.Router();

indexRouter.get("/", viewUsers);
indexRouter.post("/", findUser);

indexRouter.get("/adduser", formPage);
indexRouter.post("/adduser", addUser);

indexRouter.get("/edituser/:id", editUser);
indexRouter.post("/edituser/:id", updateUser);

indexRouter.get("/:id", deleteUser);

indexRouter.get("/viewuser/:id", viewUser);

export default indexRouter;
