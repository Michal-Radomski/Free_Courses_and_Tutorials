import passportLocal from "passport-local";
import bcrypt from "bcryptjs";

import User, { UserInterface } from "../models/User";

const LocalStrategy = passportLocal.Strategy;

interface CustomUser extends Express.User {
  _id?: string;
}

const passportConfig = (passport: {
  use: (arg0: passportLocal.Strategy) => void;
  serializeUser: (arg0: (user: CustomUser, cb: any) => void) => void;
  deserializeUser: (arg0: (id: string, cb: any) => void) => void;
}) => {
  passport.use(
    new LocalStrategy((username: string, password: string, done) => {
      User.findOne({ username: username }, (error: Error, user: UserInterface) => {
        if (error) throw error;
        if (!user) return done(null, false);

        bcrypt.compare(password, user.password, (error, result: boolean) => {
          if (error) throw error;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user: CustomUser, cb) => {
    cb(null, user._id);
  });

  passport.deserializeUser((id: string, cb) => {
    User.findOne({ _id: id }, (error: Error, user: UserInterface) => {
      const userInformation = {
        username: user.username,
        isAdmin: user.isAdmin,
        id: user._id,
      };
      // console.log({ userInformation });
      cb(error, userInformation);
    });
  });
};

export default passportConfig;
