import * as Router from 'koa-router';
import Hub from 'hub-node-core';
import { InMemoryStore } from 'hub-node-core';

// NOTE: substitute with real store module when available.
// For now assuming a test in-memory store module in hub-node-core to illustrate the architecture.
const store = InMemoryStore.get();
const hub = new Hub({store: store});

const router = new Router();
router.post('*', async ctx => {
  const hubKeyId = ctx.headers['hub-key-id'];
  const apiResponse = await hub.handleRequest(ctx.body, { hubKeyId: hubKeyId });

  ctx.response.body = apiResponse.getResponseBody();
  ctx.response.status = apiResponse.getResponseCode();
});

export { router };
