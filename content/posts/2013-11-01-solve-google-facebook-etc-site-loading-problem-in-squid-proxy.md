---
title: Solve Google,Facebook etc site Loading Problem in Squid Proxy
author: Fahad Ahammed
type: post
date: 2013-11-01T09:30:50+00:00
url: /solve-google-facebook-etc-site-loading-problem-in-squid-proxy/
categories:
  - Proxy Server
  - Technology
tags:
  - google not loading by squid proxy server
  - How to solve squid IPV6 problem
  - squid
  - squid IPV6 problem
  - squid proxy facebook not looding
  - squid proxy from vps

---
If you see that your newly created Squid proxy server can&#8217;t access Google, Facebook and other sites then you are right place to get the solution. Actually this problem arises when your ISP have no IPV6 for you. And Google,Facebook type giant sites has IPV6. So Squid just route you to access by IPV6 whether you have or not. As you have no IPV6 , you are facing problem.

<!--more-->

<p style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/11/Solve_Google_Facebook_etc_site_Loading_Problem_in_Squid_Proxy.png"><img loading="lazy" class="aligncenter  wp-image-1536" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/11/Solve_Google_Facebook_etc_site_Loading_Problem_in_Squid_Proxy.png?resize=487%2C487" alt="Solve_Google_Facebook_etc_site_Loading_Problem_in_Squid_Proxy" width="487" height="487" data-recalc-dims="1" /></a>
</p>

If you tail to access log , you will see that when you try to access google,facebook or other sites which doesn&#8217;t load, is actually trying to connect by IPV6.

<pre>tail -f /var/log/squid3/access.log</pre>

You need to edit configuration below.

<pre>nano /etc/squid3/squid.conf</pre>

Put below line in the top of the config and save.

<pre>dns_v4_first on</pre>

This above line just a rule which will force squid to access IPV4 first instead of IPV6. Now restart squid server and you will be able to access those sites now.

<pre>service squid3 restart</pre>

<p style="text-align: center;">
  <strong>Thank You.</strong>
</p>