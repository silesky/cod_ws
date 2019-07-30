#!/usr/bin/env sh
root=$(pwd)
cd server && npm i && npm run start:bin &
cd $root
cd client && npm i && npm run start &
cd $root
