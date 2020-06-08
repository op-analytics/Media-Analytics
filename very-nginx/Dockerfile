FROM camil/verynginx

COPY /verynginx.conf /etc/nginx/conf.d/

# Link access logs to stderr and stdout so docker logs work
RUN ln -sf /dev/stdout /usr/local/openresty/nginx/logs/access.log
RUN ln -sf /dev/stderr /usr/local/openresty/nginx/logs/error.log
