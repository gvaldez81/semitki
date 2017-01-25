# semitki


    git clone https://github.com/gvaldez81/semitki.git
    cd semitki


## Build container image


    docker build -t ecelis/semitki .


## Run app


    docker run -v $(pwd):/semitki ecelis/semitki
