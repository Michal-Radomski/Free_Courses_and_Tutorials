import { Router } from "express";

import { signinUserValidation, signupUserValidation } from "../validation/userValidation/userValidation";
import { sendVerificationMail, signinUser, signupUser } from "../controllers/userController";

const router = Router();

router.post("/signup", signupUserValidation, signupUser);
router.post("/signin", signinUserValidation, signinUser);

router.post("/send-verification-mail", sendVerificationMail);

export default router;
