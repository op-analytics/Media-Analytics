FROM nginx:1.15.9-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY /nginx.conf /etc/nginx/conf.d
COPY /certs/ma.crt /etc/ssl/ma.crt
COPY /certs/ma.key /etc/ssl/ma.key

