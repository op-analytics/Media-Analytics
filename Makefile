clean-containers:
	docker-compose kill
	docker-compose rm -f

start-containers: clean-containers
	docker-compose up -d

start-prod-containers: clean-containers
	docker-compose -f docker-compose-prod.yml up -d

test-back-end:
	docker-compose exec back-end pytest

test-front-end:
	docker-compose exec front-end npm run test

start-visualizer:
	docker run -it -d -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock dockersamples/visualizer
