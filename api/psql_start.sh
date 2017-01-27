#!/bin/bash

su -c '/usr/pgsql-9.6/bin/initdb /var/lib/pgsql/data/' postgres
su -c '/usr/pgsql-9.6/bin/pg_ctl start -D /var/lib/pgsql/data -s -o "-p 5432" -w -t 300' postgres
