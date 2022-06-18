#!/bin/sh

# Substitute container environment into production packaged webapp

cp -f /usr/share/nginx/html/index.html /tmp
sed -i -e "s|REPLACE_API_URI|${API_URI}|g" /tmp/index.html
sed -i -e "s|REPLACE_API_PORT|${API_PORT}|g" /tmp/index.html
cat /tmp/index.html > /usr/share/nginx/html/index.html
