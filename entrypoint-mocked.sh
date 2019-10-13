#!/bin/bash
cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/
nodemon --inspect=0.0.0.0:56746 mock-responses.js

