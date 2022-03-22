FROM nginx

WORKDIR /usr/share/nginx
COPY ./build /usr/share/nginx/html
#COPY ./config/nginx.default.conf /etc/nginx/nginx.conf

EXPOSE 80
