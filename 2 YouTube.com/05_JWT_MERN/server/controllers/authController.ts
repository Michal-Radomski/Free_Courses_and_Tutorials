import { Request, Response } from "express";
const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");

interface CustomError extends Error {
  errors: {
    properties: {
      path: string;
      message: string;
    };
  }[];
  message: string;
  code: number;
}

const privateKey = process.env.privateKey;
const maxAge = 2 * 24 * 60 * 60; // 2days
const createToken = (id: string) => {
  return jwt.sign(
    { id },
    privateKey,
    { algorithm: "RS256" },
    {
      expiresIn: maxAge,
    }
  );
};

const handleErrors = (err: CustomError) => {
  let errors = { email: "", password: "" };

  console.log(err);
  if (err.message === "Incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "Incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      (errors as any)[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    // console.log({ user });
    const token = createToken(user._id);
    // console.log({ token });
    res.cookie("jwt", token, {
      // withCredentials: true,
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    // console.log({ err });
    const errors = handleErrors(err as CustomError);
    console.log("errors:", errors);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, status: true });
  } catch (err) {
    const errors = handleErrors(err as CustomError);
    res.json({ errors, status: false });
  }
};
