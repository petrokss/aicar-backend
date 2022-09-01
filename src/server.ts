import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import logger from 'koa-logger';
import { initializeAppDataSource } from './data-source';
import authRouter from './routes/auth.routes';
import { catchUnhandledError } from './utils/error.handling';

initializeAppDataSource(() => {
  const app = new Koa();

  const PORT = process.env.PORT || 7654;

  app
    .use(bodyParser())
    .use(cors())
    .use(logger())
    .use(catchUnhandledError)
    .use(authRouter.routes())
    .listen(PORT, async () => {
      console.log(`🚀 Server listening on port: ${PORT} 🚀`);
    })
    .on('error', (err) => {
      console.error(err);
    });
});
