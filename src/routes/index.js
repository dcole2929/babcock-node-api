import { Router } from 'express';
// import auth from './auth';

const router = Router();

/**
 * @swagger
 * /:
 *  get:
 *    description: Returns the homepage
 *    responses:
 *      '200':
 *        description: hello world
 */
router.get('/', (req, res) => {
  res.send('Hello World');
});

// router.use('/auth', auth);

export default router;
