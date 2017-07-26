# semitki


[![Shipping faster with ZenHub](https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png)](https://www.zenhub.com)
[![Codeship Status for semitki/semitki](https://app.codeship.com/projects/2b89f950-cac9-0134-a140-7e371e5d68a3/status?branch=master)](https://app.codeship.com/projects/199702)
[![Codacy
Badge](https://api.codacy.com/project/badge/Grade/cda75ec3b3174abe9530dcb3ffaddba3)](https://www.codacy.com/app/semitki/semitki?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=semitki/semitki&amp;utm_campaign=Badge_Grade)

## Notes

Python rest_framework_jwt module throws `Invalid payload` beacause
missing username in Facebook social authentication, the module is
patched to get around this validation. But better to check and fix it
ASAP.

Patches are located in `semitki/patches` directory and applied at
container build.


## Requirements

Front-end heavily relies on JavaScript 1.6 (ECMAScript 6), web browser
requiremenst follow, any version number below or not listed, please
check the compatibility table link.

* Firefox => 52
* Chrome => 56
* Edge => 13
* Safari => 10
* iOS => 10

[Compatibility table](http://kangax.github.io/compat-table/es6/)


## Development setup

Clone the code from github


    git clone git@github.com:semitki/semitki.git


### Settings

Copy the sample configuration files and edit accordingly.


    cp semitki/variables.env.sample semitki/variables.env
    cp semitki/front/config.js.sample semitki/front/config.js


### Tooling

Besides the code you'll need various tools.


  * [docker](https://www.docker.com/products/docker)
  * [docker-compose](https://docs.docker.com/compose/)
  * [NodeJS](https://nodejs.org/en/)
  * [Bower](https://bower.io/)
  * [Grunt](http://gruntjs.com/)


## Build API container image


    cd semitki/api
    docker build -t semitki_app .


Push image to public docker registry


    docker push semitki/api


## Run in Docker with docker-compose


    cd semitki
    docker-compose up


Browse the API at http://127.0.0.1:3031 and the web frontend at
http://127.0.0.1


### Backend development

We use (among others, check requirements.txt):

* [Django](https://www.djangoproject.com/)
* [django-rest-framework](http://www.django-rest-framework.org/)
* [django-rest-framework-scoial-oauth2](https://github.com/PhilipGarnero/django-rest-framework-social-oauth2)
* [django-rest-framework-jwt](http://getblimp.github.io/django-rest-framework-jwt/)


### Frontend development


    npm install -g bower grunt-cli less
    cd semitki/front
    npm install
    bower install
    cd bootstrap-material-design
    npm install
    bower install
    grunt
    cd ..
    grunt
    grunt watch


Bootstrap material design shoud be built first in order to get the right
visual styles.

Running grunt will create a `semitki/frontend/dist` directory which
should be accesable by an HTTP server. When running with docker-compose
`dist` gets mounted in the path `/usr/share/nginx/html` within the web
container.

Some grunt tasks have both `development` and `production` targets, the
default is to execute development targets.

`grunt watch` will trigger the default task everytime a file under
`front` directory changes.


#### Adding new bower components

Every time you install a new component through bower, make sure to add
`--save` option in order to update `bower.json` with the new dependency.


    bower install --save
    git commit -m"My new bower component" front/bower.json


## About buckets

In semitki buckets are any channel to spread the marketing campaign
through.

[requests-oauth](https://github.com/requests/requests-oauthlib) is the
library which abstracts most of the operations behind.

In order to add copy one of the existing `buckets` with a new name and
edit it to suit the new marketing channel.


## Django App


If running in Docker, execute a bash shell within the container running
the django app.


    docker exec -it semitki_app_1 bash


Once in a shell running within the environment of the web application,
you can run commands of manage.py for the Django app.



    ENV/bin/python manage.py createsuperuser


## Misc notes


### Avoid received a naive datetime while time zone support is enabled

Set `TIME_ZONE = False` in `settings.py` and use something like the code
below for date comparison.


    from django.utils.timezone import utc

    datetime.utcnow().replace(tzinfo=utc)


### Install graphtool


_Requires graphviz installed_


    pip install django-extensions


    INSTALLED_APPS = (
    ...
    'django_extensions',
    )


    manage.py graph_models --pygraphviz -a -g -o my_project_visualized.png

