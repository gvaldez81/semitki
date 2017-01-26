# semitki

## Development setup


    git clone https://github.com/gvaldez81/semitki.git
    cd semitki/api
    virtualenv ENV
    . ENV/bin/activate
    pip install -r requirements.txt


## Build container image


    git clone https://github.com/gvaldez81/semitki.git
    cd semitki/api
    docker build -t ecelis/semitki .


## Run app


    docker run -v $(pwd):/semitki ecelis/semitki
