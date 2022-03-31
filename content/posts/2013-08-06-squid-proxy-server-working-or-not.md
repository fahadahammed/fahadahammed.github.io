---
title: Squid Proxy Server Working or Not ?
author: Fahad Ahammed
type: post
date: 2013-08-06T10:40:48+00:00
url: /squid-proxy-server-working-or-not/
classic-editor-remember:
  - classic-editor
categories:
  - Proxy Server
tags:
  - bann domain access in squid proxy server
  - proxy vps
  - squid
  - squid proxy server
  - squid proxy server with user and password

---
If you have completed your installation of squid proxy server then you can see how your proxy server working and how it is handling caching or contents .<!--more-->

It is important to know whether squid server caching or not.

    tail -f /var/log/squid3/access.log

Above command will monitor all incoming request and log them to /var/log/squid3/access_log file. Now if somebody accessing a website through browser, squid will log information.