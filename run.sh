#!/bin/bash
cd /home/gerri/cronJobs/
python readGoogleSheet.py > /home/gerri/cronJobs/salidas/$(date +"%Y_%m_%d_%I_%M_%p").log
