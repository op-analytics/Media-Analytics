clean-dev:
	docker-compose kill
	docker-compose rm -f

clean-prod:
	docker-compose -f docker-compose-prod.yml kill 
	docker-compose -f docker-compose-prod.yml rm -fv 

clean-dev-and-volumes: clean-dev
	docker volume rm nyt-media-analytics_nyta-db

clean-prod-and-volumes: clean-prod
	docker volume rm nyt-media-analytics_nyta-db

build-prod:
	docker-compose -f docker-compose-prod.yml build

start-containers: clean-dev
	docker-compose up --build

start-prod-containers: clean-prod
	docker-compose -f docker-compose-prod.yml up -d

test-back-end:
	docker-compose exec back-end pytest

test-front-end:
	docker-compose exec front-end npm run test

start-visualizer:
	docker run -it -d -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock dockersamples/visualizer
