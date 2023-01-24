# docker/backend/Dockerfile

FROM python:3.10.9-alpine

WORKDIR /app
ADD ./backend/requirements.txt /app/backend/

RUN apk update
RUN apk add postgresql-dev gcc python3-dev musl-dev

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt

ADD ./docker /app/docker
ADD ./backend /app/backend
