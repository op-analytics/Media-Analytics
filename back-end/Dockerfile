# base image
FROM python:3.7

# set working directory
WORKDIR /usr/src/app

# add and install requirements
RUN pip install pipenv
RUN apt-get update -y # Update so i can install net cat
RUN apt-get install netcat-traditional # Install net cat

COPY ./Pipfile /usr/src/app/Pipfile
COPY ./Pipfile.lock /usr/src/app/Pipfile.lock
RUN pipenv install --system --dev

# add entrypoint.sh
COPY ./entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# add app
COPY . /usr/src/app

# run server
CMD ["/usr/src/app/entrypoint.sh"]
