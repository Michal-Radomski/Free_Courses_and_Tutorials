import passportLocal from "passport-local";
import bcrypt from "bcrypt";

import pool from "./dbConfig";
const LocalStrategy = passportLocal.Strategy;

const initializePassport = (passport: {
  use: (arg0: passportLocal.Strategy) => void;
  serializeUser: (arg0: (user: any, done: any) => void) => void;
  deserializeUser: (arg0: (id: string, done: any) => void) => void;
}) => {
  console.log("Passport is Initialized");

  const authenticateUser = (email: string, password: string, done: any) => {
    console.log(email, password);
    pool.query(`SELECT * FROM users WHERE email = $1`, [email], (error, results) => {
      if (error) {
        console.log({ error });
        throw error;
      }
      console.log(results.rows);

      if (results.rows.length > 0) {
        const user = results.rows[0];

        bcrypt.compare(password, user.password, (error, isMatch) => {
          if (error) {
            console.log({ error });
          }
          if (isMatch) {
            //* Oki
            return done(null, user);
          } else {
            // Password is incorrect
            return done(null, false, { message: "Password is incorrect" });
          }
        });
      } else {
        // No user
        return done(null, false, {
          message: "No user with that email address",
        });
      }
    });
  };

  passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, authenticateUser));

  // Stores user details inside session. SerializeUser determines which data of the user
  // object should be stored in the session. The result of the serializeUser method is attached
  // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
  // the user id as the key) req.session.passport.user = {id: 'xyz'}
  passport.serializeUser((user, done) => done(null, user.id));

  // In deserializeUser that key is matched with the in memory array / database or any data resource.
  // The fetched object is attached to the request object as req.user
  passport.deserializeUser((id, done) => {
    pool.query(`SELECT * FROM users WHERE id = $1`, [id], (error, results) => {
      if (error) {
        console.log({ error });
        return done(error);
      }
      console.log(`ID is ${results.rows[0].id}`);
      return done(null, results.rows[0]);
    });
  });
};

export default initializePassport;
