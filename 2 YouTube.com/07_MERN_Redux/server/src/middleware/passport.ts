import passportJwt from "passport-jwt";
import { PassportStatic } from "passport";
import { Request } from "express";

import User from "../models/User";
import { JWT_KEY } from "../config/config";

const { Strategy } = passportJwt;

// For http only cookie system
const cookieExtractor = (req: Request) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies?.jwt;
  }
  return jwt;
};

const optionsCookie = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_KEY,
};

const JwtStrategy = (passport: PassportStatic) => {
  passport.use(
    new Strategy(optionsCookie, async (payload, done) => {
      console.log({ payload, done });
      await User.findById(payload.userId)
        .then((user) => {
          user ? done(null, user) : done(null, false);
        })
        .catch(() => done(null, false));
    })
  );
};

export default JwtStrategy;
