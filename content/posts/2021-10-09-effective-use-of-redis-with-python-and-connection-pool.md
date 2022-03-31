---
title: Effective use of Redis with Python and Connection Pool
author: Fahad Ahammed
type: post
date: 2021-10-09T06:19:57+00:00
url: /effective-use-of-redis-with-python-and-connection-pool/
featured_image: /wp-content/uploads/2021/10/pexels-photo-276502-825x510.jpeg
classic-editor-remember:
  - block-editor
categories:
  - programming
  - python
  - Technology
tags:
  - pipeline with redis python
  - python
  - redis
  - redis connection pool

---
I have been working with redis and python for sometime. It is fun to play with python and redis. There are so many things can be solved by redis.

  * Session persistency
  * Caching
  * Volatile Datastore
  * Job or Message Queue
  * Search

And many more. But recently I was thinking about using it as main database. I am not yet sure what kind of problem I might face or what things to optimize when it is about scalability or reliability. I will for sure share my experience.

Here I want to talk about &#8211;

<!--more-->

connection pool of redis. 

I was using: <a href="https://pypi.org/project/redis/" target="_blank" rel="noreferrer noopener">https://pypi.org/project/redis/</a>

The code block that works &#8211;

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">import redis


def get_data(the_key):
    r = redis.Redis(host='localhost', port=6379, db=0)
    return r.get(the_key)</pre>

Whenever you will call the function _get_data_ you will be able to get the value of a key passed to the function. But as soon as the function is called by 100s of users, it will show problem though it is not so heavy operation, just read the data and pass.

The problem is every call of the function creates a connection to redis and it has limit. To solve this problem, you need to use existing connection or limited connections to do the operation. Main idea is to use a connection pool which will keep a connection for sometime and handle several operations on that connection. No new connection for every operation.

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">import redis
pool = redis.ConnectionPool(host='localhost', port=6379, db=0)

def get_data(the_key):
    r = redis.Redis(connection_pool=pool, decode_responses=True)
    return r.get(the_key)</pre>

There is another way to do that. Let&#8217;s say we have multiple command to make in the redis database.

Let&#8217;s say, you want to keep track of the hit count of the key.

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">import redis
pool = redis.ConnectionPool(host='localhost', port=6379, db=0)

def get_data(the_key):
    r = redis.Redis(connection_pool=pool, decode_responses=True)
    r.incr(f"{the_key}_hit")
    return r.get(the_key)</pre>

Here, two commands get executed using two times calling the **r**. But we can execute both in a single request.

Heres comes redis pipe.

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">import redis
pool = redis.ConnectionPool(host='localhost', port=6379, db=0)

def get_data(the_key):
    r = redis.Redis(connection_pool=pool, decode_responses=True)
    pipe = r.pipeline()
    return pipe.get(the_key).incr(f"{the_key}_hit").execute()</pre>

Now the return will have different result.

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">>>> get_data("name")
[b'fahad', 7]</pre>

There are many more configuration option to make your redis use pleasant in the long run. I will try to share my experience in future. Thank you for reading.