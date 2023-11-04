FROM  python:3.10.9-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /app

EXPOSE 8000

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

