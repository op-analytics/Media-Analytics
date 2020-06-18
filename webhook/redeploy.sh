#!bin/bash

docker-compose pull
docker-compose rm -fs
docker-compose up --build -d
