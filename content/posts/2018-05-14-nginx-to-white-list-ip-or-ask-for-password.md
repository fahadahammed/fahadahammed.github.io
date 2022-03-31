---
title: nginx to white-list ip or ask for password
author: Fahad Ahammed
type: post
date: 2018-05-14T06:21:00+00:00
url: /nginx-to-white-list-ip-or-ask-for-password/
categories:
  - Technology
tags:
  - nginx
  - nginx proxy auth
  - nginx proxy spring security basic auth
  - satisfy any
  - spring security and basic auth

---
Let, you want to protect a page or any site in nginx by certain IP addresses access only. How would you do it in nginx? I will discuss some cases here about the situation.

<!--more-->

You can give access to certain IP&#8217;s only by using:

<pre>allow 192.168.100.10;
allow 192.168.200.20;
deny all;</pre>

But somehow you need to give access outside world too for collaborations and their IP is not static or fixed. So, you can not allow all IP&#8217;s, what would you do?

You can use &#8220;satisfy any&#8221; tag to do something as: First check if the user is from white-list ip, If yes then obviously he/she can access it. But the ip is not in white-list then it will ask user:password to access the site. You can do this by:

<pre>satisfy any;
 allow 192.168.100.10;
 allow 192.168.200.20;
 deny all;
 # Auth
 auth_basic "Restricted Content ! You need password to access this site.";
 auth_basic_user_file /etc/nginx/basicauth/default;</pre>

By the way, If you use nginx in front of tomcat loading spring security application then password will be asked repetitively which is frustrating. You need to pass blank authorization header.

<pre>proxy_set_header Authorization "";</pre>

As an example:

<pre>location / {
   proxy_set_header X-Forwarded-Host $host; 
   proxy_set_header X-Forwarded-Server $host; 
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
   proxy_pass http://127.0.0.1:8080/; 
   proxy_intercept_errors on; 
   proxy_redirect off;
   <strong>proxy_set_header Authorization "";</strong>
}</pre>

That is it. Thank you.