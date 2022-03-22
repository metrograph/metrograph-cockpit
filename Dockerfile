FROM nginx

WORKDIR /usr/share/nginx
COPY ./build /usr/share/nginx/html

EXPOSE 80