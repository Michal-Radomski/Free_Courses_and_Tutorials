import { RequestHandler, Request, Response, NextFunction } from "express";
import createHttpError, { InternalServerError } from "http-errors";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User";
import { JWT_KEY, FRONTEND_URL } from "../config/config";

export const signupUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  //* Validation check by Validation files
  // if (password.length < 8) {
  //   console.log("Password must be at least 8 characters long");
  //   return next(createHttpError(400, "Password must be at least 8 characters long"));
  // }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createHttpError(422, "Email Already Exist!"));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword });
    // console.log({ salt, user });
    await user.save(); //* Can be: await User.create({ name, email, password: hashedPassword })

    res.json({ message: "User Created", user });
  } catch (error) {
    console.log({ error });
    return next(InternalServerError);
  }
};

export const signinUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(createHttpError(404, "User not Found!"));
    }
    // if (!user.isUserVerified) {
    //   return next(createHttpError(406, "User not Verified"));
    // }

    const isValidPassword: boolean = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return next(createHttpError(401, "Not Valid Password!"));
    }

    // res.json({ message: "User Logged In" });

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        userId: user.id,
      },
      JWT_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    // console.log({ token });

    res.cookie("jwt", token, { httpOnly: true });
    res.json({ message: "User Logged In", name: user.name, token });
  } catch (error) {
    console.log({ error });
    return next(InternalServerError);
  }
};

export const sendVerificationMail: RequestHandler = async (req, res, next) => {
  const { email }: { email: string } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "Email Not Valid!"));

    if (user.isUserVerified) return next(createHttpError(406, "User already verified"));

    const salt = await bcrypt.genSalt(10);
    const encryptedToken = await bcrypt.hash(user._id.toString(), salt);
    // console.log({ encryptedToken });

    const jwtToken = jwt.sign({ userId: user._id }, JWT_KEY as string, {
      expiresIn: "60m",
    });
    // console.log({ jwtToken });

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
    // res.json({ testAccount });

    let testAccount = {
      user: "lisandro.keeling@ethereal.email",
      pass: "4KpGXgmZFpwtX7aYQz",
    };

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, //* true for 465, false for other ports
      auth: {
        user: testAccount.user, // Generated ethereal user
        pass: testAccount.pass, // Generated ethereal password
      },
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Test Email" <test-mail-test-app@com.pl>', // Sender address
      to: `${email}`, // List of receivers
      subject: "For Email Verification", // Subject line
      text: "Hello world!", // Plain text body
      html: `Your Verification Link <a href="${FRONTEND_URL}/email-verify/${jwtToken}">Link</a>`, // HTML body
    });
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    await user.updateOne({ $set: { verifyToken: encryptedToken } });
    res.json({
      message: `Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`,
    });
  } catch (error) {
    console.log({ error });
    return next(InternalServerError);
  }
};
