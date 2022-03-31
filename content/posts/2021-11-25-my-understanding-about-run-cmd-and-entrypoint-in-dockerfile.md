---
title: My Understanding about RUN, CMD and ENTRYPOINT in Dockerfile
author: Fahad Ahammed
type: post
date: 2021-11-25T08:54:10+00:00
url: /my-understanding-about-run-cmd-and-entrypoint-in-dockerfile/
featured_image: /wp-content/uploads/2021/11/Docker-build-825x510.png
classic-editor-remember:
  - block-editor
categories:
  - Docker
  - programming
  - python
  - Technology
tags:
  - difference between CMD and ENTRYPOINT
  - docker
  - docker build
  - dockerfile
  - flask
  - python
  - python3
  - RUN vs CMD vs ENTRYPOINT

---
Containerization gives us many benefits from packaging to distribution and others. Thus, Docker is widely used as a containerization tool which is designed for running specific tasks and processes, not for hosting operating systems or like other virtualization tools like VMWare, VirtualBox etc. You create a container to serve a single unit task. Once it completes the given task, it stops. The container life-cycle depends on the ongoing process inside of it. Once the process stops, 

<!--more-->

the container stops as well.

A Dockerfile defines this process. It is a script made up of instructions on how to build a Docker image. In this script, there are two types of instructions that can define the process running in the container:

  1. **ENTRYPOINT**
  2. **CMD**

And for the **RUN**, it is mainly built for only build time instruction.

## Dilemma on ENTRYPOINT and CMD

  * **CMD** to define default command or executable or parameters of a container.
  * **CMD** to set command which is possible to override.
  * **ENTRYPOINT** to set command or executable.
  * **ENTRYPOINT** is not overridable. (Except &#8211;entrypoint flag)
  * Both **ENTRYPOINT** and CMD works as &#8220;last one counts&#8221;.

**CMD** and **ENTRYPOINT** can have two forms as instructions.

  1. Shell form
  2. Exec form

For better clarity &#8211;

<pre class="EnlighterJSRAW" data-enlighter-language="dockerfile" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">CMD echo "Hello World" (shell form)
CMD ["echo", "Hello World"] (exec form)
ENTRYPOINT echo "Hello World" (shell form)
ENTRYPOINT ["echo", "Hello World"] (exec form)</pre>

By the way, it is suggested to avoid shell form for side affects or performance issue.

## Example of CMD and ENTRYPOINT

<pre class="EnlighterJSRAW" data-enlighter-language="dockerfile" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">FROM ubuntu
RUN echo `date`: I am now printing by RUN statement of Dockerfile</pre>

To build this Dockerfile &#8211;

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">docker build -t myimage .</pre>

To run the recently created image &#8211;

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">docker run myimage</pre>

The output of the above run command will not give anything.

What if I pass command on the _docker run <image>_ command?

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">docker run myimage ls</pre>

It should give me the directory and file list from the root of the container which is supposed to be running.  


<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">bin
boot
dev
etc
home
lib
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var</pre>

How do I know about the &#8220;**RUN**&#8221; instructions of the Dockerfile? When I use the _docker build_ command, we will get these &#8211;

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">[+] Building 4.8s (6/6) FINISHED                                                                                                
 => [internal] load build definition from Dockerfile                                                                       0.0s
 => => transferring dockerfile: 131B                                                                                       0.0s
 => [internal] load .dockerignore                                                                                          0.0s
 => => transferring context: 2B                                                                                            0.0s
 => [internal] load metadata for docker.io/library/ubuntu:latest                                                           4.6s
 => CACHED [1/2] FROM docker.io/library/ubuntu@sha256:626ffe58f6e7566e00254b638eb7e0f3b11d4da9675088f4781a50ae288f3322     0.0s
 => [2/2] RUN echo `date`: I am now printing by RUN statement of Dockerfile                                     0.2s
 => exporting to image                                                                                                     0.0s
 => => exporting layers                                                                                                    0.0s
 => => writing image sha256:0e83143777f443e74905c6bdd95f554be65eee642a5ec4a7d5cc701bbd030010                               0.0s
 => => naming to docker.io/library/myimage                                                                                 0.0s

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them</pre>

&#8220;**RUN**&#8221; instruction is not changing anything on the image to check if it executed or not as that is just an echo. To test it, let me modify the Dockerfile &#8211;

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">FROM ubuntu
RUN echo `date`: I am now printing by RUN statement of Dockerfile >> log.txt</pre>

If I again build the image using same command, It will create the image fine. But what changed?

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">docker run myimage</pre>

The output will be nothing. But What If I check the folder with &#8220;ls&#8221;?

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">docker run myimage ls</pre>

Output:

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">bin
boot
dev
etc
home
lib
log.txt
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var</pre>

Ok, we have a file &#8220;log.txt&#8221; inside the image/container.

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">docker run myimage cat log.txt</pre>

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">Wed Nov 24 15:51:51 UTC 2021: I am now printing by RUN statement of Dockerfile</pre>

If I several times run the same command?

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">% docker run myimage cat log.txt
Wed Nov 24 15:51:51 UTC 2021: I am now printing by RUN statement of Dockerfile
% docker run myimage cat log.txt
Wed Nov 24 15:51:51 UTC 2021: I am now printing by RUN statement of Dockerfile
% docker run myimage cat log.txt
Wed Nov 24 15:51:51 UTC 2021: I am now printing by RUN statement of Dockerfile
% docker run myimage cat log.txt
Wed Nov 24 15:51:51 UTC 2021: I am now printing by RUN statement of Dockerfile
% docker run myimage cat log.txt
Wed Nov 24 15:51:51 UTC 2021: I am now printing by RUN statement of Dockerfile</pre>

I am running same image several times. Should be different container.

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">% docker run myimage hostname       
8ecc0600d24d
% docker run myimage hostname
7b4282538d7c
% docker run myimage hostname
8ea08b4139ba</pre>

Different image but giving it same date and time from that log.txt.

So, **RUN** statement is just once ran when image was built.

## Actual Implementations

Now, I will use a basic Python flask application called app.py .

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">import datetime
import os
import socket
from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/")
def hello_world():
    return jsonify({
        "msg": "Hello there!",
        "hostname": str(socket.gethostname()),
        "date_time": str(datetime.datetime.utcnow())
    })


if __name__ == '__main__':
    app.run(host=os.getenv("host", "0.0.0.0"), port=os.getenv("port", 5115))</pre>

To make the image &#8211;

<pre class="EnlighterJSRAW" data-enlighter-language="dockerfile" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">FROM ubuntu
RUN apt-get update
RUN apt-get install -y python3 python3-dev python3-pip
ADD myapp /opt/myapp/
WORKDIR /opt/myapp
RUN pip3 install -r requirements.txt
CMD ["python3", "app.py"]</pre>

Build the image as usual &#8211;

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">docker build -t myimage .</pre>

Run &#8211;

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">% docker run myimage          
 * Serving Flask app 'app' (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on all addresses.
   WARNING: This is a development server. Do not use it in a production deployment.
 * Running on http://172.17.0.2:5115/ (Press CTRL+C to quit)</pre>

What if I run the image with passed parameters?

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">% docker run myimage ls
app.py
requirements.txt
% docker run myimage pwd
/opt/myapp</pre>

So, I can override the **CMD**.

What If I use **ENTRYPOINT**?

<pre class="EnlighterJSRAW" data-enlighter-language="dockerfile" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">FROM ubuntu
RUN apt-get update
RUN apt-get install -y python3 python3-dev python3-pip
ADD myapp /opt/myapp/
WORKDIR /opt/myapp
RUN pip3 install -r requirements.txt
ENTRYPOINT ["python3", "app.py"]</pre>

What if I run this now?

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">% docker run myimage   
 * Serving Flask app 'app' (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on all addresses.
   WARNING: This is a development server. Do not use it in a production deployment.
 * Running on http://172.17.0.2:5115/ (Press CTRL+C to quit)
^C%                                                                                                                             % docker run myimage ls
 * Serving Flask app 'app' (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on all addresses.
   WARNING: This is a development server. Do not use it in a production deployment.
 * Running on http://172.17.0.2:5115/ (Press CTRL+C to quit)
^C%</pre>

So, we can not override the **ENTRYPOINT**.

Let me try some variations?

<pre class="EnlighterJSRAW" data-enlighter-language="dockerfile" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">FROM ubuntu
RUN apt-get update
RUN apt-get install -y python3 python3-dev python3-pip
ADD myapp /opt/myapp/
WORKDIR /opt/myapp
RUN pip3 install -r requirements.txt
ENTRYPOINT ["python3"]
CMD ["app.py"]</pre>

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">% docker run myimage       
 * Serving Flask app 'app' (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on all addresses.
   WARNING: This is a development server. Do not use it in a production deployment.
 * Running on http://172.17.0.2:5115/ (Press CTRL+C to quit)
^C%                                                                                                                             % docker run myimage ls
python3: can't open file 'ls': [Errno 2] No such file or directory</pre>

So, the above Dockerfile is setting **ENTRYPOINT** with python3 only and **CMD** passed to app.py but overriding that can be doable.

Another variation?

<pre class="EnlighterJSRAW" data-enlighter-language="dockerfile" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">FROM ubuntu
RUN apt-get update
RUN apt-get install -y python3 python3-dev python3-pip
ADD myapp /opt/myapp/
WORKDIR /opt/myapp
RUN pip3 install -r requirements.txt
CMD ["app.py"]
ENTRYPOINT ["python3"]</pre>

It will act as same. Whatever the order of **CMD** is, it will always pass after **ENTRYPOINT** if **ENTRYPOINT** is used.

I am hoping that I will get these always working after digging these with variations. Thanks all for reading.