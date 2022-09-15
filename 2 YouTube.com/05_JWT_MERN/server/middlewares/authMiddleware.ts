const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

const User = require("../model/UserModel");

const publicKey = process.env.publicKey;

module.exports.checkUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  // console.log({ token });
  if (token) {
    jwt.verify(token, publicKey, { algorithm: "RS256" }, async (err: string, decodedToken: { id: string }) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) res.json({ status: true, user: user.email });
        else res.json({ status: false });
        next();
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};
