#!bin/bash

docker-compose -f docker-compose-prod.yml pull
docker-compose -f docker-compose-prod.yml rm -fs
docker-compose -f docker-compose-prod.yml up --build -d
