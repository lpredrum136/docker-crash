FROM nginx

# copy the CONTENT of current html folder to replace the CONTENT of the /usr/share/nginx/html
COPY html /usr/share/nginx/html