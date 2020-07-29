import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/user';

export const setup = () => {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.query().findById(id);
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  });
};

export const signToken = user =>
  jwt.sign({ data: user }, process.env.JWT_SECRET, {
    expiresIn: 604800,
  });

export const hashPassword = async password => {
  if (!password) {
    throw new Error('Password was not provided');
  }

  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = async (candidate, actual) => {
  return bcrypt.compare(candidate, actual);
};
