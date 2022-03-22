FROM nginx

WORKDIR /usr/share/nginx/html
COPY . /code
RUN cp -r /code/build /usr/share/nginx/html

EXPOSE 80