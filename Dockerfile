FROM nginx

USER root
WORKDIR /usr/share/nginx

COPY ./build /usr/share/nginx/html
COPY ./set-env.sh /usr/share/nginx/html/
COPY ./config/nginx.default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
RUN chmod +x /usr/share/nginx/html/set-env.sh
CMD ["sh", "-c", "cd /usr/share/nginx/html/ && ./set-env.sh && nginx -g 'daemon off;'"]
