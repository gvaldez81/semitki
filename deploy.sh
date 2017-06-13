#!/bin/sh
APP_BASE=/opt/semitki
APP_API=$APP_BASE/api
APP_FRONT=$APP_BASE/front
cd $APP_BASE
git pull
cd $APP_FRONT
npm install
bower install
grunt
cd $APP_BASE
sudo docker-compose up -d
# sudo docker-compose up -d --build
