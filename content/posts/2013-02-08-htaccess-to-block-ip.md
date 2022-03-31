---
title: Htaccess to block ip
author: Fahad Ahammed
type: post
date: 2013-02-08T11:01:06+00:00
url: /htaccess-to-block-ip/
categories:
  - Technology
tags:
  - apache
  - block ip
  - block ip by htaccess in apache server
  - htacces
  - ipblock

---
Websites are naturally geeks guinea pig . You will get much more spam if you get a website to comment or something . They just don&#8217;t stop . Try and try . You will find it very much annoying . You can pause them . Not stop but it will give you peace i think . Now open any text editor and <!--more-->

[<img loading="lazy" class="aligncenter size-medium wp-image-1440" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/02/block_ip_htaccess.png?resize=300%2C237" alt="block_ip_htaccess" width="300" height="237" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/02/block_ip_htaccess.png?w=438&ssl=1 438w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/02/block_ip_htaccess.png?resize=300%2C238&ssl=1 300w" sizes="(max-width: 300px) 100vw, 300px" data-recalc-dims="1" />][1]

Type codes from below .

<pre>order allow,deny
deny from 127.0.0.2
deny from 127.0.0.1
allow from all</pre>

Now put your desired ip or ips . each in new line by that pattern . You can use 58.97.\*.\* to block the next ips . And save that file by <span style="color: #ff6600;"><strong>.htaccess</strong></span> . upload that file in your websites root , maybe <span style="color: #993366;">/<strong>public_html</strong>/</span>  . If you have a <span style="color: #ff6600;"><strong>.htaccess</strong> </span><span style="color: #333333;">, then edit that file and put above codes after all codes in your <span style="color: #ff6600;"><strong>.htaccess</strong></span> after existed codes .</span>

Now let you want to allow a particular page or file to accessed by only a particular IP or IP range and Deny access for all other users or visitors, You have to put below codes in htaccess.

<pre>&lt;Files login.php&gt;
order allow,deny
deny from 127.0.0.2
deny from 127.0.0.1
deny from 127.0.*.*
allow from <span style="color: #ffcc00;"><strong>192.168.23.7</strong></span>
allow from all
&lt;/Files&gt;</pre>

<p style="text-align: right;">
  <span style="color: #ffcc00;"><strong><em>*to allow</em></strong></span>
</p>

<p style="text-align: left;">
  Now if you want deny for a particular folder then just open a htaccess file to that fodler by having this code :
</p>

<pre>order allow,deny
deny from 127.0.*.*
allow from <strong>192.168.23.7</strong>
deny from all</pre>

<p style="text-align: left;">
  So now by above code you will only be allowed to access the folder by <span style="color: #ffcc00;"><strong>192.168.23.7</strong></span> and deny from all other IP. Change according to yours.
</p>

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/02/block_ip_htaccess.png