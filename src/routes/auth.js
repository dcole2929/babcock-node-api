import express from 'express';
import { to } from 'await-to-js';
import { verifyPassword, hashPassword } from '../auth/utils';
import { login } from '../auth/strategies/jwt';
import User from '../models/user';
import validations from '../lib/validate';

const router = express.Router();

/**
 * @swagger
 * /login:
 *  post:
 *    description: authenticates the user via email and password
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *        required:
 *          - email
 *          - password
 *    responses:
 *      '200':
 *        description: hello world
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const [, user] = await to(User.query().where('email', email));

  const authenticationError = () => {
    return res
      .status(500)
      .json({ success: false, data: 'Authentication error!' });
  };

  if (!(await verifyPassword(password, user.password))) {
    console.error('Passwords do not match'); // eslint-disable-line no-console
    return authenticationError;
  }

  const [loginErr, token] = await to(login(req, user));

  if (loginErr) {
    console.error('Log in error', loginErr); // eslint-disable-line no-console
    return authenticationError;
  }

  return res
    .status(200)
    .cookie('jwt', token, { httpOnly: true })
    .json({ success: true, data: '/' });
});

/**
 * @swagger
 * /register
 *  post:
 *    description: register a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *        schema:
 *          type: object
 *          properties:
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *        required:
 *          - firstName
 *          - lastName
 *          - email
 *          - password
 *    responses:
 *      '200':
 *        description: hello world
 */
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const emailRegExp = new RegExp(validations.email);
  if (!emailRegExp.test(email)) {
    return res
      .status(500)
      .json({ success: false, data: 'Enter a valid email address.' });
  }

  const [createErr, user] = await to(
    User.query().insert({
      firstName,
      lastName,
      email,
      password: await hashPassword(password)
    })
  );

  if (createErr)
    return res
      .status(500)
      .json({ success: true, data: 'Email is already taken' });

  const [loginErr, token] = await to(login(req, user));

  if (loginErr) {
    console.error(loginErr); // eslint-disable-line no-console
    return res
      .status(500)
      .json({ success: false, data: 'Authentication error!' });
  }

  return res
    .status(200)
    .cookie('jwt', token, { httpOnly: true })
    .json({ success: true, data: '/' });
});
