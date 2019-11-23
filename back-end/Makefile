run-dev:
	python manage.py run -h 0.0.0.0

start-env:
	pipenv install && pipenv shell

documentation:
	sphinx-apidoc -f -o docs/source app **/*test*
	make -C docs/ html
	xdg-open docs/generated-docs/html/index.html
