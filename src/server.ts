import * as Koa from 'koa';
import * as getRawBody from 'raw-body';
import { router } from './router';

const app = new Koa();

// Raw body parser.
app.use(async (ctx, next) => {
  ctx.body = await getRawBody(ctx.req);
  await next();
});

app
  .use(router.routes())
  .use(router.allowedMethods());

let port = 3000;
app.listen(port, () => {
  console.log(`Identity Hub running on port: ${port}`);
});
