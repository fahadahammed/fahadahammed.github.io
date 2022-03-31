---
title: Ban domain access in squid proxy server
author: Fahad Ahammed
type: post
date: 2013-07-10T08:46:21+00:00
url: /ban-domain-access-in-squid-proxy-server/
classic-editor-remember:
  - classic-editor
categories:
  - Proxy Server
tags:
  - ban domain access in squid proxy server
  - ban facebook by squid proxy
  - ban google by squid proxy
  - bann domain access in squid proxy server

---
Some times we need to control internet users in public hotspot or wifi or also school-college-university network . Anyone can control domains accessed by squid proxy by this tutorial .<!--more-->

First open squid proxy configuration :

<pre>nano /etc/squid3/squid.conf</pre>

Add below lines to that configuration anywhere and save it :

<pre>acl blockeddomain url_regex '/etc/squid3/blocked.domains.acl'
http_access deny blockeddomain
http_reply_access deny blockeddomain</pre>

Then open a new file by this command :

<pre>nano /etc/squid3/blocked.domains.acl</pre>

And add domains which you want to ban in every line each like below :

<pre>facebook.com
www.facebook.com</pre>

Now save that file and restart squid by :

<pre>service squid3 restart</pre>

Now users who will use this proxy of yours will not be able to access facebook or whatever you have entered in your **/etc/squid3/blocked.domains.acl** domain list .