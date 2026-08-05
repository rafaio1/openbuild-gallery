import { buildApp } from './app';
import { env } from './env';

const app = buildApp();

app
  .listen({ port: env.PORT, host: env.HOST })
  .then((address) => app.log.info(`OpenBuild Gallery API listening on ${address}`))
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    app.log.info(`${signal} received, shutting down`);
    app.close().then(() => process.exit(0));
  });
}
