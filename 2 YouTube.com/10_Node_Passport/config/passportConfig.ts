import passportLocal from "passport-local";
const bcrypt = require("bcryptjs");

// Load User model
import UserSchema, { IUser } from "../models/User";

const LocalStrategy = passportLocal.Strategy;

const passportStrategy = (passport: {
  use: (arg0: passportLocal.Strategy) => void;
  serializeUser: (arg0: (user: any, done: any) => void) => void;
  deserializeUser: (arg0: (id: any, done: any) => void) => void;
}) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      UserSchema.findOne({
        email: email,
      }).then((user: IUser | null) => {
        if (!user) {
          return done(null, false);
        }

        // Match password check
        bcrypt.compare(password, user.password, (error: Error, isMatch: boolean) => {
          if (error) {
            console.log({ error });
            throw error;
          }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(function (id: string, done) {
    UserSchema.findById(id, function (error: Error, user: IUser) {
      done(error, user);
    });
  });
};

export default passportStrategy;
