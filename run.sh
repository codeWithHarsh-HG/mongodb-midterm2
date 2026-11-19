#!/usr/bin/env sh
set -eu

mongosh < cafe-sales.js
mongosh < library.js
