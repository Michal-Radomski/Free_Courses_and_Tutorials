import { Router } from "express";

import { signinUserValidation, signupUserValidation } from "../validation/userValidation/userValidation";
import { signinUser, signupUser } from "../controllers/userController";

const router = Router();

router.post("/signup", signupUserValidation, signupUser);
router.post("/signin", signinUserValidation, signinUser);

export default router;
