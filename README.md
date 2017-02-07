# semitki


<a href="https://zenhub.com"><img
src="https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png"></a>


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



### Backend development


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


## Django App


If running in Docker, execute a bash shell within the container running
the web app.


    docker exec -it semitki_web_1 bash


Once in a shell running within the environment of the web application,
you can run commands of manage.py for the Django app.



    ENV/bin/python manage.py createsuperuser

