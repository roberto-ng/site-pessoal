#!/bin/sh
curl -fsSL https://bun.sh/install | bash
source /opt/buildhome/.bashrc
bun install
bun run build