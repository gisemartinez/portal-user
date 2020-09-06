#!/bin/bash
cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/
tsc
#"debug": "nodemon --inspect=0.0.0.0:56745 server/server.js && ng build --watch",
npm run debug
