# Django/React News Site
##### A template news site built with Django and React. Uses OpenAPI to generate content

---

This site is no longer hosted publically. 
![Picture of the landing page](https://github.com/justin-gill/international-news-project/assets/47087703/7626983e-69fe-429d-99c7-131925aedad4)

### About this Project
This project is a news site where all of the article content and images are created by OpenAI's GPT-3 and DALL·E, respectively. 


### Running
* [Install docker-compose](https://docs.docker.com/compose/install/#install-compose)
* Ensure `.env` is filled out in both the base directory and the frontend directory
* Create docker network: `docker network create docker-network`
    * I use a seperate nginx container as a reverse proxy, this ensures we can run locally without nginx
* `docker-compose up`


### Stack
* Django, React, PostgreSQL, NGINX, Docker
---

