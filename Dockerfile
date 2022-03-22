FROM nginx

WORKDIR /usr/share/nginx

COPY . ./
RUN ls -R
RUN cp -r ./build/ /usr/share/nginx/html/

COPY ./build/ /usr/share/nginx/html/

EXPOSE 80