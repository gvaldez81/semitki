# semitki


[_![Shipping faster with ZenHub](https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png)](https://www.zenhub.com)
[ ![Codeship Status for semitki/semitki](https://app.codeship.com/projects/2b89f950-cac9-0134-a140-7e371e5d68a3/status?branch=master)](https://app.codeship.com/projects/199702)




## Development setup

Clone the code from github


    git clone git@github.com:semitki/semitki.git


### Tooling

Besides the code you'll need various tools.


  * [docker](https://www.docker.com/products/docker)
  * [docker-compose](https://docs.docker.com/compose/)
  * [virtualenv](https://virtualenv.pypa.io/en/stable/)
  * [NodeJS](https://nodejs.org/en/)
  * [Bower](https://bower.io/)
  * [Grunt](http://gruntjs.com/)


## Build container image


    cd semitki
    docker build -t semitki/semitki .


## Run in Docker with docker-compose


    cd semitki
    docker-compose up


Browse the API at http://127.0.0.1:8000 and the web frontend at
http://127.0.0.1:9080


### Backend development

We use:

* [Django](https://www.djangoproject.com/)
* [django-rest-framework](http://www.django-rest-framework.org/)
* [django-rest-auth](https://github.com/Tivix/django-rest-auth/)
* [django-rest-framework-jwt](http://getblimp.github.io/django-rest-framework-jwt/)


Run the API


    cd semitki/api
    virtualenv -p $(which python2.7) ENV
    . ENV/bin/activate
    pip install -U pip
    pip install -r requirements.txt

    ENV/bin/python manage runserver 0.0.0.0:8000
    ENV/bin/python manage migrate
    ENV/bin/python manage migrations sonetworks



### Frontend development


    npm install -g bower grunt-cli
    cd semitki/front
    npm install
    bower install
    grunt


Running grunt will create a `semitki/frontend/dist` directory which
should be accesable for an HTTP server. When running with
docker-compose `dist` gets mounted in the path
`/usr/share/nginx/html` within the web container.


## Django App


If running in Docker, execute a bash shell within the container running
the django app.


    docker exec -it semitki_app_1 bash


Once in a shell running within the environment of the web application,
you can run commands of manage.py for the Django app.



    ENV/bin/python manage.py createsuperuser

