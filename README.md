# International News Project
##### A very real news site built with Django and React

---

View the live site [here!](https://internationalnewsproject.com)

### About this Project
International News Project is a satirical news site where all of the article content and images are created by OpenAI's GPT-3 and DALL·E, respectively. 


### Running
* [Install docker-compose](https://docs.docker.com/compose/install/#install-compose)
* Ensure `.env` is filled out in both the base directory and the frontend directory
* Create docker network: `docker network create docker-network`
    * I use a seperate nginx container as a reverse proxy, this ensures we can run locally without nginx
* `docker-compose up`


### Tools
* Django, React, PostgreSQL, NGINX, Docker
* Hosted on a VPS
---

