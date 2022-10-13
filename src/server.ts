import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import cookie from 'koa-cookie';
import logger from 'koa-logger';
import { initializeAppDataSource } from './data-source';
import authRouter from './routes/auth.routes';
import adminRouter from './routes/admin.routes';
import { catchUnhandledError } from './utils/error.handling';

initializeAppDataSource(() => {
  const app = new Koa();

  const PORT = process.env.PORT || 7654;

  app
    .use(bodyParser())
    .use(cors({ credentials: true }))
    .use(cookie())
    .use(logger())
    .use(catchUnhandledError)
    .use(authRouter.routes())
    .use(adminRouter.routes())
    .listen(PORT, async () => {
      console.log(`🚀 Server listening on port: ${PORT} 🚀`);
    })
    .on('error', (err) => {
      console.error(err);
    });
});
