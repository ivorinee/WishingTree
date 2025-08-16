import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  findUserByEmail,
  findUserById,
  validatePassword,
} from "../models/userModel.js";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await findUserByEmail(email);
        if (!user) {
          return done(null, false, {
            message:
              "This email is not registered. Please sign up or try again.",
          });
        }

        const isValid = await validatePassword(password, user.password);
        if (!isValid) {
          return done(null, false, {
            message: "Invalid password. Please try again.",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
