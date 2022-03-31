---
title: How to Redirect ‘http’ to ‘https’ in NGINX ?
author: Fahad Ahammed
type: post
date: 2013-10-27T06:41:42+00:00
url: /how-to-redirect-http-to-https-in-nginx/
categories:
  - Technology
tags:
  - http
  - https
  - nginx https redirect
  - nginx vhost https
  - ssl with nginx

---
Here we will learn how to redirect all http request to https in nginx server. Assuming you have success fully installed ssl and can access https manually.<!--more-->

<p style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/10/How_to_Redirect_http_to_https_in_NGINX.png"><img loading="lazy" class="aligncenter  wp-image-1956" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/10/How_to_Redirect_http_to_https_in_NGINX.png?resize=423%2C423" alt="How_to_Redirect_http_to_https_in_NGINX" width="423" height="423" data-recalc-dims="1" /></a>
</p>

### First Method:

This is the easiest one ! 🙂

Find below codes in your websites vhost.

<pre>server {
    listen  *:80;
server_name <span style="color: #993300;">domain.tld www.domain.tld</span>;
#
#
#
#
#
#}</pre>

Now make sure that code looks like below :

<pre>server {
    listen  *:80;
server_name <span style="color: #993300;">domain.tld www.domain.tld</span>;
#
#
<span style="color: #99cc00;"><strong>rewrite        ^ https://$server_name$request_uri? permanent;</strong></span>
#
#
}</pre>

### Second Method:

Find below codes in your websites vhost.

<pre>server {
    listen  *:80;
server_name <span style="color: #ff9900;">domain.tld www.domain.tld</span>;
#
#
#
#
#
#}</pre>

Now make sure that code looks like below :

<pre>server {
    listen  *:80;
server_name <span style="color: #ff9900;">domain.tld www.domain.tld</span>;
#
#
    <span style="color: #99cc00;"><strong>if ( $scheme = "http" ) {
    rewrite  ^/(.*)$  https://$host/$1 permanent;
    }</strong></span>
#
#
}</pre>

<p style="text-align: center;">
  Thank You.
</p>