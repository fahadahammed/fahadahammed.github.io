---
title: How to request limit with nginx ?
author: Fahad Ahammed
type: post
date: 2017-09-29T18:44:46+00:00
url: /how-to-request-limit-with-nginx/
categories:
  - Technology
tags:
  - cloudflare rate limit alternative
  - limit requests to webpages
  - manual rate limit nginx
  - nginx
  - rate limit with nginx
  - request limit with white label ip

---
You might somehow face a huge traffic on your site which is not legitimate at all and kind of DOS. If you can identify the traffic which eventually lessen the site performance by the **Basic HTTP Floods** DOS, you can save yourself from being affected by mild DOS attack. I will show you how can lessen the chance of being easily affected by those attacks.

<!--more-->

[<img loading="lazy" class=" wp-image-2265" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2017/09/how-to-request-limit-with-nginx.png?resize=443%2C249&#038;ssl=1" alt="how-to-request-limit-with-nginx" width="443" height="249" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2017/09/how-to-request-limit-with-nginx.png?w=1366&ssl=1 1366w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2017/09/how-to-request-limit-with-nginx.png?resize=300%2C169&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2017/09/how-to-request-limit-with-nginx.png?resize=768%2C432&ssl=1 768w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2017/09/how-to-request-limit-with-nginx.png?resize=1024%2C576&ssl=1 1024w" sizes="(max-width: 443px) 100vw, 443px" data-recalc-dims="1" />][1]

Obviously Nginx is capable of doing a lot of things to help you serve your web app. Here is the basic Nginx virtual host.

<pre>#REQUEST_LIMIT_ZONE
limit_req_zone $limit zone=myzone1:1m rate=1r/s;


#LISITING_IP_in_VARIABLE
geo $limited {
default 1;
#WHITE_LIST
8.8.8.8/32 0;
}

#IPs_WHITELISTED WILL BE 0
 map $limited $limit {
 1 $binary_remote_addr;
 0 "";
 }

upstream mywebapp {
 server 127.0.0.1:8080;
 }

server {
 listen 80;
 listen 443 ssl;

server_name domain.com www.domain.com;

ssl_certificate /etc/nginx/ssl/cloud.crt;
ssl_certificate_key /etc/nginx/ssl/cloud.key;

access_log /var/log/nginx/final_access.log;
error_log /var/log/nginx/final_error.log;

location / {
# apply rate limiting
limit_req zone=myzone1 burst=5;

proxy_set_header X-Forwarded-Host $host;
proxy_set_header X-Forwarded-Server $host;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_pass http://mywebapp/;
proxy_intercept_errors on;
}


}

</pre>

Let me break it down.

<pre>#REQUEST_LIMIT_ZONE
limit_req_zone $limit zone=myzone1:1m rate=1r/s;</pre>

Here, What I had to do is create a zone. A request limit zone is like a rule which you will call it elsewhere.  
zone=myzone1:10m; first one is zone variable, it has two string divided by colon. first one myzone1 is the name of the zone which we will call it from other place. And the other string 10m is saying this zone has 1 megabyte at most.

A client IP address serves as a key. Note that instead of $remote\_addr, the $binary\_remote\_addr variable is used here. The $binary\_remote_addr variable’s size is always 4 bytes for IPv4 addresses or 16 bytes for IPv6 addresses. The stored state always occupies 64 bytes on 32-bit platforms and 128 bytes on 64-bit platforms. One megabyte zone can keep about 16 thousand 64-byte states or about 8 thousand 128-byte states.

If the zone storage is exhausted, the least recently used state is removed. Even if after that a new state cannot be created, the request is terminated with an error.

rate=1r/s; This denotes the request rate of this zone. So here, 1 request per second is allowed. By the way, 1r/s is one which you want at urls where any post request is happening, actually to the exact endpoint. Otherwise your index page or any html page will not be able to load fully for normal users as A decent html has almost 4-5 requests, like js, jquery, png, css, fonts etc. So, If 1r/s then the page will not be loaded fully and will through error instead and page will appear as broken.

<pre>#LISITING_IP_in_VARIABLE
geo $limited {
default 1;
#WHITE_LIST
8.8.8.8/32 0;
}
</pre>

You might want yourself to be white listed of this rate limit. &#8220;default 1&#8221; is about saying every IP&#8217;s are by default marked as to rate limit zone unless the IP has 0 marked. This $limited is a list of IP&#8217;s you can say where you mark the IP&#8217;s white or black.

<pre>upstream mywebapp {
 server 127.0.0.1:8080;
 }
</pre>

I hope you understand what it does? I am making a upstream. I have a web app which is running in 127.0.0.1:8080 and I denoted it as mywebapp to call it easily from elsewhere.

<pre>location / {
# apply rate limiting
limit_req zone=myzone1 burst=5;

proxy_set_header X-Forwarded-Host $host;
proxy_set_header X-Forwarded-Server $host;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_pass http://mywebapp/;
proxy_intercept_errors on;
}
</pre>

Now comes the best part. It is the default web page served by Nginx. I have added a line here `limit_req zone=myzone1 burst=5;`, It says to request limit this url or endpoint. I called the zone, myzone1. burst=5 is about at most request allowed. So this page will be served at most 5 request per second for a single user.

If a single user exceeds this limit he/she/it will get 503 error and your web app will not get any request from that user.

You can experiment whatever configuration suits you. It is better to design or manage the configuration with pages in mind. Like you can limit aggressively at post urls or form pages even login and registrations. But for Index pages or other static pages you can lose the limit.

By the way, It will not save you from any severe attacks, like DDOS that much.

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2017/09/how-to-request-limit-with-nginx.png?ssl=1