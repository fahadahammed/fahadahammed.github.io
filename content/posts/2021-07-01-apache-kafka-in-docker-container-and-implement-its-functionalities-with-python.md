---
title: Apache Kafka in Docker Container and Implement it’s Functionalities with Python
author: Fahad Ahammed
type: post
date: 2021-07-01T17:36:52+00:00
url: /apache-kafka-in-docker-container-and-implement-its-functionalities-with-python/
featured_image: 'https://images.unsplash.com/photo-1619110148608-34158557ae09?ixid=MnwxNzc4MTd8MHwxfGFsbHx8fHx8fHx8fDE2MjUxNTk3NDk&ixlib=rb-1.2.1&fm=jpg&q=85&fit=crop&w=825&h=510'
classic-editor-remember:
  - block-editor
categories:
  - programming
  - python
  - Technology
tags:
  - apache kafka
  - docker
  - docker-compose
  - kafka
  - python kakfa

---
According to the website, Apache Kafka is an open-source distributed event streaming platform used by thousands of companies for high-performance data pipelines, streaming analytics, data integration, and mission-critical applications.

<div class="wp-block-image">
  <figure class="aligncenter size-large"><a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2021/07/kafka_logo-simple.png?ssl=1"><img loading="lazy" width="117" height="65" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2021/07/kafka_logo-simple.png?resize=117%2C65&#038;ssl=1" alt="" class="wp-image-5415" data-recalc-dims="1" /></a></figure>
</div>

In this post, I am going to share a basic way to start using Apache Kafka with python.

<!--more--><figure class="wp-block-unsplash-image wp-block-image size-large">

<img loading="lazy" src="https://images.unsplash.com/photo-1619110148608-34158557ae09?ixid=MnwxNzc4MTd8MHwxfGFsbHx8fHx8fHx8fDE2MjUxNTk3NDk&ixlib=rb-1.2.1&fm=jpg&q=85&fit=crop&w=1024&h=768" alt="brown brick wall during daytime" class="wp-image-5414" width="1024" height="768" title="" srcset="https://images.unsplash.com/photo-1619110148608-34158557ae09?ixid=MnwxNzc4MTd8MHwxfGFsbHx8fHx8fHx8fDE2MjUxNTk3NDk&ixlib=rb-1.2.1&fm=jpg&q=85&fit=crop&w=300&h=225 300w, https://images.unsplash.com/photo-1619110148608-34158557ae09?ixid=MnwxNzc4MTd8MHwxfGFsbHx8fHx8fHx8fDE2MjUxNTk3NDk&ixlib=rb-1.2.1&fm=jpg&q=85&fit=crop&w=1024&h=768 1024w, https://images.unsplash.com/photo-1619110148608-34158557ae09?ixid=MnwxNzc4MTd8MHwxfGFsbHx8fHx8fHx8fDE2MjUxNTk3NDk&ixlib=rb-1.2.1&fm=jpg&q=85&fit=crop&w=150&h=112 150w, https://images.unsplash.com/photo-1619110148608-34158557ae09?ixid=MnwxNzc4MTd8MHwxfGFsbHx8fHx8fHx8fDE2MjUxNTk3NDk&ixlib=rb-1.2.1&fm=jpg&q=85&fit=crop&w=768&h=576 768w, https://images.unsplash.com/photo-1619110148608-34158557ae09?ixid=MnwxNzc4MTd8MHwxfGFsbHx8fHx8fHx8fDE2MjUxNTk3NDk&ixlib=rb-1.2.1&fm=jpg&q=85&fit=crop&w=1536&h=1152 1536w, https://images.unsplash.com/photo-1619110148608-34158557ae09?ixid=MnwxNzc4MTd8MHwxfGFsbHx8fHx8fHx8fDE2MjUxNTk3NDk&ixlib=rb-1.2.1&fm=jpg&q=85&fit=crop&w=2048&h=1536 2048w, https://images.unsplash.com/photo-1619110148608-34158557ae09?ixid=MnwxNzc4MTd8MHwxfGFsbHx8fHx8fHx8fDE2MjUxNTk3NDk&ixlib=rb-1.2.1&fm=jpg&q=85&fit=crop&w=825&h=510 825w" sizes="(max-width: 660px) 100vw, 660px" /> <figcaption>Photo by <a href="https://unsplash.com/@franciscodn5" rel="nofollow">Francisco De Nova</a> on <a href="https://unsplash.com/?utm_source=fahad-ahammed&#038;utm_medium=referral" rel="nofollow">Unsplash</a> </figcaption></figure> 

## What are the tools needed?

  * docker-compose

Docker compose will be used to run kafka and it&#8217;s dependencies.

  1. zookeeper
  2. kafka
  3. kafka-ui

The compose file-

<pre class="EnlighterJSRAW" data-enlighter-language="yaml" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">version: "2"

services:
  zookeeper:
    container_name: zookeeper
    image: docker.io/bitnami/zookeeper:3.7
    ports:
      - "2181:2181"
    volumes:
      - "zookeeper_data:/bitnami"
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes

  kafka:
    container_name: kafka
    image: docker.io/bitnami/kafka:2
    ports:
      - "9092:9092"
      - "9093:9093"
    volumes:
      - "kafka_data:/bitnami"
    environment:
      - ALLOW_PLAINTEXT_LISTENER=yes
      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CLIENT:PLAINTEXT,EXTERNAL:PLAINTEXT
      - KAFKA_CFG_LISTENERS=CLIENT://:9092,EXTERNAL://:9093
      - KAFKA_CFG_ADVERTISED_LISTENERS=CLIENT://kafka:9092,EXTERNAL://localhost:9093
      - KAFKA_INTER_BROKER_LISTENER_NAME=CLIENT
    depends_on:
      - zookeeper

  kafka-ui:
    image: provectuslabs/kafka-ui
    container_name: kafka-ui
    ports:
      - "18080:8080"
    restart: always
    environment:
      - KAFKA_CLUSTERS_0_NAME=local
      - KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS=kafka:9092
      - KAFKA_CLUSTERS_0_ZOOKEEPER=zookeeper:2181
    depends_on:
      - kafka
      - zookeeper

volumes:
  zookeeper_data:
    driver: local
  kafka_data:
    driver: local</pre>

As you can see, I have used zookeeper and kafka images from <a rel="noreferrer noopener" href="https://github.com/bitnami/bitnami-docker-kafka" data-type="URL" data-id="https://github.com/bitnami/bitnami-docker-kafka" target="_blank">bitnami</a>. To get a generic view of kafka instance, I have used an opensource project from Github. The project is called <a rel="noreferrer noopener" href="https://github.com/provectus/kafka-ui" data-type="URL" data-id="https://github.com/provectus/kafka-ui" target="_blank">kafka-ui</a> which is managed by <a rel="noreferrer noopener" href="https://provectus.com/" data-type="URL" data-id="https://provectus.com/" target="_blank">provectus</a>. It is a web ui which can be accessed via hosts localhost with the port of 18080, as you can see from the compose file.

Let you want to produce some message and ship it to kafka.

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""># kproducer.py
import datetime
from kafka import KafkaProducer
producer = KafkaProducer(bootstrap_servers='localhost:9093')

try:
    for _ in range(100):
        the_dt = str(datetime.datetime.utcnow())
        val = f"Count: {_} at {the_dt}".encode(encoding='utf8')
        producer.send(topic="KafkaExplored", value=val)
    producer.close()
except Exception as ex:
    print(ex)</pre>

for consuming &#8211;

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""># kconsumer.py
from kafka import KafkaConsumer
consumer = KafkaConsumer('KafkaExplored', bootstrap_servers='localhost:9093')

for msg in consumer:
    topic = msg[0]
    value = msg[6]
    print(msg)
    print(f"{topic}:{value.decode()}")</pre>

There are several kafka client for python, but I have used &#8211; **kafka-python**

First, you want to kconsumer.py and then from another terminal you can run the kproduce.py to produce the message.

In kconsumer.py terminal, you will get the messages &#8211;

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">ConsumerRecord(topic='KafkaExplored', partition=0, offset=98, timestamp=1625160633441, timestamp_type=0, key=None, value=b'Count: 98 at 2021-07-01 17:30:33.441293', headers=[], checksum=None, serialized_key_size=-1, serialized_value_size=39, serialized_header_size=-1)
KafkaExplored:Count: 98 at 2021-07-01 17:30:33.441293
ConsumerRecord(topic='KafkaExplored', partition=0, offset=99, timestamp=1625160633441, timestamp_type=0, key=None, value=b'Count: 99 at 2021-07-01 17:30:33.441448', headers=[], checksum=None, serialized_key_size=-1, serialized_value_size=39, serialized_header_size=-1)
KafkaExplored:Count: 99 at 2021-07-01 17:30:33.441448
</pre>

If you want to explore the api for accessing kafka using this kafka-python, you can look into <a href="https://kafka-python.readthedocs.io/en/master/apidoc/KafkaProducer.html" data-type="URL" data-id="https://kafka-python.readthedocs.io/en/master/apidoc/KafkaProducer.html" target="_blank" rel="noreferrer noopener">here</a>.