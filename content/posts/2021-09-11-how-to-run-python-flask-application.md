---
title: How to run Python Flask Application?
author: Fahad Ahammed
type: post
date: 2021-09-11T11:15:10+00:00
url: /how-to-run-python-flask-application/
featured_image: /wp-content/uploads/2021/09/pexels-photo-844297-825x510.jpeg
classic-editor-remember:
  - block-editor
categories:
  - programming
  - python
  - Technology
tags:
  - gunicorn
  - gunicorn to run flask application
  - python
  - python flask
  - python3
  - uwsgi
  - uwsgi log file config
  - uwsgi to run flask application

---
I mostly use Python Flask when I need to develop a Web App or API. 

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img src="https://i0.wp.com/flask.palletsprojects.com/en/2.0.x/_images/flask-logo.png?w=660&#038;ssl=1" alt="" data-recalc-dims="1" /></figure>
</div>

Why? Because it is:

  * lightweight
  * Very Flexible
  * Micro-Service Friendly
  * Fast Development

These are one of the main reasons I choose Flask. But mostly I love to code with Flask. There are so many ways to run flask applications. I will write some of them here with code examples.

<!--more-->

Let us assume a micro web application named _mweb.py_ having code &#8211;

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "&lt;p>Hello, World!&lt;/p>"


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=7557
    )</pre>

I can run this application with several ways.

## Way 1: Run Flask application with flask command itself

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">$ flask run</pre>

or

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">$ python3 -m flask run</pre>

But both of them Will run with default flask port, which is 5000, instead of the port mentioned in the code. If we run this way, we can change the port by passing &#8211;host and &#8211;port parameter.

## Way 2: Running the app.py with python3 or python itself

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">$ python3 app.py</pre>

This way, application will run if and only if you call the function _app.run()_. The host and port declared in the application will be used.

## Way 3: Running flask app with Gunicorn

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">$ gunicorn app:app</pre>

This will run the application but default gunicorns host and port. We can change it by passing parameters.

We can also run with gunicorn using configuration file.

Gunicorn configuration can be written with a default file named gunicorn.conf.py

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">import multiprocessing

bind = "127.0.0.1:8778"
workers = multiprocessing.cpu_count() * 2 + 1</pre>

This configuration file is with python syntax.

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">$ gunicorn app:app -c gunicorn.conf.py</pre>

## <meta charset="utf-8" />
Way 4: Running flask app with uWSGI

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">$ uwsgi --http 127.0.0.1:3031 --wsgi-file app.py --callable app</pre>

We can also use a config file for uWSGI.

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">$ uwsgi --ini uwsgi.ini</pre>

uwsgi.ini

<pre class="EnlighterJSRAW" data-enlighter-language="ini" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">[uwsgi]
module = app:app

master = true
processes = 2
threads = 2

enable-threads = true


http = :9229

vacuum = true
die-on-term = true
harakiri = 200 # close process exceeding this time (seconds)


stats = :21913

logger = file:logfile=Logs/uwsgi.log,maxsize=1000000</pre>

This file is a good configuration running flask with uWSGI.

There are several more ways to run flask applications. I will update this post when I can arrange an exciting way about this. Thank you for reading.