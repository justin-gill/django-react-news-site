FROM  python:3.10.9-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /backend

# copy from the current directory of the Dockerfile to /bakend in the image
COPY . . 

RUN pip install -r requirements.txt

EXPOSE 8000