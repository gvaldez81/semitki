#!/bin/bash
cd /semitki
ENV/bin/pip install -r requirements.txt
cd /semitki/api
/semitki/ENV/bin/python /semitki/api/manage.py migrate --noinput
## uWSGI production app server
/semitki/ENV/bin/uwsgi --ini /semitki/config/emperor.ini
## Django development server
/semitki/ENV/bin/python /semitki/api/manage.py runserver 0.0.0.0:8000
