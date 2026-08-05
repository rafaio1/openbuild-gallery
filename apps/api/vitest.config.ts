import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // The invariant tests hit a real Postgres and run bursts of concurrent
    // requests; keep them serial across files so they don't fight over the DB.
    fileParallelism: false,
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
