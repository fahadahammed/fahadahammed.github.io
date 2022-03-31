---
title: Squid Proxy Server Download/Upload Limit
author: Fahad Ahammed
type: post
date: 2013-08-20T01:12:13+00:00
url: /squid-proxy-server-downloadupload-limit/
categories:
  - Proxy Server
tags:
  - download limit
  - Limit squid proxy users download upload
  - squid
  - upload limit

---
We can limit the download/upload limit for particular user/ip range/time . This will help to not to create high load in the server during ofice time or some particular time or maybe some users .<!--more-->

<h4 style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/08/download_limit_image.png"><img loading="lazy" class="aligncenter  wp-image-1449" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/08/download_limit_image-1018x1024.png?resize=517%2C519" alt="download_limit_image" width="517" height="519" data-recalc-dims="1" /></a>
</h4>

#### To limit for all :

&nbsp;

<pre>reply_body_max_size 30 MB</pre>

&nbsp;

#### User or User group based download and upload limit :

<pre>acl Group1 proxy_auth user1 user2
acl Group2 proxy_auth user3 user4
reply_body_max_size 20480 KB Group2
reply_body_max_size 10240 KB Group1
reply_body_max_size 5120 KB all</pre>

&nbsp;

#### IP based download limit :

&nbsp;

<pre>acl Group1 src 10.5.0.1-10.5.0.10/32
acl Group2 src 10.5.2.1-10.5.2.10/32
reply_body_max_size 20480 KB Group2
reply_body_max_size 10240 KB Group1
reply_body_max_size 5120 KB all</pre>

&nbsp;

#### Time Based Download Limit :

&nbsp;

<pre>acl WorkingHours time 08:00-17:00
reply_body_max_size 10240 KB WorkingHours</pre>