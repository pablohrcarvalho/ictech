#!/usr/bin/env bash
# Build step for the ic_tech presentation.
# Pre-compiles src/app.jsx -> build/app.js (plain React.createElement calls).
# No in-browser Babel at runtime: the page just loads vendored React + build/app.js.
#
# Usage:  ./build.sh
# Requires: .build-tools/ (run setup once — see README-BUILD.md)

set -euo pipefail
cd "$(dirname "$0")"

BABEL="./.build-tools/node_modules/.bin/babel"
PRESET="./.build-tools/node_modules/@babel/preset-react"

if [ ! -x "$BABEL" ]; then
  echo "Build tools missing. Run setup first:"
  echo "  cd .build-tools && npm install"
  exit 1
fi

mkdir -p build
"$BABEL" src/app.jsx --presets "$PRESET" --out-file build/app.js
echo "Built build/app.js ($(wc -c < build/app.js | tr -d ' ') bytes)"
