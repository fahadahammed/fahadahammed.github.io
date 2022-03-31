---
title: Blocking IP,Domain,Time to Access Websites in Squid Proxy Server !
author: Fahad Ahammed
type: post
date: 2013-08-19T08:13:31+00:00
url: /blocking-ipdomaintime-to-access-websites-in-squid-proxy-server/
categories:
  - Proxy Server
tags:
  - ban domain access in squid proxy server
  - ban facebook by squid proxy
  - ban google by squid proxy
  - bann domain access in squid proxy server
  - Blocking Domain
  - Blocking IP
  - Blocking Time to Access Websites in Squid Proxy Server !

---
We can control website or ip to access or accessed by squid proxy server . We can set timely access rule or some ip range to acccess the server or also can block some website or ip for a range of ip or for  some limited time .<!--more-->

<h4 style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/08/block_ip_htaccess.png"><img loading="lazy" class="aligncenter  wp-image-1443" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/08/block_ip_htaccess.png?resize=519%2C292" alt="block_ip_htaccess" width="519" height="292" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/08/block_ip_htaccess.png?w=752&ssl=1 752w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/08/block_ip_htaccess.png?resize=300%2C169&ssl=1 300w" sizes="(max-width: 519px) 100vw, 519px" data-recalc-dims="1" /></a>
</h4>

#### #To block a particular Network:

<pre>acl my_net src 192.168.0.0/24 192.168.1.0/24
http_access allow my_net</pre>

#### #To block a particular ip:

<pre>acl bad_ip src 192.168.0.21
acl bad_ip src 192.168.0.22
http_access deny bad_ip</pre>

#### #To block a particular URL:

<pre>acl bad_site dst www.yahoo.com
http_access deny bad_site
#To block only one domain:
acl block_orkut dstdomain .orkut.com
http_access deny block_orkut</pre>

#### #To block a list of sites from / specified in a file:

<pre>acl block_list url_regex "/etc/squid/block_list.txt"
http_access deny block_list</pre>

#### #Blocking web access by time:

##### #acl aclname time \[day-abbrevs\] \[h1:m1-h2:m2\]  
#h1:m1 must be less than h2:m2  
#Day-abbrevs:  
#S &#8211; Sunday,M &#8211; Monday,T – Tuesday,W &#8211; Wednesday,H &#8211; Thursday,F &#8211; Friday,A &#8211; Saturday

<pre>acl mynetwork src 192.168.0.0/255.255.255.0
acl Break time MTWHFA 02:32-03:00
http_access deny mynetwork Break</pre>

&nbsp;

#### #To block the URLs contains the word &#8220;word&#8221;:

<pre>acl block_word_url url_regex sex
http_access deny block_word_url</pre>

#### #To prevent downloading files:

<pre>acl block_exe url_regex .*.exe$
http_access deny block_exe</pre>

#### #To block access to some TLDs:

<pre>acl block_tld dstdom_regex .uk$
http_access deny block_tld</pre>

&nbsp;

&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;-  
**Now create block file and service restart**

<pre>cat &gt;/etc/squid/block_list.txt</pre>

&nbsp;

<pre>www.hotmail.com
www.ibm.com
www.hp.com</pre>

[root@ubuntu Desktop]# /etc/init.d/squid3 restart  
Stopping squid: [FAILED]  
Starting squid: . [ OK ]  
[root@ubuntu Desktop]# chkconfig squid3 on

**#1: Create an acl for proxy clients.**

<pre>acl accountant src 192.168.10.50/32</pre>

**#2: Create an acl for facebook domain  (any required sites)**

<pre>acl fb dstdomain .facebook.com</pre>

&nbsp;

**#3: Create an acl office time for Mon-Sat, 10:00 to 17:00 (24hrs)**

<pre>acl officetime time MTWHFA 10:00-17:00</pre>

**#4: Deny access to &#8220;http&#8221; facebook to accountant only in office times**

<pre>http_reply_access deny  fb accountant officetime</pre>

**#5: The below line will deny access to &#8220;https&#8221; secured facebook to the proxy user &#8220;accountant&#8221; in office times. Squid proxy will deny access to &#8220;https&#8221; facebook to accountant only in office times.**

<pre>http_access deny CONNECT fb accountant officetime</pre>

[root@ubuntu ~#]service squid3 restart

Tips: The way to include multiple sites in one ACL  
acl badsites dstdomain .facebook.com .twitter.com .blogger.co