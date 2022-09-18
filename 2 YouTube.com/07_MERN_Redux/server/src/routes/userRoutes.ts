import { Router } from "express";

import { signinUserValidation } from "./../validation/userValidation/userValidator";
import { signinUser, signupUser } from "../controllers/userController";

const router = Router();

router.post("/signup", signinUserValidation, signupUser);
router.post("/signin", signinUserValidation, signinUser);

export default router;
