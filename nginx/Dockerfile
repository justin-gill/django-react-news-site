FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

RUN mkdir /etc/nginx/ssl
COPY ssl/cert.pem /etc/nginx/ssl/cert.pem

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]

