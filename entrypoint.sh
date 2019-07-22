#!/bin/bash
cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/
exec ng build --watch
