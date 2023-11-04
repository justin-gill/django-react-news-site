#!/bin/bash
docker exec $(docker ps -aqf "name=inp-backend") python manage.py create_fake_articles 1

