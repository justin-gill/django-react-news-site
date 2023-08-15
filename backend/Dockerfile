FROM  python:3.10.9-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /app

EXPOSE 8000

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# default, may be overwritten by dev
ENTRYPOINT ["python","manage.py"]

CMD ["runserver", "0.0.0.0:8000"]
# I need to run guinicorn in prod, runserver locally

