---
title: Lighttpd Server with SSL
author: Fahad Ahammed
type: post
date: 2013-09-29T05:21:17+00:00
url: /lighttpd-server-with-ssl/
categories:
  - Technology
tags:
  - ghost http to https
  - https lighttpd
  - lighttpd
  - lighttpd configuration for ghost blog
  - lighttpd server
  - ssl lighttpd
  - ubuntu vps lighttpd wordpress

---
Lighttpd is one of the speediest webserver which will make you feel like you got a highspeed internet connection with low price. However , i will explain you how to create ssl certificate and use it in lighttpd vhost for accessing particular websites with particular certificate.<!--more-->

Imagining you have your websites document root in /var/www/site1.com. you can create multiple sites with help of <a href="http://obakfahad.com/archives/multiple-wordpress-in-lighttpd-php5-in-ubuntu-vps-or-server/" target="_blank">this</a> article.

If you have used **/var/www/site1.com** as document root you will have created two folders **web** and **logs** in there where **logs** will keep all error logs and **web** will keep all your websites files. Now for ssl certificate you will need another folder named **ssl**.

<pre>mkdir /var/www/site1.com/ssl/</pre>

Now create certificate and key.

<pre>sudo openssl req -x509 -nodes -days <span style="color: #ff9900;">1460</span> -newkey rsa:2048 -keyout /var/www/site1.com/ssl/site1.key -out /var/www/site1.com/ssl/site1.crt</pre>

You will be asked for some information. **<span style="color: #ff0000;">You will have to write your domain name in Common Name Sectio</span>n** which you want as https or ssl like below.

[<img loading="lazy" class="aligncenter size-full wp-image-751" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/ssl.png?resize=640%2C352" alt="ssl" width="640" height="352" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/ssl.png?w=640&ssl=1 640w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/ssl.png?resize=300%2C165&ssl=1 300w" sizes="(max-width: 640px) 100vw, 640px" data-recalc-dims="1" />][1]

Certificate creation is OK but if you want to get your self signed certificate valid for a long time you have to change above lines orange colored numbers. 1460 days means 4 years. If you want to get validity of that certificate of around 20 years you need to put there 7300 that means 365&#215;20.

Now we will need to combine both key and crt file to act as one.

<pre>cat /var/www/site1.com/ssl/site1.key /var/www/site1.com/ssl/site1.crt &gt; site1.pem</pre>

You can create pem file that means combined certificate by one command.

<pre>openssl req -new -x509 -keyout /var/www/site1.com/ssl/site1.pem -out /var/www/site1.com/ssl/site1.pem -days 1460 -nodes</pre>

Now let us use that certificate in our sites vhost.

Edit **/etc/lighttpd/site1.com.conf** :

<pre>nano /etc/lighttpd/site1.com.conf</pre>

Make sure it looks like below :

<pre>$HTTP["host"] =~ "(^|.)site1.com$" {
        server.document-root = "/var/www/site1.com/web/"
        server.errorlog = "/var/www/site1.com/logs/error.log"
        ssl.engine = "enable"
        ssl.pemfile = "/var/www/site1.com/ssl/site1.pem"
}</pre>

Now save the file and restart lighttpd:

<pre>service lighttpd restart</pre>

Now you can access your sites by ssl certificate or https.

If You want to redirect all http to https You have to add below lines on the configuration and restart lighttpd server.

<pre>$HTTP["scheme"] == "http" {
    $HTTP["host"] == "site1.com" {
            url.redirect = (".*" =&gt; "https://site1.com$0")
    }
}</pre>

Now restart and check the website.

<pre>service lighttpd restart</pre>

<p style="text-align: left;">
  Above configuration will only work when you will set &#8220;<strong>443</strong>&#8221; port mentioned in lighttpd default configuration.
</p>

<p style="text-align: left;">
  Let your servers host-name or FQDN is &#8220;server1.domain.tld&#8221;. Now create a folder in <strong>/etc/lighttpd/ssl</strong>
</p>

<pre style="text-align: left;">mkdir /etc/lighttpd/ssl</pre>

<p style="text-align: left;">
  Now create an ssl keu+crt or directly pem file there by using FQDN <strong>server1.domain.tld</strong>
</p>

<pre style="text-align: left;">sudo openssl req -x509 -nodes -days 1460 -newkey rsa:2048 -keyout /etc/lighttpd/ssl/server.key -out /etc/lighttpd/ssl/server.crt</pre>

<p style="text-align: left;">
  Now combine the key+crt to pem file
</p>

<pre style="text-align: left;">cat /etc/lighttpd/ssl/server.key /etc/lighttpd/ssl/server.crt &gt; server.pem</pre>

<p style="text-align: left;">
  Now open lighttpd config file.
</p>

<pre style="text-align: left;">nano /etc/lighttpd/lighttpd.conf</pre>

<p style="text-align: left;">
  and put below codes before &#8220;include&#8221; of other added domains.
</p>

<pre style="text-align: left;">include_shell "/usr/share/lighttpd/create-mime.assign.pl"
include_shell "/usr/share/lighttpd/include-conf-enabled.pl"

$SERVER["socket"] == ":443" {
     ssl.engine = "enable"
        ssl.pemfile = "/etc/lighttpd/ssl/server.pem"
}

include "site1.com.conf"
include "site2.com.conf"</pre>

<p style="text-align: left;">
  You can also do this by a different way. Here is a perfect http to https config for a ghost blog.
</p>

<pre>$HTTP["host"] =~ "(^|.)DOMAIN.TLD$" {

server.document-root = "/var/www/DOMAIN.TLD/web/"
cache.enable = "enable"

$SERVER["socket"] == ":443" {
ssl.engine = "enable"
ssl.ca-file = "/var/www/DOMAIN.TLD/ssl/DOMAIN.TLD.crt"
ssl.pemfile = "/var/www/DOMAIN.TLD/ssl/DOMAIN.TLD.pem"
server.name = "DOMAIN.TLD"
}

$SERVER["socket"] == ":80" {
        $HTTP["host"] =~ "(.*)" {
                url.redirect = ( ".*" => "https://%0" )
        }
}
#You can avoide below for normal websites like wordpress,drupal,joomla,normal html-php etc because below lines are for ghost blog.
proxy.server  = ( "" => (
     ( "host" => "111.222.333.444", "port" => "XXXX")
))
###---^PROXY^---###
}</pre>

<p style="text-align: left;">
  Now you will be able to add multiple domains with different certificate for each.
</p>

<p style="text-align: center;">
  Thank You.
</p>

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/ssl.png