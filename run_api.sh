#!/bin/bash
cd /semitki
ENV/bin/pip install -r requirements.txt
cd /semitki/api
/semitki/ENV/bin/python /semitki/api/manage.py migrate
/semitki/ENV/bin/python /semitki/api/manage.py runserver 0.0.0.0:8000
