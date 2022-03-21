FROM nginx

WORKDIR /usr/share/nginx/html
COPY ./build /usr/share/nginx/html

EXPOSE 80
