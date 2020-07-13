import * as utils from './utils';
import * as strategies from './strategies';

const pipe = (...functions) => args =>
  functions.reduce((arg, fn) => fn(arg), args);

export const initAuth = app => {
  utils.setup();
  pipe(strategies.JWTStratgey)(app);
};

export { utils, strategies };
