#!/bin/sh

echo "Waiting for MONGODB..."

while ! nc -z db 27017; do
  sleep 0.1
done

echo "MONGODB started"

gunicorn -b 0.0.0.0:5000 manage:app
