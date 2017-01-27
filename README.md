# semitki

## Development setup


    git clone https://github.com/gvaldez81/semitki.git
    cd semitki/api
    virtualenv -p $(which python2.7) ENV
    . ENV/bin/activate
    pip install -U pip
    pip install -r requirements.txt


## Build container image


    git clone https://github.com/gvaldez81/semitki.git
    cd semitki/api
    docker build -t ecelis/semitki .


## Run app


    docker run -v $(pwd):/semitki -p 8000:8000 ecelis/semitki bash
