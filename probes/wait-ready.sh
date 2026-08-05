#!/usr/bin/env bash
# Poll a readiness URL until it returns 200, or give up. Used in CI before the probe.
set -euo pipefail
URL="${1:-http://localhost:3000/readyz}"
ATTEMPTS="${2:-60}"
for i in $(seq 1 "$ATTEMPTS"); do
  if curl -fsS "$URL" >/dev/null 2>&1; then
    echo "ready: $URL"
    exit 0
  fi
  sleep 1
done
echo "timed out waiting for $URL after ${ATTEMPTS}s" >&2
exit 1
