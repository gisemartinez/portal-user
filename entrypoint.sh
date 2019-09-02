#!/bin/bash
cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/
ng build --watch &
npm run debug
