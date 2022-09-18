import { Router } from "express";

import {
  sendForgotPasswordMailValidation,
  sendVerificationMailValidation,
  signinUserValidation,
  signupUserValidation,
  verifyForgotMailValidation,
  verifyUserMailValidation,
} from "../validation/userValidation/userValidation";

import {
  sendForgotPasswordMail,
  sendVerificationMail,
  signinUser,
  signupUser,
  verifyForgotMail,
  verifyUserMail,
} from "../controllers/userController";

const router = Router();

router.post("/signup", signupUserValidation, signupUser);
router.post("/signin", signinUserValidation, signinUser);

router.post("/send-verification-mail", sendVerificationMailValidation, sendVerificationMail);

router.post("/verify-user-mail", verifyUserMailValidation, verifyUserMail);

router.post("/verify-forgot-mail", verifyForgotMailValidation, verifyForgotMail);
router.post("/forgot-password", sendForgotPasswordMailValidation, sendForgotPasswordMail);

export default router;
