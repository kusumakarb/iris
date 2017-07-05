'use strict';

module.exports = server => {
  const router = server.loopback.Router();
  // Install a `/status` route that returns server status
  router.get('/status', server.loopback.status());
  server.use(router);
};
