FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

RUN mkdir /etc/nginx/ssl
COPY ssl/cert.pem /etc/nginx/ssl/cert.pem
COPY ssl/private.key /etc/nginx/ssl/private.key

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]

