FROM nginx

WORKDIR /usr/share/nginx
COPY . /usr/share/nginx/html

EXPOSE 80