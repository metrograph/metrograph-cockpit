FROM nginx

WORKDIR /usr/share/nginx

COPY ./build /usr/share/nginx/html
COPY ./config/nginx.default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
