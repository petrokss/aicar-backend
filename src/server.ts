import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import logger from "koa-logger";

const app = new Koa();

const PORT = process.env.PORT || 7654;

app.use(bodyParser()).use(cors()).use(logger());

const server = app
  .listen(PORT, async () => {
    console.log(`🚀 Server listening on port: ${PORT} 🚀`);
  })
  .on("error", err => {
    console.error(err);
  });

export default server;