import * as Router from 'koa-router';
import * as HubCore from 'hub-node-core';
import { InMemoryStore } from 'hub-node-core';

// NOTE: substitute with real store module when available.
// For now using a test in-memory store module.
const store = InMemoryStore.get();
HubCore.initialize({store: store});

const router = new Router();
router.post('*', async ctx => {
  const hubKeyId = ctx.headers['hub-key-id'];
  const apiResponse = await HubCore.handleRequest(ctx.body, { hubKeyId: hubKeyId });

  ctx.response.body = apiResponse.getResponseBody();
  ctx.response.status = apiResponse.getResponseCode();
});

export { router };
