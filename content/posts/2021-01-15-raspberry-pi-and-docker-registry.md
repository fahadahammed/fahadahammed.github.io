---
title: Raspberry Pi and Docker Registry
author: Fahad Ahammed
type: post
date: 2021-01-15T15:59:59+00:00
url: /raspberry-pi-and-docker-registry/
featured_image: /wp-content/uploads/2021/01/Raspberry-PI-3B-825x510.jpeg
classic-editor-remember:
  - block-editor
categories:
  - programming
  - Technology
tags:
  - container store raspberry pi
  - docker
  - docker hub private
  - docker registry
  - How to install docker registry in Raspberry Pi 3B+?
  - How to setup docker registry in a raspberry pi?
  - lighttpd
  - raspberry pi as a private docker hub

---
Recently I have been using a **Raspberry Pi 3B+** bought from a classified advertisement site called <a rel="noreferrer noopener" href="http://Bikroy.com" data-type="URL" data-id="Bikroy.com" target="_blank">Bikroy.com</a>. A student wanted to sell this, as his final college project was done. It was cheaper with an acrylic casing and a fan. However, I wanted to use this Pi for several pet projects. Initially I did install <a rel="noreferrer noopener" href="https://pi-hole.net/" data-type="URL" data-id="https://pi-hole.net/" target="_blank"><strong>Pi-Hole</strong></a> for network wide **adblocker** and along with **samba** with a spare portable hard disk. It was working OK. No extra pressure in this 1GB ram Pi. I thought Why not give it a little bit more pressure?

Thus, I planned to install docker registry in it for my **&#8220;local private docker hub&#8221;** type of need. Let me share what I had to do.

<!--more--><figure class="wp-block-image size-large">

[<img loading="lazy" width="660" height="305" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2021/01/Raspberry-PI-3B.jpeg?resize=660%2C305&#038;ssl=1" alt="" class="wp-image-5277" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2021/01/Raspberry-PI-3B.jpeg?resize=1024%2C473&ssl=1 1024w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2021/01/Raspberry-PI-3B.jpeg?resize=300%2C139&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2021/01/Raspberry-PI-3B.jpeg?resize=768%2C355&ssl=1 768w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2021/01/Raspberry-PI-3B.jpeg?w=1280&ssl=1 1280w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" />][1]</figure> 

## What did I need to setup to get Private Docker Registry or Private Docker Hub?

I have Ubuntu Focal Fossa Server version in Raspberry Pi. Needed to install &#8211;

  1. docker
  2. docker-compose
  3. apache2-utils

## What did I need to configure?

After installing above tools. I used below **docker-compose.yml** file to initiate the registry server.

<pre class="EnlighterJSRAW" data-enlighter-language="dockerfile" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">version: '3'

services:
  registry:
    image: registry:2
    restart: always
    ports:
    - "5000:5000"
    environment:
      REGISTRY_AUTH: htpasswd
      REGISTRY_AUTH_HTPASSWD_REALM: Registry
      REGISTRY_AUTH_HTPASSWD_PATH: /auth/registry.password
      REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY: /data
    volumes:
      - ./auth:/auth
      - ./data:/data</pre>

In the same directory I created an auth directory and there I created a password file with htpasswd command or apache2-utils package.

<pre class="wp-block-preformatted">htpasswd -c auth/registry.password &lt;username&gt;</pre>

After that I just executed

<pre class="wp-block-preformatted">docker-compose up -d</pre>

for running the server as a daemon.

As I have installed pi-hole and it&#8217;s panel in it already, already have lighttpd server installed. So, I did need to configure lighttpd for accessing the registry with a domain which should be resolved by port 80.

In lighttpd.conf enabled &#8220;mod_proxy&#8221;.

<pre class="wp-block-preformatted">server.modules = (<br />"mod_access",<br />"mod_accesslog",<br />"mod_auth",<br />"mod_expire",<br />"mod_compress",<br />"mod_redirect",<br />"mod_setenv",<br />"mod_rewrite",<br />"mod_proxy"<br />)</pre>

As I wanted to access my registry via **&#8220;http://docker.hub.hole&#8221;** domain. But is not a valid one. So, it was necessary to modify hosts file in my workstation and added this entry in local dns options in pi hole too.

<pre class="wp-block-preformatted">&lt;raspberry_pi_IP&gt; docker.hub.hole</pre>

For reverse proxy to 5000 port, needed to create a vhost in lighttpd with reverse proxy in the registry.

<pre class="EnlighterJSRAW" data-enlighter-language="lighttpd" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">$HTTP["host"] == "docker.hub.hole" { #FDQN
accesslog.filename = "/var/log/lighttpd/docker.hub.hole_access.log" # Web server Access log file
server.errorlog = "/var/log/lighttpd/docker.hub.hole_error.log" # Web server Error log file
proxy.balance = "hash" 
proxy.server  = ( "" => ( ( "host" => "&lt;raspberry_pi_ip>", "port" => 5000 ) ) )
}</pre>

Restarted the lighttpd server and I could access the registry with the domain.

There were more tasks to do to signing in to this docker hub. As it has no https, I needed to add a line in my workstations docker config.

Added insecure-registries entry in &#8220;**/etc/docker/daemon.json**&#8221; &#8211;

<pre class="EnlighterJSRAW" data-enlighter-language="json" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">{
  "metrics-addr" : "0.0.0.0:9323",
  "experimental" : true,
  "insecure-registries" : ["http://docker.hub.hole"]
}</pre>

And restarted docker. Then I could login with &#8211;

<pre class="wp-block-preformatted">docker login http://docker.hub.hole</pre>

by using the password and user which I did set via htpasswd -c &#8230;.

By the way, if you face error like-

<blockquote class="wp-block-quote">
  <p>
    error authenticating user&#8230;
  </p>
</blockquote>

or

<blockquote class="wp-block-quote">
  <p>
    Error response from daemon: login attempt to http://192.168.31.101:5000/v2/ failed with status: 401 Unauthorized
  </p>
</blockquote>

Then try to create the password by using &#8211; 

<pre id="block-1e3202ac-4936-45fc-9081-0d66646661e7" class="wp-block-preformatted">htpasswd -cB auth/registry.password &lt;username></pre>

## Conclusion

It is damn slow if you do set PI in WiFi. But It does work. I have been working last few days with this hub and it does serve me OK.

Pressure in CPU or RAM is not that high, as I am the only developer using this pi for the containers. There are some very positive things to feel too.

  * It works fine on boot.
  * As lighttpd, it is light and do the job well.
  * Personal Container store, No need to live in fear of pushing the container with confidential contents in it. (which should be in practice and standard in your work flow at the first place.)
  * Using a spare hardware in the full swing
  * DYI project 😛

It is a fun setup. Loved it.

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2021/01/Raspberry-PI-3B.jpeg?ssl=1