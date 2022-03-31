---
title: Development Environment with Docker Compose
author: Fahad Ahammed
type: post
date: 2021-08-28T09:49:22+00:00
url: /development-environment-with-docker-compose/
featured_image: /wp-content/uploads/2021/08/pexels-photo-906494-825x510.jpeg
classic-editor-remember:
  - block-editor
categories:
  - Docker
  - Technology
tags:
  - docker
  - docker-compose
  - mongo in docker
  - mysql in docker
  - postgresql in docker
  - redis in docker
  - redis ui
  - redisInsight in docker
  - The best redis UI

---
There are a lot of tools I need to work with. Installing some tools in my workstation and bloating the system is not an option with limited memory capacity, specially in MacBook Air M1 with 8GB of ram. So, I am using docker when using those tools. The day to day life depends on these DB tools &#8211;

<!--more-->

  1. Redis
  2. MongoDB
  3. MySQL in Different Versions
  4. PostgreSQL

Running these in host system and managing the startup is tiresome. So, I generally use this compose file.

<pre class="EnlighterJSRAW" data-enlighter-language="yaml" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">version: '3.8'

networks:
  tools:

services:
  redis:
    image: 'redis:latest'
    ports:
      - 6379:6379
    networks:
      - tools
    environment:
      - TZ=Asia/Dhaka
    volumes:
      - ./data/redisdata:/data
    restart: on-failure

  redismodules:
    image: redislabs/redismod:latest
    ports:
      - 6380:6379
    networks:
      - tools
    volumes:
      - ./data/redismoddata:/data
    environment:
      - TZ=Asia/Dhaka
    restart: on-failure

  redisinsights:
    image: redislabs/redisinsight:latest
    ports:
      - 8001:8001
    networks:
      - tools
    environment:
      - TZ=Asia/Dhaka
    volumes:
      - ./data/redisinsightdata:/db

  mongodb:
    image: 'mongo:latest'
    ports:
      - 27017:27017
    networks:
      - tools
    volumes:
      - ./data/mongodata:/data/db
    restart: on-failure
    environment:
      - TZ=Asia/Dhaka

  postgresql:
    image: postgres
    restart: always
    ports:
      - 5432:5432
    networks:
      - tools
    volumes:
      - ./data/postgresdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=postgres
      - TZ=Asia/Dhaka

  mysql:
    image: mysql
    platform: linux/x86_64
    restart: always
    ports:
      - 3306:3306
    networks:
      - tools
    volumes:
      - ./data/mysqldata:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=mysql
      - MYSQL_DATABASE=tools
      - MYSQL_USER=mysql
      - MYSQL_PASSWORD=mysql
      - TZ=Asia/Dhaka

</pre>

You might see an extra parameter in mysql service- &#8220;platform: linux/x86_64&#8221;. It is because, as of mysql-8.0.26 docker image from docker hub, It doesn&#8217;t run in M1, so explicitly need to pass this platform parameter. I might be wrong about the root cause but that is what fixed the issue for me.

Also there is <a href="https://redis.com/redis-enterprise/redis-insight/" target="_blank" rel="noreferrer noopener">RedisInsight</a>, which is one of the most useful redis UI tool you can think of. I am loving it.

I will be updating the script when I will move or start using another important <a href="https://github.com/fahadahammed/tools" target="_blank" rel="noreferrer noopener">tool</a>.