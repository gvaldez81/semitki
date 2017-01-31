# semitki

## Development setup


    git clone git@github.com:gvaldez81/semitki.git


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


    npm install -g bower
    cd semitki/front
    bower install


## Build container image


    git clone https://github.com/gvaldez81/semitki.git
    cd semitki/api
    docker build -t ecelis/semitki .


## Run in Docker with docker-compose


    cd semitki
    docker compose up


## Django App


If running in Docker, execute a bash shell within the container running
the web app.


    docker exec -it semitki_web_1 bash


Once in a shell running within the environment of the web application,
you can run commands of manage.py for the Django app.



    ENV/bin/python manage.py createsuperuser

