#!/bin/sh
cd /opt/semitki
git pull
cd front
npm install
bower install
grunt
cd ..
docker-compose up -d
#docker-compose up -d --build
