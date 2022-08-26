import Router from '@koa/router';
import {
  loginUserHandler,
  registerUserHandler,
  createUserHandler
} from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';

const router = new Router();

router.post('/api/login', validate(loginUserSchema), loginUserHandler);
router.post('/api/register', validate(createUserSchema), registerUserHandler);
router.post('/api/user/create', validate(createUserSchema), createUserHandler);

export default router;