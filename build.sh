#!/bin/sh
curl -fsSL https://bun.sh/install | bash
~/.bun/bin/bun install
~/.bun/bin/bun run build