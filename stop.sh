#!/usr/bin/env sh
kill -9 `pgrep -f websocketd`
kill -9 `pgrep -f http-server`
