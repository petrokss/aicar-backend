import Router from '@koa/router';
import {
  loginUserHandler,
  registerUserHandler
} from '../controllers/auth.controller';
import { Role } from '../entity/User';
import { validate, validateUserRole, checkToken } from '../middlewares';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';

const router = new Router();

router.get(
  '/api/test',
  (ctx) => (ctx.body = { message: 'Connected to server successfully' })
);
router.post('/api/login', validate(loginUserSchema), loginUserHandler);
router.post('/api/register', validate(createUserSchema), registerUserHandler);

router.post(
  '/api/user',
  checkToken,
  validateUserRole(Role.ADMIN),
  validate(createUserSchema),
  registerUserHandler
);

export default router;
