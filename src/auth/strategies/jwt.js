import passport from 'passport';
import passportJWT from 'passport-jwt';

import User from '../../models/user';
import { signToken } from '../utils';

const JWTStrategy = passportJWT.Strategy;

export const strategy = () => {
  const strategyOptions = {
    jwtFromRequest: req => req.cookie.jwt,
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true
  };

  const verifyCallback = async (req, jwtPayload, cb) => {
    let user;
    try {
      // eslint-disable-next-line no-underscore-dangle
      user = await User.query().findById(jwtPayload.data.id);
      req.user = user;
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  };

  passport.use(new JWTStrategy(strategyOptions, verifyCallback));
};

export const login = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, { session: false }, err => {
      if (err) return reject(err);
      return resolve(signToken(user));
    });
  });
};
