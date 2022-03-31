---
title: Squid proxy Server with multiple IP
author: Fahad Ahammed
type: post
date: 2014-04-03T02:56:16+00:00
url: /squid-proxy-server-with-multiple-ip/
categories:
  - Proxy Server
  - Technology
tags:
  - squid
  - squid proxy from vps
  - squid proxy server
  - Squid proxy server with multiple ips
  - Squid Proxy server with multiple IPs or proxy

---
My dear readers. I am here again for your help with squid proxy server. I will show you today how to use squid server to work with several IP in a vps/system. This is very useful if you do Craigslist work or something like that. Proxy is interesting. Squid proxy is like a Swiss Army Knife which has numerous feature to make you comfortable with proxy.

Here are two ways of configuring squid&#8217;s proxy to use the other IPs assigned to your server (besides the default one).<!--more-->

Before that you will have to add below codes to ensure those works. IPs are as an example, and you will change it according to yours. But you will have to make sure that IPs ends with &#8220;**<span style="color: #ff0000;">/0</span>**&#8221;

<pre>acl localnet src 192.168.1.101/0
acl localnet src 192.168.1.102/0
acl localnet src 192.168.1.103/0</pre>

## Method 1 &#8211; Use Incoming IP

Basically, if you connect to 192.168.1.101, your outgoing IP will be, 192.168.1.101. The same goes for 192.168.1.102 and 192.168.1.103.

<pre>acl enabled1 myip 192.168.1.101
acl enabled2 myip 192.168.1.102
acl enabled3 myip 192.168.1.103
tcp_outgoing_address 192.168.1.101 enabled1
tcp_outgoing_address 192.168.1.102 enabled2
tcp_outgoing_address 192.168.1.103 enabled3</pre>

The acl rules checks if myip (connected to IP) matches the IP listed.

The tcp\_outgoing\_address lines set the IP if the enabled* rule is set.

## Method 2 &#8211; Per User

If you wish to assign a specific user a designated IP, you can do it with the following rules.

<pre>acl enabled1 proxy_auth billy
acl enabled2 proxy_auth jilly
acl enabled2 proxy_auth killy
tcp_outgoing_address 192.168.1.101 enabeld1
tcp_outgoing_address 192.168.1.102 enabled2
tcp_outgoing_address 192.168.1.103 enabled3</pre>

## Other Squid Configuration

If you want to designate an IP besides the default IP on the server with squid, you can use this rule:

<pre>tcp_outgoing_address 192.168.1.103</pre>

After you edit the configuration file for squid, don&#8217;t forget to reload the rules:

<pre>service squid3 reload</pre>

or You can restart the proxy server too.

<pre>service squid3 restart</pre>

That is it. I hope you will find these ok. Comment below if you have further question.